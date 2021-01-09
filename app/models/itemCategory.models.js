const sql = require("./db.js");

const ItemCategory = function (itemCategory) {
   this.itemId = itemCategory.itemId;
   this.subId = itemCategory.subId;
};

ItemCategory.create = (newItemCategory, result) => {
   sql.query("INSERT INTO itemCategory SET ?", newItemCategory, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created itemCategory: ", {
         id: res.insertId,
         ...newItemCategory,
      });
      result(null, { id: res.insertId, ...newItemCategory });
   });
};

ItemCategory.findById = (itemCategoryId, result) => {
   sql.query(
      `SELECT * FROM itemCategory WHERE id = ${itemCategoryId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found itemCategory: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ItemCategory.getAll = (result) => {
   sql.query(`SELECT * FROM itemCategory `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("itemCategory: ", res);
      result(null, res);
   });
};

ItemCategory.updateById = (id, itemCategory, result) => {
   sql.query(
      "UPDATE itemCategory SET ? WHERE id = ?",
      [itemCategory, id],
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

         console.log("updated itemCategory: ", { id: id, ...itemCategory });
         result(null, { id: id, ...itemCategory });
      }
   );
};

ItemCategory.remove = (id, result) => {
   sql.query(
      "DELETE FROM itemCategory WHERE idItemCategory = ?",
      id,
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

         console.log("deleted itemCategory with id: ", id);
         result(null, res);
      }
   );
};

ItemCategory.removeAll = (result) => {
   sql.query("DELETE FROM itemCategory", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} itemCategory`);
      result(null, res);
   });
};

module.exports = ItemCategory;
