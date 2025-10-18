import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * WarehouseStock attributes interface
 * Represents inventory levels for products at specific warehouse locations
 */
export interface WarehouseStockAttrs {
    id: number; 
    warehouse_id: number; 
    product_id: number; 
    quantity: number; // Current stock level
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated fields for creation
type WarehouseStockCreation = Optional<WarehouseStockAttrs, "id" | "quantity">;

/**
 * WarehouseStock Model
 * Manages product inventory levels across different warehouse locations
 */
export class WarehouseStock extends Model<WarehouseStockAttrs, WarehouseStockCreation> implements WarehouseStockAttrs {
    public id!: number; 
    public warehouse_id!: number; 
    public product_id!: number; 
    public quantity!: number; 
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize WarehouseStock model with schema definition
WarehouseStock.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        warehouse_id: { type: DataTypes.INTEGER, allowNull: false },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
    },
    {
        sequelize, 
        tableName: "warehouse_stock", 
        // Ensure each product has only one stock record per warehouse
        indexes: [{ unique: true, fields: ["warehouse_id", "product_id"] }],
    }
);