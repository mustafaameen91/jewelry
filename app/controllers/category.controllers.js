const Category = require("../models/category.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const category = new Category({
      categoryName: req.body.categoryName,
      categoryNameEn: req.body.categoryNameEn,
      categoryImage: "http://hayder-alkhafaje.com/images/" + req.filePath,
      categoryCoverImage:
         "http://hayder-alkhafaje.com/images/" + req.secondFilePath,
      // categoryImage: "http://localhost:3110/images/" + req.filePath,
      // categoryCoverImage: "http://localhost:3110/images/" + req.secondFilePath,
   });

   Category.create(category, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the Category.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Category.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Category.",
         });
      else res.send(data);
   });
};

exports.findSpecialCategory = (req, res) => {
   Category.getSpecialCategory((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Category.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Category.findById(req.params.categoryId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Category with id ${req.params.categoryId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving Category with id " + req.params.categoryId,
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

   let CategoryData = {
      categoryName: req.body.categoryName,
      categoryNameEn: req.body.categoryNameEn,
      categoryImage: "http://hayder-alkhafaje.com/images/" + req.filePath,
      categoryCoverImage:
         "http://hayder-alkhafaje.com/images/" + req.secondFilePath,
   };

   Category.updateById(req.params.id, CategoryData, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Category with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Category with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Category.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Category with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Category with id " + req.params.id,
            });
         }
      } else res.send({ message: `Category was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Category.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all Category.",
         });
      else res.send({ message: `All Category were deleted successfully!` });
   });
};
