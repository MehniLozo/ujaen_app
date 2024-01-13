import {app} from "./app-express.mjs";
import { PORT, actualizarIdUsuario } from "./config.mjs";
// Configurar el puerto del servidor

// actualizarIdUsuario("0Ed3TFcFAPRf8ZGQHMhX");

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
