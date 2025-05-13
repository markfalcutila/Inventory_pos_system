import { CategoryModel } from "./Category.model";

export class ProductModel {
    id!: number;
    name!: string;
    sku!: string;
    barcode!: string;
    category!: CategoryModel;
    price!: number;
    cost!: number;
    stock!: number;
    unit!: string;
    is_active!: boolean;
  
}
