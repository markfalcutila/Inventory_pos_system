import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class StockMovement extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn({ name: "product_id" })
    product!: Product;
    
    @Column({ type: "integer" })
    type!: number; // 0: in, 1: out
    
    @Column({ type: "integer" })
    quantity!: number; // 0: inactive, 1: active

    @Column({ type: "varchar", length: 255})
    reason!: string;

    @Column({ type: "varchar", length: 255 })
    ref_id!: string;

    @Column({ type: "datetime" })
    date!: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: User;
}
