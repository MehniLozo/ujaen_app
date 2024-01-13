import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from "./routes.mjs";


export const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());
app.use(bodyParser.json());

// Rutas
app.use('/', routes);


// export default app;