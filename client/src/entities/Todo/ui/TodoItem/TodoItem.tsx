import { memo, useCallback, useEffect, useState } from 'react'

import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Input, Skeleton, Space } from 'antd'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './TodoItem.module.scss'
import { MyTodo } from '../../model/types/todo'

interface TodoItemProps {
    className?: string
    todo: MyTodo
    isLoading?: boolean
    updateTodoServer: (id: string, value?: string, completed?: boolean) => void
    updateTodoAction: (id: string, value?: string, completed?: boolean) => void
}

export const TodoItem = memo((props: TodoItemProps) => {
    const { className, todo, updateTodoServer, updateTodoAction, isLoading } =
        props

    const [initValue, setInitValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        setInitValue(todo.value)
        // eslint-disable-next-line
    }, [])

    const onChangeText = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
            updateTodoAction(todo._id, e.target.value)
        },
        [updateTodoAction, todo._id],
    )

    const handleBlur = useCallback(() => {
        if (initValue !== inputValue) {
            updateTodoServer(todo._id, inputValue)
            setInitValue(inputValue)
        }
    }, [initValue, inputValue, todo._id, updateTodoServer])

    const handleCompleted = useCallback(() => {
        updateTodoAction(todo._id, todo.value, !todo.completed)
        updateTodoServer(todo._id, todo.value, !todo.completed)
    }, [
        todo._id,
        todo.completed,
        todo.value,
        updateTodoAction,
        updateTodoServer,
    ])
    console.log('isLoading', isLoading)

    return (
        <Skeleton loading={isLoading} active>
            <Card
                hoverable
                className={classNames(
                    cls.card,
                    {
                        [cls.completed]: todo.completed,
                        [cls.completedCard]: todo.completed,
                    },
                    [className],
                )}
            >
                <Space.Compact block>
                    <Button size="large" icon={<DeleteOutlined />} />
                    <Input
                        value={todo.value}
                        onChange={onChangeText}
                        onBlur={handleBlur}
                        size="large"
                    />
                    <Button
                        size="large"
                        onClick={handleCompleted}
                        icon={
                            <CheckCircleOutlined className={cls.buttonBlue} />
                        }
                    />
                </Space.Compact>
            </Card>
        </Skeleton>
    )
})
