import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

//swagger
const config = new DocumentBuilder()
    .setTitle('Inventarios, ventas y compras')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Backend Api')
    .addBearerAuth()   // Para ponerle candado al swagger
    .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, documentFactory);
//end swagger

//Class - validator - 
// esta linea activa la validación automática de DTOs en toda la aplicación 
// usando los decoradores de class-validator.
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,       // elimina propiedades que no están en el DTO
  forbidNonWhitelisted: true, // lanza error si llegan propiedades extra
}));

  //Instalacion del Cors
  //Funcion --> permitir o restringir que aplicaciones web alojadas en dominios diferentes accedan a tu API.
  
  //Configuracion abierta: 
  app.enableCors(); // Abre la API por completo
  
  /* Configuración estricta de CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // Tu frontend en entorno de desarrollo
      'https://miempresa.com' // Tu frontend en producción (Intranet o Internet)
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization', // Permite el envío de JSON y Tokens JWT
    credentials: true, // Obligatorio si manejas sesiones por cookies o HttpOnly tokens
  });
*/


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
