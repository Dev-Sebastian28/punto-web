"use client";
// Lenis hace que bajar con la rueda del mouse se sienta suave y lo mantiene al ritmo de GSAP.
// En el celular el dedo sigue moviendo la página como siempre (más natural y más liviano).
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/motion";
import { track } from "@/lib/waitlist";

export function SmoothScroll() {
  useEffect(() => {
    track("visit");
    if (reducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -12 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
