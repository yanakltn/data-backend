const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    name: String,
    surname: String,
});

module.exports = mongoose.model("App", AppSchema);