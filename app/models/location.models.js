const sql = require("./db.js");

const Location = function (location) {
   this.lang = location.lang;
   this.lat = location.lat;
   this.storeImage = location.storeImage;
   this.note = location.note;
};

Location.create = (newLocation, result) => {
   sql.query("INSERT INTO location SET ?", newLocation, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created location: ", { id: res.insertId, ...newLocation });
      result(null, { id: res.insertId, ...newLocation });
   });
};

Location.findById = (locationId, result) => {
   sql.query(`SELECT * FROM location WHERE id = ${locationId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found location: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Location.getAll = (result) => {
   sql.query(`SELECT * FROM location `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("location: ", res);
      result(null, res);
   });
};

Location.updateById = (id, location, result) => {
   sql.query(
      "UPDATE location SET ? WHERE idLocation = ?",
      [location, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated location: ", { id: id, ...location });
         result(null, { id: id, ...location });
      }
   );
};

Location.remove = (id, result) => {
   sql.query("DELETE FROM location WHERE idLocation = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted location with id: ", id);
      result(null, res);
   });
};

Location.removeAll = (result) => {
   sql.query("DELETE FROM location", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} locations`);
      result(null, res);
   });
};

module.exports = Location;
