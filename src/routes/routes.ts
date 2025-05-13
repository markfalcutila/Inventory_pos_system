import express from "express";
import { RoleController } from "../controller/Role-controller";
import { UserController } from "../controller/User-controller";
import { PaymentController } from "../controller/Payment-controller";
import { SalesController } from "../controller/Sales-controller";
import { SupplierController } from "../controller/Supplier-controller";
import { ProductController } from "../controller/Product-controller";
import { CategoryController } from "../controller/Category-controller";
import { StockMovementController } from "../controller/Stock-movements";
import { SaleItemsController } from "../controller/Sale-items-controller";
import { authenticateToken } from "../middleware/authMiddleware";

// authentication

const router = express.Router();
const productController = new ProductController();
const roleController = new RoleController();
const userController = new UserController();
const categoryController = new CategoryController();
const paymentController = new PaymentController();
const salesController = new SalesController();
const supplierController = new SupplierController(); 
const stockMovementController = new StockMovementController();
const saleItemsController = new SaleItemsController();

router.use(authenticateToken);

// Product routes
router.post("/getProducts", productController.getProducts);
router.get("/getProductById", productController.getProductById);

router.post("/createProduct", productController.createProduct);
router.post("/updateProduct", productController.updateProduct);
router.post("/deleteProduct", productController.deleteProduct);

// Role routes
router.post("/getRoles", roleController.getRoles);
router.post("/getRoleById", roleController.getRoleById);
router.post("/createRole", roleController.createRole);
router.post("/editRole", roleController.editRole);
router.post("/deleteRole", roleController.deleteRole);

// User routes
router.post("/getUsers", userController.getUsers);
router.post("/createUser", userController.createUser);
router.post("/updateUser", userController.updateUser);
router.post("/deleteUser", userController.deleteUser);

// category routes
router.post("/getCategories", categoryController.getCategories);
router.post("/createCategory", categoryController.createCategory);
router.post("/updateCategory", categoryController.updateCategory);
router.post("/deleteCategory", categoryController.deleteCategory);

// payment routes
router.post("/getPayments", paymentController.getPayments);
router.post("/createPayment", paymentController.createPayment);
router.post("/updatePayment", paymentController.updatePayment);
router.post("/deletePayment", paymentController.deletePayment);

// sales routes
router.post("/getSales", salesController.getSales); 
router.post("/createSale", salesController.createSale);
router.post("/updateSale", salesController.updateSale);
router.post("/deleteSale", salesController.deleteSale);

// supplier routes
router.post("/getSuppliers", supplierController.getSuppliers);
router.post("/createSupplier", supplierController.createSupplier);
router.post("/updateSupplier", supplierController.updateSupplier);
router.post("/deleteSupplier", supplierController.deleteSupplier);

// stock movement routes 
router.post("/getStockMovements", stockMovementController.getStockMovements);
router.post("/createStockMovement", stockMovementController.createStockMovement);   
router.post("/updateStockMovement", stockMovementController.updateStockMovement);
router.post("/deleteStockMovement", stockMovementController.deleteStockMovement);

// sale items routes
router.post("/getSaleItems", saleItemsController.getSaleItems);
router.post("/createSaleItem", saleItemsController.createSaleItem);
router.post("/updateSaleItem", saleItemsController.updateSaleItem);
router.post("/deleteSaleItem", saleItemsController.deleteSaleItem);

export default router;
