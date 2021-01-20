const sql = require("./db.js");

const Favorites = function (favorites) {
   this.macAddress = favorites.macAddress;
   this.itemId = favorites.itemId;
};

Favorites.create = (newFavorites, result) => {
   sql.query("INSERT INTO favorites SET ?", newFavorites, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created favorites: ", { id: res.insertId, ...newFavorites });
      result(null, { id: res.insertId, ...newFavorites });
   });
};

Favorites.findById = (favoritesId, result) => {
   sql.query(
      `SELECT * FROM favorites WHERE id = ${favoritesId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found favorites: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Favorites.findByMacAddress = (macAddress, result) => {
   sql.query(
      `SELECT * FROM favorites WHERE macAddress = '${macAddress}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found favorites: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Favorites.getAll = (result) => {
   sql.query(`SELECT * FROM favorites `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("favorites: ", res);
      result(null, res);
   });
};

Favorites.updateById = (id, favorites, result) => {
   sql.query(
      "UPDATE favorites SET ? WHERE idFavorites = ?",
      [favorites, id],
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

         console.log("updated favorites: ", { id: id, ...favorites });
         result(null, { id: id, ...favorites });
      }
   );
};

Favorites.remove = (id, result) => {
   sql.query("DELETE FROM favorites WHERE idFavorites = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted favorites with id: ", id);
      result(null, res);
   });
};

Favorites.removeAll = (result) => {
   sql.query("DELETE FROM favorites", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} favorites`);
      result(null, res);
   });
};

module.exports = Favorites;
