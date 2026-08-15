# Sube Canal

Sitio web de Sube Canal: presenta los beneficios de la Comunidad de Pasajerxs y permite asociarse mediante Mercado Pago.

Es un sitio estático (HTML + CSS puro, sin build ni dependencias) pensado para alojarse gratis en **GitHub Pages**.

## Estructura

```
index.html          → toda la página (hero, qué es, beneficios, asociate)
style.css           → estilos (colores, tipografías, layout)
assets/
  logo.png           → logo de Sube Canal
  textura.jpg        → textura de fondo
  socios/            → logos de los comercios/espacios con beneficios
```

## Cómo publicarlo en GitHub Pages

1. Creá un repositorio nuevo en GitHub (por ejemplo `sube-canal`).
2. Subí **todos** estos archivos y carpetas manteniendo la misma estructura (podés arrastrarlos desde la web de GitHub, o con git):
   ```bash
   git init
   git add .
   git commit -m "Sitio Sube Canal"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/sube-canal.git
   git push -u origin main
   ```
3. En el repositorio, andá a **Settings → Pages**.
4. En "Build and deployment" elegí **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
5. Guardá. En un par de minutos el sitio queda publicado en:
   `https://TU-USUARIO.github.io/sube-canal/`

Si más adelante querés un dominio propio (ej. `subecanal.com`), en la misma sección "Pages" hay un campo "Custom domain" donde lo podés cargar (hay que apuntar el DNS del dominio a GitHub).

## Cómo editar contenido

Todo el texto y los links están directamente en `index.html`, ordenado por secciones (con comentarios `<!-- ... -->`):

- **Hero**: título y bajada principal.
- **Qué es**: las 3 tarjetas explicando el canal.
- **Beneficios**: una tarjeta `<article class="benefit-card">` por cada espacio adherido. Para sumar uno nuevo, copiá un bloque entero y cambiá nombre, categoría, beneficio(s) y link de Instagram. Si no tenés el logo, dejá `<div class="benefit-logo mono">X</div>` con la inicial.
- **Asociate**: los 3 planes con sus links de Mercado Pago — si cambian los montos o los links de suscripción, se editan ahí directamente.

Los colores y tipografías están centralizados como variables al principio de `style.css` (bloque `:root`), así que para cambiar la paleta alcanza con tocar esos valores en un solo lugar.

## Beneficios cargados actualmente

.exe informática, Carpincho, Casa Chicha, La Compostera, La Ola Indie, Mascaró, Mundo Semilla, Pao tatt, Refugio 62, Roots Pizza y Tatana. Carpincho, Pao tatt, Refugio 62 y Roots Pizza no tenían logo disponible al momento de armar el sitio, así que muestran un ícono con su inicial — se puede reemplazar apenas tengas el archivo.
