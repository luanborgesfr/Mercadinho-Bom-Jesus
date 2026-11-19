/** Camada 2 — Atalhos de DOM. */
BJ.dom = {
  one: function (selector, root) {
    return (root || document).querySelector(selector);
  },
  all: function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  },
  /** Delegação de eventos: on(container, "click", ".classe", handler) */
  on: function (root, type, selector, handler) {
    root.addEventListener(type, function (event) {
      var target = event.target.closest(selector);
      if (target && root.contains(target)) handler(event, target);
    });
  },
  /** Cria elemento a partir de HTML de string. */
  html: function (markup) {
    var tpl = document.createElement("template");
    tpl.innerHTML = markup.trim();
    return tpl.content.firstElementChild;
  },
  /** Escapa texto antes de interpolar em HTML. */
  escape: function (text) {
    var div = document.createElement("div");
    div.textContent = String(text);
    return div.innerHTML;
  },
};
