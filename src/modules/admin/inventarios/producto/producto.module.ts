import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:
  [
    TypeOrmModule.forFeature([Producto, Categoria]),
    
    //configuracion del modulo de Multer
    MulterModule.register({
    storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
    }),
    }),
  
  ],
  
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}


