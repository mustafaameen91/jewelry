const Slider = require("../models/slider.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const slider = new Slider({
      sliderImage: "http://hayder-alkhafaje.com/images/" + req.filePath,
      // sliderImage: "http://localhost:3110/images/" + req.filePath,
   });

   Slider.create(slider, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the Slider.",
         });
      else res.send(data);
   });
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
