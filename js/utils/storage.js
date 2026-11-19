/** Camada 2 — localStorage com proteção (modo anônimo/bloqueado não quebra o site). */
BJ.storage = {
  read: function (key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  },
  write: function (key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      /* sem armazenamento: o carrinho funciona só na sessão atual */
    }
  },
};
