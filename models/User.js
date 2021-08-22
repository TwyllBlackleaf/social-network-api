const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Username is required.",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: "Email is required.",
        match: [/.+@.+\..+/, "Please enter a valid e-mail address."]
    },
    thoughts: [],
    friends: []
})