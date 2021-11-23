module.exports = (app) => {
   const category = require("../controllers/category.controllers.js");
   const resize = require("../middleware/saveSecondImage.middleware.js");

   app.post("/api/addCategory", resize.resize, category.create);

   app.get("/api/categories", category.findAll);

   app.get("/api/specialCategories", category.findSpecialCategory);

   app.get("/api/category/:categoryId", category.findOne);

   app.put("/api/category/:id", category.update);

   app.delete("/api/category/:id", category.delete);

   app.delete("/api/categories", category.deleteAll);
};
