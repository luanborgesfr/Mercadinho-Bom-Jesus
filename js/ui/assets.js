/**
 * Camada 4 — UI: imagens da marca.
 * Se logo.png / mascote.png não carregarem, mostra um fallback em vez de imagem quebrada.
 */
BJ.assets = {
  init: function () {
    BJ.dom.all("img[data-asset]").forEach(function (img) {
      function markMissing() {
        var host = img.closest(".header__brand, .mascot");
        if (!host) return;
        host.classList.add(host.classList.contains("mascot") ? "mascot--missing" : "header__brand--missing");
      }
      img.addEventListener("error", markMissing);
      if (img.complete && img.naturalWidth === 0) markMissing();
    });
  },
};
