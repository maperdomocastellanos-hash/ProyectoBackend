//Se crea una tabla nueva por la relacion many to many

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Almacen } from "./almacen.entity";
import { Producto } from "../../producto/entities/producto.entity";

@Entity()
export class AlmacenProducto{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: 'int'})
    cantidadActual!: number; 

    @Column({type: 'date',nullable: true})
    fechaActualizacion?:Date; 

    // importamos "Almacen" y relacionamos el alias con el campo de almacen.entity llamado PinchesProductos
    @ManyToOne(()=>Almacen, alm => alm.PinchesProductos, {eager:true})  //eager: llena automaticamente la relacion
    almacenes!:Almacen

    //importamos la clase "producto" y relacionamos el alias con el campo de producto.entity llamado PinchesAlmacenes
    @ManyToOne(()=>Producto,Prod =>Prod.PinchesAlmacenes, {eager:true})  //eager: llena automaticamente la relacion
    productos!:Producto

}