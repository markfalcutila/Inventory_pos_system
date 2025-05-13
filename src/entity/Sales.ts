import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./Payment";

@Entity()
export class Sales extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    invoice_no!: string;

    @Column({ type: "integer" })
    user_id!: number; // Foreign key to Users table

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_amount!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    discount!: number;

    @Column({ type: "integer" })
    payment_type!: number; // 0: cash, 1: credit, 2: cheque

    @Column({ type: "datetime" })
    date!: Date;

    @OneToMany(() => Payment, (payment) => payment.sale) // Payments related to this sale
    payments!: Payment[]; 
}
