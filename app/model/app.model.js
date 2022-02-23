const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
});

module.exports = mongoose.model("App", AppSchema);