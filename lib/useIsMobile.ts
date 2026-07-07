"use client";

import { useEffect, useState } from "react";

/**
 * True below the md breakpoint. SSR-safe (false on server) so scroll-linked
 * effects render statically first and only activate on capable viewports.
 */
export function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}
