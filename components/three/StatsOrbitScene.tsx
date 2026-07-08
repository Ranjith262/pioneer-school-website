"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useIsMobile } from "@/lib/useIsMobile";
import { LazyScene } from "./LazyScene";
import { LightDust } from "./LightDust";

/* ── A globe drawn in points of light, with knowledge travelling
      between them as comet pulses along great arcs. ─────────────── */

const GLOBE_RADIUS = 2.6;

const DOT_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aSeed * 1.4) + aSeed * 40.0);
    vAlpha = twinkle;
    vSeed = aSeed;
    gl_PointSize = (1.3 + aSeed * 1.6) * twinkle * uPixelRatio * (13.0 / -mv.z);
  }
`;

const DOT_FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float glow = smoothstep(1.0, 0.0, d);
    float alpha = glow * glow * vAlpha;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(mix(uColorB, uColorA, vSeed), alpha);
  }
`;

function DotSphere({ dots = 1300 }: { dots?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(dots * 3);
    const seeds = new Float32Array(dots);
    /* Fibonacci sphere — perfectly even coverage, no pole clustering */
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dots; i++) {
      const y = 1 - (i / (dots - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * r * GLOBE_RADIUS;
      positions[i * 3 + 1] = y * GLOBE_RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * r * GLOBE_RADIUS;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [dots]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uColorA: { value: new THREE.Color("#eef6ff") },
      uColorB: { value: new THREE.Color("#82b6f0") },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={DOT_VERTEX}
        fragmentShader={DOT_FRAGMENT}
      />
    </points>
  );
}

/* ── Comet pulses travelling great arcs between surface points ── */

const TRAIL = 16;

function Arc({
  from,
  to,
  speed,
  phase,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  speed: number;
  phase: number;
}) {
  const curve = useMemo(() => {
    const mid = from
      .clone()
      .add(to)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS * 1.5);
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);

  /* faint static path */
  const pathLine = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
    const material = new THREE.LineBasicMaterial({
      color: "#f5b301",
      transparent: true,
      opacity: 0.22,
    });
    return new THREE.Line(geometry, material);
  }, [curve]);

  /* comet head + fading tail, positions advanced on the CPU
     (TRAIL points per arc — negligible) */
  const cometRef = useRef<THREE.Points>(null);
  const { cometPositions, fracs } = useMemo(() => {
    const cometPositions = new Float32Array(TRAIL * 3);
    const fracs = new Float32Array(TRAIL);
    for (let i = 0; i < TRAIL; i++) fracs[i] = i / (TRAIL - 1);
    return { cometPositions, fracs };
  }, []);

  const cometUniforms = useMemo(
    () => ({
      uPixelRatio: { value: 1 },
      uColor: { value: new THREE.Color("#ffd75e") },
    }),
    []
  );

  useFrame((state) => {
    const points = cometRef.current;
    if (!points) return;
    const t = (state.clock.elapsedTime * speed + phase) % 1.3; // pause between runs
    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < TRAIL; i++) {
      const ti = Math.min(Math.max(t - i * 0.011, 0), 1);
      curve.getPoint(ti, v);
      attr.setXYZ(i, v.x, v.y, v.z);
    }
    attr.needsUpdate = true;
    (points.material as THREE.ShaderMaterial).uniforms.uPixelRatio.value =
      state.gl.getPixelRatio();
  });

  return (
    <group>
      <primitive object={pathLine} />
      <points ref={cometRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cometPositions, 3]} />
          <bufferAttribute attach="attributes-aFrac" args={[fracs, 1]} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={cometUniforms}
          vertexShader={/* glsl */ `
            uniform float uPixelRatio;
            attribute float aFrac;
            varying float vFrac;
            void main() {
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * mv;
              vFrac = aFrac;
              gl_PointSize = mix(7.0, 1.2, aFrac) * uPixelRatio * (13.0 / -mv.z);
            }
          `}
          fragmentShader={/* glsl */ `
            uniform vec3 uColor;
            varying float vFrac;
            void main() {
              float d = length(gl_PointCoord - 0.5) * 2.0;
              float glow = smoothstep(1.0, 0.0, d);
              float alpha = glow * glow * (1.0 - vFrac) * 0.95;
              if (alpha < 0.004) discard;
              gl_FragColor = vec4(uColor, alpha);
            }
          `}
        />
      </points>
    </group>
  );
}

/* ── Assembled globe ──────────────────────────────────────────── */

function surfacePoint(lat: number, lon: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
    GLOBE_RADIUS * Math.cos(phi),
    GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
  );
}

const ARCS: Array<{ from: THREE.Vector3; to: THREE.Vector3; speed: number; phase: number }> = [
  { from: surfacePoint(15, 76), to: surfacePoint(51, 0), speed: 0.16, phase: 0.0 },
  { from: surfacePoint(15, 76), to: surfacePoint(40, -74), speed: 0.13, phase: 0.45 },
  { from: surfacePoint(15, 76), to: surfacePoint(35, 139), speed: 0.18, phase: 0.85 },
  { from: surfacePoint(15, 76), to: surfacePoint(-33, 151), speed: 0.14, phase: 0.25 },
  { from: surfacePoint(15, 76), to: surfacePoint(25, 55), speed: 0.2, phase: 0.65 },
];

function Globe({ dots }: { dots: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group rotation={[0.32, 0, -0.1]}>
      <group ref={groupRef}>
        <DotSphere dots={dots} />
        {ARCS.map((arc, i) => (
          <Arc key={i} {...arc} />
        ))}
      </group>
      {/* a single quiet gold meridian ring, off-axis for elegance */}
      <mesh rotation={[Math.PI / 2.05, 0, 0.3]}>
        <torusGeometry args={[GLOBE_RADIUS * 1.28, 0.009, 6, 128]} />
        <meshBasicMaterial color="#f5b301" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

const STATS_CAMERA = { position: [0, 0, 9] as [number, number, number], fov: 45 };
const STATS_DPR: [number, number] = [1, 1.5];

export function StatsOrbitScene() {
  const isMobile = useIsMobile();

  return (
    <LazyScene camera={STATS_CAMERA} dpr={STATS_DPR}>
      {/* rises from the band's lower edge like a planet at dawn —
          centred on phones, right of the numbers on wide screens */}
      <group position={isMobile ? [0, -2.5, 0] : [3.9, -1.7, 0]}>
        <Globe dots={isMobile ? 800 : 1300} />
      </group>
      {/* whisper of gold dust drifting through the dark band */}
      <LightDust
        count={isMobile ? 40 : 70}
        area={isMobile ? [9, 7, 4] : [24, 7, 4]}
        center={[0, 0, -1]}
        colorA="#ffe9c2"
        colorB="#f5b301"
        rise={0.18}
        opacity={0.35}
        bokehRatio={0.06}
      />
    </LazyScene>
  );
}
