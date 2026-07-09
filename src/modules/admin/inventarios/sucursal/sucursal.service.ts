// sucursal.service.ts
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sucursal } from "./entities/sucursal.entity";
import { CreateSucursalDto } from "./dto/create-sucursal.dto";
import { UpdateSucursalDto } from "./dto/update-sucursal.dto";
import { Almacen } from "../almacen/entities/almacen.entity";

@Injectable()
export class SucursalService {

    constructor(
        @InjectRepository(Sucursal)
        private readonly sucursalRepository: Repository<Sucursal>,

    ) {}


    //Listar (Usando lo normal: FindOne y simplemente relation:...)
    async ListarSucursales() 
    {
        return await this.sucursalRepository.find({relations: {almacen:true}});
    }
    
    /* 
    // Tambien se puede usar QueryBuilder, pero esta es una relacion directa entre sucursal y almacen
    // entonces es mas facil utilizar la forma anterior .find({relations: {almacen:true}}
    // por regla se aplica QueryBuilder cuando son relaciones de tablas que iran creciendo mucho en el tiempo

    async ListarSucursales() {
    const query = this.sucursalRepository.createQueryBuilder('sucursal')
    .leftJoinAndSelect('sucursal.almacen', 'almacen');
    return await query.getMany();
    }*/
    
    //****************************************Crear y guardar*****************************************

    // Validar si la sucursal ingresada ya existe:
    async create(createSucursalDto: CreateSucursalDto) {
        const existeSucursal= await this.sucursalRepository.findOne({
            where: { nombre: createSucursalDto.nombre}})

     if (existeSucursal) 
        {
            throw new BadRequestException(`Ya existe una sucursal con el nombre "${createSucursalDto.nombre}"`
        );
        }
    
        const sucursal = this.sucursalRepository.create(createSucursalDto);
        return await this.sucursalRepository.save(sucursal)   

    }


    async Mostrar(id: number) {
    const sucursal = await this.sucursalRepository.findOne({where: {id:id},relations: {almacen:true}})
        if (!Sucursal) {
            throw new NotFoundException(`Sucursal con id ${id} no encontrada`);
        }
        return sucursal
      }
    
    /*
    Segunda forma de hacerlo, igual que en listar podriamos usar QueryBuilder

    async Mostrar(id: number) {
    const query = this.sucursalRepository
        .createQueryBuilder('sucursal')
        .leftJoinAndSelect('sucursal.almacen', 'almacen')
        .where('sucursal.id = :id', { id });

    const sucursal = await query.getOne(); // devuelve Sucursal | null

    if (!sucursal) {
        throw new NotFoundException(`Sucursal con id ${id} no encontrada`);
    }

    return sucursal;
}
    */

    async Actualizar(id: number, updateSucursalDto: UpdateSucursalDto){
        try{

        const sucursal = await this.sucursalRepository.update(id, updateSucursalDto);
          if(sucursal.affected===0) throw new NotFoundException(`Publicacion con id ${id} no encontrada`);    
        }catch(error){
            if (error instanceof NotFoundException) throw error;
               throw new InternalServerErrorException('Error al modificar la sucursal');  

        }}

    async eliminar(id: number){
    const sucursal = await this.sucursalRepository.delete(id);
    if (sucursal.affected === 0) throw new NotFoundException(`Sucursal con id ${id} no encontrada`);
    return sucursal;  
}}