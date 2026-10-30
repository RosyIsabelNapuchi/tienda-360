# Conectar Tienda 360° con Firebase (uso real con un equipo)

Sin este paso la app funciona en **modo demo**. Para que el equipo comparta datos en vivo, sigue estos pasos (30 a 40 minutos, una sola vez; el plan gratuito de Firebase alcanza para un piloto).

## Qué hay en la carpeta
- `index.html`, `config.js`, `demo-data.js`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`: son la app. Estos van a GitHub.
- `firestore.rules`: reglas de seguridad. Van a Firebase, no a GitHub.
- Tu archivo de ventas por área (mismo formato que `datos_ventas_demo.json`). **No subas ventas reales a GitHub.** Se carga desde la app.

## 1. Crear el proyecto en Firebase
1. Entra a https://console.firebase.google.com con tu cuenta de Google y toca **Agregar proyecto**. Ponle `tienda-360`. Puedes desactivar Google Analytics.
2. Menú **Compilación > Authentication > Comenzar**. En **Método de acceso** activa **Correo electrónico/contraseña**.
3. En la pestaña **Users > Agregar usuario** crea una cuenta por persona. Firebase pide un correo, pero aquí los usuarios son nombres cortos: usa `usuario@tienda360.app` (no necesita existir de verdad).
   - Supervisora: `supervisora@tienda360.app` y una contraseña.
   - Un gestor por cuenta: `gestor1@tienda360.app`, `gestor2@tienda360.app`, etc., cada uno con su contraseña. Con cuentas individuales puedes quitar el acceso a una persona sin afectar al resto.
   - En la app escribirán solo `supervisora` o `gestor1` más su contraseña.
4. Menú **Compilación > Firestore Database > Crear base de datos**. Elige modo **producción** y una región cercana (por ejemplo `southamerica-east1`).
5. En Firestore, pestaña **Reglas**: borra todo, pega el contenido de `firestore.rules` y toca **Publicar**. Si tu usuario de supervisora no es `supervisora`, cambia `supervisora@tienda360.app` en esa línea.

## 2. Conectar la app con tu proyecto
1. En Firebase: engranaje **Configuración del proyecto > General > Tus apps > </> (Web)**. Registra la app con cualquier nombre. No marques Hosting.
2. Copia el bloque `firebaseConfig` que te muestra.
3. Abre `config.js` y pega los valores en `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId` y `appId`.
4. En `SUP_EMAILS` deja tu usuario de supervisora (`supervisora`), igual que en las reglas.

La `apiKey` de Firebase no es una clave secreta. Lo que protege tus datos son las reglas y el inicio de sesión.

## 3. Subir a GitHub
1. En https://github.com crea un repositorio nuevo, por ejemplo `tienda-360`.
2. Sube estos archivos: `index.html`, `config.js`, `demo-data.js`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`.
3. En el repositorio: **Settings > Pages > Build and deployment**. Elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En 1 o 2 minutos aparece tu enlace: `https://TU-USUARIO.github.io/tienda-360/`.
5. Vuelve a Firebase: **Authentication > Configuración > Dominios autorizados > Agregar dominio** y escribe `TU-USUARIO.github.io`. Sin este paso el inicio de sesión no funciona.

## 4. Primer uso
1. Abre tu enlace en el celular y entra con `supervisora` y tu contraseña. La app te muestra directamente la vista de supervisora.
2. Ve a **Equipo > Cargar datos de ventas** y elige tu archivo de ventas.
3. En **Equipo** toca cada persona, **Editar**, y pon su nombre, su turno y su **Usuario de acceso** (por ejemplo `gestor1`). Después, en **Hoy**, toca **Generar plan**.
4. Cada gestor abre el enlace y entra con su usuario y contraseña. La app le muestra solo su vista de gestor, con su nombre y sus tareas. Si su usuario aún no tiene nombre asignado, le avisa que te pida asignarlo.
5. Para cerrar sesión, toca el nombre en la esquina superior derecha.
6. Para tener el ícono en el celular: Android, menú de Chrome y **Añadir a pantalla de inicio** (o **Instalar app**). iPhone, botón Compartir de Safari y **Añadir a pantalla de inicio**.

## Cómo funciona la privacidad
- Quién entra y qué ve lo decide la cuenta, no una elección en pantalla. La supervisora ve todo; cada gestor ve solo su ruta. Los gestores reciben solo el orden de ventas (#1, #2, ...), no los montos. Los montos están en `datos/sup`, que solo lee la cuenta de supervisora.
- Las fotos se guardan dentro de la base de datos. El plan gratuito de Firebase (Spark) alcanza para un piloto de un equipo de 12 personas.

## Para actualizar las ventas
Genera un nuevo archivo con el mismo formato y cárgalo desde **Equipo > Cargar datos de ventas**.

## Si algo falla
- **"Usuario o contraseña incorrectos":** revisa en Authentication que exista `usuario@tienda360.app` y la contraseña. Para cambiar una contraseña, borra la cuenta y créala de nuevo, porque las cuentas no tienen un correo real al que enviar el enlace de recuperación.
- **"Tu usuario aún no tiene nombre":** en Equipo, edita a la persona y escribe su usuario de acceso.
- **Se abre el modo demo en vez del inicio de sesión:** `config.js` sigue con `PEGA_AQUI`.
- **No inicia sesión aunque la clave es correcta:** falta agregar tu dominio de github.io en Dominios autorizados.
- **"No tienes permiso para guardar":** las reglas no se publicaron o el correo no coincide.
