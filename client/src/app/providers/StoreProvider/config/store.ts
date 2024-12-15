import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/User'
import { authMiddleware, regReducer } from '@/features/AuthorizationForm'
import { $api } from '@/shared/api/api'

import { StateSchema, ThunkExtraArg } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        authForm: regReducer,
    }

    const extraArg: ThunkExtraArg = {
        api: $api,
    }

    const store = configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(authMiddleware),
    })

    return store
}
