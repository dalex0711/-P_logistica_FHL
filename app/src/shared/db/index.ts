import { env } from "../config/env";
import { sequelize, testConnection } from "../config/db";
import { applyAssociations } from "./associations";

// Register models (side-effect imports)
import "../../modules/roles/rol.model";
import "../../modules/users/user.model";
import "../../modules/clientss/models/client.model";
import "../../modules/clientss/models/address.model";
import "../../modules/warehouses/warehouse.model";
import "../../modules/products/product.model";
import "../../modules/warehouses/warehouseStock.model";
import "../../modules/orders/orderStatus.model";
import "../../modules/orders/order.model";
import "../../modules/orders/orderItem.model";
import "../../modules/orders/orderStatusHistory.model";

export const initDatabase = async (): Promise<void> => {
    await testConnection();     
    applyAssociations();        
    await sequelize.sync({ alter: false }); //
    console.log("✅ Models synchronized.");
    console.log(`[FHL] Ready on env: ${env.nodeEnv}`);
};
