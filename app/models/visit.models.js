const sql = require("./db.js");

const Visit = function (visit) {
   this.macAddress = visit.macAddress;
   this.visitCount = visit.visitCount;
   this.subId = visit.subId;
};

Visit.create = (newVisit, result) => {
   sql.query("INSERT INTO visit SET ?", newVisit, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created visit: ", { id: res.insertId, ...newVisit });
      result(null, { id: res.insertId, ...newVisit });
   });
};

Visit.findById = (visitId, result) => {
   sql.query(`SELECT * FROM visit WHERE idVisit = ${visitId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found visit: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Visit.getAll = (result) => {
   sql.query(`SELECT * FROM visit `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("visit: ", res);
      result(null, res);
   });
};

Visit.updateById = (id, visit, result) => {
   sql.query("UPDATE visit SET ? WHERE id = ?", [visit, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated visit: ", { id: id, ...visit });
      result(null, { id: id, ...visit });
   });
};

Visit.remove = (id, result) => {
   sql.query("DELETE FROM visit WHERE idVisit = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted visit with id: ", id);
      result(null, res);
   });
};

Visit.removeAll = (result) => {
   sql.query("DELETE FROM visit", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} visits`);
      result(null, res);
   });
};

module.exports = Visit;
