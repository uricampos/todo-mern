import { RequestHandler } from 'express';
import TaskModel from '../models/task';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getTasks: RequestHandler = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find().exec();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTask: RequestHandler = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {
        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, 'Invalid task id');
        }

        const task = await TaskModel.findById(taskId).exec();

        if (!task) {
            throw createHttpError(404, 'Task not found');
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

interface CreateTaskBody {
    title?: string;
    text?: string;
}

export const createTask: RequestHandler<
    unknown,
    unknown,
    CreateTaskBody,
    unknown
> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, 'Task must have a title');
        }

        const newTask = await TaskModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};
