const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/db");
const port = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressFileUpload = require("express-fileupload");
const path = require("path")

app.use(cors(
    {
        origin: ["http://localhost:3000","https://cyberbul.com","https://server.cyberbul.com","https://admin.cyberbul.com"],
        credentials: true,
		sameSite: "none"
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressFileUpload());

app.use("/api/v2", require("./routes/admin_route"));
app.use("/api/v2", require("./routes/user_route"));
app.use("/api/v2", require("./routes/advertisement_route"));
app.use("/api/v2", require("./routes/news_route"));
app.use("/api/v2", require("./routes/bookmark_route"));
app.use("/api/v2", require("./routes/category_route"));

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

db.sync({force: false})
    .then((result) => {
        console.log("DB CONNECTED");
    })
    .catch((error) => {
        console.log("error ====> " + error);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
