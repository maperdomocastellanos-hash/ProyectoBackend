import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablaSucursalAlmacenProducto1782135799094 implements MigrationInterface {
    name = 'CreateTablaSucursalAlmacenProducto1782135799094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Sucursales" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "direccion" character varying(255) NOT NULL, "telefono" character varying(22) NOT NULL, "ciudad" character varying(100) NOT NULL, CONSTRAINT "PK_4203731c03e4cab177d22450bf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Almacenes" ("id" SERIAL NOT NULL, "Nombre" character varying(100) NOT NULL, "codigoAlmacen" character varying(100), "descripcion" text, "sucursalId" integer, CONSTRAINT "PK_931f273e83c99f0d2a495b3af1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "almacen_producto" ("id" SERIAL NOT NULL, "cantidadActual" integer NOT NULL, "fechaActualizacion" date NOT NULL, "almacenesId" integer, "productosId" integer, CONSTRAINT "PK_d012ea8045175d18843e998dea7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Almacenes" ADD CONSTRAINT "FK_f6dbedf19d9324f2ddb836c10f6" FOREIGN KEY ("sucursalId") REFERENCES "Sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" ADD CONSTRAINT "FK_cb74f7b3633045d626ff0c4a66e" FOREIGN KEY ("almacenesId") REFERENCES "Almacenes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" ADD CONSTRAINT "FK_9fd1e028b0f3489050471c809b2" FOREIGN KEY ("productosId") REFERENCES "Productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "almacen_producto" DROP CONSTRAINT "FK_9fd1e028b0f3489050471c809b2"`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" DROP CONSTRAINT "FK_cb74f7b3633045d626ff0c4a66e"`);
        await queryRunner.query(`ALTER TABLE "Almacenes" DROP CONSTRAINT "FK_f6dbedf19d9324f2ddb836c10f6"`);
        await queryRunner.query(`DROP TABLE "almacen_producto"`);
        await queryRunner.query(`DROP TABLE "Almacenes"`);
        await queryRunner.query(`DROP TABLE "Sucursales"`);
    }

}
