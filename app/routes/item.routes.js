module.exports = (app) => {
   const item = require("../controllers/item.controllers.js");

   app.post("/api/addItem", item.create);

   app.get("/api/items", item.findAll);

   app.get("/api/item/:itemId", item.findOne);

   app.get("/api/itemSpecial", item.findOneBySpecial);

   app.get("/api/itemSub", item.findOneBySub);

   app.put("/api/item/:id", item.update);

   app.put("/api/itemLike/:id", item.updateLike);

   app.delete("/api/item/:id", item.delete);

   app.delete("/api/items", item.deleteAll);
};
