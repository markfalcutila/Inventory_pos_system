import { Request, Response } from "express";
import { SaleItems } from "../entity/Sales_items";
import { Product } from "../entity/Product";
import { Sales } from "../entity/Sales";


export class SaleItemsController {

    // get all sale items
    async getSaleItems(req: Request, res: Response) {
        try {
            const saleItems = await SaleItems.find();
            res.json(saleItems);
            console.log("Sale items fetched successfully:", saleItems);
        } catch (error) {
            res.status(500).json({ message: "Error fetching sale items", error });
            console.error("Error fetching sale items:", error);
        }
    }

    // create sale item
    async createSaleItem(req: Request, res: Response) {
        const { sale, product, quantity, price, total, discount, ref_no } = req.body;

        try {
            const newSaleItem = SaleItems.create({ sale, product, quantity, price, total, discount, ref_no });
            const findSale = await Sales.findOneBy({ id: Number(sale) });
            if (!findSale) {
                res.status(404).json({ message: "Sale not found" });
                console.log("Sale not found:", sale);
                return;
            }
            const findProduct = await Product.findOneBy({ id: Number(product) });
            if (!findProduct) {
                res.status(404).json({ message: "Product not found" });
                console.log("Product not found:", product);
                return;
            }
            await newSaleItem.save();
            res.status(201).json({ message: "Sale item created successfully", saleItem: newSaleItem });
            console.log("Sale item created successfully:", newSaleItem);
        } catch (error) {
            res.status(500).json({ message: "Error creating sale item", error });
            console.error("Error creating sale item:", error);
        }
    }

    async updateSaleItem(req: Request, res: Response) { 
        const { id, sale, product, quantity, price, total, discount, ref_no } = req.body;

        try {
            const saleItem = await SaleItems.findOneBy({ id: Number(id) });
            if (saleItem) {

                const findSale = await Sales.findOneBy({ id: Number(sale) });
                if (!findSale) {
                    res.status(404).json({ message: "Sale not found" });
                    console.log("Sale not found:", sale);
                    return;
                }
                const findProduct = await Product.findOneBy({ id: Number(product) });
                if (!findProduct) {
                    res.status(404).json({ message: "Product not found" });
                    console.log("Product not found:", product);
                    return;
                }
                saleItem.sale = sale;
                saleItem.product = product;
                saleItem.quantity = quantity;
                saleItem.price = price;
                saleItem.total = total;
                saleItem.discount = discount;
                saleItem.ref_no = ref_no;

                await saleItem.save();
                res.status(200).json({ message: "Sale item updated successfully", saleItem });
                console.log("Sale item updated successfully:", saleItem);
            } else {
                res.status(404).json({ message: "Sale item not found" });
                console.log("Sale item not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating sale item", error });
            console.error("Error updating sale item:", error);
        }

    }

    // delete sale item
    async deleteSaleItem(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const saleItem = await SaleItems.findOneBy({ id: Number(id) });
            if (saleItem) {
                await saleItem.remove();
                res.json({ message: "Sale item deleted successfully" });
                console.log("Sale item deleted successfully:", id);
            } else {
                res.status(404).json({ message: "Sale item not found" });
                console.log("Sale item not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting sale item", error });
            console.error("Error deleting sale item:", error);
        }
    }
}