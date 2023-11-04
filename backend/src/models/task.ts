import { InferSchemaType, model, Schema } from 'mongoose';

const taskSchema = new Schema(
    {
        title: { type: String, required: true },
        text: { type: String },
        completed: {type: Boolean, default: false},
    },
    { timestamps: true }
);

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>('Task', taskSchema);
