import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Search, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { format } from 'path';

//@ApiBearerAuth()
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.crearProducto(createProductoDto);
  }


  @Get()
  @ApiQuery({name: 'search', required: false, type: String})    // con esto forzo a quitar la caracteristica de ser obligatorio de llenar el search (name en este caso es palabra reservada)
  @ApiQuery({name: 'warehouse', required: false, type: Number})    // con esto forzo a quitar la caracteristica de ser obligatorio de llenar el warehouse (name en este caso es palabra reservada)
  @ApiQuery({name: 'page', required: false, type: Number}) 
  @ApiQuery({name: 'limit', required: false, type: Number}) 
  @ApiQuery({name: 'estatus', required: false, type: Boolean}) 

  findAll(
      //Todo esto tambien se puede trabajar desde un DTO
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('search') search: string = '',
      @Query('warehouse') warehouse: number = 0,
      @Query('estatus') estatus: boolean = true
    ) 
    {
      return this.productoService.listarProducto(page, limit,search,warehouse,estatus )     //hay que colocar todo en el mismo orden de producto.service.ts
    }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.Mostrar(+id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.actualizarProductos(+id, updateProductoDto);
  }

  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }*/

  @Post(':id/actualizar-imagen')
  @UseInterceptors(FileInterceptor('image'))       //imagen es variable
  @ApiConsumes('multipart/form-data') 
  @ApiBody
  ({
    schema: {
        type: 'object',
        properties: {
           image:{
              type: 'string',
              format: 'binary'
    }}}
      
  })
  subirImagen(@UploadedFile() file: Express.Multer.File, @Param('id') id:number) {
  return this.productoService.subirImagen(file,id)


}}