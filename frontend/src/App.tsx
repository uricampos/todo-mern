import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Task as TaskModel } from './models/task';
import Task from './components/Task';
import styles from './styles/TaskPage.module.css';
import stylesUtils from './styles/utils.module.css';
import * as TasksApi from './network/tasks_api';
import AddTaskDialog from './components/AddEditTaskDialog';
import { FaPlus } from 'react-icons/fa';
import AddEditTaskDialog from './components/AddEditTaskDialog';

function App() {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [tasksLoading, setTasksLoading] = useState(true);
    const [showTasksLoadingError, setShowTasksLoadingError] = useState(false);

    const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<TaskModel | null>();

    useEffect(() => {
        async function loadTasks() {
            try {
                setShowTasksLoadingError(false);
                setTasksLoading(true);
                const tasks = await TasksApi.fetchTasks();
                setTasks(tasks);
            } catch (error) {
                console.error(error);
                setShowTasksLoadingError(true);
            } finally {
                setTasksLoading(false);
            }
        }
        loadTasks();
    }, []);

    async function deleteTask(task: TaskModel) {
        try {
            await TasksApi.deleteTask(task._id);
            setTasks(
                tasks.filter((existingTask) => existingTask._id !== task._id)
            );
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const tasksGrid = (
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.taskGrid}`}>
            {tasks.map((task) => (
                <Col key={task._id}>
                    <Task
                        task={task}
                        className={styles.task}
                        onTaskClicked={setTaskToEdit}
                        onDeleteTaskClicked={deleteTask}
                    />
                </Col>
            ))}
        </Row>
    );

    return (
        <Container className={styles.tasksPage}>
            <Button
                className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
                onClick={() => setShowAddTaskDialog(true)}
            >
                <FaPlus />
                Add new task
            </Button>
            {tasksLoading && <Spinner animation="border" variant="primary" />}
            {showTasksLoadingError && (
                <p className='text-light'>Something went wrong. Please refresh the page.</p>
            )}
            {!tasksLoading && !showTasksLoadingError && (
                <>
                    {tasks.length > 0 ? (
                        tasksGrid
                    ) : (
                        <p className='text-light'>You don't have any tasks yet.</p>
                    )}
                </>
            )}
            {showAddTaskDialog && (
                <AddTaskDialog
                    onDismiss={() => setShowAddTaskDialog(false)}
                    onTaskSaved={(newTask) => {
                        setTasks([...tasks, newTask]);
                        setShowAddTaskDialog(false);
                    }}
                />
            )}
            {taskToEdit && (
                <AddEditTaskDialog
                    taskToEdit={taskToEdit}
                    onDismiss={() => setTaskToEdit(null)}
                    onTaskSaved={(updatedTask) => {
                        setTasks(
                            tasks.map((existingTask) =>
                                existingTask._id === updatedTask._id
                                    ? updatedTask
                                    : existingTask
                            )
                        );
                        setTaskToEdit(null);
                    }}
                />
            )}
        </Container>
    );
}

export default App;
