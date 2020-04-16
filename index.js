//Import config
let config = require("./config");
const DB_CONN_STRING =
  "mongodb+srv://" +
  config.DB_USERNAME +
  ":" +
  config.DB_PASSWORD +
  "@" +
  config.DB_HOSTNAME +
  "/api?retryWrites=true&w=majority";

// Import express
let express = require("express");
// Import Mongoose
let mongoose = require("mongoose");

// Import Body parser
let bodyParser = require("body-parser");
// Import routes
let apiRoutes = require("./routes/api-routes");

// Initialise the app
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(DB_CONN_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Send message for default URL
app.get("/", (req, res) => res.send("maille.org database api"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(config.PORT, function () {
  console.log("maille.org api running on port " + config.PORT);
});
