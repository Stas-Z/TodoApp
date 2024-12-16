import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './TodoCompletedPage.module.scss'

interface TodoCompletedPageProps {
    className?: string
}
const TodoCompletedPage = memo((props: TodoCompletedPageProps) => {
    const { className } = props

    return (
        <div className={classNames(cls.todoCompletedPage, {}, [className])}>
            todoCompletedPage
        </div>
    )
})

export default TodoCompletedPage
