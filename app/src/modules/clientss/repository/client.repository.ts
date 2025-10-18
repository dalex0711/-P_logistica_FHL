// src/modules/clientss/client.repository.ts
import { Client } from '../models/client.model';
import { CreateClientDTO, UpdateClientDTO } from '../schemas/client.schema';

/**
 * Client Repository
 * Handles business logic and database operations for clients
 */
export class ClientRepository {
    /**
     * Creates a new client
     * @throws Error if cedula already exists
     */
    async create(data: CreateClientDTO) {
        const existingClient = await Client.findOne({ 
            where: { cedula: data.cedula } 
        });
        
        if (existingClient) {
            throw new Error('Client with this cedula already exists');
        }
        
        return Client.create(data);
    }

    /**
     * Retrieves all clients with optional filtering
     */
    async findAll(filters?: { is_active?: boolean }) {
        const where: any = {};
        
        if (filters?.is_active !== undefined) {
            where.is_active = filters.is_active;
        }
        
        return Client.findAll({ where });
    }

    /**
     * Retrieves a client by ID
     * @throws Error if client not found
     */
    async findById(id: number) {
        const client = await Client.findByPk(id);
        
        if (!client) {
            throw new Error('Client not found');
        }
        
        return client;
    }

    /**
     * Updates a client by ID
     * @throws Error if client not found or cedula already exists
     */
    async update(id: number, data: UpdateClientDTO) {
        const client = await Client.findByPk(id);
        
        if (!client) {
            throw new Error('Client not found');
        }
        
        // Check cedula uniqueness if being updated
        if (data.cedula && data.cedula !== client.cedula) {
            const existing = await Client.findOne({ 
                where: { cedula: data.cedula } 
            });
            
            if (existing) {
                throw new Error('Client with this cedula already exists');
            }
        }
        
        await client.update(data);
        return client;
    }

    /**
     * Soft deletes a client by setting is_active to false
     * @throws Error if client not found
     */
    async delete(id: number) {
        const client = await Client.findByPk(id);
        
        if (!client) {
            throw new Error('Client not found');
        }
        
        await client.update({ is_active: false });
        return { message: 'Client deactivated successfully' };
    }
}

export const clientRepository = new ClientRepository();