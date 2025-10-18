import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * Warehouse attributes interface
 * Represents physical warehouse locations for inventory and order fulfillment
 */
export interface WarehouseAttrs {
    id: number; 
    name: string; 
    is_active: boolean; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated fields for creation
type WarehouseCreation = Optional<WarehouseAttrs, "id" | "is_active">;

/**
 * Warehouse Model
 * Manages warehouse locations for order processing and inventory management
 */
export class Warehouse extends Model<WarehouseAttrs, WarehouseCreation> implements WarehouseAttrs {
    public id!: number; 
    public name!: string; 
    public is_active!: boolean; 
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize Warehouse model with schema definition
Warehouse.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { 
        sequelize, 
        tableName: "warehouses",
    }
);