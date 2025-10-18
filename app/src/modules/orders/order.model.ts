import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * Order attributes interface
 * Represents a customer order with its associated relationships and total amount
 */
export interface OrderAttrs {
    id: number; 
    client_id: number; 
    warehouse_id: number; 
    status_id: number; 
    total: string; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated fields for creation
type OrderCreation = Optional<OrderAttrs, "id" | "total">;

/**
 * Order Model
 * Manages customer orders with warehouse assignment and status tracking
 */
export class Order extends Model<OrderAttrs, OrderCreation> implements OrderAttrs {
    public id!: number; 
    public client_id!: number; 
    public warehouse_id!: number; 
    public status_id!: number; 
    public total!: string;
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize Order model with schema definition
Order.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        client_id: { type: DataTypes.INTEGER, allowNull: false },
        warehouse_id: { type: DataTypes.INTEGER, allowNull: false },
        status_id: { type: DataTypes.INTEGER, allowNull: false },
        total: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: "0.00", validate: { min: 0 } },
    },
    { 
        sequelize, 
        tableName: "orders",
    }
);