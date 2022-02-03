const database = require("../model/app.model.js");

// Create and Save a new Message
exports.create = (req, res) => {
    database.push(req.body);
    res.status(201).send({ message: "Created" });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
    res.send(database);
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
    const id = req.params.id;
    const item = database.find(item => item.id == id);
    if (!!item) {
        res.send(item);
    } else {
        res.status(404).send({
            message: "Data not found with id " + id,
        });
    }
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const item = req.body;

    const index = database.findIndex(item => item.id == id);
    if (index >= 0) {
        database[index] = item;
        res.send(item);
    } else {
        res.status(404).send({
            message: "Data not found with id " + id,
        });
    }
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    const index = database.findIndex(item => item.id == id);
    if (index >= 0) {
        database.splice(index, 1);
        res.status(200).send({ message: "Deleted" });
    } else {
        res.status(404).send({
            message: "Data not found with id " + id,
        });
    }
};
