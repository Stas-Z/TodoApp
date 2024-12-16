import { check } from 'express-validator'

export class UserValidator {
    static userOptions() {
        return [
            check('email', 'Неверный адрес электронной почты')
                .optional()
                .isEmail(),
            check(
                'password',
                'Пароль должен быть длиннее 3 и короче 12 символов.',
            )
                .optional()
                .isLength({ min: 3, max: 12 }),
        ]
    }
}
