const Favorites = require("../models/favorites.models.js");
const Item = require("../models/item.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const favorites = new Favorites({
      macAddress: req.body.macAddress,
      itemId: req.body.itemId,
   });

   Favorites.create(favorites, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the favorites.",
         });
      else {
         Item.updateLikeById(data.id, req.body.itemLike, (err, dataItem) => {
            if (err)
               res.status(500).send({
                  message:
                     err.message ||
                     "Some error occurred while retrieving favorites.",
               });
            else res.send(data);
         });
      }
   });
};

exports.findAll = (req, res) => {
   Favorites.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving favorites.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Favorites.findById(req.params.favoritesId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Favorites with id ${req.params.favoritesId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving Favorites with id " +
                  req.params.favoritesId,
            });
         }
      } else res.send(data);
   });
};

exports.findOneByMacAddress = (req, res) => {
   Favorites.findByMacAddress(req.params.macAddress, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Favorites with id ${req.params.macAddress}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving Favorites with id " + req.params.macAddress,
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

   Favorites.updateById(req.params.id, new Favorites(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Favorites with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Favorites with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Favorites.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Favorites with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Favorites with id " + req.params.id,
            });
         }
      } else res.send({ message: `Favorites was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Favorites.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all Favorites.",
         });
      else res.send({ message: `All Favorites were deleted successfully!` });
   });
};
