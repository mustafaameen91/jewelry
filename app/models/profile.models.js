const sql = require("./db.js");

const Profile = function (profile) {
   this.profileName = profile.profileName;
   this.aboutUs = profile.aboutUs;
   this.phoneNumber = profile.phoneNumber;
   this.email = profile.email;
   this.whats = profile.whats;
   this.snapchat = profile.snapchat;
   this.instagram = profile.instagram;
   this.facebook = profile.facebook;
};

Profile.create = (newProfile, result) => {
   sql.query("INSERT INTO profile SET ?", newProfile, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created profile: ", { id: res.insertId, ...newProfile });
      result(null, { id: res.insertId, ...newProfile });
   });
};

Profile.findById = (profileId, result) => {
   sql.query(
      `SELECT * FROM profile WHERE idProfile = ${profileId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found profile: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Profile.getAll = (result) => {
   sql.query(`SELECT * FROM profile `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("profile: ", res);
      result(null, res);
   });
};

Profile.updateById = (id, profile, result) => {
   sql.query(
      "UPDATE profile SET ? WHERE idProfile = ?",
      [profile, id],
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

         console.log("updated profile: ", { id: id, ...profile });
         result(null, { id: id, ...profile });
      }
   );
};

Profile.remove = (id, result) => {
   sql.query("DELETE FROM profile WHERE idProfile = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted profile with id: ", id);
      result(null, res);
   });
};

Profile.removeAll = (result) => {
   sql.query("DELETE FROM profile", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} profile`);
      result(null, res);
   });
};

module.exports = Profile;
