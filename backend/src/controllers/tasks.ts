import { RequestHandler } from 'express';
import TaskModel from '../models/task';

export const getTasks: RequestHandler = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find().exec();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTask: RequestHandler = async(req, res, next) => {
    const taskId = req.params.taskId;
    
    try {
        const task = await TaskModel.findById(taskId).exec();
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}

export const createTask: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newTask = await TaskModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};
