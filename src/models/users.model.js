import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts', required: true },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

export const userModel = mongoose.model(userCollection, userSchema)