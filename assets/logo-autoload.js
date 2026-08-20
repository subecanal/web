/* ============================================
   SUBE CANAL — auto-detección de logos de comercios
   ------------------------------------------------------
   Para cada tarjeta de beneficio, intenta cargar
   assets/socios/{handle-de-instagram}.{jpg|jpeg|png|webp}
   Si encuentra el archivo, lo muestra. Si no, se queda con
   el círculo con la inicial (que ya está en el HTML).

   Para agregar un logo nuevo: subí el archivo a
   assets/socios/ con el nombre exacto del @ de Instagram
   (sin el @, tal cual está escrito), en jpg, png o webp.
   No hace falta tocar código.
   ============================================ */
(function () {
  "use strict";

  var EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

  function tryNext(node, slug, idx) {
    if (!slug || idx >= EXTENSIONS.length) return; // no se encontró: se queda la inicial
    var url = "assets/socios/" + slug + "." + EXTENSIONS[idx];
    var probe = new Image();
    probe.onload = function () {
      node.classList.remove("mono");
      node.innerHTML = "";
      var img = document.createElement("img");
      img.src = url;
      img.alt = node.getAttribute("data-name") || "";
      img.loading = "lazy";
      node.appendChild(img);
    };
    probe.onerror = function () {
      tryNext(node, slug, idx + 1);
    };
    probe.src = url;
  }

  function autoLoadLogos(scope) {
    var root = scope || document;
    var nodes = root.querySelectorAll(".benefit-logo[data-slug]");
    nodes.forEach(function (node) {
      tryNext(node, node.getAttribute("data-slug"), 0);
    });
  }

  // Exponer para que benefits.js la vuelva a llamar después de
  // renderizar las tarjetas que vienen de la planilla.
  window.SubeAutoLogos = autoLoadLogos;

  document.addEventListener("DOMContentLoaded", function () {
    autoLoadLogos(document);
  });
})();
