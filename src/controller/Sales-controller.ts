import { Request, Response } from "express";
import { Sales } from "../entity/Sales";
import { User } from "../entity/User";


export class SalesController {
    
    // get all sales
    async getSales(req: Request, res: Response) {
        try {
            const sales = await Sales.find();
            res.json(sales);
            console.log("Sales fetched successfully:", sales);
        } catch (error) {
            res.status(500).json({ message: "Error fetching sales", error });
            console.error("Error fetching sales:", error);
        }
    }

    // create sale
    async createSale(req: Request, res: Response) {
        const { invoice_no, user_id, total_amount, discount, payment_type, date } = req.body;

        try {
            const findUser = await User.findOneBy({ id: Number(user_id) });
            if (!findUser) {
                res.status(404).json({ message: "User not found" });
                console.log("User not found:", user_id);
                return;
            }
            const newSale = Sales.create({ invoice_no, user_id, total_amount, discount, payment_type, date });
            await newSale.save();
            res.status(201).json({ message: "Sale created successfully", sale: newSale });
            console.log("Sale created successfully:", newSale);
        } catch (error) {
            res.status(500).json({ message: "Error creating sale", error });
            console.error("Error creating sale:", error);
        }
    }

    // update sale
    async updateSale(req: Request, res: Response) {
        const { id, invoice_no, user_id, total_amount, discount, payment_type, date } = req.body;

        try {
            const sale = await Sales.findOneBy({ id: Number(id) });
            if (sale) {

                const findUser = await User.findOneBy({ id: Number(user_id) });
                if (!findUser) {
                    res.status(404).json({ message: "User not found" });
                    console.log("User not found:", user_id);
                    return;
                }
                sale.invoice_no = invoice_no;
                sale.user_id = user_id;
                sale.total_amount = total_amount;
                sale.discount = discount;
                sale.payment_type = payment_type;
                sale.date = date;
                await sale.save();
                res.status(200).json({ message: "Sale updated successfully", sale });
                console.log("Sale updated successfully:", sale);
            } else {
                res.status(404).json({ message: "Sale not found" });
                console.log("Sale not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating sale", error });
            console.error("Error updating sale:", error);
        }
    }

    // delete sale
    async deleteSale(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const sale = await Sales.findOneBy({ id: Number(id) });
            if (sale) {
                await sale.remove();
                res.status(200).json({ message: "Sale deleted successfully" });
                console.log("Sale deleted successfully:", id);
            } else {
                res.status(404).json({ message: "Sale not found" });
                console.log("Sale not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting sale", error });
            console.error("Error deleting sale:", error);
        }
    }
}