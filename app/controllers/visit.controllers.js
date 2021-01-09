const Visit = require("../models/visit.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const visit = new Visit({
      macAddress: req.body.macAddress,
      visitCount: req.body.visitCount,
      subId: req.body.subId,
   });

   Visit.create(visit, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the visit.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Visit.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving visit.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Visit.findById(req.params.visitId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visit with id ${req.params.visitId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving visit with id " + req.params.visitId,
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

   Visit.updateById(req.params.id, new Visit(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visit with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating visit with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Visit.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visit with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete visit with id " + req.params.id,
            });
         }
      } else res.send({ message: `visit was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Visit.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all visit.",
         });
      else res.send({ message: `All visit were deleted successfully!` });
   });
};
