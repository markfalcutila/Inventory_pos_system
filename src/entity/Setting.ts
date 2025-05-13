import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Setting extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ type: "varchar", length: 255 })
    key!: string;
    
    @Column({ type: "varchar", length: 255 })
    value!: string;
}
