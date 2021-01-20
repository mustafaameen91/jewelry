module.exports = (app) => {
   const admin = require("../controllers/admin.controllers.js");

   app.post("/api/addAdmin", admin.create);

   app.get("/api/admins", admin.findAll);

   app.post("/api/login", admin.login);

   app.get("/api/admin/:adminId", admin.findOne);

   app.put("/api/admin/:id", admin.update);

   app.delete("/api/admin/:id", admin.delete);

   app.delete("/api/admins", admin.deleteAll);
};
