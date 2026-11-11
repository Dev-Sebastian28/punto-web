"use client";
// La app por dentro: el celular se queda quieto y, al bajar, muestra videos grabados en la app real.
import { useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion";
import { Phone } from "./Brand";

export const TOUR = [
  { id: "gasto", title: "Anotas el gasto cuando pasa", text: "ACPM, peajes, llantas, comida. Eliges la categoría, escribes cuánto y listo." },
  { id: "ganancia", title: "Ves cuánto te quedó", text: "Fletes menos gastos, mes a mes, y en qué se te fue la plata." },
  { id: "viajes", title: "Cada viaje con su flete", text: "Origen, destino, salida y lo que te pagan. Hoy, próximos y terminados." },
  { id: "camiones", title: "Tus camiones, con su placa", text: "Placa, marca, modelo y número interno de cada uno, y si está en ruta o disponible." },
  { id: "invitado", title: "Pruébala sin cuenta", text: "Entras como dueño a una flota de ejemplo, con camiones y viajes. Nada de lo que hagas se guarda." },
] as const;

export function Recorrido() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [load, setLoad] = useState(false);
  const pin = useRef<ScrollTrigger | null>(null);

  /** Ir a un paso: con movimiento baja hasta él; sin movimiento (o sin JavaScript de GSAP) solo lo muestra. */
  function goTo(i: number) {
    const st = pin.current;
    if (st) window.scrollTo({ top: st.start + ((st.end - st.start) * i) / (TOUR.length - 1) + 2, behavior: "smooth" });
    else setActive(i);
  }

  useGSAP(
    () => {
      // Los videos se piden solo cuando la sección está por llegar.
      ScrollTrigger.create({ trigger: root.current, start: "top bottom+=60%", once: true, onEnter: () => setLoad(true) });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const steps = TOUR.length;
        pin.current = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: `+=${steps * 85}%`,
          pin: true,
          scrub: true,
          snap: { snapTo: 1 / (steps - 1), duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut" },
          onUpdate: (self) => setActive(Math.min(steps - 1, Math.round(self.progress * (steps - 1)))),
        });
        gsap.from("[data-tour-phone]", {
          y: 120, rotate: -6, opacity: 0, ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 20%", scrub: true },
        });
      });
      return () => {
        mm.revert();
        pin.current = null;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="la-app" aria-labelledby="la-app-titulo" className="on-navy relative overflow-hidden bg-navy text-white">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl content-center gap-6 px-5 py-10 md:grid-cols-[1fr_auto] md:gap-16 md:px-8">
        <div className="order-2 md:order-1 md:self-center">
          <p className="eyebrow">La app por dentro</p>
          <h2 id="la-app-titulo" className="mt-2 hidden text-[clamp(32px,4vw,52px)] font-extrabold md:block">
            Así funciona Punto, de verdad.
          </h2>

          {/* La ruta del logo como avance: un punto por paso. */}
          <ol className="mt-4 flex items-center gap-0 md:mt-8">
            {TOUR.map((step, i) => (
              <li key={step.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Paso ${i + 1}: ${step.title}`}
                  aria-current={i === active ? "step" : undefined}
                  className="-m-3 grid size-10 place-items-center"
                >
                  <span className={`grid size-4 place-items-center rounded-full transition-colors duration-300 ${i <= active ? "bg-logo-night" : "bg-white/20"}`}>
                    <span className="size-1.5 rounded-full bg-white" />
                  </span>
                </button>
                {i < TOUR.length - 1 && (
                  <span aria-hidden="true" className={`h-1 w-8 transition-colors duration-300 md:w-12 ${i < active ? "bg-route-night" : "bg-white/15"}`} />
                )}
              </li>
            ))}
          </ol>

          <div className="relative mt-5 min-h-[150px] md:mt-8 md:min-h-[200px]">
            {TOUR.map((step, i) => (
              <div
                key={step.id}
                className={`transition-all duration-500 ease-out-soft max-md:absolute max-md:inset-0 md:mb-6 ${
                  i === active ? "translate-y-0 opacity-100" : "max-md:pointer-events-none max-md:translate-y-4 max-md:opacity-0 md:opacity-35"
                }`}
              >
                <h3 className="text-[clamp(24px,6.4vw,34px)] font-extrabold">{step.title}</h3>
                <p className={`mt-2 max-w-[38ch] text-[17px] text-on-navy-soft md:text-lg ${i === active ? "" : "md:hidden"}`}>{step.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-on-navy-soft/80">Grabado en la app real · Cifras de ejemplo</p>
        </div>

        <div data-tour-phone className="order-1 mx-auto w-[min(58vw,290px)] md:order-2 md:w-[320px]">
          <Phone>
            {TOUR.map((step, i) => (
              <TourVideo key={step.id} id={step.id} active={i === active} load={load} />
            ))}
          </Phone>
        </div>
      </div>
    </section>
  );
}

function TourVideo({ id, active, load }: { id: string; active: boolean; load: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    const video = ref.current;
    if (!video) return;
    if (active && load) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, { dependencies: [active, load] });

  return (
    <video
      ref={ref}
      className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
      src={load ? `/media/${id}.mp4` : undefined}
      poster={`/media/${id}.webp`}
      muted
      loop
      playsInline
      preload={load ? "auto" : "none"}
      aria-hidden={!active}
    />
  );
}
