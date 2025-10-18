/**
 * Swagger Configuration
 * ---------------------
 * Loads all OpenAPI docs and serves via Swagger UI.
 */

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { clientSwagger } from "../../modules/clients/client.swagger";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "FHL Logistics API",
      version: "1.0.0",
      description: "API documentation for FHL backend services"
    },
    servers: [{ url: "http://localhost:3000/api" }],
    components: {
      schemas: {
        Client: {
          type: "object",
          properties: {
            id: { type: "integer" },
            cedula: { type: "string" },
            fullname: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            is_active: { type: "boolean" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" }
          }
        },
        ClientCreate: {
          type: "object",
          required: ["cedula", "fullname", "email", "phone"],
          properties: {
            cedula: { type: "string" },
            fullname: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            is_active: { type: "boolean" }
          }
        },
        ClientUpdate: {
          type: "object",
          properties: {
            fullname: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            is_active: { type: "boolean" }
          }
        }
      },
      paths: { ...clientSwagger }
    }
  },
  apis: []
};

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsDoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("📘 Swagger available at: http://localhost:3000/docs");
};
