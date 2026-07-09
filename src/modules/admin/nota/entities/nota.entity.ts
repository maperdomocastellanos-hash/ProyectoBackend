import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClienteProveedor } from "../../cliente-proveedor/entities/cliente-proveedor.entity";
import { User } from "../../users/entities/user.entity";
import { movimiento } from "./movimiento.entity";

@Entity('notas')

export class Nota {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    fecha!:Date;

    @Column()
    tipo_nota!: string   //compra - venta

    @Column({length:50})
    estadoNota!: string; 

    @Column()
    observaciones?:string;

    @ManyToOne(()=>User,{eager:true})
    user!: User

    @ManyToOne(()=>ClienteProveedor, {eager:true})                    // muchas notas para un cliente  / proveedor
    clienteproveedor!:ClienteProveedor

    @OneToMany(()=>movimiento, mov=> mov.nota)
    movimientos!: movimiento[]



}
