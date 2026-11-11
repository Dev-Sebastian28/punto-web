"use client";
// El movimiento de la página: GSAP con ScrollTrigger, registrado una sola vez.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Quien pidió "reducir movimiento" en su celular ve la misma página, quieta. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOBILE = "(max-width: 899px)";
export const DESKTOP = "(min-width: 900px)";

export function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** $12.000.000, como en Colombia. */
export function pesos(value: number): string {
  return "$" + Math.round(value).toLocaleString("es-CO");
}

export { gsap, ScrollTrigger, useGSAP };
