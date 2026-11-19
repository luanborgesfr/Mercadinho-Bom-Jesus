/**
 * Camada 1 — Configuração.
 * É AQUI que você troca as informações de contato quando tiver em mãos.
 */
BJ.config = {
  storeName: "Comercial Bom Jesus",
  slogan: "sua família mais feliz!",

  // WhatsApp só com números, com DDI + DDD. Exemplo: "5591988887777"
  // Enquanto estiver vazio, o botão abre o WhatsApp sem contato definido.
  whatsappNumber: "",

  // Texto exibido na seção de contato (deixe "" pra mostrar "Em breve")
  phoneLabel: "",
  hours: "",

  address: "Rua Gilberto Simões de Oliveira, Bairro Palmeiras, São Miguel do Guamá - PA",

  storageKey: "bj:cart:v1",
  currency: { locale: "pt-BR", code: "BRL" },
};
