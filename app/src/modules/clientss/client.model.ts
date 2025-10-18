import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * Client attributes interface
 * Represents a customer in the system with their basic information
 */
export interface ClientAttrs {
    id: number;
    cedula: string; 
    fullname: string; 
    email: string; 
    phone: string; 
    is_active: boolean; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated fields for creation
type ClientCreation = Optional<ClientAttrs, "id" | "is_active">;

/**
 * Client Model
 * Manages customer information and account status
 */
export class Client extends Model<ClientAttrs, ClientCreation> implements ClientAttrs {
    public id!: number; 
    public cedula!: string; 
    public fullname!: string;
    public email!: string; 
    public phone!: string;
    public is_active!: boolean; 
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize Client model with schema definition
Client.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        cedula: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        fullname: { type: DataTypes.STRING(150), allowNull: false },
        email: { type: DataTypes.STRING(100) },
        phone: { type: DataTypes.STRING(20) },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { 
        sequelize, 
        tableName: "clients"
    }
);