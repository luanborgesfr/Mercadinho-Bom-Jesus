BJ.format = (function () {
  var money = new Intl.NumberFormat(BJ.config.currency.locale, {
    style: "currency",
    currency: BJ.config.currency.code,
  });

  return {
    money: function (value) {
      return money.format(value);
    },
    digitsOnly: function (text) {
      return String(text || "").replace(/\D/g, "");
    },
  };
})();
