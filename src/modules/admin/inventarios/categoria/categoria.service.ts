import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private readonly catRepo: Repository<Categoria>,
  ) {}

  async listarCategoria() {
    try {
      return await this.catRepo.find({relations: {productos:true}});
    } catch (error) {
      throw new InternalServerErrorException('Error al listar las categorías');
    }
  }

  async guardarCategoria(createCategoriaDto: CreateCategoriaDto) {
    const varExisteCategoria = await this.catRepo.findOne({where: {nombre:createCategoriaDto.nombre} });    // donde nombre en la entity coincida con el nombre enviado por el usuario y me llega por medio del DTO
        
    if (varExisteCategoria) 
      {
        throw new BadRequestException(`Ya existe una categoria con el nombre "${createCategoriaDto.nombre}"`);
      }
      const nuevaCategoria = this.catRepo.create(createCategoriaDto);
      return await this.catRepo.save(nuevaCategoria);
    
  }

  async mostrarCategoria(id: number) {
    try {
      const categoria = await this.catRepo.findOne({where: {id:id},relations: {productos:true}});
      if (!categoria) throw new NotFoundException(`Categoría con id ${id} no fue encontrada`);
      return categoria;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al mostrar la categoría');
    }
  }

  
  async modificarCategoria(id: number, datos: UpdateCategoriaDto) {
    try {
      // Forma mas comun
      const categoria = await this.catRepo.update(id, datos);
      if (categoria.affected===0) throw new NotFoundException(`Categoría con id ${id} no encontrada`);
      return categoria
      
      //Otra forma:
      //const categoria = await this.mostrarCategoria(id);
      //this.catRepo.merge(categoria, datos)
    
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al modificar la categoría');
    }
  }

 
  async eliminarCategoria(id:number){
    /*try{
    const categoria = await this.catRepo.delete(id);
    if (categoria.affected === 0) throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    return categoria;  
  }catch(error){
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException('Error al eliminar la categoria');

  }*/
    }


}