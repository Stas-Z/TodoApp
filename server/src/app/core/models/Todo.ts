import mongoose, { Schema, Types, model } from 'mongoose'

export const { ObjectId } = mongoose.Types
export interface TodoAttrs {
    value: string
    date?: Date
    completed?: boolean
    user?: Types.ObjectId
}
export interface TodoDoc extends mongoose.Document {
    value: string
    completed?: boolean
    date?: Date
    user?: Types.ObjectId
}
export interface TodoModel extends mongoose.Model<TodoDoc> {
    build(attrs: TodoAttrs): TodoDoc
}

const Todo = new Schema({
    value: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() },
    user: { type: ObjectId, ref: 'User' },
})

export default model<TodoDoc, TodoModel>('Todo', Todo)
