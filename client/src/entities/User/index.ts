export { initAuthData } from './model/services/initAuthData'

export {
    getUserAuthData,
    getUserData,
} from './model/selectors/getUserAuthData/getUserAuthData'

export { userReducer, userActions } from './model/slices/userSlice'

export type { UserSchema, User } from './model/types/userSchema'
