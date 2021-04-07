const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Result = require("./model/result.model");
const Count = require("./model/count.model");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//get results
app.post("/get_result/:year/:semester/:roll", async (req, res) => {
  const { year, roll, semester } = req.params;

  if (!year || !roll || !semester)
    return res.status(400).send("Filed is required !");

  const result = await Result.findOne({ roll, year, semester });

  if (!result) return res.status(400).json({ msg: "Not found !" });

  //Search counter
  await Count.updateOne({ count: "searchCount" }, { $inc: { totalSearch: 1 } });

  res.send(result);
});
// get all semester results
app.post("/get_result_all/:roll", async (req, res) => {
  const { roll } = req.params;

  if (!roll) return res.status(400).send("Filed is required !");

  const result = await Result.find({ roll });

  if (result.length === 0) return res.status(400).json({ msg: "Not found !" });

  //Search counter
  await Count.updateOne({ count: "searchCount" }, { $inc: { totalSearch: 1 } });

  res.send(result);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
