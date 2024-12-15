import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

import User from '@/app/core/models/User'
import { MappedErrors, filterMessages } from '@/helpers/errorFilterMessage'
import { appConfig } from '@/infrastructure/config/config'

const { secretKey } = appConfig
const SECRET_KEY: Secret = secretKey

export class UserController {
    static async Registration(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const mapedErrors = filterMessages(
                    errors.mapped() as MappedErrors,
                )

                console.log(mapedErrors)

                res.status(400).json({ message: mapedErrors, errors })
                return
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                res.status(400).json({
                    message: `Ошибка: Этот адрес электронной почты уже зарегистрирован`,
                })
                return
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword })
            await user.save()

            res.json({ message: 'Профиль успешно создан' })
        } catch (e) {
            console.log(e)
            res.send({ message: 'Ошибка сервера' })
        }
    }

    static async Login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                res.status(404).json({ message: 'Email не найден' })
                return
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                res.status(400).json({ message: 'Неверный пароль' })
                return
            }

            const token = jwt.sign({ id: user }, SECRET_KEY, {
                expiresIn: '1h',
            })
            res.json({
                token,
                id: user.id,
                email: user.email,
            })
        } catch (e) {
            console.log(e)
            res.send({ message: 'Ошибка сервера' })
        }
    }

    static async Authorization(req: JwtPayload, res: Response): Promise<void> {
        try {
            const user = await User.findOne({ _id: req.user.id })
            if (!user) {
                return
            }

            const token = jwt.sign({ id: user }, SECRET_KEY, {
                expiresIn: '1h',
            })
            res.json({
                token,
                id: user.id,
                email: user.email,
            })
        } catch (e) {
            console.log(e)
            res.send({ message: 'Ошибка сервера' })
        }
    }
}
