module.exports = (app) => {
   const image = require("../controllers/image.controllers.js");
   const resize = require("../middleware/saveImage.middleware.js");

   app.post("/api/addImage", resize.resize, image.create);

   app.get("/api/images", image.findAll);

   app.get("/api/image/:imageId", image.findOne);

   app.get("/api/itemImages/:itemId", image.findOneByItemId);

   app.put("/api/image/:id", image.update);

   app.delete("/api/image/:id", image.delete);

   app.delete("/api/images", image.deleteAll);
};
