const SubCategory = require("../models/subCategory.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const subCategory = new SubCategory({
      categoryId: req.body.categoryId,
      subName: req.body.subName,
      subImage: req.body.subImage,
   });

   SubCategory.create(subCategory, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the subCategory.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   SubCategory.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving subCategory.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SubCategory.findById(req.params.subCategoryId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found subCategory with id ${req.params.subCategoryId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving subCategory with id " +
                  req.params.subCategoryId,
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

   SubCategory.updateById(
      req.params.id,
      new SubCategory(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found subCategory with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating subCategory with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   SubCategory.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found subCategory with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete subCategory with id " + req.params.id,
            });
         }
      } else res.send({ message: `subCategory was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SubCategory.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all subCategory.",
         });
      else res.send({ message: `All subCategory were deleted successfully!` });
   });
};
