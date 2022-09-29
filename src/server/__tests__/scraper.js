/* eslint-disable no-undef */
const ScrapeRequest = require('../../scraper/ScrapeRequest');
const Mode = require('../../Mode');
const RequestType = require('../../scraper/RequestTypes');

describe('Scrape Requests', () => {
  const maxTestDuration = 70000;

  it('Receive objects with 2 properties: Url and UrlKey', async () => {
    const request = new ScrapeRequest(Mode.Dev, RequestType.UserLikedVideos);
    await request.open('drewdunnehere');
    const data = await request.send();

    const key = Object.keys(data)[0];
    console.log(data);

    expect(data[key]).toHaveProperty('Url');
    expect(data[key]).toHaveProperty('UrlKey');
  }, maxTestDuration);
});
