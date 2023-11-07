import { Button, Form, Modal } from 'react-bootstrap';
import { Task } from '../models/task';
import { useForm } from 'react-hook-form';
import { TaskInput } from '../network/tasks_api';
import * as TasksApi from '../network/tasks_api';

interface AddTaskDialogProps {
    onDismiss: () => void;
    onTaskSaved: (task: Task) => void;
}

const AddTaskDialog = ({ onDismiss, onTaskSaved }: AddTaskDialogProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TaskInput>();

    async function onSubmit(input: TaskInput) {
        try {
            const taskResponse = await TasksApi.createTask(input);
            onTaskSaved(taskResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addTaskForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register('title', { required: 'Required' })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register('text')}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addTaskForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTaskDialog;
