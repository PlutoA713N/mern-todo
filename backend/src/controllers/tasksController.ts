import {Request, Response, NextFunction} from 'express';
import { create, getAll, getById, updateById, deleteById } from './../services/mongoServices';
import {ApiResponse} from "../utils/ApiResponse";

export const createTask = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {taskName} = req.body;
        const task = await create(taskName);
        res.status(201).json(new ApiResponse(true, 'Task created successfully', task))
        }catch (e) {
        console.error(e);
        next(e);
    }
}

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getAll();
        res.status(200).json(new ApiResponse(true, "Tasks fetched successfully", tasks));
    } catch (e) {
        console.error(e);
        next(e);
    }
};


export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await getById(req.params.id);
        res.status(200).json(new ApiResponse(true, "Task fetched successfully", task));
    } catch (e) {
        console.error(e);
        next(e);
    }
};



export const updateTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await updateById(req.params.id, req.body);
        res.status(200).json(new ApiResponse(true, "Task updated successfully", task));
    } catch (e) {
        console.error(e);
        next(e);
    }
};


export const deleteTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await deleteById(req.params.id);
        res.status(200).json(new ApiResponse(true, "Task deleted successfully", task));
    } catch (e) {
        console.error(e);
        next(e);
    }
};
