# DAVIDS Home & Living — GitHub Pages V1.2 DEMO

Versión estática para publicar como sitio independiente en `marcketingdigital-cloud/davids-home-living`.

## Estado

**Demostración funcional.** Funciona sin backend: landing, catálogo, formulario de consulta con borradores en sesión, carga de imágenes en el navegador, cuadro de texto, filtros, comparador de escenas ilustrativas y cuatro estilos. **NO** convierte fotos reales mediante IA, no envía formularios a DAVIDS ni agenda reservas.

### WhatsApp y email

Los botones preparan el resumen textual del proyecto. **No hay destinatario empresarial preconfigurado**: hasta establecer el número y correo oficiales, muestran un aviso y no realizan envíos. Para ensayos se pueden configurar contactos localmente en el navegador (no quedan configurados para otros visitantes). La fotografía no se adjunta automáticamente.

## Publicación

1. Crear repositorio **público** `davids-home-living` en la cuenta `marcketingdigital-cloud`, branch `main`.
2. Colocar el **contenido de esta carpeta** en la raíz del repositorio. `index.html` debe estar en el nivel raíz, no dentro de una carpeta extra.
3. Abrir **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. Comprobar `https://marcketingdigital-cloud.github.io/davids-home-living/` y `/estudio-ia.html`.

Ver `DEPLOY.md` para instrucciones detalladas y controles de publicación.

## Seguridad

No subir `server.mjs`, `.env`, credenciales de proveedor, fotografías privadas, ni datos reales de clientes en este repositorio público. GitHub Pages solo publica archivos estáticos.

## Próxima versión

La edición con IA real deberá estar conectada a un backend externo seguro. El código completo para Node se conserva fuera de esta versión de GitHub Pages.
