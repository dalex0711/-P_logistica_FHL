import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * OrderStatus attributes interface
 * Represents the various states an order can be in (e.g., pending, processing, shipped, delivered)
 */
export interface OrderStatusAttrs {
    id: number; 
    name: string; 
    description?: string | null; 
    is_active: boolean; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated and optional fields for creation
type OrderStatusCreation = Optional<OrderStatusAttrs, "id" | "description" | "is_active">;

/**
 * OrderStatus Model
 * Manages order status definitions for tracking order lifecycle
 */
export class OrderStatus extends Model<OrderStatusAttrs, OrderStatusCreation> implements OrderStatusAttrs {
    public id!: number; 
    public name!: string; 
    public description!: string | null; 
    public is_active!: boolean; 
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize OrderStatus model with schema definition
OrderStatus.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        description: { type: DataTypes.TEXT },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { 
        sequelize, 
        tableName: "order_status"
    }
);