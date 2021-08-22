const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
    thoughtText: {
        type: String
    },
    createdAt: {
        type: Date
    },
    username: {
        type: String
    },
    reactions: []
});