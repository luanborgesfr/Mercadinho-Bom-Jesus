(function () {
  function start() {
    BJ.toast.init();
    BJ.assets.init();
    BJ.header.init();
    BJ.info.init();
    BJ.catalog.init();
    BJ.cartDrawer.init(); 
    BJ.cart.init();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
