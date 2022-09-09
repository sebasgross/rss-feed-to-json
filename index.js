require('dotenv').config()
const Parser = require('rss-parser');
const fs = require("fs");

let count = 0;

let parser = new Parser();
(async () => {
  let episodes = [];

  let feed = await parser.parseURL(process.env.RSS);
  console.log(feed.title);

  feed.items.forEach(item => {
    // console.log(item)
    let episode = {
        title: item.title,
        link: item.link,
        podcastLink: item.enclosure ? item.enclosure.url : "n/a",
        pubDate: item.pubDate,
        content: item.content,
        // rssLink: item.enclosure.url
        // choose the items you want

    }
    episodes.push(episode)
    console.log(episode)
    count++;

    let stringifyEp = JSON.stringify(episode);

    fs.appendFile('message.txt', `${stringifyEp}\n` , function (err) {
      if (err) throw err;
      console.log('Saved!');
    });


  });

})();
