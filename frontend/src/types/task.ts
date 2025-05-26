// src/types/Task.ts
export interface Task {
    _id: string;
    taskName: string;
    completed: boolean;
    createdAt?: string;
    updatedAt?: string;
}
