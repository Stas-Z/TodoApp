export interface MyTodo {
    _id: string
    value: string
    userId: string
    date?: string
    completed?: boolean
}

export interface MyTodoSchema {
    value: string
}
