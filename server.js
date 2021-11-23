const express = require("express");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const upload = require("express-fileupload");
const fs = require("fs");
const app = express();
const notification = require("./app/notifications/notification");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(upload());

require("./app/routes/category.routes.js")(app);
require("./app/routes/slider.routes.js")(app);
require("./app/routes/image.routes.js")(app);
require("./app/routes/item.routes.js")(app);
require("./app/routes/itemCategory.routes.js")(app);
require("./app/routes/location.routes.js")(app);
require("./app/routes/profile.routes.js")(app);
require("./app/routes/subCategory.routes.js")(app);
require("./app/routes/visit.routes.js")(app);
require("./app/routes/favorites.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
require("./app/routes/specialOrder.routes.js")(app);
require("./app/routes/itemComment.routes.js")(app);

app.get("/images/:file", function (request, response) {
   let file = request.params.file;
   var tempFile = `./app/images/${file}`;
   var extension = file.split(".").pop();
   fs.readFile(tempFile, function (err, data) {
      switch (extension) {
         case "jpg":
            contentType = "image/jpg";
            isImage = 1;
            break;
         case "jpeg":
            contentType = "image/jpeg";
            isImage = 1;
            break;
         case "png":
            contentType = "image/png";
            isImage = 1;
            break;
      }
      response.contentType(contentType);
      response.send(data);
   });
});

app.post("/api/sendNotification", (req, res) => {
   var message = {
      app_id: "ef559c74-26d7-42cd-82ba-fed33f4cfe94",
      headings: { en: `${req.body.title}` },
      contents: {
         en: `${req.body.content}`,
      },
      included_segments: ["Subscribed Users"],
   };

   notification(message);
   res.send({ text: "message send" });
});

const staticFileMiddleware = express.static(__dirname + "/dist");
app.use(staticFileMiddleware);
app.use(
   history({
      disableDotRule: true,
      verbose: true,
   })
);

app.use(staticFileMiddleware);

exports.directory = __dirname;

app.listen(3110, () => {
   console.log("Server is running on port 3110.");
});
