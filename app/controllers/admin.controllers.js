const Admin = require("../models/admin.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const admin = new Admin({
      userName: req.body.userName,
      password: req.body.password,
   });

   Admin.create(admin, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the admin.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Admin.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Admin.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Admin.findById(req.params.adminId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found admin with id ${req.params.adminId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving admin with id " + req.params.adminId,
            });
         }
      } else res.send(data);
   });
};

exports.login = (req, res) => {
   Admin.loginUser(req.body.userName, req.body.password, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found admin with userName ${req.body.userName}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving admin with userName " + req.body.userName,
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

   Admin.updateById(req.params.id, new Admin(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found admin with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating admin with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Admin.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found admin with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete admin with id " + req.params.id,
            });
         }
      } else res.send({ message: `admin was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Admin.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all admin.",
         });
      else res.send({ message: `All admin were deleted successfully!` });
   });
};
