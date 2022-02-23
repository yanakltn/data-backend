const express = require('express');
const expressOasGenerator = require('express-oas-generator');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017",
    {
        useNewUrlParser: true,
    }
)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log("Could not connect to the database. Error...", err);
        process.exit();
    });

const app = express();
expressOasGenerator.init(app, {});

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors())
app.get('/', (req, res) => {
    res.json({ "message": "Server is running :D" });
});

let PORT = parseInt(process.env.PORT, 10);
if (Number.isNaN(PORT)) {
    PORT = 8080;
}

require('./app/routes/app.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

