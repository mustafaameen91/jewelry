module.exports = (app) => {
   const visit = require("../controllers/visit.controllers.js");

   app.post("/api/addVisit", visit.create);

   app.get("/api/visits", visit.findAll);

   app.get("/api/visit/:visitId", visit.findOne);

   app.put("/api/visit/:id", visit.update);

   app.delete("/api/visit/:id", visit.delete);

   app.delete("/api/visits", visit.deleteAll);
};
