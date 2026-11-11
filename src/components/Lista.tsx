"use client";
// Anótate y pruébala: ¿tienes iPhone? → tus datos → listo, con el botón de TestFlight y el de pasárselo a otro.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FREE_MONTHS, SHARE_URL, TESTFLIGHT_URL } from "@/lib/config";
import { gsap, MOTION_OK, useGSAP } from "@/lib/motion";
import {
  currentSource,
  formatWhatsapp,
  isColombianMobile,
  joinWaitlist,
  recall,
  remember,
  track,
  whatsappDigits,
  WaitlistError,
  type FleetSize,
} from "@/lib/waitlist";
import { Icon, RouteMark } from "./Brand";

type Step = "iphone" | "form" | "done" | "no-iphone";
type Field = "name" | "whatsapp" | "fleet" | "consent";

const STEPS = [
  { title: "Te anotas", text: "Treinta segundos, aquí abajo." },
  { title: "Instalas TestFlight", text: "La app de Apple para probar apps antes de que salgan." },
  { title: "Abres Punto", text: "Sin cuenta, con una flota de ejemplo, o con la tuya." },
];

const FLEET_OPTIONS: { value: FleetSize; label: string }[] = [
  { value: "one", label: "1" },
  { value: "two_to_five", label: "De 2 a 5" },
  { value: "more_than_five", label: "Más de 5" },
];

export function Lista() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("iphone");
  const [firstName, setFirstName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const shownAt = useRef(0);

  // Quien ya se anotó en este navegador ve que ya está en la lista.
  useEffect(() => {
    const saved = recall("localStorage", "punto.anotado");
    if (!saved) return;
    const frame = requestAnimationFrame(() => {
      setFirstName(saved);
      setStep("done");
      document.body.dataset.signedUp = "1";
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-step-point]", {
          scale: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2)",
          scrollTrigger: { trigger: "[data-steps]", start: "top 80%" },
        });
        gsap.from("[data-form-card]", {
          y: 80, rotate: 2, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: "[data-form-card]", start: "top 90%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  function go(next: Step) {
    setStep(next);
    if (next === "form") shownAt.current = Date.now();
    requestAnimationFrame(() => {
      const target = card.current?.querySelector<HTMLElement>(next === "form" ? "#nombre" : "[data-outcome]");
      target?.focus({ preventScroll: true });
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("nombre") ?? "").trim().replace(/\s+/g, " ");
    const digits = whatsappDigits(whatsapp);
    const fleet = String(data.get("camiones") ?? "") as FleetSize | "";
    const city = String(data.get("ciudad") ?? "").trim().replace(/\s+/g, " ");
    const consent = data.get("autorizo") === "si";
    const trap = String(data.get("website") ?? "");

    const found: Partial<Record<Field, string>> = {};
    if (name.length < 2) found.name = "Escribe tu nombre.";
    if (!isColombianMobile(digits)) found.whatsapp = "Revisa el número: son 10 dígitos y empieza por 3.";
    if (!fleet) found.fleet = "Elige cuántos camiones tienes.";
    if (!consent) found.consent = "Para anotarte necesito tu autorización.";
    setErrors(found);
    setFormError("");
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      card.current?.querySelector<HTMLElement>(`[data-field="${first}"] input`)?.focus();
      return;
    }

    setSending(true);
    try {
      // La trampa también atrapa a quien lo envía todo en menos de un segundo y medio: ninguna persona alcanza.
      const tooFast = Date.now() - shownAt.current < 1500;
      await joinWaitlist(
        { name, whatsapp: digits, fleetSize: fleet as FleetSize, city, consent, trap: trap || (tooFast ? "rapido" : "") },
        currentSource(),
      );
      const short = name.split(" ")[0];
      remember("localStorage", "punto.anotado", short);
      setFirstName(short);
      document.body.dataset.signedUp = "1";
      go("done");
    } catch (error) {
      const code = error instanceof WaitlistError ? error.code : "";
      if (code === "invalid_whatsapp") setErrors({ whatsapp: "Revisa el número: son 10 dígitos y empieza por 3." });
      else if (code === "consent_required") setErrors({ consent: "Para anotarte necesito tu autorización." });
      else
        setFormError(
          typeof navigator !== "undefined" && navigator.onLine === false
            ? "Sin conexión. Revisa tu internet e intenta de nuevo."
            : "No se pudo guardar. Intenta de nuevo en un momento.",
        );
    } finally {
      setSending(false);
    }
  }

  const clear = (field: Field) => setErrors((e) => ({ ...e, [field]: undefined }));

  return (
    <section ref={root} id="lista-seccion" aria-labelledby="lista-titulo" className="on-navy relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 text-blue-night opacity-[0.12]" aria-hidden="true">
        <RouteMark className="absolute -bottom-10 -left-28 w-80" />
        <RouteMark className="absolute top-8 -right-20 w-60 -scale-x-100" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div>
          <p className="eyebrow">Lista de espera · TestFlight</p>
          <h2 id="lista-titulo" className="mt-2 text-[clamp(36px,9vw,60px)] font-extrabold">
            Anótate y pruébala
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg text-on-navy-soft">
            Probarla es gratis. Cuando Punto salga, los primeros de la lista tienen{" "}
            <b className="text-plate">{FREE_MONTHS} meses gratis</b>.
          </p>

          <ol data-steps className="relative mt-10 space-y-7">
            <span className="absolute top-3 bottom-6 left-[15px] w-1.5 rounded-full bg-route-night/90" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative pl-14">
                <span
                  data-step-point
                  className={`absolute top-0 left-0 grid size-9 place-items-center rounded-full ${
                    i === STEPS.length - 1 ? "border-[6px] border-logo-night bg-white" : "bg-logo-night"
                  }`}
                  aria-hidden="true"
                >
                  {i < STEPS.length - 1 && <span className="size-3 rounded-full bg-white" />}
                </span>
                <h3 className="pt-1 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-0.5 text-on-navy-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div ref={card} id="lista" data-form-card className="scroll-mt-6 self-start rounded-[24px] bg-white p-6 text-ink shadow-[0_40px_100px_rgb(0_0_0/0.4)] md:p-8">
          {(step === "iphone" || step === "form") && (
            <>
              <h3 className="text-2xl font-extrabold">Anótate en la lista</h3>
              <p className="mt-1 text-[15px] text-ink-soft">Para iPhone · {FREE_MONTHS} meses gratis para los primeros</p>
              <div className="mt-6">
                <p id="iphone-q" className="mb-2 text-[15px] font-bold">¿Tienes iPhone?</p>
                <div className="grid grid-cols-2 gap-2.5" role="group" aria-labelledby="iphone-q">
                  <button type="button" className="choice" aria-pressed={step === "form"} onClick={() => go("form")}>
                    <Icon.IPhone className="size-[18px]" /> Sí, tengo
                  </button>
                  <button
                    type="button"
                    className="choice"
                    aria-pressed={false}
                    onClick={() => {
                      track("no_iphone");
                      go("no-iphone");
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}

          {step === "form" && (
            <form noValidate onSubmit={submit} className="mt-2">
              <Row field="name" error={errors.name}>
                <label htmlFor="nombre" className="mb-2 block text-[15px] font-bold">Tu nombre</label>
                <input id="nombre" name="nombre" className="input" type="text" autoComplete="name" autoCapitalize="words" maxLength={60}
                  placeholder="Ej.: Carlos Pérez" aria-invalid={!!errors.name} onInput={() => clear("name")} />
              </Row>

              <Row field="whatsapp" error={errors.whatsapp}>
                <label htmlFor="whatsapp" className="mb-2 block text-[15px] font-bold">Tu WhatsApp</label>
                <div className="flex">
                  <span className="grid place-items-center rounded-l-[8px] border-[1.5px] border-r-0 border-[#C9D1DC] bg-page px-3 font-bold tabular-nums" aria-hidden="true">+57</span>
                  <input id="whatsapp" name="whatsapp" className="input rounded-l-none tabular-nums" type="tel" inputMode="numeric"
                    autoComplete="tel-national" maxLength={14} placeholder="300 123 4567" aria-describedby="whatsapp-ayuda"
                    aria-invalid={!!errors.whatsapp} value={whatsapp}
                    onChange={(e) => { setWhatsapp(formatWhatsapp(e.target.value)); clear("whatsapp"); }} />
                </div>
                <p id="whatsapp-ayuda" className="mt-1.5 text-[13px] text-ink-soft">Para mandarte el enlace de TestFlight y avisarte cuando salga.</p>
              </Row>

              <fieldset data-field="fleet" className="mt-5">
                <legend className="mb-2 text-[15px] font-bold">¿Cuántos camiones tienes?</legend>
                <div className="grid grid-cols-3 gap-2">
                  {FLEET_OPTIONS.map((o) => (
                    <label key={o.value} className="relative">
                      <input type="radio" name="camiones" value={o.value} className="peer absolute inset-0 cursor-pointer opacity-0" onChange={() => clear("fleet")} />
                      <span className={`choice ${errors.fleet ? "border-danger/50" : ""}`}>{o.label}</span>
                    </label>
                  ))}
                </div>
                {errors.fleet && <p className="mt-1.5 text-sm font-semibold text-danger">{errors.fleet}</p>}
              </fieldset>

              <Row field="city">
                <label htmlFor="ciudad" className="mb-2 block text-[15px] font-bold">
                  ¿Dónde trabajas? <span className="font-medium text-ink-soft">(opcional)</span>
                </label>
                <input id="ciudad" name="ciudad" className="input" type="text" autoComplete="address-level2" maxLength={80} placeholder="Ciudad o departamento" />
              </Row>

              {/* La trampa: invisible para la gente, visible para los robots que leen el código. */}
              <div className="absolute -left-[10000px] size-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Deja este campo vacío</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div data-field="consent" className="mt-6">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
                  <input type="checkbox" name="autorizo" value="si" className="mt-0.5 size-6 flex-none cursor-pointer accent-blue"
                    aria-invalid={!!errors.consent} onChange={() => clear("consent")} />
                  <span>
                    Autorizo a Punto a guardar mis datos para mandarme el enlace de prueba, avisarme del lanzamiento y escribirme por
                    WhatsApp, según la{" "}
                    <a href="/privacidad/" target="_blank" rel="noopener" className="font-bold text-blue">política de datos</a>.
                  </span>
                </label>
                {errors.consent && <p className="mt-1.5 text-sm font-semibold text-danger">{errors.consent}</p>}
              </div>

              <button type="submit" className="btn-plate mt-6 w-full" disabled={sending}>
                {sending ? "Guardando…" : "Anotarme y probarla"}
              </button>
              {formError && <p role="alert" className="mt-3 rounded-lg bg-danger/8 px-4 py-3 text-[15px] font-semibold text-danger">{formError}</p>}
              <p className="mt-3 text-center text-[13px] text-ink-soft">No pedimos plata ni tarjeta. Puedes salirte cuando quieras.</p>
            </form>
          )}

          {step === "done" && (
            <div data-outcome tabIndex={-1} className="outline-none">
              <Icon.Check className="size-14" />
              <h3 className="mt-4 text-2xl font-extrabold">{firstName ? `¡Listo, ${firstName}! Ya estás en la lista.` : "¡Listo! Ya estás en la lista."}</h3>
              {TESTFLIGHT_URL ? (
                <>
                  <p className="mt-2 text-ink-soft">Ahora pruébala. Necesitas un iPhone con iOS 27: primero se instala TestFlight y desde ahí, Punto.</p>
                  <a href={TESTFLIGHT_URL} target="_blank" rel="noopener" className="btn-testflight mt-5" onClick={() => track("testflight")}>
                    <Icon.Download /> Abrir en TestFlight
                  </a>
                </>
              ) : (
                <p className="mt-2 text-ink-soft">
                  Apple está revisando la versión de prueba. Apenas la apruebe, te mando el enlace de TestFlight por WhatsApp.
                </p>
              )}
              <p className="mt-3 text-ink-soft">Cuando Punto salga, tienes <b className="text-ink">{FREE_MONTHS} meses gratis</b>.</p>
              <Share />
              <button type="button" className="mt-4 text-sm text-blue underline underline-offset-4"
                onClick={() => { remember("localStorage", "punto.anotado", null); delete document.body.dataset.signedUp; setWhatsapp(""); go("form"); }}>
                Anotar a otra persona
              </button>
            </div>
          )}

          {step === "no-iphone" && (
            <div data-outcome tabIndex={-1} className="outline-none">
              <h3 className="text-2xl font-extrabold">Por ahora Punto es solo para iPhone</h3>
              <p className="mt-2 text-ink-soft">
                Gracias por el interés. No guardo ningún dato tuyo: solo cuento cuántas personas sin iPhone llegan, y eso me ayuda a
                decidir qué sigue.
              </p>
              <Share label="¿Conoces a un dueño con iPhone?" />
              <button type="button" className="mt-4 text-sm text-blue underline underline-offset-4" onClick={() => go("form")}>
                Me equivoqué, sí tengo iPhone
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ field, error, children }: { field: Field | "city"; error?: string; children: React.ReactNode }) {
  return (
    <div data-field={field} className="mt-5">
      {children}
      {error && <p className="mt-1.5 text-sm font-semibold text-danger">{error}</p>}
    </div>
  );
}

function Share({ label = "¿Conoces a otro dueño con iPhone?" }: { label?: string }) {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <p className="mb-3 font-bold">{label}</p>
      <a href={SHARE_URL} target="_blank" rel="noopener" className="btn-whatsapp">
        <Icon.WhatsApp /> Pásaselo por WhatsApp
      </a>
    </div>
  );
}
