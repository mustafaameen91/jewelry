const Location = require("../models/location.models.js");

const directory = require("./../../server");

function generateRandomName(length, studentId) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result +=
         characters.charAt(Math.floor(Math.random() * charactersLength)) +
         studentId;
   }
   return result;
}

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   if (req.files) {
      let imageName = generateRandomName(5, 3);
      var file = req.files.file;
      var filename = file.name;
      console.log(filename);
      var ext = filename.substr(filename.lastIndexOf(".") + 1);

      file.mv(
         directory.directory + "/app/images/" + `${imageName}.${ext}`,
         function (err) {
            if (err) {
               console.log(err);
               res.status(401).send("unable to upload file");
            } else {
               const location = new Location({
                  lang: req.body.lang,
                  lat: req.body.lat,
                  storeImage:
                     "http://dashboard.hayderalkhafaje.com/images/" +
                     `${imageName}.${ext}`,
                  note: req.body.note,
                  noteEn: req.body.noteEn,
               });

               Location.create(location, (err, data) => {
                  if (err)
                     res.status(500).send({
                        message:
                           err.message ||
                           "Some error occurred while creating the location.",
                     });
                  else res.send(data);
               });
            }
         }
      );
   }
};

exports.findAll = (req, res) => {
   Location.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving location.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Location.findById(req.params.locationId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found location with id ${req.params.locationId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving location with id " + req.params.locationId,
            });
         }
      } else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Location.updateById(req.params.id, new Location(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found location with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating location with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Location.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found location with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete location with id " + req.params.id,
            });
         }
      } else res.send({ message: `location was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Location.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all location.",
         });
      else res.send({ message: `All location were deleted successfully!` });
   });
};
