const ItemCategory = require("../models/itemCategory.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const itemCategory = new ItemCategory({
      itemId: req.body.itemId,
      subId: req.body.subId,
   });

   ItemCategory.create(itemCategory, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the itemCategory.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   ItemCategory.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving itemCategory.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ItemCategory.findById(req.params.itemCategoryId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found itemCategory with id ${req.params.itemCategoryId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving itemCategory with id " +
                  req.params.itemCategoryId,
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

   ItemCategory.updateById(
      req.params.id,
      new ItemCategory(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found itemCategory with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating itemCategory with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ItemCategory.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found itemCategory with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete itemCategory with id " + req.params.id,
            });
         }
      } else res.send({ message: `itemCategory was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ItemCategory.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all itemCategory.",
         });
      else res.send({ message: `All itemCategory were deleted successfully!` });
   });
};
