import mongoose, { Schema, model } from 'mongoose'

export const { ObjectId } = mongoose.Types

export interface UserAttrs {
    email: String
    password: string
}
export interface UserDoc extends mongoose.Document {
    email: String
    password: string
}
export interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export default model<UserDoc, UserModel>('User', User)
