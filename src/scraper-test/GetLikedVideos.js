const puppeteer = require('puppeteer');
const axios = require('axios');

let browser;
let page;
const likedVideos = {};
let userTitle;

setup('https://www.tiktok.com/@drewdunnehere?lang=en');

async function setup(url) {
  browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  page = await browser.newPage();
  await page.goto(url);
  await getUserTitle();
  console.log('Collecting videos...');
  await collectLikedVideos(url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.close();
  await browser.close();
}

async function getUserTitle() {
  const userTitleSelector = '[data-e2e="user-title"]';
  await page.waitForSelector(userTitleSelector);
  userTitle = await page.$eval(userTitleSelector, (el) => el.innerText);
}

async function collectLikedVideos(url) {
  const likeButton = '[data-e2e*="liked-tab"]';
  await page.waitForSelector('[data-e2e*="liked-tab"]');
  setRequestInterceptor(true);
  page.click(likeButton);
  await autoScroll(page);
  await setRequestInterceptor(false);
}

async function setRequestInterceptor(bool) {
  if (bool === false) {
    await page.emitter.off('request', getFavorites);
  } else {
    await page.setRequestInterception(bool);
    try {
      page.on('request', getFavorites);
    } catch (err) {
      console.log(`Exception in setRequestInterceptor. Error: ${err}`);
    }
  }
  async function getFavorites(interceptedRequest) {
    try {
      const url = interceptedRequest.url();
      if (url.includes('https://us.tiktok.com/api/favorite/')) {
        console.log('Intercepted a Like list...');
        await addVideosToVideoUrls(interceptedRequest);
        console.log('\x1b[32m%s\x1b[0m', `RESOLVED, likedVideos length is now: ${Object.values(likedVideos).length}`);
      }
      interceptedRequest.continue();
    } catch (err) {
      console.log(`Error, perhaps request interception is no longer enabled? Error: ${err}`);
    }
  }
}

async function addVideosToVideoUrls(interceptedRequest) {
  const res = await axios.get(interceptedRequest.url());
  const { itemList } = res.data;
  itemList.forEach((element) => {
    const urlKey = element.video.bitrateInfo[0].PlayAddr.UrlKey;
    const fileHash = element.video.bitrateInfo[0].PlayAddr.FileHash;
    const url = element.video.bitrateInfo[0].PlayAddr.UrlList[0];
    if (!likedVideos[fileHash]) {
      likedVideos[fileHash] = { urlKey, url };
    }
  });
}

const autoScroll = async (page) => {
  const timeoutDuration = 500; // TIP: Update this value for debugging testing
  let scroll = true;
  let previousHeight;
  while (scroll === true) {
    previousHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    const loadedMore = await loadMoreIfPossible(timeoutDuration);
    if (loadedMore === true) {
      await new Promise(((resolve) => setTimeout(resolve, 500)));
    } else {
      console.log('End of Page');
      scroll = false;
    }
  }

  async function loadMoreIfPossible(timeoutDuration) {
    return new Promise((resolve) => {
      loadPage(resolve);
      setTimeout(() => resolve(false), timeoutDuration);
    });

    async function loadPage(resolve) {
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      return resolve(true);
    }
  }
};

module.exports = {
  videos: likedVideos,
};
