const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routeURLs = require("./routes/route");
const cors = require("cors");

const app = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/app", routeURLs);
app.listen(process.env.PORT || 4000, () => {
  console.log(`lets get this shit bro`);
});
