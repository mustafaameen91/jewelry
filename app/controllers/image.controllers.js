const Image = require("../models/image.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const image = new Image({
      imagePath: "http://hayder-alkhafaje.com/images/" + req.filePath,
      itemId: req.body.itemId,
   });
   Image.create(image, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the image.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Image.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Image.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Image.findById(req.params.imageId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Image with id ${req.params.imageId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving Image with id " + req.params.imageId,
            });
         }
      } else res.send(data);
   });
};

exports.findOneByItemId = (req, res) => {
   Image.findByImageByItemId(req.params.itemId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Image with id ${req.params.imageId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving Image with id " + req.params.imageId,
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

   Image.updateById(req.params.id, new Image(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Image with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Image with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Image.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Image with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Image with id " + req.params.id,
            });
         }
      } else res.send({ message: `Image was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Image.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all Image.",
         });
      else res.send({ message: `All Image were deleted successfully!` });
   });
};
