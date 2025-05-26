import  { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from '../services/taskService';
import './TodoList.css';
import type { Task } from './../types/task.ts';

const TodoList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTaskName, setEditingTaskName] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const data = await getTasks();
                setTasks(data);
            } catch {
                setError('Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        if (!newTaskName.trim()) return;

        setLoading(true);
        try {
            const created = await createTask(newTaskName);
            setTasks(prev => [...prev, created]);
            setNewTaskName('');
        } catch {
            setError('Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t._id !== id));
        } catch {
            setError('Failed to delete task');
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (task: Task) => {
        setEditingTaskId(task._id);
        setEditingTaskName(task.taskName);
        setError(null);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingTaskName('');
        setError(null);
    };

    const saveEditing = async (id: string) => {
        if (!editingTaskName.trim()) return;

        setLoading(true);
        try {
            const taskToEdit = tasks.find(t => t._id === id);
            const updatedTask = await updateTask(id, {
                taskName: editingTaskName,
                completed: taskToEdit?.completed || false
            });
            setTasks(prevTasks => prevTasks.map(task =>
                task._id === id ? updatedTask : task
            ));
            setEditingTaskId(null);
            setEditingTaskName('');
        } catch (error) {
            console.error(error);
            setError('Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async (task: Task) => {
        setLoading(true);
        try {
            const updated = await updateTask(task._id, {
                taskName: task.taskName,
                completed: !task.completed,
            });

            setTasks(prev =>
                prev.map(t => (t._id === task._id ? updated : t))
            );
        } catch (err) {
            setError('Failed to toggle task completion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            {error && <p className="error">{error}</p>}

            <input
                type="text"
                value={newTaskName}
                onChange={e => setNewTaskName(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleAddTask();
                    }
                }}
                placeholder="New task"
            />
            <button onClick={handleAddTask} disabled={loading}>Add Task</button>

            {loading && <p>Loading...</p>}

            <ul className="task-list">
                {tasks.map(task => (
                    <li
                        key={task._id}
                        className={`task-item ${task.completed ? 'completed' : 'incomplete'}`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed || false}
                            onChange={() => toggleComplete(task)}
                            disabled={loading}
                        />

                        {editingTaskId === task._id ? (
                            <>
                                <div className="task-editing">
                                    <input
                                        type="text"
                                        value={editingTaskName}
                                        onChange={e => setEditingTaskName(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                saveEditing(task._id);
                                            }
                                        }}
                                    />
                                    <button onClick={() => saveEditing(task._id)} disabled={loading}>Save</button>
                                    <button onClick={cancelEditing} disabled={loading}>Cancel</button>
                                </div>

                            </>
                        ) : (
                            <>
      <span className={`task-name ${task.completed ? 'completed' : ''}`}>
        {task.taskName}
      </span>
                                    <button onClick={() => startEditing(task)} disabled={loading}>Edit</button>
                                    <button onClick={() => handleDelete(task._id)} disabled={loading}>Delete</button>
                            </>
                        )}
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default TodoList;
