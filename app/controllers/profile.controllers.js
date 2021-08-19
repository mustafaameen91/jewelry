const Profile = require("../models/profile.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const profile = new Profile({
      profileName: req.body.profileName,
      aboutUs: req.body.aboutUs,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      whats: req.body.whats,
      snapchat: req.body.snapchat,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      dollarPrice: req.body.dollarPrice,
      profileNameEn: req.body.profileNameEn,
      aboutUsEn: req.body.aboutUsEn,
   });

   Profile.create(profile, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the profile.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Profile.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving profile.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Profile.findById(req.params.profileId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found profile with id ${req.params.profileId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving profile with id " + req.params.profileId,
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

   Profile.updateById(req.params.id, new Profile(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found profile with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating profile with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Profile.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found profile with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete profile with id " + req.params.id,
            });
         }
      } else res.send({ message: `profile was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Profile.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all profile.",
         });
      else res.send({ message: `All profile were deleted successfully!` });
   });
};
