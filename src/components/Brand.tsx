// Piezas de marca que se repiten: el celular, el logo, la ruta del logo y los íconos.
import type { CSSProperties, ReactNode } from "react";

/** Un iPhone dibujado con CSS (sin imagen), con la pantalla que se le pase: captura o video real de la app. */
export function Phone({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`phone relative [container-type:inline-size] ${className}`} style={style}>
      <div
        className="relative rounded-[16.5cqw] bg-[#05080F] p-[3.4cqw] shadow-[0_0_0_1.5px_#3A4A63,0_0_0_4px_#0B1220,0_40px_90px_rgb(0_0_0/0.45)]"
      >
        <div className="relative aspect-[1206/2622] overflow-hidden rounded-[13.4cqw] bg-white">
          {children}
          <span className="pointer-events-none absolute top-[3cqw] left-1/2 h-[9cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

/** La ruta del logo (punto de salida, curva, punto de llegada), para dibujar de fondo. */
export function RouteMark({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 254 254" className={className} style={style} aria-hidden="true">
      <path
        d="M63.5 63.5V142.875C63.5 155.506 68.518 167.62 77.449 176.551C86.38 185.482 98.494 190.5 111.125 190.5H190.5"
        fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="63.5" cy="63.5" r="26" fill="currentColor" />
      <circle cx="190.5" cy="190.5" r="14" fill="none" stroke="currentColor" strokeWidth="8" />
    </svg>
  );
}

/** El logo de Punto como dibujo (los vectores de Figma, "Punto-Vistas" nodo 19:1829). */
export function LogoMark({ night = false, className = "" }: { night?: boolean; className?: string }) {
  const route = night ? "#DDE6F3" : "#0B1F3A";
  const dot = night ? "#2B7BEF" : "#0057CC";
  return (
    <svg viewBox="0 0 254 254" className={className} aria-hidden="true">
      <path
        d="M63.5 63.5V142.875C63.5 155.506 68.518 167.62 77.449 176.551C86.38 185.482 98.494 190.5 111.125 190.5H190.5"
        fill="none" stroke={route} strokeWidth="23.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="63.5" cy="63.5" r="35.7" fill={dot} />
      <circle cx="63.5" cy="63.5" r="11.9" fill="#fff" />
      <circle cx="190.5" cy="190.5" r="13.9" fill="#fff" stroke={dot} strokeWidth="7.9" />
    </svg>
  );
}

/** El logo horizontal oficial (los PNG de Punto Marca). */
export function Logo({ night = false, className = "h-8 w-auto" }: { night?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={night ? "/img/logo-fondo-oscuro.png" : "/img/logo-color.png"}
      alt="Punto"
      width={360}
      height={127}
      className={className}
    />
  );
}

type IconProps = { className?: string };

export const Icon = {
  Check: ({ className = "size-6" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#248A3D" />
      <path d="M7 12.4l3.2 3.1L17 8.8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  CheckPlate: ({ className = "size-6" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FFC928" />
      <path d="M7 12.4l3.2 3.1L17 8.8" fill="none" stroke="#0B1F3A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  IPhone: ({ className = "size-4" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="4.4" width="4" height="1.6" rx=".8" fill="currentColor" />
    </svg>
  ),
  WhatsApp: ({ className = "size-5" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.56 2 2.1 6.45 2.1 11.93c0 1.75.46 3.46 1.33 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.47 0 9.93-4.45 9.93-9.93A9.86 9.86 0 0 0 12.04 2Zm0 18.15h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.55 3.71-8.25 8.27-8.25a8.2 8.2 0 0 1 5.84 2.42 8.2 8.2 0 0 1 2.42 5.84c0 4.55-3.71 8.21-8.27 8.21Zm4.53-6.18c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"
      />
    </svg>
  ),
  YouTube: ({ className = "size-5" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#FF0033" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12c0 1.6.2 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.3-1.6.5-3.2.5-4.8s-.2-3.2-.5-4.8Z" />
      <path fill="#fff" d="M9.75 15.3V8.7L15.5 12z" />
    </svg>
  ),
  X: ({ className = "size-5" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.57l11.1 14.43Z" />
    </svg>
  ),
  Facebook: ({ className = "size-5" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#0866FF" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12Z" />
    </svg>
  ),
  Play: ({ className = "size-8" }: IconProps) => (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#0B1F3A" />
      <path d="M13 10.5v11l9-5.5z" fill="#fff" />
    </svg>
  ),
  Download: ({ className = "size-5" }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3v12m0 0l-5-5m5 5l5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};
