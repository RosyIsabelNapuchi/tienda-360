// Sin configurar (PEGA_AQUI), la app abre en MODO DEMO con datos ficticios guardados solo en el navegador.
// 1) Para usarla con un equipo real, pega aquí los datos de tu proyecto Firebase (Configuración del proyecto > Tus apps > Web).
window.FIREBASE_CONFIG = {
  apiKey: "PEGA_AQUI",
  authDomain: "PEGA_AQUI",
  projectId: "PEGA_AQUI",
  storageBucket: "PEGA_AQUI",
  messagingSenderId: "PEGA_AQUI",
  appId: "PEGA_AQUI"
};
// 2) Los usuarios son nombres cortos (supervisora, gestor1, ...). Internamente se guardan como
//    usuario@tienda360.app. No necesitan ser correos reales.
window.USER_DOMAIN = "tienda360.app";
// 3) Usuario(s) de la supervisora. Solo ellos ven montos de venta y cargan datos.
//    Debe coincidir con firestore.rules.
window.SUP_EMAILS = ["supervisora"];
