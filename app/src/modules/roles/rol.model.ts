import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * Role attributes interface
 * Represents user roles for access control and permission management
 */
export interface RoleAttrs {
    id: number;
    name: string;
    is_active: boolean; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated fields for creation
type RoleCreation = Optional<RoleAttrs, "id" | "is_active">;

/**
 * Role Model
 * Manages role definitions for user authorization
 */
export class Role extends Model<RoleAttrs, RoleCreation> implements RoleAttrs {
    public id!: number; 
    public name!: string; 
    public is_active!: boolean; 
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize Role model with schema definition
Role.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { 
        sequelize,
        tableName: "roles",
    }
);