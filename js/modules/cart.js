/**
 * Camada 3 — Módulo do carrinho.
 * Lógica pura: não toca no DOM. A UI se inscreve com BJ.cart.subscribe().
 */
BJ.cart = (function () {
  var items = {}; // { [productId]: quantidade }
  var listeners = [];

  function load() {
    var saved = BJ.storage.read(BJ.config.storageKey, {});
    Object.keys(saved).forEach(function (id) {
      if (findProduct(id) && saved[id] > 0) items[id] = saved[id];
    });
  }

  function findProduct(id) {
    return BJ.products.filter(function (p) { return p.id === id; })[0];
  }

  function commit() {
    BJ.storage.write(BJ.config.storageKey, items);
    listeners.forEach(function (fn) { fn(api.snapshot()); });
  }

  var api = {
    init: function () { load(); commit(); },

    subscribe: function (fn) { listeners.push(fn); },

    add: function (id) {
      if (!findProduct(id)) return;
      items[id] = (items[id] || 0) + 1;
      commit();
    },

    setQty: function (id, qty) {
      if (qty <= 0) delete items[id];
      else items[id] = qty;
      commit();
    },

    clear: function () { items = {}; commit(); },

    /** Estado atual já com dados do produto e subtotal. */
    snapshot: function () {
      var lines = Object.keys(items).map(function (id) {
        var product = findProduct(id);
        return { product: product, qty: items[id], subtotal: product.price * items[id] };
      });
      return {
        lines: lines,
        count: lines.reduce(function (sum, l) { return sum + l.qty; }, 0),
        total: lines.reduce(function (sum, l) { return sum + l.subtotal; }, 0),
      };
    },

    /** Texto do pedido pronto para o WhatsApp. */
    buildOrderMessage: function () {
      var snap = api.snapshot();
      var rows = snap.lines.map(function (l) {
        return "• " + l.qty + "x " + l.product.name + " (" + l.product.unit + ") — " + BJ.format.money(l.subtotal);
      });
      return [
        "Olá, " + BJ.config.storeName + "! Quero fazer um pedido:",
        "",
        rows.join("\n"),
        "",
        "Total estimado: " + BJ.format.money(snap.total),
      ].join("\n");
    },
  };

  return api;
})();
