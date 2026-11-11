import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Brand";
import { Pie } from "@/components/Secciones";

export const metadata: Metadata = {
  title: "Política de datos · Punto",
  description: "Cómo Punto trata los datos de las personas que se anotan en su lista de espera, según la Ley 1581 de 2012.",
  alternates: { canonical: "/privacidad/" },
};

export default function Privacidad() {
  return (
    <>
      <header className="on-navy bg-navy text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <Link href="/" aria-label="Punto, inicio"><Logo night className="h-8 w-auto" /></Link>
          <Link href="/#lista" className="rounded-[10px] border border-white/30 px-4 py-2.5 text-[15px] font-bold text-white no-underline hover:bg-white/10">Anótate</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 pt-10 pb-20">

    <h1 className="text-[clamp(32px,8vw,44px)] font-extrabold">Política de tratamiento de datos personales</h1>
    <p className="mt-2.5 text-[15px] text-ink-soft">Lista de espera de Punto · Vigente desde el 10 de noviembre de 2026 · Versión 2026-11-10</p>

    <div className="mt-7 rounded-2xl border border-line bg-white p-5">
      <h2 className="text-[22px] font-extrabold">En corto</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-[#2C3747]">
        <li>Guardo tu nombre, tu WhatsApp, cuántos camiones tienes y, si la escribes, tu ciudad.</li>
        <li>Los uso solo para avisarte cuando Punto salga, darte los meses gratis y contarte cómo va.</li>
        <li>No se los paso ni se los vendo a nadie.</li>
        <li>Puedes pedir que los cambie o los borre cuando quieras: escribe a <a className="font-semibold text-blue" href="mailto:puntoappco.oficial@gmail.com">puntoappco.oficial@gmail.com</a>.</li>
      </ul>
    </div>

    <h2 className="mt-9 text-[22px] font-extrabold">1. Quién es el responsable</h2>
    <p className="mt-3 text-[#2C3747]">El responsable del tratamiento de tus datos es Sebastián García, persona natural, en Colombia, creador de Punto, una app para dueños de camión que todavía está en construcción. Para cualquier asunto sobre tus datos: <a className="font-semibold text-blue" href="mailto:puntoappco.oficial@gmail.com">puntoappco.oficial@gmail.com</a>.</p>

    <h2 className="mt-9 text-[22px] font-extrabold">2. Qué datos guardo</h2>
    <p className="mt-3 text-[#2C3747]">Cuando te anotas en la lista de espera en puntoappco.com guardo:</p>
    <ul className="mt-2 list-disc space-y-2 pl-5 text-[#2C3747]">
      <li>Tu nombre.</li>
      <li>Tu número de WhatsApp.</li>
      <li>Cuántos camiones tienes (1, de 2 a 5, o más de 5).</li>
      <li>Tu ciudad o departamento, solo si lo escribes.</li>
      <li>Desde qué red llegaste a la página (por ejemplo, Facebook o YouTube), si el enlace lo dice.</li>
      <li>La fecha y la hora en que te anotaste y en que diste tu autorización, y la versión de esta política que aceptaste.</li>
    </ul>
    <p className="mt-3 text-[#2C3747]">No pido datos sensibles, ni datos de pago, ni datos de menores de edad. La lista es para personas mayores de 18 años.</p>
    <p className="mt-3 text-[#2C3747]">Si respondes que no tienes iPhone, no guardo ningún dato tuyo: solo sumo uno a un conteo, sin saber quién eres. Las visitas a la página también se cuentan así: cuántas hubo, de qué red llegaron y cuándo, sin guardar nada que diga quién eres. La página no usa cookies de publicidad ni de seguimiento.</p>

    <h2 className="mt-9 text-[22px] font-extrabold">3. Para qué los uso</h2>
    <ul className="mt-2 list-disc space-y-2 pl-5 text-[#2C3747]">
      <li>Mandarte por WhatsApp el enlace para probar Punto con TestFlight.</li>
        <li>Avisarte por WhatsApp cuando Punto se pueda descargar.</li>
      <li>Darte los 3 meses gratis que se prometen a los primeros de la lista.</li>
      <li>Saludarte y mandarte un avance de cómo va Punto, más o menos cada dos semanas, por una lista de difusión (nunca en un grupo donde otros vean tu número).</li>
      <li>Invitarte, si quieres, a una conversación corta sobre cómo llevas hoy tus cuentas. Es voluntaria y puedes decir que no.</li>
      <li>Saber, en números generales y sin nombres, cuántas personas se anotan, cuántos camiones tienen y de qué red llegan.</li>
    </ul>
    <p className="mt-3 text-[#2C3747]">No uso tus datos para nada distinto sin pedirte una nueva autorización.</p>

    <h2 className="mt-9 text-[22px] font-extrabold">Si pruebas Punto con TestFlight</h2>
    <p className="mt-3 text-[#2C3747]">TestFlight es el servicio de Apple para probar apps antes de que salgan. Al aceptar la invitación, Apple maneja tu instalación según sus propias reglas y puede compartir conmigo datos de la prueba: por ejemplo, el modelo de tu iPhone, si la app se cerró sola y los comentarios que mandes. Si dentro de la app de prueba creas una cuenta, esos datos se guardan para que la app funcione; si entras sin cuenta (modo invitado), no se guarda nada.</p>

    <h2 className="mt-9 text-[22px] font-extrabold">4. Con quién los comparto</h2>
    <p className="mt-3 text-[#2C3747]">Con nadie. No los vendo, no los presto y no los uso para publicidad de otros. Se guardan en Supabase, el servicio de base de datos en la nube donde funciona Punto, que puede tener sus servidores fuera de Colombia. Supabase solo los guarda; no los usa para nada propio.</p>

    <h2 className="mt-9 text-[22px] font-extrabold">5. Cuánto tiempo los guardo</h2>
    <p className="mt-3 text-[#2C3747]">Mientras exista la lista de espera y hasta que Punto salga y se cumplan los meses gratis. Si pides que los borre, los borro antes. Si Punto no llega a salir, borro la lista.</p>

    <h2 className="mt-9 text-[22px] font-extrabold">6. Tus derechos</h2>
    <p className="mt-3 text-[#2C3747]">Según la Ley 1581 de 2012, tienes derecho a:</p>
    <ul className="mt-2 list-disc space-y-2 pl-5 text-[#2C3747]">
      <li>Saber qué datos tuyos tengo y cómo los uso.</li>
      <li>Corregirlos o actualizarlos.</li>
      <li>Pedir prueba de la autorización que diste.</li>
      <li>Retirar tu autorización y pedir que los borre, cuando quieras.</li>
      <li>Presentar una queja ante la Superintendencia de Industria y Comercio si crees que no se respetan tus derechos, después de haber escrito primero aquí.</li>
      <li>Consultarlos gratis.</li>
    </ul>

    <h2 className="mt-9 text-[22px] font-extrabold">7. Cómo pedir algo</h2>
    <p className="mt-3 text-[#2C3747]">Escribe a <a className="font-semibold text-blue" href="mailto:puntoappco.oficial@gmail.com">puntoappco.oficial@gmail.com</a> con tu nombre, el número de WhatsApp con el que te anotaste y lo que necesitas.</p>
    <ul className="mt-2 list-disc space-y-2 pl-5 text-[#2C3747]">
      <li>Si es una consulta (qué datos tengo, cómo los uso), te respondo en máximo 10 días hábiles. Si no alcanzo, te aviso el motivo y te respondo en máximo 5 días hábiles más.</li>
      <li>Si es un reclamo (corregir, borrar o retirar tu autorización), te respondo en máximo 15 días hábiles. Si no alcanzo, te aviso el motivo y te respondo en máximo 8 días hábiles más.</li>
    </ul>

    <h2 className="mt-9 text-[22px] font-extrabold">8. Seguridad</h2>
    <p className="mt-3 text-[#2C3747]">La lista no se puede leer desde la página ni desde internet: solo yo la veo, con mi cuenta. Cada persona solo puede agregar sus propios datos.</p>

    <h2 className="mt-9 text-[22px] font-extrabold">9. Cambios a esta política</h2>
    <p className="mt-3 text-[#2C3747]">Si cambio algo importante, lo publico en esta misma página con una nueva fecha y, si el cambio afecta para qué uso tus datos, te pido otra vez tu autorización.</p>

        <Link href="/" className="mt-10 inline-flex min-h-11 items-center rounded-[10px] border border-line px-5 font-bold text-ink no-underline hover:bg-selected">Volver a Punto</Link>
      </main>
      <Pie />
    </>
  );
}
