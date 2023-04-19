const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/all", require("./routes/all"));
app.use("/step", require("./routes/animals"));
app.use("/srac", require("./routes/cars"));
app.use("/senohp", require("./routes/telephones"));
app.use("/skooby", require("./routes/books"));

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}\nOpen on: http://localhost:${PORT}`
  );
});
