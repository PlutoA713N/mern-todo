import { Router } from 'express'
import {createTask, deleteTaskById, getAllTasks, getTaskById, updateTaskById} from "../controllers/tasksController";

const router = Router()

router.get('/', getAllTasks)

router.get('/:id', getTaskById)

router.post('/', createTask)

router.put('/:id', updateTaskById)

router.delete('/:id', deleteTaskById)

export default router