import { Request, Response } from "express";
import { Category } from "../entity/Category";

export class CategoryController {

    // get all categories 
    async getCategories(req: Request, res: Response) {
        try {
            const categories = await Category.find();
            res.status(200).json({ 
                code: "200",
                message: "Categories fetched successfully",
                data: categories });
            console.log("Categories fetched successfully:", categories);
        } catch (error) {
            res.status(500).json({ message: "Error fetching categories", error });
            console.error("Error fetching categories:", error);
        }
    }

    // add category
    async createCategory(req: Request, res: Response) {
        const { name, description } = req.body;

        try {
            const newCategory = Category.create({ name, description });
            await newCategory.save();
            res.status(201).json({ message: "Category created successfully", category: newCategory });
            console.log("Category created successfully:", newCategory);
        } catch (error) {
            res.status(500).json({ message: "Error creating category", error });
            console.error("Error creating category:", error);
        }
    }

    // update category
    async updateCategory(req: Request, res: Response) {
        const { id, name, description } = req.body;

        try {
            const category = await Category.findOneBy({ id: Number(id) });
            if (category) {
                category.name = name;
                category.description = description;
                await category.save();
                res.status(200).json({ message: "Category updated successfully", category });
                console.log("Category updated successfully:", category);
            } else {
                res.status(404).json({ message: "Category not found" });
                console.log("Category not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating category", error });
            console.error("Error updating category:", error);
        }
    }

    // delete category
    async deleteCategory(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const category = await Category.findOneBy({ id: Number(id) });
            if (category) {
                await category.remove();
                res.status(200).json({ message: "Category deleted successfully" });
                console.log("Category deleted successfully:", id);
            } else {
                res.status(404).json({ message: "Category not found" });
                console.log("Category not found:", id);
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting category", error });
            console.error("Error deleting category:", error);
        }
    }
}