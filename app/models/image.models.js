const sql = require("./db.js");

const Image = function (image) {
   this.imagePath = image.imagePath;
   this.itemId = image.itemId;
};

Image.create = (newImage, result) => {
   sql.query("INSERT INTO image SET ?", newImage, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created Image: ", { id: res.insertId, ...newImage });
      result(null, { id: res.insertId, ...newImage });
   });
};

Image.findById = (imageId, result) => {
   sql.query(`SELECT * FROM image WHERE id = ${imageId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found Image: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Image.getAll = (result) => {
   sql.query(`SELECT * FROM image `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("Image: ", res);
      result(null, res);
   });
};

Image.updateById = (id, image, result) => {
   sql.query("UPDATE image SET ? WHERE id = ?", [image, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated Image: ", { id: id, ...image });
      result(null, { id: id, ...image });
   });
};

Image.remove = (id, result) => {
   sql.query("DELETE FROM image WHERE idImage = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted Image with id: ", id);
      result(null, res);
   });
};

Image.removeAll = (result) => {
   sql.query("DELETE FROM image", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} Image`);
      result(null, res);
   });
};

module.exports = Image;
