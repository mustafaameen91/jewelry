const sql = require("./db.js");

const SpecialOrder = function (specialOrder) {
   this.customerName = specialOrder.customerName;
   this.customerPhone = specialOrder.customerPhone;
   this.customerOrder = specialOrder.customerOrder;
};

SpecialOrder.create = (newSpecialOrder, result) => {
   sql.query("INSERT INTO specialOrder SET ?", newSpecialOrder, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created specialOrder: ", {
         id: res.insertId,
         ...newSpecialOrder,
      });
      result(null, { id: res.insertId, ...newSpecialOrder });
   });
};

SpecialOrder.findById = (specialOrderId, result) => {
   sql.query(
      `SELECT * FROM specialOrder WHERE idSpecialOrder = ${specialOrderId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found specialOrder: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};
SpecialOrder.getAll = (result) => {
   sql.query(
      `SELECT *,DATE_FORMAT(createdAt, '%d/%m/%Y') AS specialDate FROM specialOrder `,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("specialOrder: ", res);
         result(null, res);
      }
   );
};

SpecialOrder.updateById = (id, specialOrder, result) => {
   sql.query(
      "UPDATE specialOrder SET ? WHERE id = ?",
      [specialOrder, id],
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

         console.log("updated specialOrder: ", { id: id, ...specialOrder });
         result(null, { id: id, ...specialOrder });
      }
   );
};

SpecialOrder.remove = (id, result) => {
   sql.query(
      "DELETE FROM specialOrder WHERE idSpecialOrder = ?",
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

         console.log("deleted specialOrder with id: ", id);
         result(null, res);
      }
   );
};

SpecialOrder.removeAll = (result) => {
   sql.query("DELETE FROM specialOrder", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} specialOrder`);
      result(null, res);
   });
};

module.exports = SpecialOrder;
