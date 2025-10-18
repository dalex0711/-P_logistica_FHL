import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../shared/config/db";

/**
 * User attributes interface
 * Represents system users with authentication credentials and role assignment
 */
export interface UserAttrs {
    id: number; 
    name: string; 
    email: string; 
    password_hash: string; 
    role_id: number | null; 
    is_active: boolean; 
    created_at?: Date; 
    updated_at?: Date;
}

// Omit auto-generated and optional fields for creation
type UserCreation = Optional<UserAttrs, "id" | "role_id" | "is_active">;

/**
 * User Model
 * Manages system user accounts and authentication
 */
export class User extends Model<UserAttrs, UserCreation> implements UserAttrs {
    public id!: number; 
    public name!: string; 
    public email!: string; 
    public password_hash!: string;
    public role_id!: number | null; 
    public is_active!: boolean; 
    public created_at!: Date; 
    public updated_at!: Date;
}

// Initialize User model with schema definition
User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        password_hash: { type: DataTypes.TEXT, allowNull: false },
        role_id: { type: DataTypes.INTEGER, allowNull: true },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { 
        sequelize,
        tableName: "users"
    }
);