// Centralize all model associations to avoid circular imports
import { Role } from "../../modules/roles/rol.model";
import { User } from "../../modules/users/user.model";
import { Client } from "../../modules/clientss/client.model";
import { Address } from "../../modules/clientss/address.model";
import { Warehouse } from "../../modules/warehouses/warehouse.model";
import { Product } from "../../modules/products/product.model";
import { WarehouseStock } from "../../modules/warehouses/warehouseStock.model";
import { OrderStatus } from "../../modules/orders/orderStatus.model";
import { Order } from "../../modules/orders/order.model";
import { OrderItem } from "../../modules/orders/orderItem.model";
import { OrderStatusHistory } from "../../modules/orders/orderStatusHistory.model";

export const applyAssociations = () => {
  // Auth
    Role.hasMany(User, { foreignKey: "role_id" });
    User.belongsTo(Role, { foreignKey: "role_id" });

  // Clients
    Client.hasMany(Address, { foreignKey: "client_id" });
    Address.belongsTo(Client, { foreignKey: "client_id" });

  // Warehouses & Products via stock
    Warehouse.hasMany(WarehouseStock, { foreignKey: "warehouse_id" });
    WarehouseStock.belongsTo(Warehouse, { foreignKey: "warehouse_id" });

    Product.hasMany(WarehouseStock, { foreignKey: "product_id" });
    WarehouseStock.belongsTo(Product, { foreignKey: "product_id" });

  // Orders
    Client.hasMany(Order, { foreignKey: "client_id" });
    Order.belongsTo(Client, { foreignKey: "client_id" });

    Warehouse.hasMany(Order, { foreignKey: "warehouse_id" });
    Order.belongsTo(Warehouse, { foreignKey: "warehouse_id" });

    OrderStatus.hasMany(Order, { foreignKey: "status_id" });
    Order.belongsTo(OrderStatus, { foreignKey: "status_id" });

    Order.hasMany(OrderItem, { foreignKey: "order_id" });
    OrderItem.belongsTo(Order, { foreignKey: "order_id" });

    Product.hasMany(OrderItem, { foreignKey: "product_id" });
    OrderItem.belongsTo(Product, { foreignKey: "product_id" });

  // Status history (audit)
    Order.hasMany(OrderStatusHistory, { foreignKey: "order_id" });
    OrderStatusHistory.belongsTo(Order, { foreignKey: "order_id" });

    User.hasMany(OrderStatusHistory, { foreignKey: "changed_by" });
    OrderStatusHistory.belongsTo(User, { foreignKey: "changed_by" });

    OrderStatus.hasMany(OrderStatusHistory, { foreignKey: "from_status_id", as: "fromStatusHistories" });
    OrderStatusHistory.belongsTo(OrderStatus, { foreignKey: "from_status_id", as: "fromStatus" });

    OrderStatus.hasMany(OrderStatusHistory, { foreignKey: "to_status_id", as: "toStatusHistories" });
    OrderStatusHistory.belongsTo(OrderStatus, { foreignKey: "to_status_id", as: "toStatus" });
};
