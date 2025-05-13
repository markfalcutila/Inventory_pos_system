import { Request, Response } from "express";
import { Payment } from "../entity/Payment";
import { Sales } from "../entity/Sales";

export class PaymentController {

    // get payments
    async getPayments(req: Request, res: Response) {
        try {
            const payments = await Payment.find();
            res.json(payments);
            console.log("Payments fetched successfully:", payments);
        } catch (error) {
            res.status(500).json({ message: "Error fetching payments", error });
            console.error("Error fetching payments:", error);
        }
    }

    // create payment
    async createPayment(req: Request, res: Response) {
        const { sale, amount, method, ref_no, payment_date, note } = req.body;

        try {
            const findSale = await Sales.findOneBy({ id: Number(sale) });
            if (!findSale) {
                res.status(404).json({ message: "Sale not found" });
                console.log("Sale not found:", sale);
                return;
            }
            const newPayment = Payment.create({ sale, amount, method, ref_no, payment_date, note });
            await newPayment.save();
            res.status(201).json({ message: "Payment created successfully", payment: newPayment });
            console.log("Payment created successfully:", newPayment);
        } catch (error) {
            res.status(500).json({ message: "Error creating payment", error });
            console.error("Error creating payment:", error);
        }
    }

    // update payment
    async updatePayment(req: Request, res: Response) {
        const { id, sale, amount, method, ref_no, payment_date, note } = req.body;

        try {
            const payment = await Payment.findOneBy({ id: Number(id) });
            if (payment) {

                const findSale = await Sales.findOneBy({ id: Number(sale) });
                if (!findSale) {
                    res.status(404).json({ message: "Sale not found" });
                    console.log("Sale not found:", sale);
                    return;
                }
                
                payment.sale = sale;
                payment.amount = amount;
                payment.method = method;
                payment.ref_no = ref_no;
                payment.payment_date = payment_date;
                payment.note = note;
                await payment.save();
                res.status(200).json({ message: "Payment updated successfully", payment });
                console.log("Payment updated successfully:", payment);
            } else {
                res.status(404).json({ message: "Payment not found" });
                console.log("Payment not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating payment", error });
            console.error("Error updating payment:", error);
        }
    }

    // delete payment
    async deletePayment(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const payment = await Payment.findOneBy({ id: Number(id) });
            if (payment) {
                await payment.remove();
                res.status(200).json({ message: "Payment deleted successfully" });
                console.log("Payment deleted successfully:", id);
            } else {
                res.status(404).json({ message: "Payment not found" });
                console.log("Payment not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting payment", error });
            console.error("Error deleting payment:", error);
        }
    }
}