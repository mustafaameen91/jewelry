module.exports = (app) => {
   const favorites = require("../controllers/favorites.controllers.js");

   app.post("/api/addFavorites", favorites.create);

   app.get("/api/favorites", favorites.findAll);

   app.get("/api/favorite/:favoriteId", favorites.findOne);

   app.get("/api/favoriteMac/:macAddress", favorites.findOneByMacAddress);

   app.get("/api/favoriteFound", favorites.findOneByFound);

   app.put("/api/favorite/:id", favorites.update);

   app.delete("/api/favorite/:id", favorites.delete);

   app.delete("/api/favorites", favorites.deleteAll);
};
