/* Carrusel de beneficios: las flechas desplazan la tira una "página"
   (el ancho visible del contenedor) hacia cada lado. En mobile/touch
   el swipe nativo sigue funcionando igual, esto es solo un extra. */
(function () {
  "use strict";
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".benefit-grid");
    var prev = carousel.querySelector(".carousel-arrow--prev");
    var next = carousel.querySelector(".carousel-arrow--next");
    if (!track || !prev || !next) return;

    function scrollByPage(dir) {
      track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: "smooth" });
    }

    prev.addEventListener("click", function () { scrollByPage(-1); });
    next.addEventListener("click", function () { scrollByPage(1); });

    function updateArrows() {
      var maxScroll = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= maxScroll;
    }
    track.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    // Si benefits.js reemplaza las tarjetas más tarde (datos de la planilla),
    // volvemos a chequear el estado de las flechas.
    var observer = new MutationObserver(updateArrows);
    observer.observe(track, { childList: true });
    updateArrows();
  });
})();
