import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Task as TaskModel } from './models/task';
import Task from './components/Task';
import styles from './styles/TaskPage.module.css';
import stylesUtils from './styles/utils.module.css';
import * as TasksApi from './network/tasks_api';
import AddTaskDialog from './components/AddTaskDialog';

function App() {
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);

    useEffect(() => {
        async function loadTasks() {
            try {
                const tasks = await TasksApi.fetchTasks();
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
            <Button className={`mb-4 ${stylesUtils.blockCenter}`} onClick={() => setShowAddTaskDialog(true)}>
                Add new task
            </Button>
            <Row xs={1} md={2} xl={3} className="g-4">
                {tasks.map((task) => (
                    <Col key={task._id}>
                        <Task task={task} className={styles.task} />
                    </Col>
                ))}
            </Row>
            {showAddTaskDialog && (
                <AddTaskDialog
                    onDismiss={() => setShowAddTaskDialog(false)}
                    onTaskSaved={(newTask) => {
                        setTasks([...tasks, newTask]);
                        setShowAddTaskDialog(false);
                    }}
                />
            )}
        </Container>
    );
}

export default App;
