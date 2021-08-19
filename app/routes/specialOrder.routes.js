module.exports = (app) => {
   const specialOrder = require("../controllers/specialOrder.controllers.js");

   app.post("/api/addSpecialOrder", specialOrder.create);

   app.get("/api/specialOrders", specialOrder.findAll);

   app.get("/api/specialOrder/:specialOrderId", specialOrder.findOne);

   app.put("/api/specialOrder/:id", specialOrder.update);

   app.delete("/api/specialOrder/:id", specialOrder.delete);

   app.delete("/api/specialOrders", specialOrder.deleteAll);
};
