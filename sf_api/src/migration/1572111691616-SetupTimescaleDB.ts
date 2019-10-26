import {MigrationInterface, QueryRunner} from "typeorm";

export class SetupTimescaleDB1572111691616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE`);
    }

    // @ts-ignore
    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
