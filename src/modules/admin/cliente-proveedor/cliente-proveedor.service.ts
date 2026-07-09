import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteProveedorDto } from './dto/create-cliente-proveedor.dto';
import { UpdateClienteProveedorDto } from './dto/update-cliente-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteProveedor } from './entities/cliente-proveedor.entity';

@Injectable()
export class ClienteProveedorService {
  constructor(
    @InjectRepository(ClienteProveedor)
    private readonly clienteProveedorRepo : Repository<ClienteProveedor> 
  ){}

  async Crear(datos: CreateClienteProveedorDto) {

    const ExisteCP = await this.clienteProveedorRepo.findOne({where: {identificacion:datos.identificacion}})

    if(ExisteCP){
      throw new BadRequestException(`Ya existe el cliente con identificacion ${datos.identificacion} favor ingresar nuevo cliente`)
    }

    const clienteProveedor = this.clienteProveedorRepo.create(datos);
    return await this.clienteProveedorRepo.save(clienteProveedor);
  }


  async ListarclienteProveedor (search?:string) 
  {
    const query = this.clienteProveedorRepo.createQueryBuilder('clienteproveedor');    //alias
    
    if(search){
      query.andWhere('clienteproveedor.razonSocial ILIKE :search', {search: `%${search}%`})
      //queryBuilder.andWhere('producto.nombre ILIKE :search', { search: `%${search}%` });
    }   
    return await query.getMany();
  }


  async MostrarUno(id: number) {
    const clienteProveedor = await this.clienteProveedorRepo.findOneBy({id});

    if(!clienteProveedor){
        throw new NotFoundException('Cliente ó proveedor no existe');
    }
    return clienteProveedor;
    }

  async ActualizarCP (id: number, updateClienteProveedorDto: UpdateClienteProveedorDto) {
    const clienteProveedor = await this.MostrarUno(id);
    Object.assign(clienteProveedor, updateClienteProveedorDto);  
    //Object.assign(Productos, RestoComposdatosProducto);    
    return await this.clienteProveedorRepo.save(clienteProveedor);
  }


  remove(id: number) {
    return `This action removes a #${id} clienteProveedor`;
  }
}
