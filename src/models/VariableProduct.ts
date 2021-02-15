import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Product from "./Product";
import ProductVariation from "./ProductVariation";
import User from "./User";

@Entity("variable_products")
class VariableProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal")
  currentPrice: number;

  @Column()
  sku: string;

  @Column()
  description: string;

  @Column()
  shortDescription: string;

  @Column()
  stock: number;

  @OneToMany(() => ProductVariation, productVariation => productVariation.variableProduct)
  productVariations: ProductVariation[];

  @Column()
  product_origin_id: string;

  @ManyToOne(() => Product, product => product.variableProducts)
  @JoinColumn({name: 'product_origin_id'})
  productOrigin: Product;

  @Column()
  creator_id: string;
  
  @ManyToOne(() => User)
  @JoinColumn({name: 'creator_id'})
  creator: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default VariableProduct;
