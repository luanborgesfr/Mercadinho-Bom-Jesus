BJ.header = {
  init: function () {
    var burger = BJ.dom.one("[data-menu-toggle]");
    var nav = BJ.dom.one("#menu");
    if (!burger || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("header__nav--open", open);
      burger.classList.toggle("header__burger--open", open);
      burger.setAttribute("aria-expanded", String(open));
    }

    burger.addEventListener("click", function () {
      setOpen(!nav.classList.contains("header__nav--open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  },
};
