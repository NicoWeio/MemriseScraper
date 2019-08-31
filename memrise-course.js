const rp = require('request-promise');
const cheerio = require('cheerio');
const URLBASE = 'https://www.memrise.com';

const MEMRISELEVEL = require('./memrise-level');

async function get(courseID) {

  let html = await rp(URLBASE + '/course/' + courseID);

  let $ = cheerio.load(html);

  let description = $('span.course-description').text().trim();

  let image = $('a.course-photo > img')[0].attribs.src;

  //creator is not shown on main course page when not logged in
  let levelProbe = cheerio.load(await rp(URLBASE + '/course/' + courseID + '1/'));
  let creator = {
    name: levelProbe('a.creator-name > span').text(),
    image: levelProbe('a.creator-image > img')[0].attribs.src
  };
  console.log(creator);

  let items = [];
  let elements = $('a.level', html);

  console.log(`course has ${elements.length} levels`);

  for (let i = 0; i < elements.length; i++) {
    let e = elements[i];

    let title = $(e).find('div.level-title').text().trim();
    console.log(i + "/" + elements.length + ": " + title);

    let href = e.attribs.href;

    let vocabs = await MEMRISELEVEL(URLBASE + href);

    items.push({
      href,
      title,
      vocabs
    });
  }

  console.log("DONE");
  return {
    description,
    creator,
    image,
    items
  };
}

module.exports = get;
