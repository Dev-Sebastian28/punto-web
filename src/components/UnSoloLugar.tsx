"use client";
// El desorden de hoy (el chat, el cuaderno, el recibo y la cuenta de cabeza) entra al celular: un solo lugar.
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion";
import { Phone } from "./Brand";

const LINES = [
  "El flete lo cuadraste por WhatsApp.",
  "El ACPM, en un cuaderno.",
  "El recibo del peaje, en la guantera.",
  "Y la cuenta del mes… en la cabeza.",
];

export function UnSoloLugar() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const things = gsap.utils.toArray<HTMLElement>("[data-thing]", root.current);
        const lines = gsap.utils.toArray<HTMLElement>("[data-line]", root.current);
        gsap.set(things, { opacity: 0, scale: 0.6 });
        gsap.set(lines, { opacity: 0.18 });
        gsap.set("[data-phone]", { scale: 0.86, opacity: 0.35, filter: "grayscale(1)" });
        gsap.set("[data-after]", { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=240%", pin: true, scrub: 0.7 },
        });
        things.forEach((thing, i) => {
          tl.to(lines[i], { opacity: 1, duration: 0.4 }, i)
            .to(thing, { opacity: 1, scale: 1, rotate: Number(thing.dataset.rotate ?? 0), duration: 0.6, ease: "back.out(1.8)" }, i);
          if (i > 0) tl.to(lines[i - 1], { opacity: 0.35, duration: 0.3 }, i);
        });

        // Todo vuela al celular.
        const fly = things.length + 0.3;
        const phone = root.current?.querySelector<HTMLElement>("[data-phone]");
        tl.to(things, {
          x: (_i, el: HTMLElement) => {
            if (!phone) return 0;
            const a = el.getBoundingClientRect();
            const b = phone.getBoundingClientRect();
            return b.left + b.width / 2 - (a.left + a.width / 2);
          },
          y: (_i, el: HTMLElement) => {
            if (!phone) return 0;
            const a = el.getBoundingClientRect();
            const b = phone.getBoundingClientRect();
            return b.top + b.height / 2 - (a.top + a.height / 2);
          },
          scale: 0.1,
          rotate: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.in",
        }, fly)
          .to("[data-lines]", { opacity: 0, y: -20, duration: 0.5 }, fly)
          .to("[data-phone]", { scale: 1, opacity: 1, filter: "grayscale(0)", duration: 0.8, ease: "back.out(1.6)" }, fly + 0.8)
          .to("[data-after]", { opacity: 1, y: 0, duration: 0.6 }, fly + 1.1)
          .to({}, { duration: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="un-lugar" className="relative overflow-hidden bg-page">
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-5 py-16">
        <div className="relative z-10 w-full max-w-xl text-center">
          <div data-lines>
            <p className="eyebrow">Hoy</p>
            <ul className="mt-3 space-y-1 text-[clamp(22px,5.6vw,34px)] leading-tight font-extrabold tracking-[-0.02em]">
              {LINES.map((line) => (
                <li key={line} data-line>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div data-after className="absolute inset-x-0 top-0">
            <p className="eyebrow">Con Punto</p>
            <h2 id="un-lugar" className="mt-3 text-[clamp(34px,9vw,60px)] font-extrabold">
              Todo en un solo lugar.
            </h2>
            <p className="mt-3 text-lg text-ink-soft">Tus viajes, tus gastos y tus camiones, en tu iPhone.</p>
          </div>
        </div>

        <div className="relative mt-8 w-full max-w-3xl">
          <div data-phone className="relative z-0 mx-auto w-[min(46vw,230px)] md:w-[250px]">
            <Phone>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/viajes-lista.webp" alt="La lista de viajes de Punto." className="absolute inset-0 size-full object-cover" loading="lazy" />
            </Phone>
          </div>

          {/* El chat del flete */}
          <div data-thing data-rotate="-6" className="absolute top-[4%] left-0 z-10 w-[46%] max-w-[230px] md:top-[10%] md:left-[4%]">
            <div className="rounded-2xl rounded-bl-sm bg-[#DCF8C6] px-3 py-2 text-[14px] text-[#111] shadow-[0_12px_30px_rgb(0_0_0/0.18)] md:text-base">
              Listo, <b>$3.000.000</b> el flete a Girardot
              <span className="mt-0.5 block text-right text-[11px] text-[#53BDEB]">9:12 a. m. ✓✓</span>
            </div>
          </div>

          {/* El cuaderno del ACPM */}
          <div data-thing data-rotate="5" className="absolute top-[38%] right-0 z-10 w-[44%] max-w-[210px] md:top-[8%] md:right-[4%]">
            <div className="relative rounded-md bg-[#FFFDF5] py-3 pr-3 pl-7 text-[13px] whitespace-nowrap text-[#23324A] italic shadow-[0_12px_30px_rgb(0_0_0/0.18)] [background-image:repeating-linear-gradient(transparent_0_22px,#D7E3F4_22px_23px)] md:text-base">
              <span className="absolute inset-y-0 left-4 w-px bg-[#F4A3A3]" />
              <p>ACPM · 380.000</p>
              <p>Peaje · 28.400</p>
              <p>ACPM · 420.000</p>
              <p className="text-[#C62828]">¿llantas?</p>
            </div>
          </div>

          {/* El recibo de la guantera */}
          <div data-thing data-rotate="-9" className="absolute bottom-[6%] left-[2%] z-10 w-[38%] max-w-[180px] md:bottom-[10%] md:left-[10%]">
            <div className="bg-white px-3 pt-3 pb-5 font-mono text-[12px] text-[#333] shadow-[0_12px_30px_rgb(0_0_0/0.18)] [clip-path:polygon(0_0,100%_0,100%_94%,90%_100%,80%_94%,70%_100%,60%_94%,50%_100%,40%_94%,30%_100%,20%_94%,10%_100%,0_94%)]">
              <p className="text-center font-bold">PEAJE</p>
              <p className="text-center">Cat. 5 · 6 ejes</p>
              <p className="mt-2 flex justify-between"><span>Total</span><b>$28.400</b></p>
            </div>
          </div>

          {/* La cuenta de cabeza */}
          <div data-thing data-rotate="4" className="absolute right-[2%] bottom-[8%] z-10 w-[42%] max-w-[200px] md:right-[10%] md:bottom-[14%]">
            <div className="relative rounded-[40px] bg-white px-4 py-4 text-center text-[15px] font-bold text-ink shadow-[0_12px_30px_rgb(0_0_0/0.18)] md:text-lg">
              ¿Cuánto me quedó?
              <span className="absolute -bottom-3 left-6 size-4 rounded-full bg-white shadow" />
              <span className="absolute -bottom-6 left-3 size-2.5 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
