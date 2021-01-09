module.exports = (app) => {
   const profile = require("../controllers/profile.controllers.js");

   app.post("/api/addProfile", profile.create);

   app.get("/api/profiles", profile.findAll);

   app.get("/api/profile/:profileId", profile.findOne);

   app.put("/api/profile/:id", profile.update);

   app.delete("/api/profile/:id", profile.delete);

   app.delete("/api/profiles", profile.deleteAll);
};
