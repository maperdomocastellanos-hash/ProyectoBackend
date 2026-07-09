import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll() {
    return this.categoriaService.listarCategoria();
  }

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.guardarCategoria(createCategoriaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.mostrarCategoria(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.modificarCategoria(+id, updateCategoriaDto);
  }

  @Delete(':id')
  Eliminar(@Param('id') id: string) {
    return this.categoriaService.eliminarCategoria(+id);
  }

  

}
