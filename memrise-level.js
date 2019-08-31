const rp = require('request-promise');
const $ = require('cheerio');

async function get(url) {

  let html = await rp(url);
  let items = [];

  let elements = $('div.thing.text-text', html);

  for (let i = 0; i < elements.length; i++) {
    let e = elements[i];

    let solution = $(e).find('div.col_a').text().trim();

    let question = $(e).find('div.col_b').text().trim();

    items.push({
      question,
      solution,
      memriseLearnableId
    });
  }

  console.log("> " + items.length + " vocabs from " + url);

  return items;
}

module.exports = get;
