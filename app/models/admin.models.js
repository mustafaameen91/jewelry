const sql = require("./db.js");

const Admin = function (admin) {
   this.userName = admin.userName;
   this.password = admin.password;
};

Admin.create = (newAdmin, result) => {
   sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created admin: ", { id: res.insertId, ...newAdmin });
      result(null, { id: res.insertId, ...newAdmin });
   });
};

Admin.findById = (adminId, result) => {
   sql.query(`SELECT * FROM admin WHERE id = ${adminId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found admin: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Admin.getAll = (result) => {
   sql.query(`SELECT * FROM admin `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("admin: ", res);
      result(null, res);
   });
};

Admin.updateById = (id, admin, result) => {
   sql.query("UPDATE admin SET ? WHERE id = ?", [admin, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated admin: ", { id: id, ...admin });
      result(null, { id: id, ...admin });
   });
};

Admin.loginUser = (userName, password, result) => {
   sql.query(
      `SELECT * FROM admin WHERE userName = '${userName}' AND password = '${password}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }
         console.log("admin: ", res[0]);
         result(null, res[0]);
      }
   );
};

Admin.remove = (id, result) => {
   sql.query("DELETE FROM admin WHERE idAdmin = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted admin with id: ", id);
      result(null, res);
   });
};

Admin.removeAll = (result) => {
   sql.query("DELETE FROM admin", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} admin`);
      result(null, res);
   });
};

module.exports = Admin;
