import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablaClienteProveedor1782584219109 implements MigrationInterface {
    name = 'CreateTablaClienteProveedor1782584219109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clienteproveedor" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "razonSocial" character varying NOT NULL, "identificacion" character varying(100), "telefono" character varying(20), "direccion" character varying(200), "correo" character varying(200), "estado" boolean NOT NULL, CONSTRAINT "PK_3b292e9940fd3972fed562cb167" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clienteproveedor"`);
    }

}
