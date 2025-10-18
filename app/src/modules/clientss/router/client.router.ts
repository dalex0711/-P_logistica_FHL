// src/modules/clientss/client.routes.ts
import { Router } from 'express';
import { clientController } from '../controller/client.controller';


const router = Router();

/**
 * Client routes
 */
router.post('/', clientController.create);
router.get('/', clientController.findAll);
router.get('/:id', clientController.findOne);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);

export default router;