BJ.info = (function () {
  function whatsappUrl(text) {
    var number = BJ.format.digitsOnly(BJ.config.whatsappNumber);
    var base = number ? "https://wa.me/" + number : "https://wa.me/";
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  return {
    whatsappUrl: whatsappUrl,

    init: function () {
      var greeting = "Olá, " + BJ.config.storeName + "! Vim pelo site.";
      BJ.dom.all("[data-whatsapp]").forEach(function (a) { a.href = whatsappUrl(greeting); });

      var map = BJ.dom.one("[data-map]");
      if (map) {
        map.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(BJ.config.address);
      }

      var phone = BJ.dom.one('[data-config="phone"]');
      if (phone && BJ.config.phoneLabel) phone.textContent = BJ.config.phoneLabel;

      var hours = BJ.dom.one('[data-config="hours"]');
      if (hours && BJ.config.hours) hours.textContent = BJ.config.hours;
    },
  };
})();
