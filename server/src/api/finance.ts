import axios from "axios";
import * as cheerio from "cheerio";
import * as iconv from "iconv-lite";
import { DaySise, Stock } from "../types/interface";

export const getDaySise = async (code: number) => {
  let html = await axios.get(
    `http://finance.naver.com/item/sise_day.nhn?code=${code}`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  let $: cheerio.Root = cheerio.load(html.data);

  const lastPage: number = parseInt(
    $(".pgRR > a").attr("href").split("&page=")[1]
  );
  const dataList: Array<DaySise> = [];

  for (let i = 1; i <= lastPage; i++) {
    html = await axios.get(
      `http://finance.naver.com/item/sise_day.nhn?code=${code}&page=${i}`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    $ = cheerio.load(html.data);
    const parentsDom = $(".type2>tbody>tr[onmouseover]");
    parentsDom.map((idx: number, el: cheerio.Element) => {
      const parent = $(el);
      const daySise: DaySise = {
        date: parent.find("td:nth-of-type(1)").text().trim().replace(/\./g, ""),
        close: parent.find("td:nth-of-type(2)").text().trim().replace(/,/g, ""),
        diff: parent
          .find("td:nth-of-type(3)")
          .text()
          .trim()
          .replace(/(\t|\n)/g, ""),
        open: parent.find("td:nth-of-type(4)").text().trim().replace(/,/g, ""),
        high: parent.find("td:nth-of-type(5)").text().trim().replace(/,/g, ""),
        low: parent.find("td:nth-of-type(6)").text().trim().replace(/,/g, ""),
        volume: parent
          .find("td:nth-of-type(7)")
          .text()
          .trim()
          .replace(/,/g, ""),
      };
      if (daySise.date.trim() === "") {
        return;
      }
      dataList.push(daySise);
    });
  }
  return dataList;
};

export const getAllStocks = async () => {
  const res: Array<Stock> = [];
  // 코스피
  let html = await axios.get(
    `https://finance.naver.com/sise/sise_market_sum.naver?sosok=0`,
    { responseType: "arraybuffer", headers: { "User-Agent": "Mozilla/5.0" } }
  );
  let content: string = iconv.decode(html.data, "EUC-KR").toString();
  let $: cheerio.Root = cheerio.load(content);
  let lastPage: number = parseInt(
    $(".pgRR > a").attr("href").split("&page=")[1]
  );

  for (let i = 1; i <= lastPage; i++) {
    html = await axios.get(
      `https://finance.naver.com/sise/sise_market_sum.naver?sosok=0&page=${i}`,
      { responseType: "arraybuffer", headers: { "User-Agent": "Mozilla/5.0" } }
    );
    content = iconv.decode(html.data, "EUC-KR").toString();
    $ = cheerio.load(content);
    const parentsDom = $("tr[onmouseover]>td:nth-of-type(2)>a");
    parentsDom.map((idx: number, el: cheerio.Element) => {
      const item = $(el);
      const stock: Stock = {
        code: item.attr("href").split("code=")[1],
        name: item.text().trim(),
      };
      res.push(stock);
    });
  }

  // 코스닥
  html = await axios.get(
    `https://finance.naver.com/sise/sise_market_sum.naver?sosok=1`,
    { responseType: "arraybuffer", headers: { "User-Agent": "Mozilla/5.0" } }
  );
  content = iconv.decode(html.data, "EUC-KR").toString();
  $ = cheerio.load(content);
  lastPage = parseInt($(".pgRR > a").attr("href").split("&page=")[1]);

  for (let i = 1; i <= lastPage; i++) {
    html = await axios.get(
      `https://finance.naver.com/sise/sise_market_sum.naver?sosok=1&page=${i}`,
      { responseType: "arraybuffer", headers: { "User-Agent": "Mozilla/5.0" } }
    );
    content = iconv.decode(html.data, "EUC-KR").toString();
    $ = cheerio.load(content);
    const parentsDom = $("tr[onmouseover]>td:nth-of-type(2)>a");
    parentsDom.map((idx: number, el: cheerio.Element) => {
      const item = $(el);
      const stock: Stock = {
        code: item.attr("href").split("code=")[1],
        name: item.text().trim(),
      };
      res.push(stock);
    });
  }

  return res;
};
