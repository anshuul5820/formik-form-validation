import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model('user', userSchema)

export { User }