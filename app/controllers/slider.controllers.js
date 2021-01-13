const Slider = require("../models/slider.models.js");

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
      let imageName = generateRandomName(6, 3);
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
               const slider = new Slider({
                  sliderImage:
                     "http://dashboard.hayderalkhafaje.com/images/" +
                     `${imageName}.${ext}`,
               });

               Slider.create(slider, (err, data) => {
                  if (err)
                     res.status(500).send({
                        message:
                           err.message ||
                           "Some error occurred while creating the Slider.",
                     });
                  else res.send(data);
               });
            }
         }
      );
   }
};

exports.findAll = (req, res) => {
   Slider.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Slider.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Slider.findById(req.params.sliderId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Slider with id ${req.params.sliderId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving Slider with id " + req.params.sliderId,
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

   Slider.updateById(req.params.id, new Slider(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Slider with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Slider with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Slider.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Slider with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Slider with id " + req.params.id,
            });
         }
      } else res.send({ message: `Slider was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Slider.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all Slider.",
         });
      else res.send({ message: `All Slider were deleted successfully!` });
   });
};
