import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * OrderStatusHistory attributes interface
 * Represents an audit trail of order status changes for tracking and accountability
 */
export interface OrderStatusHistoryAttrs {
    id: number; 
    order_id: number; 
    from_status_id?: number | null;
    to_status_id: number; 
    changed_by: number; 
    changed_at?: Date; 
    note?: string | null; 
}

// Omit auto-generated and optional fields for creation
type OrderStatusHistoryCreation = Optional<OrderStatusHistoryAttrs, "id" | "from_status_id" | "changed_at" | "note">;

/**
 * OrderStatusHistory Model
 * Maintains a complete audit log of all order status transitions
 */
export class OrderStatusHistory extends Model<OrderStatusHistoryAttrs, OrderStatusHistoryCreation> implements OrderStatusHistoryAttrs {
    public id!: number; 
    public order_id!: number; 
    public from_status_id!: number | null; 
    public to_status_id!: number; 
    public changed_by!: number;
    public changed_at!: Date; 
    public note!: string | null;
}

// Initialize OrderStatusHistory model with schema definition
OrderStatusHistory.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        order_id: { type: DataTypes.INTEGER, allowNull: false },
        from_status_id: { type: DataTypes.INTEGER, allowNull: true },
        to_status_id: { type: DataTypes.INTEGER, allowNull: false },
        changed_by: { type: DataTypes.INTEGER, allowNull: false },
        changed_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        note: { type: DataTypes.TEXT },
    },
    { 
        sequelize, 
        tableName: "order_status_history", 
        timestamps: false 
    }
);