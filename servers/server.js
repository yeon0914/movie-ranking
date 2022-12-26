const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const app = express();
// const cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const url =
  "https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=cnt&tg=0&date=20221224";

// app.use(cors());

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
