/* eslint-disable no-use-before-define */
const puppeteer = require('puppeteer');
const PageScroller = require('./PageScroller');
const RequestInterceptor = require('./RequestInterceptor');
const Mode = require('../Mode');
const TTSelectors = require('./TTSelectors');
const RequestTypes = require('./RequestTypes');

// async function main() {
//   const request = new ScrapeRequest(Mode.Dev, RequestTypes.UserLikedVideos);
//   await request.open('drewdunnehere');
//   const data = await request.send();
//   console.log(data);
// }

class ScrapeRequest {
  constructor(mode = Mode.Prod, requestType = RequestTypes.UserLikedVideos) {
    this.browser;
    this.page;
    this.username;
    this.data = {};
    this.mode = mode;
    this.type = requestType;
  }

  setupBrowser = async () => {
    if (this.type === RequestTypes.UserLikedVideos) {
      this.browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920,1080'],
        defaultViewport: {
          width: 1920,
          height: 1080,
        },
      });
    } else {
      this.browser = await puppeteer.launch({
      });
    }
  };

  open = async (username) => {
    await this.setupBrowser();
    const pages = await this.browser.pages();
    this.page = pages[0];
    switch (this.type) {
      case RequestTypes.UserLikedVideos: {
        if (!username) {
          throw new Error(`You must include a username when opening a request of type ${this.type}`);
        }
        this.username = username;
        break;
      }
      default: {
        break;
      }
    }
  };

  send = async () => {
    switch (this.type) {
      case RequestTypes.UserLikedVideos: {
        await this.scrapeUserLikedVideos();
        return this.data;
      }
      default: {
        throw new Error(`ScrapeRequest.send: No switch case exists for ${this.type}`);
      }
    }
  };

  scrapeUserLikedVideos = async () => {
    const scroller = new PageScroller(this.browser, this.page, this.mode);
    const interceptor = new RequestInterceptor(this.browser, this.page, this.data, this.type);

    const url = `https://www.tiktok.com/@${this.username}`;
    await this.page.goto(url);
    await Promise.all([
      this.page.waitForSelector(TTSelectors.LikedTabButton),
      interceptor.activate(),
      this.page.click(TTSelectors.LikedTabButton),
    ]);
    await scroller.tryScrollToBottom();
    await interceptor.deactivate();
    await this.page.close();
    await this.browser.close();
  };
}

module.exports = ScrapeRequest;
