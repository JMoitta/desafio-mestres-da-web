import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Variation from "./Variation";
import User from "./User";
import VariableProduct from "./VariableProduct";

@Entity("product_variations")
class ProductVariation {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  variable_product_id: string;

  @ManyToOne(() => VariableProduct)
  @JoinColumn({name: 'variable_product_id'})
  variableProduct: VariableProduct;

  @Column()
  variation_id: string;

  @ManyToOne(() => Variation)
  @JoinColumn({name: 'variation_id'})
  Variation: Variation;

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

export default ProductVariation;
