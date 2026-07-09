import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sucursal } from "../../sucursal/entities/sucursal.entity";
import { AlmacenProducto } from "./almacen_producto.entity";
import { movimiento } from "src/modules/admin/nota/entities/movimiento.entity";

@Entity('Almacenes')
export class Almacen {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({length:100})
    Nombre!:string;

    @Column({length:100, nullable:true})
    codigoAlmacen!:string;

    @Column({type:'text', nullable:true})
    descripcion!: string;

    @ManyToOne(()=> Sucursal, suc=>suc.almacen, {eager:true})
    sucursal!: Sucursal

    //Un almacen tiene muchos productos, es la forma de no usar manyToMany:
    //en la tabla pivot declaramos el manyToOne    //un almacen tiene muchos productos 
    @OneToMany(()=>AlmacenProducto, ap =>ap.almacenes)
    PinchesProductos!:AlmacenProducto[];   //Nombreasignado : Class

    @OneToMany(()=>movimiento, mov =>mov.almacen)
    pinchesalmacenesMovimiento!: movimiento[]

}
