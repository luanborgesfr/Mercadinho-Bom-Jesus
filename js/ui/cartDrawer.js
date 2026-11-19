BJ.cartDrawer = (function () {
  var drawer, overlay, listEl, totalEl, counters;

  function open() {
    drawer.classList.add("cart--open");
    drawer.setAttribute("aria-hidden", "false");
    overlay.hidden = false;
    document.body.classList.add("page--locked");
  }

  function close() {
    drawer.classList.remove("cart--open");
    drawer.setAttribute("aria-hidden", "true");
    overlay.hidden = true;
    document.body.classList.remove("page--locked");
  }

  function renderLine(line) {
    var p = line.product;
    return (
      '<li class="cart-item">' +
        '<div class="cart-item__visual" aria-hidden="true">' + p.emoji + "</div>" +
        "<div>" +
          '<p class="cart-item__name">' + BJ.dom.escape(p.name) + "</p>" +
          '<p class="cart-item__price">' + BJ.format.money(line.subtotal) + "</p>" +
        "</div>" +
        '<div class="qty">' +
          '<button class="qty__btn" type="button" data-dec="' + p.id + '" aria-label="Diminuir">−</button>' +
          '<span class="qty__value">' + line.qty + "</span>" +
          '<button class="qty__btn" type="button" data-inc="' + p.id + '" aria-label="Aumentar">+</button>' +
        "</div>" +
      "</li>"
    );
  }

  function render(snap) {
    listEl.innerHTML = snap.lines.map(renderLine).join("");
    totalEl.textContent = BJ.format.money(snap.total);
    drawer.classList.toggle("cart--empty", snap.count === 0);

    counters.forEach(function (el) {
      var changed = el.textContent !== String(snap.count);
      el.textContent = snap.count;
      if (changed) {
        el.classList.remove("badge--bump");
        void el.offsetWidth; // reinicia a animação
        el.classList.add("badge--bump");
      }
    });
  }

  function checkout() {
    var snap = BJ.cart.snapshot();
    if (!snap.count) return;
    window.open(BJ.info.whatsappUrl(BJ.cart.buildOrderMessage()), "_blank", "noopener");
    if (!BJ.config.whatsappNumber) {
      BJ.toast.show("Escolha o contato da loja no WhatsApp pra enviar");
    }
  }

  return {
    init: function () {
      drawer = BJ.dom.one("[data-cart]");
      overlay = BJ.dom.one("[data-overlay]");
      listEl = BJ.dom.one("[data-cart-list]");
      totalEl = BJ.dom.one("[data-cart-total]");
      counters = BJ.dom.all("[data-cart-count]");

      BJ.dom.all("[data-cart-open]").forEach(function (b) { b.addEventListener("click", open); });
      BJ.dom.one("[data-cart-close]").addEventListener("click", close);
      overlay.addEventListener("click", close);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

      BJ.dom.on(listEl, "click", "[data-inc]", function (e, btn) {
        var id = btn.getAttribute("data-inc");
        BJ.cart.setQty(id, qtyOf(id) + 1);
      });
      BJ.dom.on(listEl, "click", "[data-dec]", function (e, btn) {
        var id = btn.getAttribute("data-dec");
        BJ.cart.setQty(id, qtyOf(id) - 1);
      });

      BJ.dom.one("[data-cart-clear]").addEventListener("click", function () { BJ.cart.clear(); });
      BJ.dom.one("[data-cart-checkout]").addEventListener("click", checkout);

      BJ.cart.subscribe(render);
    },
  };

  function qtyOf(id) {
    var line = BJ.cart.snapshot().lines.filter(function (l) { return l.product.id === id; })[0];
    return line ? line.qty : 0;
  }
})();
