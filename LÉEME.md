# La web de Punto (puntoappco.com)

La página donde los dueños de camión se anotan en la lista de espera y, al anotarse, reciben el enlace para probar Punto con TestFlight.

## Estado (11 de noviembre de 2026)

- **La web está publicada en puntoappco.com** (y www.puntoappco.com lleva ahí). Probada en celular y computador, y con una inscripción real desde la página publicada, que después se borró.
- **La lista en Supabase ya existe** (creada el 11 de noviembre con `supabase/20261110120000_waitlist.sql`). Se probó: anotarse funciona, el mismo número no se repite, la trampa descarta robots y desde afuera no se puede leer ni escribir la lista. Las pruebas se borraron: arrancó en cero.
- **TestFlight todavía no tiene enlace.** Mientras tanto, quien se anota lee "Te mando el enlace por WhatsApp apenas Apple lo apruebe". Cuando exista, va en `src/lib/config.ts`, en `TESTFLIGHT_URL`.

## Qué hay en cada parte

| Parte de la página | Archivo |
| --- | --- |
| Portada ("¿Cuánto te quedó este mes?") | `src/components/Hero.tsx` |
| La cuenta (12 millones que bajan a 2) | `src/components/LaCuenta.tsx` |
| Cuaderno, chat y memoria → un solo lugar | `src/components/UnSoloLugar.tsx` |
| La app por dentro (videos reales) | `src/components/Recorrido.tsx` |
| Funcionalidades clave (ya funciona / en construcción) | `src/components/Funcionalidades.tsx` |
| Anótate y pruébala (formulario y TestFlight) | `src/components/Lista.tsx` |
| Construida en público, preguntas y pie | `src/components/Secciones.tsx` |
| Política de datos | `src/app/privacidad/page.tsx` |
| Enlaces, promesa de meses gratis, correo, TestFlight | `src/lib/config.ts` |
| Videos y pantallas | `public/media/` |
| Imagen al compartir el enlace | `public/img/compartir.png` |

El primer borrador (una sola página sencilla) quedó guardado en `_respaldo-borrador/`.

## Cuando una función salga de "en construcción"

En `src/components/Funcionalidades.tsx` se pasa de la lista `BUILDING` a `READY`, y se le graba su video en el simulador.

## El enlace de cada red

Cada red lleva su nombre al final del enlace, y cada inscripción guarda de dónde llegó:

| Dónde | Enlace |
| --- | --- |
| Facebook | puntoappco.com/?de=facebook |
| YouTube | puntoappco.com/?de=youtube |
| X | puntoappco.com/?de=x |
| Tu estado y mensajes de WhatsApp | puntoappco.com/?de=whatsapp |
| Grupos | puntoappco.com/?de=grupo |

## Ver la lista

En Supabase, en el proyecto de la app: **Table Editor → `waitlist_signups`**. Ahí están:

- nombre, WhatsApp, camiones y ciudad;
- de dónde llegó cada persona y cuándo se anotó.

Los conteos sin datos personales están en `waitlist_events`: visitas, "no tengo iPhone" y toques en TestFlight.

## Cómo se publica

El código está en una carpeta pública de GitHub (`Dev-Sebastian28/punto-web`). Para publicar un cambio se corre `publicar.sh` (o `npm run publicar`): arma la página y la sube a la rama `gh-pages`, que GitHub Pages muestra en puntoappco.com. En Cloudflare (cuenta puntoappco.oficial), puntoappco.com tiene cuatro registros A hacia GitHub Pages y www es un alias de dev-sebastian28.github.io, todos sin el proxy de Cloudflare. Los registros del correo (Resend) ya estaban y no se tocaron.
