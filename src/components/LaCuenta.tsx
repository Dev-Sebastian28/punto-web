"use client";
// La cuenta del video 1: doce millones de fletes, caen los gastos y queda lo que de verdad te quedó.
import { useRef } from "react";
import { gsap, MOTION_OK, pesos, useGSAP } from "@/lib/motion";

const FREIGHT = 12_000_000;
const EXPENSES = [
  { name: "ACPM", detail: "Combustible", amount: 4_000_000 },
  { name: "Llantas y taller", detail: "Mantenimiento", amount: 2_300_000 },
  { name: "Peajes", detail: "Peajes", amount: 1_700_000 },
  { name: "Comida y parqueadero", detail: "Comida · Parqueadero", amount: 1_000_000 },
  { name: "Otros", detail: "Lavada, papeles…", amount: 1_000_000 },
];
const LEFT = FREIGHT - EXPENSES.reduce((sum, e) => sum + e.amount, 0);

export function LaCuenta() {
  const root = useRef<HTMLElement>(null);
  const total = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const value = { v: FREIGHT };
        const write = () => {
          if (total.current) total.current.textContent = pesos(Math.round(value.v / 1000) * 1000);
        };
        const cards = gsap.utils.toArray<HTMLElement>("[data-expense]", root.current);

        gsap.set("[data-static]", { display: "none" });
        gsap.set("[data-expense-list]", { height: 140 });
        gsap.set("[data-end]", { opacity: 0, y: 30 });
        gsap.set("[data-label-left]", { opacity: 0, y: 20 });
        gsap.set(cards, { position: "absolute", left: 0, right: 0, top: 0, opacity: 0, y: () => -window.innerHeight * 0.7 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=260%", pin: true, scrub: 0.7 },
        });
        tl.to({}, { duration: 0.6 });

        let running = FREIGHT;
        cards.forEach((card, i) => {
          running -= EXPENSES[i].amount;
          const at = 0.6 + i;
          tl.to(card, { opacity: 1, y: i * 14, rotate: (i % 2 ? 1 : -1) * (2 + i), duration: 0.7, ease: "back.out(1.4)" }, at)
            .to(value, { v: running, duration: 0.7, ease: "none", onUpdate: write }, at)
            .to("[data-total-wrap]", { keyframes: [{ x: -8 }, { x: 8 }, { x: 0 }], duration: 0.2, ease: "none" }, at + 0.5);
        });

        const end = 0.6 + cards.length + 0.2;
        tl.to(cards, { y: () => window.innerHeight, opacity: 0, rotate: 12, stagger: 0.04, duration: 0.8, ease: "power2.in" }, end)
          .to("[data-label-freight]", { opacity: 0, y: -20, duration: 0.4 }, end)
          .to("[data-label-left]", { opacity: 1, y: 0, duration: 0.4 }, end + 0.3)
          .to("[data-total-wrap]", { scale: 1.12, duration: 0.6, ease: "back.out(2)" }, end + 0.4)
          .to("[data-end]", { opacity: 1, y: 0, duration: 0.6 }, end + 0.7)
          .to({}, { duration: 0.6 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="la-cuenta" className="on-navy relative overflow-hidden bg-navy-deep text-white">
      <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <h2 id="la-cuenta" className="sr-only">La cuenta del mes</h2>
        <div className="relative h-7">
          <p data-label-freight className="eyebrow">Fletes del mes</p>
          <p data-label-left className="eyebrow absolute inset-x-0 top-0 whitespace-nowrap text-plate!">De doce millones, te quedaron</p>
        </div>
        <div data-total-wrap className="mt-3">
          <p ref={total} className="text-[clamp(50px,15vw,150px)] leading-none font-extrabold tracking-[-0.04em] text-plate tabular-nums">
            {pesos(FREIGHT)}
          </p>
        </div>

        <ul data-expense-list className="relative mt-10 w-full max-w-[360px] space-y-2 text-left" aria-label="Gastos del mes">
          {EXPENSES.map((e) => (
            <li
              key={e.name}
              data-expense
              className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 text-ink shadow-[0_18px_40px_rgb(0_0_0/0.35)]"
            >
              <span>
                <b className="block font-bold">{e.name}</b>
                <small className="text-[13px] text-ink-soft">{e.detail}</small>
              </span>
              <b className="font-extrabold text-danger tabular-nums">−{pesos(e.amount)}</b>
            </li>
          ))}
        </ul>

        <p data-static className="mt-8 text-2xl font-extrabold">
          Te quedaron <span className="text-plate">{pesos(LEFT)}</span>.
        </p>
        <div data-end className="mt-4 md:mt-8">
          <p className="text-[clamp(28px,7vw,48px)] font-extrabold tracking-[-0.03em]">Eso te quedó.</p>
          <p className="mt-2 text-lg text-on-navy-soft">Y eso, si no se te perdió ningún recibo.</p>
        </div>
        <p className="mt-8 text-xs font-semibold text-on-navy-soft/80">Cifras de ejemplo</p>
      </div>
    </section>
  );
}
