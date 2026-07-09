import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clienteproveedor')
export class ClienteProveedor {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    tipo!: 'Cliente' | 'Proveedor'

    @Column()
    razonSocial?:string;

    @Column({length:100, nullable:true})
    identificacion?:string;

    @Column({length:20, nullable:true})
    telefono?: string;

    @Column({length:200, nullable:true})
    direccion?: string;

    @Column({length:200, nullable:true})
    correo?: string;

    @Column()
    estado!: boolean;

}
