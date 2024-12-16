import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'

interface updateTodoProps {
    id?: string
}

export const deleteTodo = createAsyncThunk<
    string,
    updateTodoProps,
    ThunkConfig<string>
>('userTodoList/deleteTodo', async (props, thunkAPI) => {
    const { dispatch, extra, rejectWithValue } = thunkAPI

    const { id } = props

    try {
        const response = await extra.api.delete(`/todos/?id=${id}`)

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
