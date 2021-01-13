const Item = require("../models/item.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const item = new Item({
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      itemQuality: req.body.itemQuality,
      itemQuantity: req.body.itemQuantity,
   });

   Item.create(item, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the item.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Item.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving item.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Item.findById(req.params.itemId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found item with id ${req.params.itemId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving item with id " + req.params.itemId,
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

   Item.updateById(req.params.id, new Item(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found item with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating item with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Item.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found item with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete item with id " + req.params.id,
            });
         }
      } else res.send({ message: `item was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Item.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all item.",
         });
      else res.send({ message: `All item were deleted successfully!` });
   });
};
