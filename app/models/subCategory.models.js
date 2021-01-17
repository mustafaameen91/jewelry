const sql = require("./db.js");

const SubCategory = function (subCategory) {
   this.categoryId = subCategory.categoryId;
   this.subName = subCategory.subName;
   this.subImage = subCategory.subImage;
   this.subNameEn = subCategory.subNameEn;
};

SubCategory.create = (newSubCategory, result) => {
   sql.query("INSERT INTO subCategory SET ?", newSubCategory, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created subCategory: ", {
         id: res.insertId,
         ...newSubCategory,
      });
      result(null, { id: res.insertId, ...newSubCategory });
   });
};

SubCategory.findById = (subCategoryId, result) => {
   sql.query(
      `SELECT * FROM subCategory WHERE id = ${subCategoryId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found subCategory: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

SubCategory.findByCategoryId = (categoryId, result) => {
   sql.query(
      `SELECT * FROM subCategory WHERE categoryId = ${categoryId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found subCategory: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

SubCategory.getAll = (result) => {
   sql.query(
      `SELECT * FROM subCategory JOIN category WHERE category.idCategory = subCategory.categoryId `,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("subCategory: ", res);
         result(null, res);
      }
   );
};

SubCategory.updateById = (id, subCategory, result) => {
   sql.query(
      "UPDATE subCategory SET ? WHERE id = ?",
      [subCategory, id],
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

         console.log("updated subCategory: ", { id: id, ...subCategory });
         result(null, { id: id, ...subCategory });
      }
   );
};

SubCategory.remove = (id, result) => {
   sql.query(
      "DELETE FROM subCategory WHERE idSubCategory = ?",
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

         console.log("deleted subCategory with id: ", id);
         result(null, res);
      }
   );
};

SubCategory.removeAll = (result) => {
   sql.query("DELETE FROM subCategory", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} subCategory`);
      result(null, res);
   });
};

module.exports = SubCategory;
