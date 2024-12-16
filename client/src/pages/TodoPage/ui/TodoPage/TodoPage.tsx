import { memo } from 'react'

import { AddNewTodo, UserTodoList } from '@/features/UserTodoList'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './TodoPage.module.scss'

interface TodoPageProps {
    className?: string
}

export const TodoPage = memo((props: TodoPageProps) => {
    const { className } = props

    return (
        <div className={classNames(cls.todoPage, {}, [className])}>
            <AddNewTodo />
            <UserTodoList />
        </div>
    )
})
