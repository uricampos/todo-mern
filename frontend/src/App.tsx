import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Task as TaskModel } from './models/task';
import Task from './components/Task';
import styles from './styles/TaskPage.module.css';

function App() {
    const [tasks, setTasks] = useState<TaskModel[]>([]);

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

    return (
        <Container>
            <Row xs={1} md={2} xl={3} className="g-4">
                {tasks.map((task) => (
                    <Col key={task._id}>
                        <Task task={task} className={styles.task} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default App;
