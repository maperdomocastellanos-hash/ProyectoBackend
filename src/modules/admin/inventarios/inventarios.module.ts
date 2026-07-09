import { Module } from '@nestjs/common';
import { SucursalModule } from './sucursal/sucursal.module';
import { AlmacenModule } from './almacen/almacen.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: 
  [
    SucursalModule, 
    AlmacenModule, 
    ProductoModule, 
    CategoriaModule]
})
export class InventariosModule {}
