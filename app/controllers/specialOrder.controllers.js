const SpecialOrder = require("../models/specialOrder.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const specialOrder = new SpecialOrder({
      customerName: req.body.customerName,
      customerPhone: req.body.customerPhone,
      customerOrder: req.body.customerOrder,
   });

   SpecialOrder.create(specialOrder, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the SpecialOrder.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   SpecialOrder.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving SpecialOrder.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SpecialOrder.findById(req.params.specialOrderId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found SpecialOrder with id ${req.params.specialOrderId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving SpecialOrder with id " +
                  req.params.specialOrderId,
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

   SpecialOrder.updateById(
      req.params.id,
      new SpecialOrder(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found SpecialOrder with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating SpecialOrder with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   SpecialOrder.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found SpecialOrder with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete SpecialOrder with id " + req.params.id,
            });
         }
      } else res.send({ message: `SpecialOrder was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SpecialOrder.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all SpecialOrders.",
         });
      else
         res.send({ message: `All SpecialOrders were deleted successfully!` });
   });
};
