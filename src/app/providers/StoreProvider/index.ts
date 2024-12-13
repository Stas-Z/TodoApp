import type {
    StateSchema,
    ThunkConfig,
    AppDispatch,
    ThunkExtraArg,
} from './config/StateSchema'
import { createReduxStore } from './config/store'
import { StoreProvider } from './ui/StoreProvider'

export { StoreProvider, createReduxStore }

export type { StateSchema, AppDispatch, ThunkConfig, ThunkExtraArg }
