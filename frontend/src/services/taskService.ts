import axios from 'axios';
import type { Task } from '../types/task';

const BASE_URL = import.meta.env.VITE_BACKEND_URL + '/tasks';
console.log('BASE_URL:', BASE_URL);

export const getTasks = async (): Promise<Task[]> => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
};

export const updateTask = async (id: string, updateData: Partial<Task>): Promise<Task> => {
    const res = await axios.put(`${BASE_URL}/${id}`, updateData);
    return res.data.data;
};

export const createTask = async (taskName: string): Promise<Task> => {
    const res = await axios.post(BASE_URL, { taskName });
    return res.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};
