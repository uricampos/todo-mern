import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Task } from './models/task';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function loadTasks() {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'GET',
                });
                const tasks = await response.json();
                setTasks(tasks);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadTasks();
    }, []);

    return <div className="App">{JSON.stringify(tasks)}</div>;
}

export default App;
