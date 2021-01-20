const sql = require("./db.js");

function arrangeData(item, images) {
   let itemImages = images.filter((image) => {
      return image.itemId == item.idItem;
   });

   if (itemImages.length > 0) {
      return {
         itemId: item.idItem,
         itemName: item.itemName,
         itemDescription: item.itemDescription,
         itemDate: item.itemDate,
         itemQuality: item.itemQuality,
         itemQuantity: item.itemQuantity,
         itemLike: item.itemLike,
         itemNameEn: item.itemNameEn,
         itemDescriptionEn: item.itemDescriptionEn,
         subName: item.subName,
         categoryName: item.categoryName,
         subNameEn: item.subNameEn,
         categoryNameEn: item.categoryNameEn,
         idSub: item.idSub,
         macAddress: item.macAddress,
         idFavorites: item.idFavorites,
         images: itemImages,
      };
   } else {
      return {
         itemId: item.idItem,
         itemName: item.itemName,
         itemDescription: item.itemDescription,
         itemDate: item.itemDate,
         itemQuality: item.itemQuality,
         itemQuantity: item.itemQuantity,
         itemLike: item.itemLike,
         itemNameEn: item.itemNameEn,
         itemDescriptionEn: item.itemDescriptionEn,
         subName: item.subName,
         categoryName: item.categoryName,
         subNameEn: item.subNameEn,
         categoryNameEn: item.categoryNameEn,
         idSub: item.idSub,
         macAddress: item.macAddress,
         idFavorites: item.idFavorites,
         images: [],
      };
   }
}

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
      `SELECT item.idItem , item.itemName ,subCategory.idSub , favorites.macAddress , item.itemDescription ,item.itemNameEn , item.itemDescriptionEn , DATE_FORMAT(item.itemDate, '%d/%m/%Y')AS itemDate , item.itemQuality , item.itemQuantity , item.itemLike , subCategory.subName , category.categoryName , category.categoryNameEn ,subCategory.subNameEn FROM favorites JOIN item JOIN subCategory JOIN itemCategory JOIN category ON favorites.itemId = item.idItem AND itemCategory.itemId = item.idItem AND itemCategory.subId = subCategory.idSub AND subCategory.categoryId = category.idCategory WHERE favorites.macAddress = '${macAddress}'`,
      (err, res) => {
         sql.query(`SELECT * FROM image `, (err, resOne) => {
            let imageItem = res.map((item) => {
               return arrangeData(item, resOne);
            });
            if (err) {
               console.log("error: ", err);
               result(err, null);
               return;
            }

            if (res.length) {
               console.log("found favorites: ", res);
               result(null, imageItem);
               return;
            }

            result({ kind: "not_found" }, null);
         });
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
