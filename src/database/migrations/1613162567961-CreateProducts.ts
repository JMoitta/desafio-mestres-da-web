import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateProducts1613162567961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: 'uuid_generate_v4()'
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
            length: "120",
          },
          {
            name: "currentPrice",
            type: "decimal",
            precision: 8,
            scale: 2,
            isNullable: false,
          },
          {
            name: "sku",
            type: "varchar",
            isNullable: false,
            isUnique: true,
            length: "100",
          },
          {
            name: "description",
            type: "VARCHAR",
            length: '100',
            isNullable: false,
          },
          {
            name: "shortDescription",
            type: "VARCHAR",
            length: "1000",
            isNullable: false,
          },
          {
            name: "stock",
            type: "integer",
            isNullable: false,
          },
          {
            name: "isVariable",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: 'now()',
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: 'now()',
            isNullable: false,
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
