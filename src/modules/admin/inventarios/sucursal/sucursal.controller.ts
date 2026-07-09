import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';

//@ApiBearerAuth()
//@UseGuards(AuthGuard) 
@Controller('sucursal')
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Post()
  create(@Body() createSucursalDto: CreateSucursalDto) {
    return this.sucursalService.create(createSucursalDto);
  }

  @Get()
  findAll() {
    return this.sucursalService.ListarSucursales();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sucursalService.Mostrar(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSucursalDto: UpdateSucursalDto) {
    return this.sucursalService.Actualizar(+id, updateSucursalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sucursalService.eliminar(+id);
  }
}
