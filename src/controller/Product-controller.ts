import { Request, Response } from "express";
import { Product } from "../entity/Product";

export class ProductController { 

  // get all products
  async getProducts(req: Request, res: Response){
    try{
      const products = await Product.find();
      // res.json(products);
      res.status(200).json({
                code: "200",
                message: "Products fetched successfully",
                data: products
            });
      console.log("Products fetched successfully:", products);

    } catch(error){
      res.status(500).json({ message: "Error fetching products", error });
      console.error("Error fetching products:", error);
    }
  }

  // get single product

  async getProductById(req: Request, res: Response){
    const { id } = req.body;
    try{
      const product = await Product.findOneBy({ id: Number(id) });
      if (product){
        res.status(200).json({
                code: "200",
                message: "Products fetched successfully",
                data: product
            });
        console.log("Product fetched successfully:", product);
      }else{
        res.status(404).json({ message: "Product not found" });
        console.log("Product not found:", id);
      }
    } catch(error){ 
      res.status(500).json({ message: "Error fetching product", error });
      console.error("Error fetching product:", error);
    }
  }

  // create product

  async createProduct(req: Request, res: Response){
      const { name, sku, barcode, category_id, price, cost, stock, unit, is_active } = req.body; 

    try{ 
      const newProduct = Product.create({ name, sku, barcode, category_id, price, cost, stock, unit, is_active });
      const findProduct = await Product.findOneBy({ sku: sku });
      if (findProduct){
        res.status(409).json({ message: "Product already exists" });
        console.log("Product already exists:", name);
        return;
      }else{
      await newProduct.save();
      res.status(201).json({ message: "Product created successfully", product: newProduct });
      console.log("Product created successfully:", newProduct);
      }
    } catch(error){ 
      res.status(500).json({ message: "Error creating product", error });
      console.error("Error creating product:", error);
    }
  }

  // update product 
  async updateProduct(req: Request, res: Response){ 
    const { id, name, sku, barcode, category, price, cost, stock, unit, is_active } = req.body; 
    try{
      const product = await Product.findOneBy({ id: Number(id)} );
      
      if (product){
        product.name = name;
        product.sku = sku;
        product.barcode = barcode;
        product.category = category;
        product.price = price;
        product.cost = cost;
        product.stock = stock;
        product.unit = unit;
        product.is_active = is_active;
        await product.save();
        res.json(product);
        console.log("Product updated successfully:", product);
      }
      else{ 
        res.status(404).json({ message: "Product not found" });
        console.log("Product not found:", id);
      }

    } catch(error){ 
      res.status(500).json({ message: "Error updating product", error });
      console.error("Error updating product:", error);
    }
  }

  // delete product

  async deleteProduct(req: Request, res: Response){
    const { id } = req.body;

    try{
      const product = await Product.findOneBy({ id: Number(id)})
      if (product){
        await product.remove();
        res.json({ message: "Product deleted successfully" });
        console.log("Product deleted successfully:", id);
      }else{
        res.status(404).json({ message: "Product not found" });
        console.log("Product not found:", id);
      }
    } catch(error){ 
      res.status(500).json({ message: "Error deleting product", error });
      console.error("Error deleting product:", error);
    }
  }



}
