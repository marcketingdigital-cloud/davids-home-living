# DAVIDS — Guía de publicación de GitHub Pages

Cuenta: `marcketingdigital-cloud`  
Repositorio independiente: `davids-home-living`  
URL prevista, **aún sin confirmar**: `https://marcketingdigital-cloud.github.io/davids-home-living/`

## 1. Crear el repositorio

Abrí <https://github.com/new?name=davids-home-living&description=DAVIDS%20Home%20%26%20Living%20%E2%80%94%20demo%20UX%2FUI%20de%20remodelaci%C3%B3n> iniciando sesión como `marcketingdigital-cloud`.

- Nombre: `davids-home-living`.
- Visibilidad: **Public** (la demo será visible para cualquier persona).
- Seleccioná `Add a README file` si querés facilitar que la integración de ChatGPT cargue después los demás archivos; de lo contrario, podés subirlos desde la web o usando Git.
- No modificar ni reemplazar `carlos-lavados`.

## 2. Subir el sitio

Si vas a usar la interfaz de GitHub, descomprimí `davids_home_living_pages_v1_2.zip`; subí **los archivos de su interior**, no el ZIP cerrado. En la pestaña Code del nuevo repositorio, elegí Add file → Upload files y confirmá el commit. GitHub permite seleccionar varios archivos, pero si no preserva subcarpetas (como `assets/`) usá la opción de Git/CLI de abajo.

Con Git instalado y autenticado, desde la carpeta descomprimida que contiene `index.html`:

```bash
# Opción para un repositorio recién creado y vacío:
git init
git branch -M main
git add .
git commit -m "Publicar DAVIDS Home & Living demo V1.2"
git remote add origin https://github.com/marcketingdigital-cloud/davids-home-living.git
git push -u origin main
```

Si GitHub ya inicializó una rama `main` con README, primero cloná ese repositorio y copiá los archivos dentro de la carpeta clonada; después `git add . && git commit -m "Publicar demo" && git push`.

## 3. Activar Pages

Dentro del repositorio: **Settings → Pages → Build and deployment**.

- `Source`: **Deploy from a branch**.
- `Branch`: **main**.
- `Folder`: **/(root)**.
- Guardar en **Save**.

La URL del sitio puede tardar en aparecer después del despliegue. No afirmar que está publicada hasta que GitHub lo confirme y el sitio cargue correctamente.

## 4. Pruebas de aceptación

- Abrir `https://marcketingdigital-cloud.github.io/davids-home-living/`.
- Desde el hero, ingresar a `estudio-ia.html`.
- En móvil, comprobar que el contenido no tiene desplazamiento horizontal.
- Elegir un estilo, subir imagen y escribir una idea; revisar el resumen.
- Mover el slider antes/después; las escenas deben indicar claramente `ejemplo`.
- Confirmar que **no se envía** imagen a una API y que **no** hay resultado real IA.
- Abrir WhatsApp y correo; revisar destinatarios (todavía no configurados oficialmente).
- Verificar el candado HTTPS y que `manifest.webmanifest`, `styles.css` y recursos en `assets/` carguen sin 404.

## 5. Limitaciones

GitHub Pages sirve archivos estáticos, pero no ejecuta `server.mjs`. El producto con IA real deberá utilizar hosting para backend, secretos de entorno, consentimiento y control de consumo. No guardar claves en Javascript público.

Fuentes de referencia: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
