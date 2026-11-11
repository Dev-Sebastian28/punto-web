// La lista de espera en Supabase. La página solo llama dos funciones del servidor: no puede leer la lista.
import { POLICY_VERSION, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./config";

export type FleetSize = "one" | "two_to_five" | "more_than_five";
export type WaitlistEvent = "visit" | "no_iphone" | "testflight";

export type SignUp = {
  name: string;
  /** Los 10 dígitos del celular colombiano, sin el 57. */
  whatsapp: string;
  fleetSize: FleetSize;
  city: string;
  consent: boolean;
  /** La trampa invisible: la gente la deja vacía, los robots la llenan. */
  trap: string;
};

export class WaitlistError extends Error {
  /** El mensaje fijo del servidor (`invalid_whatsapp`, `consent_required`) o vacío si fue otra cosa. */
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

async function rpc(name: string, body: Record<string, unknown>): Promise<void> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });
  if (!response.ok) {
    let code = "";
    try {
      code = ((await response.json()) as { message?: string }).message ?? "";
    } catch {
      // Sin detalle: queda como error general.
    }
    throw new WaitlistError(code, code || `HTTP ${response.status}`);
  }
}

export function joinWaitlist(signUp: SignUp, source: string): Promise<void> {
  return rpc("join_waitlist", {
    p_name: signUp.name,
    p_whatsapp: `57${signUp.whatsapp}`,
    p_fleet_size: signUp.fleetSize,
    p_city: signUp.city || null,
    p_source: source || null,
    p_policy_version: POLICY_VERSION,
    p_consent: signUp.consent,
    p_website: signUp.trap || null,
  });
}

// MARK: - Guardado en el navegador (puede no estar: modo privado, bloqueos)

function store(kind: "localStorage" | "sessionStorage"): Storage | null {
  try {
    const s = window[kind];
    s.setItem("__punto", "1");
    s.removeItem("__punto");
    return s;
  } catch {
    return null;
  }
}

export function remember(kind: "localStorage" | "sessionStorage", key: string, value: string | null) {
  try {
    const s = store(kind);
    if (!s) return;
    if (value === null) s.removeItem(key);
    else s.setItem(key, value);
  } catch {
    // Sin guardar: la página funciona igual.
  }
}

export function recall(kind: "localStorage" | "sessionStorage", key: string): string | null {
  try {
    return store(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

// MARK: - De dónde llega (?de=facebook)

export function cleanSource(value: string | null | undefined): string {
  return (value ?? "").toLowerCase().trim().replace(/[^a-z0-9_-]/g, "").slice(0, 30);
}

/** La red del enlace (`?de=`), guardada para toda la visita aunque la persona navegue. */
export function currentSource(): string {
  if (typeof window === "undefined") return "";
  const fromLink = cleanSource(new URLSearchParams(window.location.search).get("de"));
  if (fromLink) {
    remember("sessionStorage", "punto.de", fromLink);
    return fromLink;
  }
  return recall("sessionStorage", "punto.de") ?? "";
}

/** Cuenta algo sin saber quién (una vez por visita). Las pruebas en el computador no cuentan. */
export function track(kind: WaitlistEvent) {
  if (typeof window === "undefined") return;
  if (!/(^|\.)puntoappco\.com$|github\.io$/.test(window.location.hostname)) return;
  const key = `punto.contado.${kind}`;
  if (recall("sessionStorage", key)) return;
  remember("sessionStorage", key, "1");
  rpc("track_waitlist_event", { p_kind: kind, p_source: currentSource() || null }).catch(() => {});
}

// MARK: - El número de WhatsApp

/** Los 10 dígitos, aunque escriban +57, espacios o guiones. */
export function whatsappDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("57")) digits = digits.slice(2);
  return digits.slice(0, 10);
}

/** 3001234567 → 300 123 4567 */
export function formatWhatsapp(value: string): string {
  const d = whatsappDigits(value);
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6, 10)].filter(Boolean).join(" ");
}

export const isColombianMobile = (digits: string) => /^3\d{9}$/.test(digits);
