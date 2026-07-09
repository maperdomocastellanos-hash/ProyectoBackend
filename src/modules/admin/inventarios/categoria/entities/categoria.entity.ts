import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "../../producto/entities/producto.entity";

@Entity('Categorias')
export class Categoria {

    @PrimaryGeneratedColumn()    
    id!:number;

    @Column({length:100})
    nombre!: string;

    @Column({type:'text',nullable:true})
    Descripcion?: string;

    @OneToMany(()=>Producto, prod =>prod.categoria)
    productos!:Producto[];

    

}   
