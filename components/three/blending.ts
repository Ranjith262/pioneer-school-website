import * as THREE from "three";

/**
 * Additive-looking glow blend that also accumulates destination ALPHA.
 *
 * Plain THREE.AdditiveBlending (srcAlpha, one) piles up RGB but leaves the
 * canvas's alpha channel near zero. iOS Safari composites transparent WebGL
 * canvases as premultiplied and clamps RGB to alpha — so pure-additive
 * content renders (nearly) invisible on iPhone while looking fine in
 * desktop Chrome. Accumulating coverage alpha (one, one-minus-src-alpha)
 * keeps the glow valid premultiplied content on every browser.
 */
export const GLOW_BLEND = {
  blending: THREE.CustomBlending,
  blendEquation: THREE.AddEquation,
  blendSrc: THREE.SrcAlphaFactor,
  blendDst: THREE.OneFactor,
  blendSrcAlpha: THREE.OneFactor,
  blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
} as const;
