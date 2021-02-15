import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class CreateProductVariations1613336528417
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product_variations",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "value",
            type: "decimal",
            precision: 11,
            scale: 2,
            isNullable: false,
          },
          {
            name: "variable_product_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "variation_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "creator_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
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
      "product_variations",
      new TableForeignKey({
        name: "VariavelProduct",
        columnNames: ["variable_product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "variable_products",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "product_variations",
      new TableForeignKey({
        name: "Variation",
        columnNames: ["variation_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "variations",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "product_variations",
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
    await queryRunner.dropTable("product_variations");
  }
}
