import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Almacen } from "../../almacen/entities/almacen.entity";

@Entity('Sucursales')
export class Sucursal {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({length:100})
    nombre!:string;

    @Column({length:255})
    direccion!:string;

    @Column({length:22})
    telefono!: string;

    @Column({length:100})
    ciudad!: string;

    @OneToMany(()=>Almacen, alm =>alm.sucursal)
    almacen!: Almacen[]

}
