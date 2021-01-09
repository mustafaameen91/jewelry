const sql = require("./db.js");

const Item = function (item) {
   this.itemName = item.itemName;
   this.itemDescription = item.itemDescription;
   this.itemQuality = item.itemQuality;
   this.itemQuantity = item.itemQuantity;
   this.itemLike = item.itemLike;
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

Item.getAll = (result) => {
   sql.query(`SELECT * FROM item `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("item: ", res);
      result(null, res);
   });
};

Item.updateById = (id, item, result) => {
   sql.query("UPDATE item SET ? WHERE id = ?", [item, id], (err, res) => {
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
