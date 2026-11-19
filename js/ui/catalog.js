BJ.catalog = (function () {
  var ALL = "Todos";
  var active = ALL;
  var filtersEl, productsEl;

  function categories() {
    var seen = [ALL];
    BJ.products.forEach(function (p) {
      if (seen.indexOf(p.category) === -1) seen.push(p.category);
    });
    return seen;
  }

  function renderFilters() {
    filtersEl.innerHTML = categories().map(function (name) {
      var cls = "filters__chip" + (name === active ? " filters__chip--active" : "");
      return '<button class="' + cls + '" type="button" role="tab" data-category="' + BJ.dom.escape(name) + '">' + BJ.dom.escape(name) + "</button>";
    }).join("");
  }

  function renderProducts() {
    var list = BJ.products.filter(function (p) { return active === ALL || p.category === active; });
    productsEl.innerHTML = list.map(function (p) {
      return (
        '<article class="product">' +
          '<div class="product__visual" aria-hidden="true">' + p.emoji + "</div>" +
          '<h3 class="product__name">' + BJ.dom.escape(p.name) + "</h3>" +
          '<p class="product__unit">' + BJ.dom.escape(p.unit) + "</p>" +
          '<div class="product__footer">' +
            '<span class="product__price">' + BJ.format.money(p.price) + "</span>" +
            '<button class="product__add" type="button" data-add="' + p.id + '" aria-label="Adicionar ' + BJ.dom.escape(p.name) + ' ao carrinho">+</button>' +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  return {
    init: function () {
      filtersEl = BJ.dom.one("[data-filters]");
      productsEl = BJ.dom.one("[data-products]");
      if (!filtersEl || !productsEl) return;

      renderFilters();
      renderProducts();

      BJ.dom.on(filtersEl, "click", "[data-category]", function (e, btn) {
        active = btn.getAttribute("data-category");
        renderFilters();
        renderProducts();
      });

      BJ.dom.on(productsEl, "click", "[data-add]", function (e, btn) {
        var id = btn.getAttribute("data-add");
        BJ.cart.add(id);
        var product = BJ.products.filter(function (p) { return p.id === id; })[0];
        BJ.toast.show(product.emoji + " " + product.name + " no carrinho");
      });
    },
  };
})();
