
import { config } from "dotenv"
config(); // <- ejecuta dotenv para cargar el .env

//Esto esta en la documentacion de Nest>  Seguridad/ autenticacion::

export const jwtConstants = {
  secret: process.env.JWT_SECRET
};
