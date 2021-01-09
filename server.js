const express = require("express");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const upload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
   upload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
   })
);

require("./app/routes/category.routes.js")(app);
require("./app/routes/slider.routes.js")(app);
require("./app/routes/image.routes.js")(app);

app.listen(3110, () => {
   console.log("Server is running on port 3110.");
});
