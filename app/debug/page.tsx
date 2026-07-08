"use client";

import { useEffect, useState } from "react";
import { Hero3D } from "@/components/three/Hero3D";
import pkg from "../../package.json";

/* On-device diagnostics — not linked from anywhere. One screenshot of
   this page reports everything needed to debug device-specific issues:
   OS accessibility settings, WebGL availability, GPU, and a live 3D
   test box. */

export default function DebugPage() {
  const [info, setInfo] = useState<Array<[string, string]> | null>(null);
  const [marqueeTest, setMarqueeTest] = useState("checking…");

  useEffect(() => {
    let webgl2 = false;
    let webgl1 = false;
    let gpu = "unknown";
    try {
      const probe = document.createElement("canvas");
      const g2 = probe.getContext("webgl2");
      webgl2 = !!g2;
      const g = g2 ?? probe.getContext("webgl");
      webgl1 = !!g;
      if (g) {
        const ext = g.getExtension("WEBGL_debug_renderer_info");
        gpu = ext
          ? String(g.getParameter(ext.UNMASKED_RENDERER_WEBGL))
          : "(name masked by browser)";
      }
    } catch (e) {
      gpu = "probe error: " + String(e);
    }
    setInfo([
      ["Site version", pkg.version],
      ["Reduce Motion (OS setting)", String(matchMedia("(prefers-reduced-motion: reduce)").matches)],
      ["Phone layout active (≤767px)", String(matchMedia("(max-width: 767px)").matches)],
      ["WebGL 2 available", String(webgl2)],
      ["WebGL available", String(webgl1)],
      ["GPU", gpu],
      ["Device pixel ratio", String(window.devicePixelRatio)],
      ["Viewport", `${window.innerWidth} × ${window.innerHeight}`],
      ["Browser", navigator.userAgent],
    ]);

    /* JS animation smoke test — moves a value the same way the values
       ticker does. If this says OK, the ticker mechanism works here. */
    const t0 = performance.now();
    let frames = 0;
    let raf = 0;
    const tick = () => {
      frames++;
      if (performance.now() - t0 < 1000) {
        raf = requestAnimationFrame(tick);
      } else {
        setMarqueeTest(
          frames > 30 ? `OK — ${frames} frames/s` : `SLOW — ${frames} frames/s`
        );
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="font-heading text-2xl font-bold text-ink">
        Device diagnostics
      </h1>
      <p className="mt-2 text-sm text-muted">
        Screenshot this whole page and share it to report a device issue.
      </p>

      <dl className="mt-8 space-y-3">
        {(info ?? [["Loading", "…"]]).map(([k, v]) => (
          <div
            key={k}
            className="flex flex-wrap justify-between gap-x-6 gap-y-1 rounded-xl border border-primary-100 bg-white px-4 py-3"
          >
            <dt className="text-sm font-semibold text-ink">{k}</dt>
            <dd className="break-all text-sm text-muted">{v}</dd>
          </div>
        ))}
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 rounded-xl border border-primary-100 bg-white px-4 py-3">
          <dt className="text-sm font-semibold text-ink">Animation loop</dt>
          <dd className="text-sm text-muted">{marqueeTest}</dd>
        </div>
      </dl>

      <h2 className="mt-10 font-heading text-lg font-semibold text-ink">
        Live 3D test
      </h2>
      <p className="mt-1 text-sm text-muted">
        Golden sparks should drift slowly upward inside this dark box.
      </p>
      <div className="relative mt-4 h-72 overflow-hidden rounded-xl bg-ink">
        <Hero3D />
      </div>
    </main>
  );
}
