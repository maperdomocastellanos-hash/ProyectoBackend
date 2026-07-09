import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablaProductoCategoria1782083959708 implements MigrationInterface {
    name = 'CreateTablaProductoCategoria1782083959708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.
        query(
            `CREATE TABLE 
            "Productos" (
            "id" SERIAL NOT NULL, 
            "nombre" character varying(200) NOT NULL, 
            "Descripcion" text NOT NULL, 
            "precio_Venta" numeric(12,2) NOT NULL, 
            "imagen" character varying(255), 
            "estado" boolean NOT NULL, 
            "categoriaId" integer, 
            CONSTRAINT "PK_4680901d0dbc98fac6a8588cda8" PRIMARY KEY ("id"))`);

        await queryRunner.
        query(
            `CREATE TABLE 
            "Categorias" (
            "id" SERIAL NOT NULL, 
            "nombre" character varying(100) NOT NULL, 
            "Descripcion" text, 
            CONSTRAINT "PK_474e737d774d0ee93e86dd1ae1f" PRIMARY KEY ("id"))`);

        await queryRunner.
        query(
            `ALTER TABLE 
            "Productos" ADD CONSTRAINT 
            "FK_11e56c4175d8b277b59b7e26a08" 
            FOREIGN KEY ("categoriaId") 
            REFERENCES "Categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Productos" DROP CONSTRAINT "FK_11e56c4175d8b277b59b7e26a08"`);
        await queryRunner.query(`DROP TABLE "Categorias"`);
        await queryRunner.query(`DROP TABLE "Productos"`);
    }

}
