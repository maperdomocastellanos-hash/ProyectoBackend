import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Almacen } from './entities/almacen.entity';
import { Repository } from 'typeorm';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

@Injectable()
export class AlmacenService {
  constructor(
    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>
  ){}


  //*****************************************************************************************************
  async listarAlmacen() 
  {
    return await this.almacenRepository.find();  
    // No hace falta relations aquí: sucursal ya es eager:true en la entity
  }

  //*****************************************************************************************************
  
  async create(createAlmacenDto: CreateAlmacenDto) {
    //Creamos variable sucursal
    const sucursal= await this.sucursalRepository.findOne({where: { id: createAlmacenDto.sucursalId}});
    // Validamos si la sucursal enviada por el usuario ya existe
    if(!sucursal)
    {
    throw new NotFoundException(`Sucursal con Id ${createAlmacenDto.sucursalId} no encontrada `)
    }

    const almacenExiste = await this.almacenRepository.findOne({where: {Nombre: createAlmacenDto.Nombre, sucursal: {id: createAlmacenDto.sucursalId}}});
    // Validamos si el almacen enviado por el usuario ya existe para esa Sucursal  -- puede haber el mismo nombre de almacen para varias sucursales
    if (almacenExiste) 
    {
      throw new BadRequestException(`Ya existe un almacén con el nombre "${createAlmacenDto.Nombre}" en la sucursal "${createAlmacenDto.sucursalId}" `);                  
    }
    const almacen = this.almacenRepository.create({...createAlmacenDto,sucursal})
    return await this.almacenRepository.save(almacen)
  }


  //*******************************************************************************************************

  //Funcion mostrar por ID
  async Mostrar(id: number) {
    const almacen = await this.almacenRepository.findOneBy({id});
    if(!almacen)
    {
      throw new NotFoundException(`Almacen con ${id} no encontrado`)
    }
    return almacen;
  }

//*******************************************************************************************************

// al modificar un almacen tambiem debemos validar si la sucursal existe: porque puedo equivocarme y 
// colocar una sucursal que no existe: 
// En el caso que tengamos de por medio un proceso de validacion, es necesario entonces primero buscar y luego salvar 
// Esto nos lleva a no usar UPDATE, sino (findOne y Save)  => es la otra manera!
// el update solo actualiza, no valida nada

    async update(id: number, updateAlmacenDto: UpdateAlmacenDto){
        const almacen = await this.Mostrar(id); 
        const { sucursalId, ...RestoComposdatosAlmacen } = updateAlmacenDto;   
        //=> lo que nos interesa del "updateAlmacenDto" en este caso solamente es sucursalId, luego de eso ponemos una variable que llamaremos ...RestoComposdatosAlmacen y contendra el resto de campos del dto
        //=> Regla: Primero nombras lo que quieres sacar (sucursalId), y después el rest (variable: RestoComposdatosAlmacen)

        if (sucursalId) {                                       // "Si sucursalId tiene un valor (el usuario lo mandó)...
            const varSucursal = await this.sucursalRepository.findOne({where: { id: sucursalId }});  
            //entonces busca, en el repository de Sucursal (this.sucursalRepository), un registro donde el id de esa tabla Sucursales sea igual al valor de sucursalId

        if (!varSucursal) 
          {
             throw new NotFoundException(`Sucursal con id ${sucursalId} no encontrada`);
          }

            almacen.sucursal = varSucursal;                    // Para la tabla almacen, campo sucursal (almacen.sucursal) asigna varSucursal
        }

        Object.assign(almacen, RestoComposdatosAlmacen);    
        // =>  Object.assign(objetoDestino, objetoOrigen);  
        // =>  Es decir lo que viene en "RestoComposdatosAlmacen" se sobreescribe en "almacen", eso es el update
        // =>  Object.assign() es una función nativa de JavaScript que copia las propiedades de un objeto hacia otro objeto que ya existe, "sobrescribiendo lo que coincida"

        return await this.almacenRepository.save(almacen);
    }


//*******************************************************************************************************

  remove(id: number) {
    return `This action removes a #${id} almacen`;
  }
}
