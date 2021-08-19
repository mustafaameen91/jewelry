const ItemComment = require("../models/itemComment.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const itemComment = new ItemComment({
      itemId: req.body.itemId,
      comment: req.body.comment,
   });

   ItemComment.create(itemComment, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the item Comment.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   ItemComment.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving itemComments.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ItemComment.findById(req.params.itemCommentId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found ItemComment with id ${req.params.itemCommentId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving ItemComment with id " +
                  req.params.itemCommentId,
            });
         }
      } else res.send(data);
   });
};

exports.findItemComments = (req, res) => {
   ItemComment.getItemComments(req.params.itemId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.send([]);
         } else {
            res.status(500).send({
               message:
                  "Error retrieving ItemComment with id " + req.params.itemId,
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

   ItemComment.updateById(
      req.params.id,
      new ItemComment(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found Item Comment with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating Item Comment with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ItemComment.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Item Comment with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete Item Comment with id " + req.params.id,
            });
         }
      } else res.send({ message: `Item Comment was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ItemComment.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all Item Comments.",
         });
      else
         res.send({ message: `All Item Comments were deleted successfully!` });
   });
};
