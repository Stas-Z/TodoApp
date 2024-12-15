import { AxiosInstance } from 'axios'

import { UserSchema } from '@/entities/User'
import { AuthSchema } from '@/features/AuthorizationForm'

import { createReduxStore } from './store'

export interface StateSchema {
    user: UserSchema
    authForm: AuthSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']