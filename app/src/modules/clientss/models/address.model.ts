import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../shared/config/db";

/**
 * Address attributes interface
 * Represents a client's delivery or billing address
 */
export interface AddressAttrs {
    id: number; 
    client_id: number; 
    country: string; 
    department: string; 
    city: string;
    street: string; 
    number: string; 
    is_default: boolean; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated fields for creation
type AddressCreation = Optional<AddressAttrs, "id" | "is_default">;

/**
 * Address Model
 * Manages client address information with support for multiple addresses per client
 */
export class Address extends Model<AddressAttrs, AddressCreation> implements AddressAttrs {
    public id!: number; 
    public client_id!: number; 
    public country!: string; 
    public department!: string;
    public city!: string; 
    public street!: string; 
    public number!: string; 
    public is_default!: boolean;
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize Address model with schema definition
Address.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        client_id: { type: DataTypes.INTEGER, allowNull: false },
        country: { type: DataTypes.STRING(100) },
        department: { type: DataTypes.STRING(100) },
        city: { type: DataTypes.STRING(100) },
        street: { type: DataTypes.STRING(150) },
        number: { type: DataTypes.STRING(20) },
        is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { 
        sequelize,
        tableName: "addresses",
    }
);