import { MigrationInterface, QueryRunner } from "typeorm";

export class CreataTablaUsers1781579302026 implements MigrationInterface {
    name = 'CreataTablaUsers1781579302026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_1e4be10b13490bd87f4cc30c142" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
