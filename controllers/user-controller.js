const { User } = require("../models");

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find()
            .select("-__v")
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },

    // GET single user by _id
    getUserById({ params }, res) {
        User.findOne(
            { _id: params.userId }
        )
            // Populate thought and friend data
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .populate({
                path: "friends",
                select: "-__v"
            })
            .select("-__v")
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },
    
    // POST new user
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },

    // PUT to update user by _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            body,
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this ID." });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // DELETE user by _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    }
}