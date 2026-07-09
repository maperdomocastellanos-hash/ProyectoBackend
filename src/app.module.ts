
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/admin/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

// Estas dos ultimas lineas no son necesarias porque el dotenv ya viene reconocido en el ConfigModule
// Que tenemos dentro del imports []: aunque si estan ahi, siempre funciona: 
import { config } from "dotenv";
import { InventariosModule } from './modules/admin/inventarios/inventarios.module';
import { ClienteProveedorModule } from './modules/admin/cliente-proveedor/cliente-proveedor.module';
import { NotaModule } from './modules/admin/nota/nota.module';

config(); // <- ejecuta dotenv para cargar el .env

@Module({
  
  imports: 
  [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],  // ** significa entra en todas las subcarpetas sin importar los niveles
  }),
  
  UsersModule,
  AuthModule,
  InventariosModule,
  ClienteProveedorModule,
  NotaModule,
  ], //ConfigModule es importado, creado con el comando pnpm add @nestjs/config que es un ConfigModule
  
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
