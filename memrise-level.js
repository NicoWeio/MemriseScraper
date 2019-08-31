const rp = require('request-promise');
const cheerio = require('cheerio');

async function get(url) {

  let html = await rp(url);
  let $ = cheerio.load(html);

  let elements = $('div.thing.text-text');
  let items = [];

  for (let i = 0; i < elements.length; i++) {
    let e = elements[i];

    let solution = $(e).find('div.col_a').text().trim();
    let question = $(e).find('div.col_b').text().trim();
    let memriseLearnableId = $(e).attr('data-learnable-id');

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
