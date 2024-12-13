import { AxiosInstance } from 'axios'

import { CounterSchema } from '@/entities/Counter'

import { createReduxStore } from './store'

export interface StateSchema {
    counter: CounterSchema
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
