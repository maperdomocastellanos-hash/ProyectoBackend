import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  //entendiendo parte de la estructura: 
  //Dentro de los metodos puedo usar elementos del constructor siempre y cuando todo este encapsulado dentro de la clase "UsersService"
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>   
  ){}

  async Listar() {
  try{
        return await this.userRepository.find();
  } catch(error){
        console.log(error);
        throw new InternalServerErrorException ('Error al listar usuario')
  }}

  async guardar(informacionRecibida:CreateUserDto)
  {
      try{
    
        // Aqui, qué es donde se guardan los datos necesitamos hacer dos cosas esenciales::
        // 1. verificar si el correo ingresado ya existe de lo contrario no registrar esa info
        // 2. Encriptar la contraseña

        const { email:correo, name:nombre, ...RestodeCampos } = informacionRecibida;    
        //...RestoDeCampos contiene el resto de campos de la tabla (incluye password, por necesitamos traer aqui demasiados campos//
        // En esta linea anterior unicamente las variables que necesitamos, pero pueden ser muchas, por eso usamos: RestoDatos o cualquier otro nombre asignado

        // Verificar si el email ingresado por el usuario ya existe: 
        const existeEmail = await this.userRepository.findOneBy({email:correo})

        if(existeEmail){
            throw new BadRequestException(`El correo ${correo} ya existe, favor ingresar nuevo correo`)
        }      

        //si no existe entonces preparamos la inyeccion de datos pero incriptando primero la contraseña
        
        //incriptacion: 
        const passwordIncriptada = await bcrypt.hash(RestodeCampos.password,12)

        const NuevoUsuario = this.userRepository.create({...informacionRecibida, password:passwordIncriptada})
        // Explicacion: aqui le estoy diciendo: 
        // Vos Hdp....copia todos los campos ==> (...informacionRecibida) y especificamente el campo password 
        // sustituyelo por la variable passwordIncriptada (password:passwordIncriptada)
        // ...informacionRecibida esto es ==> todos los campos en TS

        return await this.userRepository.save(NuevoUsuario);

      } catch(error){

        if(error instanceof BadRequestException){     // si ya existe un error previo, entonces: 
          throw error;                                // solamente muestra el error previo que se habia generado con el msj: ya existe
        }  
        throw new InternalServerErrorException('Error al guardar el usuario') // de lo contrario muestra este msj
      }}
  

// OJO: 
// Esto: const { email, name, ...restoDatos } = informacionRecibida;
//  -->
//  Es exactamente igual a esto:
//  const email    = informacionRecibida.email;
//  const name     = informacionRecibida.name;
//  const password = informacionRecibida.password;
//  es para no crear 3 lineas o mas y ahorrar codigo aunque bien las podemos usar asi linea a linea


async mostrar(Id: string) {
  try {
    const usuario = await this.userRepository.findOneBy({ Id: Id });
    if (!usuario) throw new NotFoundException(`Usuario con id ${Id} no encontrado`);
    return usuario;
  } catch (error) {
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException(`Error al buscar el usuario con id ${Id}`);
  }
}


//Creamos una funcion "mostrar" para usar PROPIAMENTE en la autenticacion::
async ExtraerDatosPorEmail(correo: string) {   //parametro
try{
  const usuario = await this.userRepository.findOneBy({email: correo});
     if (!usuario) throw new NotFoundException(`usuario con id ${correo} no encontrado`);  //si no hay nada --> Publicacion con id ${id} no encontrada
     return usuario;
} catch(error){
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException(`usuario con id ${correo} no encontrado`);  
}}
//Termina



async ActualizarData(id: string, DatosModificados: UpdateUserDto) {    //Id = Este es el campo de entity
try{    
  const usuario = await this.userRepository.update({Id:id},DatosModificados) //Id --> Este es el campo de entity
    if(usuario.affected === 0) throw new NotFoundException(`Usuario con id ${id} no encontrado`)
    return usuario;
  } catch(error){
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException(`Usuario con id ${id} no encontrado`);  

  }}


  async Eliminar(id: string) {    
    const usuario = await this.userRepository.delete( {Id: id} )  //Id --> Este es el campo de entity
    if(usuario.affected === 0)
      {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

        return { message: `Usuario con id ${id} eliminado correctamente` };
  }
}




