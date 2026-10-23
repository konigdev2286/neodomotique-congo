export const formatFCFA = (n: number) =>
  `${new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f|\u00a0/g, " ")} FCFA`;
