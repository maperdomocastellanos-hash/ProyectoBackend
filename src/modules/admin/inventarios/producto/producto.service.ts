import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';


@Injectable()
export class ProductoService {
  constructor
  (
    @InjectRepository(Producto)
    private readonly prodRepo: Repository<Producto>,
    //Vamos a necesitar validar al crear el producto, la existencia de la categoria por eso inyectamos: 
    @InjectRepository(Categoria)
    private readonly cateRepo: Repository<Categoria>,
  ) {}

//**********************************************************************************************************************************
  
async listarProducto( 
  page: number = 1,         // Por defecto, pagina 1
  limit: number = 10,       // Por defecto, 10
  search: string = '',  
  warehouse: number = 0,      // Filtro por almacén (0 = sin filtro)
  estatus: boolean = true    // Filtro por estado (true = activos)
) {
  
  
  const queryBuilder = this.prodRepo.createQueryBuilder('producto')        // 'producto' es el alias
    // unir con la tabla intermedia: no podemos unir directo producto <--> almacen no hay campos que los relacionen, necesitamos la tabla intermedia que los conecte: 
    // escogemos el camino de producto y nos vamos por el puente de PinchesAlmacenes 
    // No se permite conectar dos tablas directamente en este escenario. Necesitas un puente, que es tu tabla AlmacenProducto.
    
    .leftJoinAndSelect('producto.PinchesAlmacenes', 'productoAlmacen')    //Aca typeORM entiende que debe irse por esa ruta //productoAlmacen y llega a la tabla Almacenproducto
    
    // Unir con Almacen usando 'almacenes' 
    .leftJoinAndSelect('productoAlmacen.almacenes', 'almacen')            // entonces Almacenproducto toma el alias productoAlmacen y a esa le pone el alias 'almacen'

    .leftJoinAndSelect('producto.categoria', 'categoria')                 //Relacion con categoria

    //Le dice a TypeORM: Toma el valor que viene en la variable estado de los parámetros de mi función, y mételo adentro de la caja vacía (llamada :estado) que definí en la condición
    .where('producto.estado = :estado', { estado: estatus });    // { estado } es un objeto de JS, 
    // producto.estado => Le dice a la base de datos: "Busca en la tabla producto (usando su alias) la columna llamada estado

    // Filtro por almacén (Si es mayor a 0, filtramos por el ID del almacén)
    if (warehouse && warehouse > 0) {
    // Usamos 'almacen.id' porque 'almacen' es el alias dado en leftJoinAndSelect
    queryBuilder.andWhere('almacen.id = :almacen', { almacen: warehouse });    // usando :almacen es una forma de protegernos de inyecciones SQL
    }

    // Filtro de búsqueda por nombre del producto (opcional, por si lo necesitas)
    if (search?.trim()) {
    queryBuilder.andWhere('producto.nombre ILIKE :search', { search: `%${search}%` });
    }

    // Paginación segura para relaciones (Ojo: con leftJoinAndSelect se usa skip/take, NO offset/limit)
    queryBuilder.skip((page - 1) * limit)
    .take(limit);


    // Retornamos los datos y el total de registros para armar la paginación en el frontend
  const [productos, total] = await queryBuilder.getManyAndCount();
  const totalPages = Math.ceil(total / limit)

  return {
    data: productos,
    total,
    limit,
    page,
    totalPages,
    estatus,
    warehouse,
    search
  };

  
}

//**********************************************************************************************************************************

async crearProducto(createProductoDto: CreateProductoDto) 
  {

try{
    //Primero debemos Validar si la categoria existe porque el usuario puede ingresar un producto
    //en una categoria que no existe, entonces es necesario amarrar y validar
    const categoria = await this.cateRepo.findOne({where: {id:createProductoDto.categoriaId}})  // categoriaId es la que existe en el DTO
    //aqui esta la relacion entre Id de CATEGORIA y llave foranea de categoria en PRODUCTOS
    
    if(!categoria) 
    {
      throw new NotFoundException('Categoria no encontrada')
    }

    const ExisteProducto = await this.prodRepo.findOne({where: {nombre:createProductoDto.nombre}});
    if(ExisteProducto)
    {
      throw new BadRequestException(`Ya existe un producto con el nombre "${createProductoDto.nombre}" dentro de la categoria "${createProductoDto.categoriaId}"`)
    }

    const producto = this.prodRepo.create({...createProductoDto,categoria});  
    //=> que miras bobo??, anda Pa'sha y traeme todos los campos del createProductoDto y adicionaL TRAEME: categoria (variable)
    return this.prodRepo.save(producto);
} catch (error) {
  if (error instanceof HttpException) {   // cubre NotFoundException, BadRequestException, etc.
    throw error;
  }
  throw new InternalServerErrorException('Error al guardar el Producto');
}}

//**********************************************************************************************************************************

  //Funcion mostrar por ID
  async Mostrar(id: number) {
    const Producto = await this.prodRepo.findOneBy({id});
    if(!Producto)
    {
      throw new NotFoundException(`Producto con ${id} no encontrado`)
    }
    return Producto;
  }

//**********************************************************************************************************************************


  async actualizarProductos(id: number, updateProductoDto: UpdateProductoDto){
    const Productos = await this.Mostrar(id); 
    const { categoriaId, ...RestoComposdatosProducto } = updateProductoDto;   
        //=> lo que nos interesa del "updateAlmacenDto" en este caso solamente es categoriaId, luego de eso ponemos una variable que llamaremos ...RestoComposdatosProducto y contendra el resto de campos del dto
        //=> Regla: Primero nombras lo que quieres sacar (categoriaId), y después el rest (variable: RestoComposdatosProducto)

        if (categoriaId) {                                       // "Si categoriaId tiene un valor (el usuario lo mandó)...
            const varCategoria = await this.cateRepo.findOne({where: { id: categoriaId }});  
            //entonces busca, en el repository de categoria un registro donde el id de esa tabla categoria sea igual al valor de categoriaId que es el que proviene del DTO, es decir, dato enviado por el usuario

        if (!varCategoria) 
          {
             throw new NotFoundException(`Producto con id ${categoriaId} no encontrada`);
          }

            Productos.categoria = varCategoria;                    // Para la tabla almacen, campo sucursal (almacen.sucursal) asigna varSucursal
        }

        Object.assign(Productos, RestoComposdatosProducto);    
        // =>  Object.assign(objetoDestino, objetoOrigen);  
        // =>  Es decir lo que viene en "RestoComposdatosProducto" se sobreescribe en "producto", eso es el update
        // =>  Object.assign() es una función nativa de JavaScript que copia las propiedades de un objeto hacia otro objeto que ya existe, "sobrescribiendo lo que coincida"

        return await this.prodRepo.save(Productos);
    }


//**********************************************************************************************************************************


async subirImagen(file:Express.Multer.File, id:number){
  const validarImagen = ['image/png','image/jpeg','image/jpg'];
  if(!validarImagen.includes(file.mimetype))
    {
        throw new BadRequestException('El formato ingresado no es valido');
    }

// Validar tamaño del archivo 
    const maxSize = 5*1024*1024;

    if(file.size>maxSize)
    {
        throw new BadRequestException('El archivo es muy grande')
    }

    const prod = await this.Mostrar(id)
    prod.imagen = file.path;
    this.prodRepo.save(prod)

    return{message: 'archivo subido', filepath:file.path}                //lo que va dentro de {} es un objeto


}

}