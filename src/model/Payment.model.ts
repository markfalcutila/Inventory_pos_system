import { SalesModel } from "./sales.model";

export class PaymentModel {
    id!: number;
    sale!: SalesModel;
    amount!: number;
    method!: number;
    ref_no!: number;
    payment_date!: Date;
    note!: string;
}