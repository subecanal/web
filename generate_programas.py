#!/usr/bin/env python3
"""Genera programas/{slug}.html para cada programa de SUBE a partir de una
plantilla común. Correr de nuevo después de editar PROGRAMS o TEMPLATE para
regenerar todas las páginas."""
import os

PROGRAMS = [
    {
        "slug": "streaming-copa",
        "name": "Streaming copa",
        "video_id": "V1ggB4EdYsg",
        "list_id": "PLYT7ujTIBmWb0QoWKs0vVNdaJGhMFRCdU",
        "schedule": "Lunes · 18:00",
    },
    {
        "slug": "marcando-la-cancha",
        "name": "Marcando la cancha",
        "video_id": "4S4S8tfHEok",
        "list_id": "PLYT7ujTIBmWYogyJY-uOZ4T5qc6VLCZzS",
        "schedule": "Lunes · 19:30",
    },
    {
        "slug": "falopa-informativa-nacional",
        "name": "F4lopa informativa nacional",
        "video_id": "Vrjjcu1UXfA",
        "list_id": "PLYT7ujTIBmWbzBCsllEBDI-sC8iTx60qC",
        "schedule": "Lunes · 21:00",
    },
    {
        "slug": "el-amplificador",
        "name": "El amplificador",
        "video_id": "tcXuPtIap44",
        "list_id": "PLYT7ujTIBmWbDt100agv2nniNoCyQI_E4",
        "schedule": "Jueves · 18:00",
    },
    {
        "slug": "estacion-freak",
        "name": "Estación freak",
        "video_id": "gygi5qlOJGk",
        "list_id": "PLYT7ujTIBmWZWm37-X_-CzKtCt5fgRIE1",
        "schedule": "Jueves · 19:30 · cada dos semanas, alterna con ¿De qué viven?",
    },
    {
        "slug": "de-que-viven",
        "name": "¿De qué viven?",
        "video_id": "xOVJ7J8DEbE",
        "list_id": "PLYT7ujTIBmWYiJVF9dSRf6__ckwOeMf_E",
        "schedule": "Jueves · 20:00 · cada dos semanas, alterna con Estación freak",
    },
    {
        "slug": "chicha-y-limonada",
        "name": "Chicha y limonada",
        "video_id": "H5E_e9X_3xY",
        "list_id": "PLYT7ujTIBmWbEmAmjwWQMRK0TahbqHlv2",
        "schedule": "Jueves · 21:30",
    },
    {
        "slug": "umbrales",
        "name": "Umbrales",
        "video_id": "192gtJRG9KI",
        "list_id": "PLSOqo_jyCCX8",
        "schedule": "On demand",
    },
]

TEMPLATE = """<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} · SUBE</title>
<meta name="description" content="{name} — programa de SUBE. Playlist, quiénes lo hacen y redes.">
<link rel="icon" href="../assets/logo.png">
<link rel="stylesheet" href="../style.css">
</head>
<body>

<header class="site-header">
  <div class="wrap">
    <a href="../index.html#top" class="brand"><img src="../assets/logo.png" alt="Sube Canal"></a>
    <nav class="nav-links" id="nav-links">
      <a href="../index.html#beneficios">Beneficios</a>
      <a href="../index.html#asociate">Pasajerxs</a>
      <a href="../index.html#contenidos">Contenidos</a>
      <a href="../index.html#tienda">Tienda</a>
    </nav>
    <button class="nav-toggle" id="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-links">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <g class="line-open"><path d="M4 6h16M4 12h16M4 18h16"></path></g>
        <g class="line-close"><path d="M5 5l14 14M19 5L5 19"></path></g>
      </svg>
    </button>
  </div>
</header>

<main>
  <section class="program-hero">
    <div class="wrap">
      <a class="back-link" href="../index.html#contenidos">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
        Volver a Contenidos
      </a>
      <p class="eyebrow">Programa</p>
      <h1>{name}</h1>
      <p class="program-schedule">{schedule}</p>
    </div>
  </section>

  <section class="program-body">
    <div class="wrap">
      <div class="video-embed">
        <iframe
          src="https://www.youtube.com/embed/{video_id}?list={list_id}"
          title="{name} — SUBE"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>

      <div class="program-info-grid">
        <div class="program-info-card">
          <h2>Quiénes lo hacen</h2>
          <p class="pending-note">
            ⚠️ Todavía no tenemos cargado quién conduce y quién produce este programa.
            Pasame los nombres (y roles) y los agrego acá.
          </p>
        </div>
        <div class="program-info-card">
          <h2>Redes del programa</h2>
          <p class="pending-note">
            ⚠️ Todavía no tenemos las redes sociales propias de este programa.
            Si tiene Instagram/otras redes, pasámelas y las agrego acá.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    <div class="footer-strip">
      <img class="footer-bus" src="../assets/colectivo.png" alt="Sube Canal — un viaje colectivo">
      <div class="footer-channels">
        <a href="mailto:laplatasube@gmail.com">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg>
          <span>laplatasube@gmail.com</span>
        </a>
        <a href="https://www.instagram.com/subecanal" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.3" cy="6.7" r="1"></circle></svg>
          <span>Instagram</span>
        </a>
        <a href="https://www.tiktok.com/@subecanal" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 3v10.5a3.5 3.5 0 1 1-3-3.46"></path><path d="M14 3c.3 2.2 2 4 4.5 4.2"></path></svg>
          <span>TikTok</span>
        </a>
        <a href="https://x.com/SUBEcanal" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"></path></svg>
          <span>X</span>
        </a>
        <a href="https://www.youtube.com/@subecanal" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="3.5"></rect><path d="M10.5 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" stroke="none"></path></svg>
          <span>YouTube</span>
        </a>
      </div>
    </div>
  </div>
</footer>

<script src="../assets/nav.js"></script>
</body>
</html>
"""

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "programas")
    os.makedirs(out_dir, exist_ok=True)
    for p in PROGRAMS:
        html = TEMPLATE.format(**p)
        path = os.path.join(out_dir, p["slug"] + ".html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print("generado:", path)
