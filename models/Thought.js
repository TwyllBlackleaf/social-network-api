const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: "Please enter some text for your Reaction.",
            maxLength: [280, "Maximum length is 280 characters."]
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateValue) => moment(dateValue).format("MMM Do, YYYY [at] hh:mm a")
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Please enter some text for your Thought.",
            minLength: [1, "Minimum length is 1 character."],
            maxLength: [280, "Maximum length is 280 characters."]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateValue) => moment(dateValue).format("MMM Do, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;