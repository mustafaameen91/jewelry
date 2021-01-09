module.exports = (app) => {
   const location = require("../controllers/location.controllers.js");

   app.post("/api/addLocation", location.create);

   app.get("/api/locations", location.findAll);

   app.get("/api/location/:locationId", location.findOne);

   app.put("/api/location/:id", location.update);

   app.delete("/api/location/:id", location.delete);

   app.delete("/api/locations", location.deleteAll);
};
