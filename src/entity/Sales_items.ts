import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sales } from "./Sales"; // Link to Sales entity
import { Product } from "./Product"; // Assuming you have a Product entity for the items sold

@Entity()
export class SaleItems extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Sales, (sales) => sales.id) // Linking SaleItems to a Sale
    sale!: Sales;

    @ManyToOne(() => Product, (product) => product.id) // Linking SaleItems to a Product
    product!: Product;

    @Column({ type: "integer" })
    quantity!: number; // Quantity of the product in the sale

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number; // Price per unit of the product

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total!: number; // Total price for this item (quantity * price)

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    discount!: number; // Discount applied on the item

    @Column({ type: "varchar", length: 255 })
    ref_no!: string; // Reference number for this sale item (could relate to a payment or transaction reference)
}
