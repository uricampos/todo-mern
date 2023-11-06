import styles from '../styles/Task.module.css';

import { Card } from 'react-bootstrap';
import { Task as TaskModel } from '../models/task';
import { formatDate } from '../utils/formatDate';

interface TaskProps {
    task: TaskModel;
    className?: string;
}

const Task = ({ task, className }: TaskProps) => {
    const { title, text, createdAt, updatedAt } = task;

    let createdUpdatedText: string;
    if(updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card className={`${styles.taskCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>{title}</Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
            </Card.Body>
            <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
        </Card>
    );
};

export default Task;
