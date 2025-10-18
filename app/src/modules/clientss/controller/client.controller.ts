// src/modules/clients/client.controller.ts
import { Request, Response, NextFunction } from 'express';
import { clientRepository } from '../repository/client.repository';
import { createClientSchema, updateClientSchema } from '../schemas/client.schema';

/**
 * Client Controller
 * Handles HTTP requests and responses for client endpoints
 */
export class ClientController {
    
    /** POST /clients - Creates a new client */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedData = createClientSchema.parse(req.body);
            const client = await clientRepository.create(validatedData);
            res.status(201).json({ success: true, data: client });
        } catch (error) {
            next(error);
        }
    }

    /** GET /clients - Retrieves all clients (optional ?is_active=true|false) */
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const isActiveParam = req.query.is_active?.toString();
            const filters = 
                isActiveParam === 'true' ? { is_active: true } :
                isActiveParam === 'false' ? { is_active: false } :
                {};

            const clients = await clientRepository.findAll(filters);
            res.status(200).json({ success: true, data: clients });
        } catch (error) {
            next(error);
        }
    }

    /** GET /clients/:id - Retrieves a single client by ID */
    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const client = await clientRepository.findById(id);
            res.status(200).json({ success: true, data: client });
        } catch (error) {
            next(error);
        }
    }

    /** PUT /clients/:id - Updates a client by ID */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const validatedData = updateClientSchema.parse(req.body);
            const client = await clientRepository.update(id, validatedData);
            res.status(200).json({ success: true, data: client });
        } catch (error) {
            next(error);
        }
    }

    /** DELETE /clients/:id - Soft deletes (deactivates) a client by ID */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const result = await clientRepository.delete(id);
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            next(error);
        }
    }
}

export const clientController = new ClientController();
