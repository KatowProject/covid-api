const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const covid = require('./routers/covid')
const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());
app.use("/api", covid);
app.use(express.static("./public"));
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "api path not found",
  });
});

app.listen(PORT, function () {
  console.log("Listening on PORT:" + PORT);
});
