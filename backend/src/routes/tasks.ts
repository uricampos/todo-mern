import express from 'express';
import * as TasksController from '../controllers/tasks'

const router = express.Router();

router.get('/', TasksController.getTasks);

router.post('/', TasksController.createTask);

router.get('/:taskId', TasksController.getTask);

export default router;