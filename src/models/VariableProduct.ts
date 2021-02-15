import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Product from "./Product";
import User from "./User";

@Entity("variable-products")
class VariableProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal")
  currentPrice: number;

  @Column()
  sku: string;

  @Column()
  descrition: string;

  @Column()
  shortDescription: string;

  @Column()
  stock: number;

  @Column()
  product_origin_id: string;

  @ManyToOne(() => Product)
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
