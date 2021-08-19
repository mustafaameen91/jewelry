module.exports = (app) => {
   const itemComment = require("../controllers/itemComment.controllers.js");

   app.post("/api/addItemComment", itemComment.create);

   app.get("/api/itemComments", itemComment.findAll);

   app.get("/api/itemComments/:itemCommentId", itemComment.findOne);

   app.get("/api/commentItem/:itemId", itemComment.findItemComments);

   app.put("/api/itemComment/:id", itemComment.update);

   app.delete("/api/itemComment/:id", itemComment.delete);

   app.delete("/api/itemComments", itemComment.deleteAll);
};
