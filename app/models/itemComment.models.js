const sql = require("./db.js");

const ItemComment = function (itemComment) {
   this.itemId = itemComment.itemId;
   this.comment = itemComment.comment;
};

ItemComment.create = (newItemComment, result) => {
   sql.query("INSERT INTO itemComment SET ?", newItemComment, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created itemComment: ", {
         id: res.insertId,
         ...newItemComment,
      });
      result(null, { id: res.insertId, ...newItemComment });
   });
};

ItemComment.findById = (itemCommentId, result) => {
   sql.query(
      `SELECT * FROM itemComment WHERE id = ${itemCommentId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found itemComment: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ItemComment.getItemComments = (itemId, result) => {
   sql.query(
      `SELECT * FROM itemComment WHERE itemId = ${itemId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found itemComment: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ItemComment.getAll = (result) => {
   sql.query(`SELECT * FROM itemComment `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("itemComment: ", res);
      result(null, res);
   });
};

ItemComment.updateById = (id, itemComment, result) => {
   sql.query(
      "UPDATE itemComment SET ? WHERE idItemComment = ?",
      [itemComment, id],
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

         console.log("updated itemComment: ", { id: id, ...itemComment });
         result(null, { id: id, ...itemComment });
      }
   );
};

ItemComment.remove = (id, result) => {
   sql.query(
      "DELETE FROM itemComment WHERE idItemComment = ?",
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

         console.log("deleted itemComment with id: ", id);
         result(null, res);
      }
   );
};

ItemComment.removeAll = (result) => {
   sql.query("DELETE FROM itemComment", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} itemComment`);
      result(null, res);
   });
};

module.exports = ItemComment;
