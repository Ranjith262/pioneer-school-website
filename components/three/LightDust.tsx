"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { GLOW_BLEND } from "./blending";

/**
 * LightDust — the site's signature 3D motif: soft, photographic bokeh
 * sparks (diya embers / dawn dust) drifting slowly upward. All motion is
 * computed in the vertex shader; the CPU only advances one clock uniform.
 * Optionally the field parts gently around the cursor (`repel`).
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uRise;
  uniform vec2 uMouse;
  uniform float uRepel;
  uniform vec3 uArea;    // width, height, depth
  uniform vec3 uCenter;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aScale;
  varying float vFade;
  varying float vSeed;

  void main() {
    vec3 p = position;
    float h = uArea.y;

    /* endless upward drift, wrapped inside the field's height */
    float y = mod(p.y - (uCenter.y - h * 0.5) + uTime * uRise * (0.4 + aSeed * 0.9), h);
    p.y = (uCenter.y - h * 0.5) + y;

    /* lazy sideways sway, unique per particle */
    p.x += sin(uTime * (0.22 + aSeed * 0.45) + aSeed * 62.83) * (0.25 + aSeed * 0.4);

    /* fade in/out near the wrap edges so respawn never pops */
    float f = y / h;
    float edge = smoothstep(0.0, 0.14, f) * (1.0 - smoothstep(0.86, 1.0, f));

    /* the field parts around the cursor */
    if (uRepel > 0.0) {
      vec2 d = p.xy - uMouse;
      float dist = length(d);
      float push = (1.0 - smoothstep(0.0, 2.4, dist)) * uRepel;
      p.xy += (d / max(dist, 0.001)) * push;
    }

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float twinkle = 0.72 + 0.28 * sin(uTime * (0.7 + aSeed * 1.5) + aSeed * 40.0);
    vFade = edge * twinkle;
    vSeed = aSeed;
    gl_PointSize = aScale * twinkle * uPixelRatio * (16.0 / -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vFade;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    /* photographic bokeh: hot centre + wide soft halo */
    float halo = smoothstep(1.0, 0.0, d);
    halo *= halo;
    float core = smoothstep(0.38, 0.0, d);
    float alpha = (halo * 0.6 + core * 0.75) * vFade * uOpacity;
    if (alpha < 0.004) discard;
    vec3 color = mix(uColorB, uColorA, vSeed + core * 0.4);
    gl_FragColor = vec4(color, alpha);
  }
`;

interface LightDustProps {
  count?: number;
  /** Field dimensions in world units: [width, height, depth]. */
  area?: [number, number, number];
  center?: [number, number, number];
  /** Highlight / base colours (mixed per particle). */
  colorA?: string;
  colorB?: string;
  /** Upward drift speed, world units per second. */
  rise?: number;
  opacity?: number;
  /** Cursor repulsion strength; 0 disables. */
  repel?: number;
  /** Fraction of particles rendered as large soft bokeh discs. */
  bokehRatio?: number;
}

export function LightDust({
  count = 300,
  area = [30, 12, 8],
  center = [0, 0, 0],
  colorA = "#fff3cf",
  colorB = "#f5b301",
  rise = 0.35,
  opacity = 0.8,
  repel = 0,
  bokehRatio = 0.12,
}: LightDustProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointerNdc = useRef({ x: 0, y: -10 });

  const { positions, seeds, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = center[0] + (Math.random() - 0.5) * area[0];
      positions[i * 3 + 1] = center[1] + (Math.random() - 0.5) * area[1];
      positions[i * 3 + 2] = center[2] + (Math.random() - 0.5) * area[2];
      seeds[i] = Math.random();
      scales[i] =
        Math.random() < bokehRatio
          ? 10 + Math.random() * 11 // rare large out-of-focus discs
          : 1.8 + Math.random() * 3.8; // fine ember dust
    }
    return { positions, seeds, scales };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRise: { value: rise },
      uMouse: { value: new THREE.Vector2(0, -100) },
      uRepel: { value: repel },
      uArea: { value: new THREE.Vector3(...area) },
      uCenter: { value: new THREE.Vector3(...center) },
      uPixelRatio: { value: 1 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (repel <= 0) return;
    const onMove = (e: PointerEvent) => {
      pointerNdc.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerNdc.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [repel]);

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    /* keep scalar/vector uniforms in sync with props so a live viewport
       tier change (desktop ⇄ mobile params) can't leave them stale */
    mat.uniforms.uRise.value = rise;
    mat.uniforms.uOpacity.value = opacity;
    mat.uniforms.uRepel.value = repel;
    (mat.uniforms.uArea.value as THREE.Vector3).set(...area);
    (mat.uniforms.uCenter.value as THREE.Vector3).set(...center);
    if (repel > 0) {
      const m = mat.uniforms.uMouse.value as THREE.Vector2;
      const targetX = (pointerNdc.current.x * state.viewport.width) / 2;
      const targetY = (pointerNdc.current.y * state.viewport.height) / 2;
      m.x += (targetX - m.x) * 0.06;
      m.y += (targetY - m.y) * 0.06;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        {...GLOW_BLEND}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
      />
    </points>
  );
}
