import { memo, useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { TodoList } from '@/entities/Todo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import {
    getTodoListIsLoading,
    getTodosList,
} from '../../model/selectors/getTodosSelector'
import { fetchTodoList } from '../../model/services/fetchTodoList/fetchTodoList'
import { updateTodo } from '../../model/services/updateTodo/updateTodo'
import { todoListActions } from '../../model/slice/todoListSlice'

interface UserTodoListProps {
    className?: string
}

export const UserTodoList = memo((props: UserTodoListProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const todos = useSelector(getTodosList)
    const isLoading = useSelector(getTodoListIsLoading)

    useEffect(() => {
        if (!todos.length) {
            dispatch(fetchTodoList({}))
        }
    }, [dispatch, todos.length])

    const updateTodoAction = (
        id: string,
        value?: string,
        completed?: boolean,
    ) => {
        dispatch(
            todoListActions.updateTodoValue({
                id,
                changes: { value, completed },
            }),
        )
    }

    const updateTodoServer = useCallback(
        (id: string, value?: string, completed?: boolean) => {
            dispatch(updateTodo({ id, value, completed }))
        },
        [dispatch],
    )

    return (
        <div className={classNames('', {}, [className])}>
            <TodoList
                todos={todos}
                isLoading={isLoading}
                updateTodoServer={updateTodoServer}
                updateTodoAction={updateTodoAction}
            />
        </div>
    )
})
