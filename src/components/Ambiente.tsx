"use client";
// Lo que vive en toda la página: las entradas suaves de lo quieto y el botón fijo del celular.
import { useEffect, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion";

export function Revelar() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.set("[data-reveal]", { y: 50, opacity: 0 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }),
      });
    });
    return () => mm.revert();
  });
  return null;
}

/** En el celular, mientras no se ve ni el botón de arriba ni el formulario, un botón fijo abajo lleva a la lista. */
export function BotonFijo() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const watched = ["#arriba a.btn-plate", "#lista-seccion", "footer"]
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => !!el);
    const visible = new Map<Element, boolean>();
    const update = () => {
      const pastTop = window.scrollY > window.innerHeight * 0.6;
      const anyVisible = [...visible.values()].some(Boolean);
      setShown(pastTop && !anyVisible && !document.body.dataset.signedUp);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target, e.isIntersecting));
      update();
    });
    watched.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy/95 px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-[110%]"
      }`}
    >
      <a href="#lista" tabIndex={shown ? 0 : -1} className="btn-plate w-full">
        Anótate y pruébala
      </a>
    </div>
  );
}
