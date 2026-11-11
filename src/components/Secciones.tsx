// Las secciones quietas del final: la serie, las preguntas y el pie.
import { CONTACT_EMAIL, EPISODES, FREE_MONTHS, SOCIAL } from "@/lib/config";
import { Icon, Logo, LogoMark } from "./Brand";

export function Serie() {
  return (
    <section aria-labelledby="serie" className="bg-page py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div data-reveal>
          <p className="eyebrow">Quién la hace</p>
          <h2 id="serie" className="mt-2 text-[clamp(34px,8.5vw,56px)] font-extrabold">Construida en público</h2>
          <div className="mt-6 flex items-center gap-4">
            <span className="grid size-16 flex-none place-items-center rounded-full bg-navy">
              <LogoMark night className="size-11" />
            </span>
            <blockquote className="text-xl leading-snug font-semibold">
              “Soy Sebastián y estoy construyendo Punto en público: cada semana muestro lo que avancé y lo que salió mal.”
            </blockquote>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <SocialLink href={SOCIAL.youtube} icon={<Icon.YouTube />} label="YouTube" />
            <SocialLink href={SOCIAL.facebook} icon={<Icon.Facebook />} label="Facebook" />
            <SocialLink href={SOCIAL.x} icon={<Icon.X />} label="X" />
          </div>
        </div>
        <ul data-reveal className="grid content-start gap-3" aria-label="La serie en YouTube">
          {EPISODES.map((e) => (
            <li key={e.day}>
              <a href={e.url} target="_blank" rel="noopener"
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 text-ink no-underline transition-colors hover:border-blue">
                <span className="plate">{e.day}</span>
                <span className="font-bold leading-snug">{e.title}</span>
                <Icon.Play className="ml-auto size-8 flex-none" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-[15px] font-bold text-ink no-underline hover:border-blue">
      {icon}
      {label}
    </a>
  );
}

const QUESTIONS = [
  {
    q: "¿Cuándo sale?",
    a: "Cuando esté lista de verdad. No te voy a dar una fecha para quedarte mal. Mientras tanto, la puedes probar con TestFlight y te aviso por WhatsApp el día que salga.",
  },
  {
    q: "¿Qué es TestFlight? ¿Es seguro?",
    a: "Es la app de Apple para probar apps antes de que lleguen a la App Store. Es gratis, la descargas de la App Store y Apple revisa cada versión antes de dejarla probar. Al ser de prueba, puede tener errores: si encuentras uno, cuéntamelo.",
  },
  {
    q: "¿Qué iPhone necesito?",
    a: "Uno con iOS 27. Lo ves en Ajustes › General › Información. Si el tuyo no lo tiene, anótate igual: te aviso cuando sirva en más iPhones.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: `Probarla es gratis. Todavía no tiene precio: los de la lista tienen ${FREE_MONTHS} meses gratis cuando salga, y el precio lo cuento antes.`,
  },
  {
    q: "¿Sirve si tengo un solo camión?",
    a: "Sí. Está pensada sobre todo para el dueño que tiene uno y muchas veces lo maneja él mismo. Si tienes varios, también: llevas cada camión con sus viajes.",
  },
  { q: "¿Y para Android?", a: "Por ahora es solo para iPhone. Si no tienes iPhone, dilo en el formulario: no guardo tus datos, pero sí cuento cuántos son, y eso me ayuda a decidir qué sigue." },
  {
    q: "¿Qué hacen con mis datos?",
    a: `Solo los uso para mandarte el enlace de prueba y avisarte de Punto. No se los paso ni se los vendo a nadie, y puedes pedir que los borre cuando quieras escribiendo a ${CONTACT_EMAIL}.`,
  },
];

export function Preguntas() {
  return (
    <section aria-labelledby="preguntas" className="bg-page pb-24 md:pb-32">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-8">
        <div data-reveal>
          <p className="eyebrow">Preguntas</p>
          <h2 id="preguntas" className="mt-2 text-[clamp(34px,8.5vw,56px)] font-extrabold">Lo que todos preguntan</h2>
        </div>
        <div data-reveal className="border-t border-line">
          {QUESTIONS.map(({ q, a }) => (
            <details key={q} className="group border-b border-line">
              <summary className="relative flex min-h-11 cursor-pointer list-none items-center py-5 pr-10 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <span className="absolute top-1/2 right-2 size-3 -translate-y-3/4 rotate-45 border-r-[2.5px] border-b-[2.5px] border-blue transition-transform group-open:-translate-y-1/4 group-open:-rotate-135" aria-hidden="true" />
              </summary>
              <p className="max-w-[60ch] pb-5 text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pie() {
  return (
    <footer className="on-navy bg-navy pt-12 pb-[calc(110px+env(safe-area-inset-bottom))] text-white md:pb-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <a href="#arriba" aria-label="Volver arriba"><Logo night className="h-8 w-auto" /></a>
        <p className="mt-4 text-lg font-bold">Tu flota, de punto a punto.</p>
        <p className="mt-1 text-[15px] text-on-navy-soft">Hecha en Colombia para los dueños de camión.</p>
        <nav aria-label="Enlaces" className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
          {[
            ["Política de datos", "/privacidad/"],
            ["YouTube", SOCIAL.youtube],
            ["Facebook", SOCIAL.facebook],
            ["X", SOCIAL.x],
            [CONTACT_EMAIL, `mailto:${CONTACT_EMAIL}`],
          ].map(([label, href]) => (
            <a key={label} href={href} className="inline-flex min-h-11 items-center text-[15px] font-semibold text-white"
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
              {label}
            </a>
          ))}
        </nav>
        <p className="mt-4 text-[13px] text-on-navy-soft">© 2026 Punto · Sebastián García · Colombia. iPhone y TestFlight son marcas de Apple Inc.</p>
      </div>
    </footer>
  );
}
