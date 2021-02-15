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
import User from "./User";
import VariableProduct from "./VariableProduct";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

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

  @Column()
  isVariable: boolean;

  @OneToMany(() => VariableProduct, variableProduct => variableProduct.productOrigin)
  variableProducts: VariableProduct[];
  
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

export default Product;
