import { PaymentModel } from "./Payment.model";

export class SalesModel {
    id!: number;
    invoice_no!: string;
    user_id!: number;
    total_amount!: number;
    discount!: number;
    payment_type!: number;
    date!: Date;
    payments!: PaymentModel;
}