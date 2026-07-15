import { Model, type Optional } from "sequelize";
export interface ProductAttributes {
    id: number;
    productName: string;
    sku: string;
    barcode: string;
    category: string;
    brand: string;
    purchaseRate: number;
    sellingPrice: number;
    quantity: number;
    unit: number;
    addVarient: string;
}
interface productCreation extends Optional<ProductAttributes, "id"> {
}
export declare class Product extends Model<ProductAttributes, productCreation> {
    id: number;
    productName: string;
    sku: string;
    barcode: string;
    category: string;
    brand: string;
    purchaseRate: number;
    sellingPrice: number;
    quantity: number;
    unit: number;
    addVarient: string;
}
export {};
//# sourceMappingURL=product.d.ts.map