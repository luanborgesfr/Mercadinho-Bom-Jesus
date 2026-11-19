/** Camada 4 — UI: aviso rápido (toast). */
BJ.toast = (function () {
  var el, timer;

  return {
    init: function () { el = BJ.dom.one("[data-toast]"); },
    show: function (message) {
      if (!el) return;
      el.textContent = message;
      el.classList.add("toast--show");
      clearTimeout(timer);
      timer = setTimeout(function () { el.classList.remove("toast--show"); }, 2200);
    },
  };
})();
