import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255 })
    sku!: string;

    @Column({ type: "varchar", length: 255 })
    barcode!: string;

    @Column( { name: 'category_id' })
    category_id!: number;

    @ManyToOne(() => Category, { nullable: false })
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    cost!: number;

    @Column({ type: "int" })
    stock!: number;

    @Column({ type: "varchar", length: 255 })
    unit!: string;

    @Column({ type: "boolean" })
    is_active!: boolean;
}
