module.exports = (app) => {
    const App = require("../controllers/app.controller.js");

    app.post("/data", App.create);

    app.get("/data", App.findAll);

    app.get("/data/:id", App.findOne);

    app.put("/data/:id", App.update);

    app.delete("/data/:id", App.delete);
};