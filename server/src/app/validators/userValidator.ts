import { check } from 'express-validator'

export class UserValidator {
    static userOptions() {
        return [
            check('email', 'Invalid email address').optional().isEmail(),
            check(
                'password',
                'Password must be longer than 3 and shorter than 12 characters in length',
            )
                .optional()
                .isLength({ min: 3, max: 12 }),
        ]
    }
}
