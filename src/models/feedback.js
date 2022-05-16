const mongoose = require("mongoose")
const validator = require("validator")

//Schema
const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    message: {
        type: String,
        required: true,
        minlength: 2
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

//collection
const User = mongoose.model("User", feedbackSchema)

module.exports = User