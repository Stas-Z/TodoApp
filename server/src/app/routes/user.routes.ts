import Router from 'express'

import authMiddleware from '@/infrastructure/middleware/auth.middleware'

import { UserController } from '../controllers/userController'
import { UserValidator } from '../validators/userValidator'

const router = Router()

router.post(
    '/registration',
    UserValidator.userOptions(),
    UserController.Registration,
)
router.post('/login', UserController.Login)

router.get('/auth', authMiddleware, UserController.Authorization)

export default router
