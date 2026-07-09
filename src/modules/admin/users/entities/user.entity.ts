import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    Id!: string;

    @Column({type: 'varchar', length:50})    
    name!: string;

    @Column({unique:true})    
    email!: string;

    @Column()    
    password!: string;     

    @Column({default:true})
    status!: boolean;    

}
