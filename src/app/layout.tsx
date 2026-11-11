import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

// Plus Jakarta Sans, la letra de la marca (Punto Marca/Fuente), solo con los caracteres del español.
const jakarta = localFont({
  src: "../fonts/plus-jakarta-sans.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const description =
  "Punto es la app para dueños de camión en Colombia: anotas tus fletes y tus gastos, y te dice cuánto te quedó. Para iPhone. Anótate y pruébala en TestFlight: los primeros tienen 3 meses gratis.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Punto · ¿Cuánto te quedó este mes?",
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/img/favicon.svg", type: "image/svg+xml" },
      { url: "/img/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/img/icono-180.png",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Punto",
    url: "/",
    title: "¿Cuánto te quedó este mes? · Punto",
    description: "La app para dueños de camión en Colombia. Para iPhone. Anótate y pruébala: los primeros tienen 3 meses gratis.",
    images: [{ url: "/img/compartir.png", width: 1200, height: 630, alt: "Punto: ¿Cuánto te quedó este mes? Anótate y pruébala en tu iPhone." }],
  },
  twitter: { card: "summary_large_image", site: "@PuntoAppCo" },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* Marca que hay JavaScript para esconder lo que entra animado, sin parpadeo. Si el resto no carga, a los
            2,5 segundos se muestra todo igual. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('ready')},2500)",
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
