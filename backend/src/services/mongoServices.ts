import { TaskModel } from "../models/mongoModels";
import { AppError } from "../utils/appError";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";

// CREATE
export const create = async (taskName: string) => {
    if (!taskName) {
        throw new AppError("Task name is required", 400);
    }

    try {
        const newTask = new TaskModel({ taskName });
        return await newTask.save();
    } catch (e: any) {
        console.error(e);
        if (e instanceof MongoServerError && e.code === 11000) {
            throw new AppError("Task already exists", 409); // Conflict
        }
        throw new AppError("Error creating task", 500);
    }
};

// READ - get all tasks
export const getAll = async () => {
    try {
        return await TaskModel.find().exec();
    } catch (e) {
        console.error(e);
        throw new AppError("Error fetching tasks", 500);
    }
};

// READ - get task by id
export const getById = async (id: string) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid task ID", 400);
        }
        const task = await TaskModel.findById(id).exec();
        if (!task) {
            throw new AppError("Task not found", 404);
        }
        return task;
    } catch (e) {
        console.error(e);
        if (e instanceof AppError) throw e;
        throw new AppError("Error fetching task", 500);
    }
};

// UPDATE - update task by id
export const updateById = async (id: string, update: { taskName?: string, completed?: boolean}) => {
    try {
        if (!update.taskName && !update.completed) {
            throw new AppError("No update data provided", 400);
        }

        if (!update.taskName) {
            throw new AppError("Task name is required for update", 400);
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid task ID", 400);
        }
        const updatedTask = await TaskModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        }).exec();

        if (!updatedTask) {
            throw new AppError("Task not found", 404);
        }
        return updatedTask;
    } catch (e) {
        console.error(e);
        if (e instanceof AppError) throw e;
        throw new AppError("Error updating task", 500);
    }
};

// DELETE - delete task by id
export const deleteById = async (id: string) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid task ID", 400);
        }
        const deletedTask = await TaskModel.findByIdAndDelete(id).exec();
        if (!deletedTask) {
            throw new AppError("Task not found", 404);
        }
        return deletedTask;
    } catch (e) {
        console.error(e);
        if (e instanceof AppError) throw e;
        throw new AppError("Error deleting task", 500);
    }
};
