import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './TodoList.module.scss'
import { MyTodo } from '../../model/types/todo'
import { TodoItem } from '../TodoItem/TodoItem'

interface TodoListProps {
    className?: string
    todos: MyTodo[]
    isLoading?: boolean
    updateTodoServer: (id: string, value?: string, completed?: boolean) => void
    updateTodoAction: (id: string, value?: string, completed?: boolean) => void
}

export const TodoList = memo((props: TodoListProps) => {
    const { className, todos, updateTodoServer, updateTodoAction, isLoading } =
        props

    return (
        <div className={classNames(cls.todoList, {}, [className])}>
            {todos.map((todo) => (
                <TodoItem
                    todo={todo}
                    key={todo._id}
                    isLoading={isLoading}
                    updateTodoServer={updateTodoServer}
                    updateTodoAction={updateTodoAction}
                />
            ))}
        </div>
    )
})
