import { z } from 'zod';

/**
 * Validation schema for client creation
 */
export const createClientSchema = z.object({
    cedula: z.string()
        .min(7, "Cedula must be at least 7 characters")
        .max(20, "Cedula cannot exceed 20 characters"),
    
    fullname: z.string()
        .min(3, "Full name must be at least 3 characters")
        .max(150, "Full name cannot exceed 150 characters"),
    
    email: z.string()
        .email("Invalid email format")
        .max(100, "Email cannot exceed 100 characters"),
       
    
    phone: z.string()
        .max(20, "Phone cannot exceed 20 characters"),
       
    
    is_active: z.boolean().default(true)
});

/**
 * Validation schema for client update
 */
export const updateClientSchema = z.object({
    cedula: z.string().min(7).max(20),
    fullname: z.string().min(3).max(150),
    email: z.string().email().max(100),
    phone: z.string().max(20),
    is_active: z.boolean().default(true)
});

/**
 * Data Transfer Objects
 */
export type CreateClientDTO = z.infer<typeof createClientSchema>;
export type UpdateClientDTO = z.infer<typeof updateClientSchema>;