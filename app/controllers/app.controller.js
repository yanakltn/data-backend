const App = require("../model/app.model.js");

// Create and Save a new Message
exports.create = (req, res) => {
    const data = new App({
        name: req.body.name,
        surname: req.body.surname
    });
    data
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the data.",
            });
        });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
    App.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data.",
            });
        });
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
    App.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Error retrieving data with id " + req.params.id,
            });
        });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
    App.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            surname: req.body.surname
        },
        { new: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Error updating data with id " + req.params.id,
            });
        });
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
    App.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id,
                });
            }
            res.send({ message: "Data deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Could not delete data with id " + req.params.id,
            });
        });
};
