"use client";
// Las funcionalidades clave de todo el sistema: lo que ya funciona (video real) y lo que está en construcción
// (su diseño de Figma "Punto Vistas", con el aviso de obra). Ninguna lleva fecha.
import { useEffect, useRef } from "react";
import { gsap, MOBILE, MOTION_OK, useGSAP } from "@/lib/motion";

type Feature = { title: string; text: string; media: string };

const READY: Feature[] = [
  { title: "Viajes con flete", text: "Creas el viaje con origen, destino, salida y lo que te pagan.", media: "viajes" },
  { title: "Gastos por categoría", text: "ACPM, peajes, mantenimiento, comida, parqueadero. Cada uno cuando pasa.", media: "gasto" },
  { title: "Ganancia del mes", text: "Fletes menos gastos, mes a mes, y en qué se te fue la plata.", media: "ganancia" },
  { title: "Tus camiones", text: "Placa, marca, modelo, número interno y foto de cada uno.", media: "camiones" },
  { title: "Pruébala sin cuenta", text: "Modo invitado: entras como dueño a una flota de ejemplo. Nada se guarda.", media: "invitado" },
];

const BUILDING: Feature[] = [
  { title: "Panel del conductor", text: "Tu conductor recibe el viaje, avisa salida, llegada y problemas, y manda la foto de entrega.", media: "conductor" },
  { title: "Tu equipo", text: "Invitas a tu conductor con un código y él entra a tu flota.", media: "equipo" },
  { title: "Mapa en vivo", text: "Ves dónde va cada camión, sin llamar a preguntar.", media: "mapa" },
  { title: "Alertas y SOS", text: "Te enteras al momento si tu conductor reporta un problema o pide ayuda.", media: "alertas" },
  { title: "Avisos al celular", text: "Te llega el aviso cuando sale, llega o pasa algo en un viaje.", media: "avisos" },
  { title: "Leer el recibo con una foto", text: "Le tomas foto al recibo y Punto lee el monto, la categoría, la fecha y la placa.", media: "recibo" },
  { title: "Pregúntale a Punto", text: "Le escribes \"¿dónde anoto el ACPM?\" y te lleva a la pantalla.", media: "asistente" },
];

export function Funcionalidades() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // En el celular, cada grupo pasa de lado mientras bajas.
      mm.add(`${MOBILE} and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-track-wrap]", root.current).forEach((wrap) => {
          const track = wrap.querySelector<HTMLElement>("[data-track]");
          if (!track) return;
          const distance = () => track.scrollWidth - wrap.clientWidth;
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "center center",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        });
      });

      // En el computador, las tarjetas entran escalonadas.
      mm.add(`(min-width: 900px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-track]", root.current).forEach((track) => {
          gsap.from(track.children, {
            y: 60, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: track, start: "top 80%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // Los videos de las tarjetas se piden y corren solo mientras se ven (también cuando pasan de lado).
  useEffect(() => {
    const videos = root.current?.querySelectorAll<HTMLVideoElement>("video[data-card-video]") ?? [];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          const video = target as HTMLVideoElement;
          if (isIntersecting) {
            if (!video.getAttribute("src")) video.src = video.dataset.src ?? "";
            video.play().catch(() => {});
          } else video.pause();
        }),
      { threshold: 0.4 },
    );
    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} id="funcionalidades" aria-labelledby="func-titulo" className="relative overflow-hidden bg-page py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="eyebrow">Funcionalidades clave</p>
        <h2 id="func-titulo" className="mt-2 max-w-[18ch] text-[clamp(34px,8.5vw,60px)] font-extrabold">
          Todo lo que va a hacer Punto
        </h2>
        <p className="mt-4 max-w-[46ch] text-lg text-ink-soft">
          Unas ya funcionan. Otras las estoy construyendo y te las muestro tal cual, con su aviso de obra. Ninguna tiene
          fecha: salen cuando estén bien hechas.
        </p>
      </div>

      <Group title="Ya funciona" badge="ok" items={READY} />
      <Group title="En construcción" badge="obra" items={BUILDING} />

      <div className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-[#C6CEDA] px-5 py-4">
          <span className="rounded-md bg-selected px-2 py-1 text-xs font-extrabold tracking-wide text-ink-soft uppercase">Más adelante</span>
          <p className="font-semibold">Android. Por ahora Punto es solo para iPhone.</p>
        </div>
      </div>
    </section>
  );
}

function Group({ title, badge, items }: { title: string; badge: "ok" | "obra"; items: Feature[] }) {
  return (
    <div data-track-wrap className="mt-12 md:mt-16">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 md:px-8">
        {badge === "ok" ? (
          <span className="rounded-md bg-success/12 px-2.5 py-1 text-xs font-extrabold tracking-wide text-success uppercase">{title}</span>
        ) : (
          <span className="obra">{title}</span>
        )}
        <span className="text-sm font-semibold text-ink-soft">{items.length} funciones</span>
      </div>
      <ul
        data-track
        className="mt-5 flex w-max gap-4 px-5 max-md:pr-10 md:mx-auto md:grid md:w-full md:max-w-6xl md:grid-cols-3 md:gap-5 md:px-8"
      >
        {items.map((item) => (
          <Card key={item.title} item={item} ready={badge === "ok"} />
        ))}
      </ul>
    </div>
  );
}

function Card({ item, ready }: { item: Feature; ready: boolean }) {
  return (
    <li className="relative flex w-[78vw] max-w-[340px] flex-col overflow-hidden rounded-[22px] border border-line bg-white md:w-auto md:max-w-none">
      <div className={`relative h-[300px] overflow-hidden ${ready ? "bg-navy" : "bg-[#EEF1F5]"}`}>
        <div className="absolute top-6 left-1/2 w-[52%] -translate-x-1/2 overflow-hidden rounded-[18px] shadow-[0_20px_50px_rgb(0_0_0/0.3)] ring-4 ring-[#05080F]">
          <div className="relative aspect-[1206/2622]">
            {ready ? (
              <video
                data-card-video
                data-src={`/media/${item.media}.mp4`}
                poster={`/media/${item.media}.webp`}
                className="absolute inset-0 size-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
            ) : item.media === "asistente" ? (
              <AsistenteDibujo />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/media/figma-${item.media}.webp`}
                alt={`Diseño de ${item.title}, en construcción`}
                className="absolute inset-0 size-full object-cover object-top"
                loading="lazy"
              />
            )}
          </div>
        </div>
        {!ready && (
          <>
            <div className="obra-tape absolute inset-x-0 bottom-12 -rotate-3" aria-hidden="true" />
            <span className="obra absolute right-4 bottom-4">En construcción</span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold">{item.title}</h3>
        <p className="mt-1.5 text-[15px] text-ink-soft">{item.text}</p>
        <p className={`mt-auto pt-4 text-xs font-extrabold tracking-wide uppercase ${ready ? "text-success" : "text-ink-soft"}`}>
          {ready ? "Ya funciona · video real" : "Así se va a ver · sin fecha"}
        </p>
      </div>
    </li>
  );
}

/** El asistente no tiene pantalla definitiva: se dibuja lo que hará, sin mostrar un diseño que aún no se decidió. */
function AsistenteDibujo() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-white p-3 text-[11px] leading-snug" aria-hidden="true">
      <span className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-blue px-3 py-2 font-semibold text-white">
        ¿Dónde anoto el ACPM?
      </span>
      <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-selected px-3 py-2 text-ink">
        En Nuevo gasto, categoría Combustible. Te llevo.
      </span>
      <span className="mt-1 rounded-full border border-line px-3 py-2 text-ink-soft">Pregúntale a Punto…</span>
    </div>
  );
}
