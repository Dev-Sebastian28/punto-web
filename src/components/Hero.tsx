"use client";
// La portada: la pregunta, la promesa y el celular con la pantalla real de Gastos.
import { useRef } from "react";
import { FREE_MONTHS } from "@/lib/config";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion";
import { Icon, Logo, Phone, RouteMark } from "./Brand";

const WORDS = ["¿Cuánto", "te", "quedó", "este", "mes?"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-hero-word]", { yPercent: 115 });
        gsap.set("[data-hero-fade]", { y: 22, opacity: 0 });
        gsap.set("[data-hero-plate]", { y: 14, opacity: 0, rotate: -4 });
        gsap.set("[data-hero-phone]", { y: 180, rotateX: 22, opacity: 0, transformPerspective: 1200 });
        gsap.set("[data-hero-ring]", { scale: 1.7, opacity: 0 });
        gsap.set("[data-hero-callout]", { y: 12, opacity: 0 });
        document.documentElement.classList.add("ready");

        gsap
          .timeline({ defaults: { ease: "power4.out" }, delay: 0.1 })
          .to("[data-hero-plate]", { y: 0, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(2.4)" })
          .to("[data-hero-word]", { yPercent: 0, duration: 1, stagger: 0.07 }, "<0.1")
          .to("[data-hero-fade]", { y: 0, opacity: 1, duration: 0.8, stagger: 0.09 }, "-=0.6")
          .to("[data-hero-phone]", { y: 0, rotateX: 0, opacity: 1, duration: 1.4, ease: "expo.out" }, 0.35)
          .to("[data-hero-ring]", { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2.2)" }, "-=0.45")
          .to("[data-hero-callout]", { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");

        // Al bajar, el celular se acerca y el texto se aleja, como si la cámara entrara a la pantalla.
        const scroll = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-phone-move]", { yPercent: -10, scale: 1.08, ease: "none", scrollTrigger: scroll });
        gsap.to("[data-hero-copy]", { y: -80, opacity: 0, ease: "none", scrollTrigger: { ...scroll, end: "70% top" } });
        gsap.to("[data-hero-routes]", { yPercent: 25, ease: "none", scrollTrigger: scroll });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      id="arriba"
      className="on-navy relative overflow-hidden bg-navy text-white"
      // Dónde queda la tarjeta de Ganancia en la captura real de Gastos (iPhone 18 Pro, 1206 × 2622).
      style={{ "--ring-x": "65.6%", "--ring-y": "55.8%", "--ring-w": "29.8%", "--ring-h": "9.2%", "--callout-y": "67%" } as React.CSSProperties}
    >
      <div data-hero-routes className="pointer-events-none absolute inset-0 text-blue-night opacity-[0.14]" aria-hidden="true">
        <RouteMark className="absolute -top-10 -right-16 w-56 -scale-x-100 md:w-80" />
        <RouteMark className="absolute top-[55%] -left-36 w-72" />
        <RouteMark className="absolute -right-24 bottom-10 hidden w-96 md:block" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#arriba" aria-label="Punto, inicio">
          <Logo night className="h-8 w-auto md:h-9" />
        </a>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-on-navy-soft">
          <Icon.IPhone />
          Para iPhone
        </span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 pt-4 pb-0 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-8 md:px-8 md:pt-10 md:pb-20">
        <div data-hero-copy>
          <span data-intro data-hero-plate className="plate">Lista de espera · TestFlight</span>
          <h1 className="mt-5 text-[clamp(46px,12.5vw,104px)] font-extrabold tracking-[-0.045em]">
            {WORDS.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom [&:not(:last-child)]:mr-[0.22em]">
                <span data-intro data-hero-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p data-intro data-hero-fade className="mt-5 max-w-[34ch] text-[19px] text-on-navy-soft md:text-[21px]">
            Punto es la app para <strong className="font-bold text-white">dueños de camión en Colombia</strong>. Anotas tus
            fletes y tus gastos, y te dice cuánto te quedó.
          </p>
          <div data-intro data-hero-fade className="mt-8 flex flex-col items-start gap-3">
            <a href="#lista" className="btn-plate">
              Anótate y pruébala
            </a>
            <span className="flex items-center gap-2 text-[15px] font-semibold">
              <Icon.CheckPlate className="size-5" />
              <span>
                Para iPhone · <b className="font-extrabold text-plate">{FREE_MONTHS} meses gratis</b> para los primeros
              </span>
            </span>
          </div>
        </div>

        <div className="relative mx-auto -mb-44 w-[min(78vw,330px)] md:mb-0 md:w-[340px]" style={{ perspective: 1200 }}>
          <div data-hero-phone-move>
            <div data-intro data-hero-phone>
              <Phone>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/gastos.webp"
                  alt="La pantalla de Gastos de Punto: fletes, gastos y la ganancia del mes."
                  width={1206}
                  height={2622}
                  className="absolute inset-0 size-full object-cover"
                  fetchPriority="high"
                />
                <span
                  data-intro
                  data-hero-ring
                  className="pointer-events-none absolute rounded-[3.6cqw] border-[1.1cqw] border-plate shadow-[0_0_0_1.4cqw_rgb(255_201_40/0.28)]"
                  style={{ left: "var(--ring-x)", top: "var(--ring-y)", width: "var(--ring-w)", height: "var(--ring-h)" }}
                  aria-hidden="true"
                />
              </Phone>
            </div>
            <span
              data-intro
              data-hero-callout
              className="absolute right-[-4%] z-10 rounded-lg bg-plate px-3 py-1.5 text-[13px] font-extrabold text-navy shadow-[0_10px_30px_rgb(0_0_0/0.35)]"
              style={{ top: "var(--callout-y)" }}
            >
              Esto te quedó
            </span>
            <span className="mt-3 block text-center text-xs font-semibold text-ink-soft md:text-on-navy-soft">
              Pantalla real · Cifras de ejemplo
            </span>
          </div>
        </div>
      </div>
      <div className="h-48 bg-page md:hidden" aria-hidden="true" />
    </header>
  );
}
