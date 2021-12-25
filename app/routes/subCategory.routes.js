module.exports = (app) => {
   const subCategory = require("../controllers/subCategory.controllers.js");
   const resize = require("../middleware/saveSecondImage.middleware.js");
   const resizeImage = require("../middleware/saveCategoryImage.middleware.js");

   app.post(
      "/api/addSubCategory",
      resize.resize,
      resizeImage.resize,
      subCategory.create
   );

   app.get("/api/subCategories", subCategory.findAll);

   app.get("/api/subCategory/:subCategoryId", subCategory.findOne);

   app.get("/api/subCategoryId/:categoryId", subCategory.findOneByCategoryId);

   app.put(
      "/api/subCategory/:id",
      resize.resize,
      resizeImage.resize,
      subCategory.update
   );

   app.delete("/api/subCategory/:id", subCategory.delete);

   app.delete("/api/subCategories", subCategory.deleteAll);
};
