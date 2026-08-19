/* Tabs simples y reutilizables: cualquier .tab-btn con data-tab-target
   activa el .tab-panel con ese id, dentro del mismo contenedor .tabs. */
(function () {
  "use strict";
  document.querySelectorAll(".tabs").forEach(function (tabs) {
    var buttons = tabs.querySelectorAll(".tab-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-tab-target");

        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        // Los paneles son hermanos del contenedor .tabs
        var panels = tabs.parentElement.querySelectorAll(".tab-panel");
        panels.forEach(function (panel) {
          if (panel.id === targetId) {
            panel.classList.add("is-active");
            panel.hidden = false;
          } else {
            panel.classList.remove("is-active");
            panel.hidden = true;
          }
        });
      });
    });
  });
})();
