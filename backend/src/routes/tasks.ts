import express from 'express';
import * as TasksController from '../controllers/tasks';

const router = express.Router();

router.get('/', TasksController.getTasks);

router.post('/', TasksController.createTask);

router.get('/:taskId', TasksController.getTask);

router.patch('/:taskId', TasksController.updateTask);

router.delete('/:taskId', TasksController.deleteTask);

export default router;
