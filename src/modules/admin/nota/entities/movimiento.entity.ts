import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClienteProveedor } from "../../cliente-proveedor/entities/cliente-proveedor.entity";
import { User } from "../../users/entities/user.entity";
import { Nota } from "./nota.entity";
import { Producto } from "../../inventarios/producto/entities/producto.entity";
import { Almacen } from "../../inventarios/almacen/entities/almacen.entity";

@Entity('movimientos')

export class movimiento {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'int'})
    cantidad!: number;

    @Column({type: 'varchar', length:20})
    tipoMovimiento!: 'ingreso'|'salida'|'devolucion'

    @Column({type:'decimal', precision:12, scale:2})
    precioCompra!: number;

    @Column({type:'decimal', precision:12, scale:2})
    precioVenta!: number;

    @Column({type:'text', nullable:true})
    observaciones?: string;
    
    @ManyToOne(()=>Nota, Nota=>Nota.movimientos, {eager:true})                    // muchas notas para un cliente  / proveedor
    nota!:Nota

    @ManyToOne(()=>Producto, prod=>prod.pinchesProductoenMovimientos, {eager:true})    //  ¿por qué no usar directamente almacenProducto si es la tabla pivot almacenProducto?
    producto!:Producto;

    @ManyToOne(()=>Almacen, alm=>alm.pinchesalmacenesMovimiento, {eager:true})       // ¿por qué no usar directamente almacenProducto si es la tabla pivot almacenProducto
    almacen!: Almacen;

}
