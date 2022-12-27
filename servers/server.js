const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const app = express();
// const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Movie } = require("../Models/Movie");

const port = process.env.PORT || 3001;
const url =
  "https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=cnt&tg=0&date=20221224";

//app.use(cors());
dotenv.config();

try {
  mongoose.connect(
    "mongodb+srv://20181617:20181617@cluster0.b87shpc.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  mongoose.connection.once("open", () => {
    console.log("MongoDB is Connected");
  });
} catch (error) {
  console.error("mongoDB error");
  console.log(error);
}

app.use(bodyParser.json());
// app.use("/api", (req, res) => res.json({ username: "chaeyeon22" }));

app.get("/api/movie", async (req, res) => {
  try {
    await axios({
      url: url,
      method: "GET",
      responseType: "arraybuffer",
    }).then(async (html) => {
      const content = iconv.decode(html.data, "UTF-8").toString();
      const $ = cheerio.load(content);
      const list = $("table tbody tr");
      await list.each(async (i, tag) => {
        let rank = $(tag).find("td.ac img").attr("alt");
        let title = $(tag).find("td.title div.tit3 a").text();
        console.log(rank, title);

        await Movie.create({
          title: title,
          rank: parseInt(rank),
        });
      });
    });
    res.send({ result: "success", message: "크롤링 완료" });
  } catch (error) {
    console.log(error);
    res.send({ result: "fail", message: "크롤링 실패", error: error });
  }
});
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
