const Item = require("../models/item.models.js");
const ItemCategory = require("../models/itemCategory.models.js");
const notification = require("./../notifications/notification");

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
      itemNameEn: req.body.itemNameEn,
      itemDescriptionEn: req.body.itemDescriptionEn,
      special: req.body.special,
   });

   Item.create(item, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the item.",
         });
      else {
         let newItemCategory = { itemId: data.id, subId: req.body.subId };
         ItemCategory.create(newItemCategory, (err, dataOne) => {
            if (err)
               res.status(500).send({
                  message:
                     err.message ||
                     "Some error occurred while creating the itemCategory.",
               });
            else {
               var message = {
                  app_id: "ef559c74-26d7-42cd-82ba-fed33f4cfe94",
                  headings: { en: `تم اضافة منتج جديد` },
                  included_segments: ["Subscribed Users"],
               };

               notification(message);
               res.send(data);
            }
         });
      }
   });
};

exports.findAll = (req, res) => {
   let query = "";
   let special = "";
   if (req.query.show) {
      if (req.query.show == "recently") {
         query = `ORDER BY item.itemDate DESC LIMIT 10`;
      } else if (req.query.show == "most") {
         query = `ORDER BY item.itemLike DESC LIMIT 10`;
      } else if (req.query.show == "offer") {
         special = `WHERE item.special = 1`;
      }
   } else {
      query = "ORDER BY item.idItem DESC LIMIT 10";
   }

   Item.getAll(query, req.query.macAddress, special, (err, data) => {
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

exports.findOneBySub = (req, res) => {
   Item.findBySubId(req.query.subId, req.query.macAddress, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found item with id ${req.params.subId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving item with id " + req.params.subId,
            });
         }
      } else res.send(data);
   });
};

exports.findOneBySpecial = (req, res) => {
   Item.findBySpecial((err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found item with .`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving item",
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

exports.updateLike = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Item.updateLikeById(req.params.id, req.body.itemLike, (err, data) => {
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
