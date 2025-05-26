import { Schema, model, Model, InferSchemaType } from 'mongoose';

const taskSchema = new Schema(
    {
        taskName: { type: String, required: true, unique: true },
        completed: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export type ITask = InferSchemaType<typeof taskSchema>;

export const TaskModel: Model<ITask> = model<ITask>('Task', taskSchema);