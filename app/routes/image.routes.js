module.exports = (app) => {
   const image = require("../controllers/image.controllers.js");

   app.post("/api/addImage", image.create);

   app.get("/api/images", image.findAll);

   app.get("/api/image/:imageId", image.findOne);

   app.put("/api/image/:id", image.update);

   app.delete("/api/image/:id", image.delete);

   app.delete("/api/images", image.deleteAll);
};
