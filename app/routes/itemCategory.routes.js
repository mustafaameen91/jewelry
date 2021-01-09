module.exports = (app) => {
   const itemCategory = require("../controllers/itemCategory.controllers.js");

   app.post("/api/addItemCategory", itemCategory.create);

   app.get("/api/itemCategories", itemCategory.findAll);

   app.get("/api/itemCategory/:itemCategoryId", itemCategory.findOne);

   app.put("/api/itemCategory/:id", itemCategory.update);

   app.delete("/api/itemCategory/:id", itemCategory.delete);

   app.delete("/api/itemCategories", itemCategory.deleteAll);
};
