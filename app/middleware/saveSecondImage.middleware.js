const sharp = require("sharp");
const fs = require("fs");

function generateRandomName(length, studentId) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result +=
         characters.charAt(Math.floor(Math.random() * charactersLength)) +
         studentId;
   }
   return result;
}

exports.resize = (req, res, next) => {
   if (req.files.file) {
      var file = req.files.file;
      var filename = file.name;

      var ext = filename.substr(filename.lastIndexOf(".") + 1);
      let imageName = `${generateRandomName(8, 5)}.${ext}`;

      const image = sharp(file.data);

      image.metadata().then(function (metadata) {
         return image
            .resize({
               height: Math.round(metadata.height),
               width: Math.round(metadata.width),
            })
            .jpeg({ quality: 70 })
            .toFile(`./app/images/${imageName}`)
            .then(function (newFileInfo) {
               req.filePath = imageName;
               next();
            })
            .catch(function (err) {
               return res.status(400).json({
                  message: "bad request",
                  error: err,
               });
            });
      });
   } else {
      return res.status(400).json({
         message: "bad request",
         error: "no file found",
      });
   }
};
