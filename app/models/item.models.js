const sql = require("./db.js");

function arrangeData(item, images, found) {
   let itemImages = images.filter((image) => {
      return image.itemId == item.idItem;
   });

   if (itemImages.length > 0) {
      return {
         idItem: item.idItem,
         itemName: item.itemName,
         itemDescription: item.itemDescription,
         itemDate: item.itemDate,
         itemQuality: item.itemQuality,
         itemQuantity: item.itemQuantity,
         itemLike: item.itemLike,
         special: item.special,
         itemNameEn: item.itemNameEn,
         itemDescriptionEn: item.itemDescriptionEn,
         subName: item.subName,
         categoryName: item.categoryName,
         subNameEn: item.subNameEn,
         categoryNameEn: item.categoryNameEn,
         idSub: item.idSub,
         foundFavorite: found,
         images: itemImages,
         isFavorite: !!item.isFavorite,
         likes: item.favoritesCount,
      };
   } else {
      return {
         idItem: item.idItem,
         itemName: item.itemName,
         itemDescription: item.itemDescription,
         itemDate: item.itemDate,
         itemQuality: item.itemQuality,
         itemQuantity: item.itemQuantity,
         itemLike: item.itemLike,
         special: item.special,
         itemNameEn: item.itemNameEn,
         itemDescriptionEn: item.itemDescriptionEn,
         subName: item.subName,
         categoryName: item.categoryName,
         subNameEn: item.subNameEn,
         categoryNameEn: item.categoryNameEn,
         idSub: item.idSub,
         foundFavorite: found,
         images: [],
         isFavorite: !!item.isFavorite,
         likes: item.favoritesCount,
      };
   }
}

function foundFavorite(itemId, macAddress, arrayOfFavorite) {
   console.log(arrayOfFavorite);
   let found = arrayOfFavorite.filter((fav) => {
      return fav.itemId == itemId && fav.macAddress == macAddress;
   });

   if (found.length > 0) {
      return true;
   } else {
      return false;
   }
}

const Item = function (item) {
   this.itemName = item.itemName;
   this.itemDescription = item.itemDescription;
   this.itemQuality = item.itemQuality;
   this.itemQuantity = item.itemQuantity;
   this.itemNameEn = item.itemNameEn;
   this.itemDescriptionEn = item.itemDescriptionEn;
   this.special = item.special;
};

Item.create = (newItem, result) => {
   sql.query("INSERT INTO item SET ?", newItem, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created item: ", { id: res.insertId, ...newItem });
      result(null, { id: res.insertId, ...newItem });
   });
};

Item.findBySpecial = (show, mac, result) => {
   sql.query(
      `SELECT
      item.idItem,
      item.itemName,
      subCategory.idSub,
      item.itemDescription,
      item.itemNameEn,
      item.itemDescriptionEn,
      DATE_FORMAT(item.itemDate, '%d/%m/%Y') AS itemDate,
      item.itemQuality,
      item.itemQuantity,
      item.itemLike,
      item.special,
      subCategory.subName,
      category.categoryName,
      category.categoryNameEn,
      subCategory.subNameEn,
      count(f.idFavorites) as favoritesCount
      ${mac ? ", IFNULL(NOT NOT(fs.itemId), FALSE) AS isFavorite" : ""}
   FROM
      item
      JOIN subCategory
      JOIN itemCategory
      JOIN category ON itemCategory.itemId = item.idItem
         AND itemCategory.subId = subCategory.idSub
         AND subCategory.categoryId = category.idCategory
      ${
         mac
            ? "left JOIN favorites as fs ON item.idItem = fs.itemId AND fs.macAddress = '" +
              mac +
              "'"
            : ""
      } 
    left join favorites as f on item.idItem = f.itemId group by item.idItem, subCategory.idSub
    ${show} WHERE item.special = 1`,
      (err, res) => {
         if (err) {
            result(null, err);
         }
         console.log("res:", res);
         sql.query(`SELECT * FROM image `, (err, resOne) => {
            let imageItem = res.map((item) => {
               console.log("isFavorite:", item.isFavorite);
               return arrangeData(item, resOne);
            });
            if (err) {
               console.log("error: ", err);
               result(null, err);
               return;
            }

            // console.log("item: ", res);
            result(null, imageItem);
         });
      }
   );
};

Item.findById = (itemId, result) => {
   sql.query(`SELECT * FROM item WHERE id = ${itemId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found item: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Item.findBySubId = (subId, mac, result) => {
   sql.query(
      `SELECT item.idItem , item.itemName , item.itemDescription ,item.itemNameEn ,
    item.itemDescriptionEn , DATE_FORMAT(item.itemDate, '%d/%m/%Y')AS itemDate ,
    item.itemQuality , item.itemQuantity , item.itemLike ,item.special, subCategory.subName , 
    category.categoryName , category.categoryNameEn ,subCategory.subNameEn,
      count(f.idFavorites) as favoritesCount
      ${mac ? ", IFNULL(NOT NOT(fs.itemId), FALSE) AS isFavorite" : ""}
    FROM item JOIN itemCategory JOIN subCategory JOIN category 
    ON item.idItem = itemCategory.itemId AND category.idCategory = subCategory.categoryId  AND itemCategory.subId = subCategory.idSub
      ${
         mac
            ? "left JOIN favorites as fs ON item.idItem = fs.itemId AND fs.macAddress = '" +
              mac +
              "'"
            : ""
      } 
    left join favorites as f on item.idItem = f.itemId 
    WHERE itemCategory.subId = ${subId} group by item.idItem, subCategory.idSub
    `,
      (err, res) => {
         if (err) {
            return result(null, err);
         }
         sql.query(`SELECT * FROM image `, (err, resOne) => {
            sql.query(`SELECT * FROM favorites`, (err, resFav) => {
               let imageItem = res.map((item) => {
                  return arrangeData(
                     item,
                     resOne,
                     foundFavorite(item.idItem, mac, resFav)
                  );
               });
               if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
               }

               // console.log("item: ", res);
               result(null, imageItem);
            });
         });
      }
   );
};

Item.getAll = (show, mac, special, result) => {
   sql.query(
      `SELECT
      item.idItem,
      item.itemName,
      subCategory.idSub,
      item.itemDescription,
      item.itemNameEn,
      item.itemDescriptionEn,
      DATE_FORMAT(item.itemDate, '%d/%m/%Y') AS itemDate,
      item.itemQuality,
      item.itemQuantity,
      item.itemLike,
      item.special,
      subCategory.subName,
      category.categoryName,
      category.categoryNameEn,
      subCategory.subNameEn,
      count(f.idFavorites) as favoritesCount
      ${mac ? ", IFNULL(NOT NOT(fs.itemId), FALSE) AS isFavorite" : ""}
   FROM
      item
      JOIN subCategory
      JOIN itemCategory
      JOIN category ON itemCategory.itemId = item.idItem
         AND itemCategory.subId = subCategory.idSub
         AND subCategory.categoryId = category.idCategory
      ${
         mac
            ? "left JOIN favorites as fs ON item.idItem = fs.itemId AND fs.macAddress = '" +
              mac +
              "'"
            : ""
      } 
    left join favorites as f on item.idItem = f.itemId ${special} group by item.idItem, subCategory.idSub 
    ${show}`,
      (err, res) => {
         if (err) {
            result(null, err);
         }
         console.log("res:", res);
         sql.query(`SELECT * FROM image `, (err, resOne) => {
            let imageItem = res.map((item) => {
               console.log("isFavorite:", item.isFavorite);
               return arrangeData(item, resOne);
            });
            if (err) {
               console.log("error: ", err);
               result(null, err);
               return;
            }

            // console.log("item: ", res);
            result(null, imageItem);
         });
      }
   );
};

Item.updateById = (id, item, result) => {
   sql.query("UPDATE item SET ? WHERE idItem = ?", [item, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated item: ", { id: id, ...item });
      result(null, { id: id, ...item });
   });
};

Item.updateLikeById = (id, itemLike, result) => {
   sql.query(
      "UPDATE item SET itemLike  = ? WHERE idItem = ?",
      [itemLike + 1, id],
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

         console.log("updated item: ", { id: id, ...itemLike });
         result(null, { id: id, ...itemLike });
      }
   );
};

Item.remove = (id, result) => {
   sql.query("DELETE FROM item WHERE idItem = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted item with id: ", id);
      result(null, res);
   });
};

Item.removeAll = (result) => {
   sql.query("DELETE FROM item", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} items`);
      result(null, res);
   });
};

module.exports = Item;
