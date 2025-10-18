import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * OrderItem attributes interface
 * Represents individual products within an order with quantity and pricing details
 */
export interface OrderItemAttrs {
    id: number; 
    order_id: number; 
    product_id: number; 
    quantity: number; 
    unit_price: string; 
    subtotal: string; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated and calculated fields for creation
type OrderItemCreation = Optional<OrderItemAttrs, "id" | "subtotal">;

/**
 * OrderItem Model
 * Manages line items within orders, automatically calculating subtotals
 */
export class OrderItem extends Model<OrderItemAttrs, OrderItemCreation> implements OrderItemAttrs {
    public id!: number; 
    public order_id!: number; 
    public product_id!: number; 
    public quantity!: number; 
    public unit_price!: string; 
    public subtotal!: string;
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize OrderItem model with schema definition
OrderItem.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        order_id: { type: DataTypes.INTEGER, allowNull: false },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
        unit_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
        subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: "0.00" },
    },
    {
        sequelize, 
        tableName: "order_items",
        // Prevent duplicate products in the same order
        indexes: [{ unique: true, fields: ["order_id", "product_id"] }],
        hooks: {
            // Auto-calculate subtotal before validation
            beforeValidate: (item) => {
                const q = Number(item.quantity || 0);
                const p = Number(item.unit_price || 0);
                item.subtotal = (q * p).toFixed(2);
            },
        },
    }
);