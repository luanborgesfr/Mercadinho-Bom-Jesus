/**
 * Camada 5 — Ponto de entrada.
 * Inicializa cada camada na ordem certa. Pra criar uma nova funcionalidade:
 * crie um arquivo em js/ui/ (ou js/modules/), registre o <script> no index.html
 * e adicione a chamada init() aqui.
 */
(function () {
  function start() {
    BJ.toast.init();
    BJ.assets.init();
    BJ.header.init();
    BJ.info.init();
    BJ.catalog.init();
    BJ.cartDrawer.init(); // se inscreve no carrinho antes de ele carregar os dados salvos
    BJ.cart.init();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
