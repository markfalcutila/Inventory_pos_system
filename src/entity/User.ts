import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    username!: string;

    @Column({ type: "varchar", length: 255})
    name!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    // This column will be included in SELECTs
    @Column({ name: 'role_id' })
    role_id!: number;

    @ManyToOne(() => Role, { nullable: false })  // Add nullable: false to ensure role is mandatory
    @JoinColumn({ name: "role_id" })  // Specify the foreign key column
    role!: Role;

    @Column({ type: "integer", default: 1 })  // Default to active
    status!: number; // 0: inactive, 1: active

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
}
