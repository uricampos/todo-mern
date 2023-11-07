import { Task } from '../models/task';

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchTasks(): Promise<Task[]> {
    const response = await fetchData('/api/tasks', {
        method: 'GET',
    });
    return response.json();
}

export interface TaskInput {
    title: string,
    text?: string,
    completed: boolean,
}

export async function createTask(task: TaskInput): Promise<Task> {
    const response = await fetchData('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
}
