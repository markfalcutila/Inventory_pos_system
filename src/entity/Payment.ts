import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sales } from "./Sales"; // Link to Sales entity

@Entity()
export class Payment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Sales, (sales) => sales.id) // Linking Payment to a Sale
    sale!: Sales;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: number; // Amount paid in this payment

    @Column({ type: "integer" })
    method!: number; // Payment method (0: cash, 1: credit, 2: cheque)

    @Column({ type: "varchar", length: 255 })
    ref_no!: string; // Payment reference number (could be a transaction ID)

    @Column({ type: "datetime" })
    payment_date!: Date; // Date of the payment

    @Column({ type: "varchar", length: 255, nullable: true })
    note?: string; // Optional note (e.g., reason for payment, comments)
}
