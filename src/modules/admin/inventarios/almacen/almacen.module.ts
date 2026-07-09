import { Module } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AlmacenController } from './almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Almacen } from './entities/almacen.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Almacen,Sucursal])],
  controllers: [AlmacenController],
  providers: [AlmacenService],
})
export class AlmacenModule {}
