import { Request, Response } from 'express'

import Todo from '@/app/core/models/Todo'

interface CreateTodoRequest {
    value: string
}

export class TodoController {
    static async createTodo(
        req: Request<{}, {}, CreateTodoRequest>,
        res: Response,
    ): Promise<void> {
        try {
            const { value } = req.body

            if (!req.user?.id) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }

            const todo = new Todo({
                value,
                user: req.user.id,
            })
            await todo.save()
            res.json(todo)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getTodos(req: Request, res: Response): Promise<void> {
        try {
            const { search, completed } = req.query as {
                search?: string
                completed?: boolean
            }

            if (!req.user?.id) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }

            const query = {
                user: req.user.id,
                ...(completed !== undefined && { completed }),
            }
            const todos = await Todo.find(query).sort({ _id: -1 })

            if (search && search.length > 1) {
                const filteredTodos = todos.filter((todo) =>
                    todo.value.toLowerCase().includes(search.toLowerCase()),
                )
                res.json(filteredTodos)
                return
            }

            res.json(todos)
        } catch (e) {
            console.error(e)
            res.status(500).json({ message: "Can't get todos" })
        }
    }

    static async updateTodoValue(req: Request, res: Response): Promise<void> {
        try {
            const { id, value, completed } = req.body as {
                id: string
                value: string
                completed: boolean
            }

            if (!req.user?.id) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }

            if (!id || !value) {
                res.status(400).json({
                    message: 'Invalid data: id and value are required',
                })
                return
            }

            const todo = await Todo.findOne({
                _id: id,
                user: req.user.id,
            })

            if (!todo) {
                res.status(404).json({ message: 'Todo not found' })
                return
            }

            todo.value = value
            todo.completed = completed
            await todo.save()

            res.json({ message: 'Todo updated successfully', todo })
        } catch (e) {
            console.error(e)
            res.status(400).json({ message: 'Error updating todo' })
        }
    }

    static async deleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query as { id?: string }

            if (!req.user?.id) {
                res.status(401).json({ message: 'Unauthorized' })
                return
            }

            const todo = await Todo.findOne({
                _id: id,
                user: req.user.id,
            })

            if (!todo) {
                res.status(404).json({ message: 'Todo not found' })
                return
            }

            await todo.deleteOne()
            res.json({ message: 'Todo was deleted' })
        } catch (e) {
            console.error(e)
            res.status(400).json({ message: 'Error deleting todo' })
        }
    }
}
