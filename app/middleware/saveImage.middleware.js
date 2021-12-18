const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

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
   if (req.files) {
      var file = req.files.file;
      var filename = file.name;

      var ext = filename.substr(filename.lastIndexOf(".") + 1).toLowerCase();
      let imageName = `${generateRandomName(8, 5)}.${ext}`;

      if (ext == "gif" || ext == "GIF") {
         let imagePath = path.join(__dirname, `../images/${imageName}`);
         file.mv(imagePath, function (err) {
            if (err) return res.status(500).send(err);
            req.filePath = imageName;
            next();
         });
      } else {
         const image = sharp(file.data);

         image.metadata().then(function (metadata) {
            return image
               .resize({
                  height: Math.round(metadata.height / 2),
                  width: Math.round(metadata.width / 2),
               })
               .jpeg({ quality: 30 })
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
      }
   } else {
      return res.status(400).json({
         message: "bad request",
         error: "no file found",
      });
   }
};
