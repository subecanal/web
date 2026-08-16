/* ============================================
   SUBE CANAL — carga de beneficios desde Google Sheets
   ------------------------------------------------------
   Intenta traer los beneficios desde la planilla publicada
   (Archivo > Publicar en la web > CSV). Si Google no permite
   el acceso desde el navegador (CORS) o la hoja cambió de
   estructura, el script no rompe nada: la grilla se queda
   con las tarjetas fijas que ya están escritas en index.html.
   ============================================ */
(function () {
  "use strict";

  // Link de "Publicar en la web" de la planilla, exportado como CSV.
  var SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFybsjITyt2XR-XYTWibjY4PItJ46VK27XJOuHQ0JrJ-tZujG6duyDrwlsTdZLRbJusM-rZyMqxtky/pub?output=csv";

  function stripAccents(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function normalizeHeader(h) {
    return stripAccents(h).toLowerCase().trim();
  }

  // Parser de CSV simple, soporta comillas y comas dentro de campos.
  function parseCSV(text) {
    var rows = [],
      row = [],
      field = "",
      inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += c;
        }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        /* ignorar */
      } else {
        field += c;
      }
    }
    if (field.length || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows.filter(function (r) {
      return r.some(function (cell) {
        return cell.trim() !== "";
      });
    });
  }

  function findCol(headers, keywords) {
    for (var i = 0; i < headers.length; i++) {
      var h = normalizeHeader(headers[i]);
      for (var k = 0; k < keywords.length; k++) {
        if (h.indexOf(keywords[k]) !== -1) return i;
      }
    }
    return -1;
  }
  function findCols(headers, keywords) {
    var idxs = [];
    for (var i = 0; i < headers.length; i++) {
      var h = normalizeHeader(headers[i]);
      for (var k = 0; k < keywords.length; k++) {
        if (h.indexOf(keywords[k]) !== -1) {
          idxs.push(i);
          break;
        }
      }
    }
    return idxs;
  }

  function igHandle(v) {
    if (!v) return "";
    var m = String(v).match(/instagram\.com\/([^/?\s]+)/i);
    if (m) return "@" + m[1];
    return "@" + String(v).replace(/^@/, "").trim();
  }
  function igUrl(v) {
    if (!v) return "";
    var s = String(v).trim();
    if (/^https?:\/\//i.test(s)) return s;
    return "https://www.instagram.com/" + s.replace(/^@/, "") + "/";
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  var IG_ICON =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.3" cy="6.7" r="1"></circle></svg>';

  function cardHTML(item) {
    var logo = item.logo
      ? '<div class="benefit-logo"><img src="' +
        escapeHtml(item.logo) +
        '" alt="' +
        escapeHtml(item.nombre) +
        '" loading="lazy"></div>'
      : '<div class="benefit-logo mono">' +
        escapeHtml((item.nombre || "?").trim().charAt(0).toUpperCase()) +
        "</div>";

    var perksHtml = item.perks
      .map(function (p) {
        return "<li>" + escapeHtml(p) + "</li>";
      })
      .join("");

    var igLink = item.ig
      ? '<a class="benefit-ig" href="' +
        escapeHtml(igUrl(item.ig)) +
        '" target="_blank" rel="noopener">' +
        IG_ICON +
        "<span>" +
        escapeHtml(igHandle(item.ig)) +
        "</span></a>"
      : "";

    return (
      '<article class="benefit-card">' +
      '<div class="benefit-top">' +
      logo +
      "<div>" +
      '<div class="benefit-name">' +
      escapeHtml(item.nombre) +
      "</div>" +
      (item.categoria
        ? '<div class="benefit-cat">' + escapeHtml(item.categoria) + "</div>"
        : "") +
      "</div>" +
      "</div>" +
      '<ul class="benefit-perks">' +
      perksHtml +
      "</ul>" +
      '<div class="benefit-foot">' +
      igLink +
      "</div>" +
      "</article>"
    );
  }

  function render(items) {
    var grid = document.getElementById("benefit-grid");
    if (!grid || !items.length) return;
    grid.innerHTML = items.map(cardHTML).join("");
    grid.setAttribute("data-fallback", "false");
  }

  fetch(SHEET_CSV_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("status " + res.status);
      return res.text();
    })
    .then(function (text) {
      var rows = parseCSV(text);
      if (rows.length < 2) return;

      var headers = rows[0];
      var nombreCol = findCol(headers, ["nombre", "comercio", "negocio", "espacio"]);
      var catCol = findCol(headers, ["rubro", "categoria"]);
      var igCol = findCol(headers, ["instagram", " ig", "ig "]);
      var logoCol = findCol(headers, ["logo", "imagen"]);
      var beneficioCols = findCols(headers, ["beneficio", "descuento"]);

      // Si no reconocemos las columnas clave, no tocamos nada:
      // se queda el listado fijo que ya está en el HTML.
      if (nombreCol === -1 || beneficioCols.length === 0) return;

      var items = [];
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var nombre = (row[nombreCol] || "").trim();
        if (!nombre) continue;
        var perks = beneficioCols
          .map(function (c) {
            return (row[c] || "").trim();
          })
          .filter(function (v) {
            return v;
          });
        if (!perks.length) continue;
        items.push({
          nombre: nombre,
          categoria: catCol !== -1 ? (row[catCol] || "").trim() : "",
          ig: igCol !== -1 ? (row[igCol] || "").trim() : "",
          logo: logoCol !== -1 ? (row[logoCol] || "").trim() : "",
          perks: perks,
        });
      }
      if (items.length) render(items);
    })
    .catch(function () {
      // Sin acceso a la planilla (offline, CORS, etc): se mantiene
      // el listado fijo de index.html. No se muestra ningún error.
    });
})();
