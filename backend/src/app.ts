import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import tasksRoutes from './routes/tasks';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/tasks', tasksRoutes);

app.use((req, res, next) => {
    next(Error('Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = 'An unkown error ocurred';
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

export default app;
