import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * Product attributes interface
 * Represents a product in the catalog with pricing and availability information
 */
export interface ProductAttrs {
    id: number; 
    code: string; 
    name: string; 
    description?: string | null; 
    price: string; 
    is_active: boolean; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated and optional fields for creation
type ProductCreation = Optional<ProductAttrs, "id" | "description" | "is_active">;

/**
 * Product Model
 * Manages product catalog information and pricing
 */
export class Product extends Model<ProductAttrs, ProductCreation> implements ProductAttrs {
    public id!: number; 
    public code!: string; 
    public name!: string; 
    public description!: string | null; 
    public price!: string; 
    public is_active!: boolean;
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize Product model with schema definition
Product.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {   
        sequelize, 
        tableName: "products", 
    }
);