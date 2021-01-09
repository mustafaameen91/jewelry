const sql = require("./db.js");

const Slider = function (slider) {
   this.sliderImage = slider.sliderImage;
};

Slider.create = (newSlider, result) => {
   sql.query("INSERT INTO slider SET ?", newSlider, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created Slider: ", { id: res.insertId, ...newSlider });
      result(null, { id: res.insertId, ...newSlider });
   });
};

Slider.findById = (sliderId, result) => {
   sql.query(`SELECT * FROM slider WHERE id = ${sliderId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found slider: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Slider.getAll = (result) => {
   sql.query(`SELECT * FROM slider`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("slider: ", res);
      result(null, res);
   });
};

Slider.updateById = (id, slider, result) => {
   sql.query("UPDATE slider SET ? WHERE id = ?", [slider, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated slider: ", { id: id, ...slider });
      result(null, { id: id, ...slider });
   });
};

Slider.remove = (id, result) => {
   sql.query("DELETE FROM slider WHERE idSlider = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted slider with id: ", id);
      result(null, res);
   });
};

Slider.removeAll = (result) => {
   sql.query("DELETE FROM slider", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} slider`);
      result(null, res);
   });
};

module.exports = Slider;
