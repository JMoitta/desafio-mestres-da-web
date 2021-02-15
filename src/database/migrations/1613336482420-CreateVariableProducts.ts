import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class CreateVariableProducts1613336482420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "variable_products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
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
            isUnique: true,
            length: "100",
          },
          {
            name: "description",
            type: "VARCHAR",
            length: "100",
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
            name: "product_origin_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "creator_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "create_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "variable_products",
      new TableForeignKey({
        name: "ProductOrigin",
        columnNames: ["product_origin_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "variable_products",
      new TableForeignKey({
        name: "UserCreator",
        columnNames: ["creator_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("variable_products");
  }
}
