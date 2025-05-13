import { Request, Response } from "express";
import { StockMovement } from "../entity/Stock_movement";
import { Product } from "../entity/Product";
import { User } from "../entity/User";

export class StockMovementController {
    // get all stock movements
    async getStockMovements(req: Request, res: Response) {
        try {
            const stockMovements = await StockMovement.find();
            res.json(stockMovements);
            console.log("Stock movements fetched successfully:", stockMovements);
        } catch (error) {
            res.status(500).json({ message: "Error fetching stock movements", error });
            console.error("Error fetching stock movements:", error);
        }
    }

    // create stock movement
    async createStockMovement(req: Request, res: Response) {
        const { product, type, quantity, reason, ref_id, date, user } = req.body;

        try {
            const findProduct = await Product.findOneBy({ id: Number(product) });
            if (!findProduct) {
                res.status(404).json({ message: "Product not found" });
                console.log("Product not found:", product);
                return;
            }
            const findUser = await User.findOneBy({ id: Number(user) });
            if (!findUser) {
                res.status(404).json({ message: "User not found" });
                console.log("User not found:", user);
                return;
            }
            const newStockMovement = StockMovement.create({ product, type, quantity, reason, ref_id, date, user });
            await newStockMovement.save();
            res.status(201).json({ message: "Stock movement created successfully", stockMovement: newStockMovement });
            console.log("Stock movement created successfully:", newStockMovement);
        } catch (error) {
            res.status(500).json({ message: "Error creating stock movement", error });
            console.error("Error creating stock movement:", error);
        }
    }

    // update stock movement
    async updateStockMovement(req: Request, res: Response) {
        const { id, product, type, quantity, reason, ref_id, date, user } = req.body;
        console.log("Update stock movement request:", req.body);
        try {
            const stockMovement = await StockMovement.findOneBy({ id: Number(id) });
            if (stockMovement) {

                const findProduct = await Product.findOneBy({ id: Number(product) });
                if (!findProduct) {
                    res.status(404).json({ message: "Product not found" });
                    console.log("Product not found:", product);
                    return;
                }
                const findUser = await User.findOneBy({ id: Number(user) });
                if (!findUser) {
                    res.status(404).json({ message: "User not found" });
                    console.log("User not found:", user);
                    return;
                }
                
                stockMovement.product = product;
                stockMovement.type = type;
                stockMovement.quantity = quantity;
                stockMovement.reason = reason;
                stockMovement.ref_id = ref_id;
                stockMovement.date = date;
                stockMovement.user = user;
                await stockMovement.save();
                res.status(200).json({ message: "Stock movement updated successfully", stockMovement });
                console.log("Stock movement updated successfully:", stockMovement);
            } else {
                res.status(404).json({ message: "Stock movement not found" });
                console.log("Stock movement not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating stock movement", error });
            console.error("Error updating stock movement:", error);
        }
    }

    // delete stock movement
    async deleteStockMovement(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const stockMovement = await StockMovement.findOneBy({ id: Number(id) });
            if (stockMovement) {
                await stockMovement.remove();
                res.status(200).json({ message: "Stock movement deleted successfully" });
                console.log("Stock movement deleted successfully:", id);
            } else {
                res.status(404).json({ message: "Stock movement not found" });
                console.log("Stock movement not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting stock movement", error });
            console.error("Error deleting stock movement:", error);
        }
    }
}
