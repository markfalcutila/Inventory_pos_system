import { Request, Response } from "express";
import { Suppliers } from "../entity/Suppliers";

export class SupplierController {
    // get all suppliers
    async getSuppliers(req: Request, res: Response) {
        try {
            const suppliers = await Suppliers.find();
            res.json(suppliers);
            console.log("Suppliers fetched successfully:", suppliers);
        } catch (error) {
            res.status(500).json({ message: "Error fetching suppliers", error });
            console.error("Error fetching suppliers:", error);
        }
    }

    // create supplier
    async createSupplier(req: Request, res: Response) {
        const { name, contact, address } = req.body;

        try {
            const newSupplier = Suppliers.create({ name, contact, address});
            await newSupplier.save();
            res.status(201).json({ message: "Supplier created successfully", supplier: newSupplier });
            console.log("Supplier created successfully:", newSupplier);
        } catch (error) {
            res.status(500).json({ message: "Error creating supplier", error });
            console.error("Error creating supplier:", error);
        }
    }

    // update supplier
    async updateSupplier(req: Request, res: Response) {
        const { id, name, contact, address } = req.body;

        try {
            const supplier = await Suppliers.findOneBy({ id: Number(id) });
            if (supplier) {
                supplier.name = name;
                supplier.contact = contact;
                supplier.address = address;
                await supplier.save();
                res.status(200).json({ message: "Supplier updated successfully", supplier });
                console.log("Supplier updated successfully:", supplier);
            } else {
                res.status(404).json({ message: "Supplier not found" });
                console.log("Supplier not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating supplier", error });
            console.error("Error updating supplier:", error);
        }
    }

    // delete supplier
    async deleteSupplier(req: Request, res: Response) {
        const {id} = req.body;

        try {
            const supplier = await Suppliers.findOneBy({ id: Number(id) });
            if (supplier) {
                await supplier.remove();
                res.status(200).json({ message: "Supplier deleted successfully" });
                console.log("Supplier deleted successfully:", id);
            } else {
                res.status(404).json({ message: "Supplier not found" });
                console.log("Supplier not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting supplier", error });
            console.error("Error deleting supplier:", error);
        }
    }   
}