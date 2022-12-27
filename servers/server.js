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
const url = "https://movie.naver.com/movie/sdb/rank/rmovie.naver";

//app.use(cors());
dotenv.config();

try {
  mongoose.set("strictQuery", false);
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
      let ranking = [];
      console.log("랭킹 검색시작");
      await list.each(async (i, tag) => {
        let rank = $(tag).find("td.ac img").attr("alt");
        let title = $(tag).find("td.title div.tit3 a").text();
        let link = $(tag).find("td.title div.tit3 a").attr("href");

        if (rank === "down" || rank === "up") {
          rank = i - parseInt(i / 11);
        }
        if (rank && title && link)
          ranking.push({ rank: parseInt(rank), title: title, link: link });
      });

      console.log("랭킹검색 시작 끝", ranking.length);
      console.log("디테일 검색 시작");
      for (const item of ranking) {
        if (item.link) {
          try {
            await axios({
              url: "https://movie.naver.com" + item.link,
              method: "GET",
              responseType: "arraybuffer",
            }).then(async (html) => {
              const content = iconv.decode(html.data, "UTF-8").toString();
              const $ = cheerio.load(content);
              let poster = $("div.poster a img").attr("src");
              let score = $(
                "div.main_score div.score a.ntz_score div.star_score span.st_off span.st_on"
              ).text();
              score = score.slice(0, score.length / 2);
              let category = $("dl.info_spec dd p span:first")
                .text()
                .replace(/\\n | \\t/gi, "");

              item.poster = poster;
              item.score = score;
              item.category = category;
            });
          } catch (error) {
            console.log(error);
          }
        }
      }

      console.log("디테일 검색 끝");
      console.log(ranking);

      if (ranking.length) {
        await Movie.remove();
        return res.send({ result: "success", data: ranking });
      } else {
        return res.send({ result: "fail", message: "크롤링 실패" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.send({ result: "fail", message: "크롤링 실패", error: error });
  }
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
