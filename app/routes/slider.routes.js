module.exports = (app) => {
   const slider = require("../controllers/slider.controllers.js");

   app.post("/api/addSlider", slider.create);

   app.get("/api/sliders", slider.findAll);

   app.get("/api/slider/:sliderId", slider.findOne);

   app.put("/api/slider/:id", slider.update);

   app.delete("/api/slider/:id", slider.delete);

   app.delete("/api/sliders", slider.deleteAll);
};
