module.exports = (app) => {
   const subCategory = require("../controllers/subCategory.controllers.js");

   app.post("/api/addSubCategory", subCategory.create);

   app.get("/api/subCategories", subCategory.findAll);

   app.get("/api/subCategory/:subCategoryId", subCategory.findOne);

   app.put("/api/subCategory/:id", subCategory.update);

   app.delete("/api/subCategory/:id", subCategory.delete);

   app.delete("/api/subCategories", subCategory.deleteAll);
};
