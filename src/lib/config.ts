// Todo lo que se cambia a mano en un solo lugar: enlaces, llaves públicas y promesas.

export const SITE_URL = "https://puntoappco.com";

/** El proyecto de Supabase de la app. La llave publicable está hecha para ir en páginas y apps: sin las funciones
 * de la lista (`join_waitlist`, `track_waitlist_event`) no deja leer ni cambiar nada. */
export const SUPABASE_URL = "https://htykjbscnjkikhfapyfi.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_P06H817JnJjlDych75POcw_P78JS7x-";

/** La versión de la política de datos que acepta quien se anota (la fecha de /privacidad). */
export const POLICY_VERSION = "2026-11-10";

/** El enlace público de TestFlight. Vacío mientras Apple revisa la app: la página dice que llega por WhatsApp. */
export const TESTFLIGHT_URL = "";

/** La promesa a los primeros de la lista. Tiene que decir lo mismo en la página, los videos y los mensajes. */
export const FREE_MONTHS = 3;

export const CONTACT_EMAIL = "puntoappco.oficial@gmail.com";

export const SOCIAL = {
  youtube: "https://www.youtube.com/@puntoappco",
  facebook: "https://www.facebook.com/puntoappco",
  x: "https://x.com/PuntoAppCo",
} as const;

export const EPISODES = [
  { day: "Día 1", title: "Construyendo Punto en público", url: "https://youtu.be/xV3RiSbWEUQ" },
  { day: "Día 2", title: "Pantallas, servicios y el error con la IA", url: "https://youtu.be/R6OijB_agOw" },
  { day: "Día 3", title: "El servidor de verdad", url: "https://youtu.be/G-Flxzs4Ll4" },
] as const;

export const SHARE_TEXT = `Mira esta app para dueños de camión, la están haciendo en Colombia: ${SITE_URL}/?de=whatsapp`;
export const SHARE_URL = `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`;
