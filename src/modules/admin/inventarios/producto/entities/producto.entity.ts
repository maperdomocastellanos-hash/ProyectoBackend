import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Almacen } from "../../almacen/entities/almacen.entity";
import { AlmacenProducto } from "../../almacen/entities/almacen_producto.entity";
import { movimiento } from "src/modules/admin/nota/entities/movimiento.entity";


@Entity('Productos')
export class Producto {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({length:200})
    nombre!:string;     

    @Column({type:'text'})
    Descripcion?:string;

    @Column({type: 'decimal', precision:12, scale:2})
    precio_Venta!: number;
    
    @Column({length:255, nullable:true})
    imagen?: string;

    @Column()
    estado!:boolean;

    @ManyToOne(()=>Categoria, cat =>cat.productos, {eager:true})
    categoria!: Categoria


    //Un producto esta en muchos almacenes, es la forma de no usar manyToMany:
    //en la tabla pivot declaramos el manyToOne   // un Producto esta en muchos almacenes
    @OneToMany(()=>AlmacenProducto, ap=>ap.productos)
    PinchesAlmacenes!:AlmacenProducto[]         //  PinchesAlmacenes conecta <-----> con AlmacenProducto es el puente

    @OneToMany(()=>movimiento, mov =>mov.producto)
    pinchesProductoenMovimientos!: movimiento[]

}
