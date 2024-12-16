import { memo, useCallback, useEffect } from 'react'

import { Empty, Typography } from 'antd'
import { useSelector } from 'react-redux'

import { MyTodo, TodoList } from '@/entities/Todo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import {
    getTodoListIsLoading,
    getTodosList,
} from '../../model/selectors/getTodosSelector'
import { deleteTodo } from '../../model/services/deleteTodo/deleteTodo'
import { fetchTodoList } from '../../model/services/fetchTodoList/fetchTodoList'
import { updateTodo } from '../../model/services/updateTodo/updateTodo'
import { todoListActions } from '../../model/slice/todoListSlice'

interface UserTodoListProps {
    className?: string
}
const { Text } = Typography

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
            todoListActions.updateTodo({
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
    const deleteTodoHandler = useCallback(
        async (todo: MyTodo) => {
            const backUpTodo = { ...todo }

            dispatch(todoListActions.deleteTodo(todo._id))

            try {
                const id = todo._id
                await dispatch(deleteTodo({ id })).unwrap()
            } catch (e) {
                if (backUpTodo) {
                    dispatch(todoListActions.setTodo(backUpTodo))
                }
                console.error('Failed to update todo:', e)
            }
        },
        [dispatch],
    )

    if (!todos.length) {
        return (
            <Empty
                description="У вас нет дел на сегодня!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        )
    }
    return (
        <div className={classNames('', {}, [className])}>
            <TodoList
                todos={todos}
                isLoading={isLoading}
                updateTodoServer={updateTodoServer}
                updateTodoAction={updateTodoAction}
                deleteTodoHandler={deleteTodoHandler}
            />
        </div>
    )
})
