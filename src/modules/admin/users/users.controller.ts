import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


  //entendiendo parte de la estructura: 
  //Dentro de los metodos puedo usar elementos del constructor siempre y cuando todo este encapsulado dentro de la clase "UsersService"
  // en este caso puedo usar la variable "UsersService" en cada metodo
  // Ojo algo particular es que no puedo usar lo de un metodo dentro de otro método

@ApiBearerAuth()  //Para aplicar candados al swagger, para acceder unicamente por Tokens
@UseGuards(AuthGuard)      
//Documentacion->> "antes de ejecutar este endpoint, pasá la petición por este Guard primero."    
//Documentacion->> Si colocamos el useGuard desde el controller, todo el CRUD esta protegido

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  
  @Get()
  funListar() {
    return this.UsersService.Listar();
  }

  @Post()
  funCreate(@Body() DatosIngresados : CreateUserDto) {
    return this.UsersService.guardar(DatosIngresados);
  }

  @Get(':id')
  funMostrar(@Param('id') Id: string) {
    return this.UsersService.mostrar(Id);   //un +id = el mas lo convierte en numero, quitamos el +
  }

  @Patch(':id')
  funActualizar(@Param('id') Id: string, @Body() ActualizarData: UpdateUserDto) {
    return this.UsersService.ActualizarData(Id, ActualizarData);
  }

  @Delete(':id')
  Eliminar(@Param('id') Id: string) {
    return this.UsersService.Eliminar(Id);
  }
}
