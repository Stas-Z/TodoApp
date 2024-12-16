import Router from 'express'

import { TodoController } from '@/app/controllers/todoController'
import authMiddleware from '@/infrastructure/middleware/auth.middleware'

const router = Router()

router.post('', authMiddleware, TodoController.createTodo)

router.get('', authMiddleware, TodoController.getTodos)

router.post('/update', authMiddleware, TodoController.updateTodoValue)

router.delete('/', authMiddleware, TodoController.deleteTodo)

export default router
