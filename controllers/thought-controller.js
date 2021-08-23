const { Thought } = require("../models");

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select("-__v")
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));
    },

    // GET single thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne(
            { _id: params.id }
        )
            .select("-__v")
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with that ID." });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => res.json(err));
    },

    // POST new thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                // push thought's id to associated user's thoughts array
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this ID." });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // PUT to update thought by _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this ID." });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    // DELETE thought by _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this ID." });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    // POST to create new reacton for a thought
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with that ID." });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    // DELETE reaction from a thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: params.reactionId }},
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this ID." });
                    return;
                }
                res.json(thoughtData);
            })
    }
}