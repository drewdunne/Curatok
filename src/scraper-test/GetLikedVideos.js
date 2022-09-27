const puppeteer = require('puppeteer');
const axios = require('axios');

let browser;
let page;
const likedVideos = {};
let totalLikedVideos;
let userTitle;

setup('https://www.tiktok.com/@drewdunnehere?lang=en');

async function setup(url) {
    browser = await puppeteer.launch({
      headless: false
        // args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto(url);
    await getUserTitle();
    await getProfileLikedVideosCount();
    console.log(`User ${userTitle} has liked ${totalLikedVideos} videos`);
    console.log('Collecting videos...');
    await navigateToLikePage(url);
}

async function getUserTitle() {
  const userTitleSelector = '[data-e2e="user-title"]';
  await page.waitForSelector(userTitleSelector);
  userTitle = await page.$eval(userTitleSelector, el => el.innerText);
}

async function getProfileLikedVideosCount() {
  const likeCountSelector = '[data-e2e="likes-count"]'
  await page.waitForSelector(likeCountSelector);
  totalLikedVideos = await page.$eval(likeCountSelector, el => el.innerText)
  console.log(``)
}


// document. querySelector('[data-id="box1"]')
// data-e2e="liked-tab"
async function navigateToLikePage(url) {
    const likeButton = '[data-e2e*="liked-tab"]';
    await page.waitForSelector('[data-e2e*="liked-tab"]');
    const innerText = await page.$eval(likeButton, el => el.innerText);
    console.log("Navigating to Liked tab via button: " + innerText);
    activateReqInterceptor();
    page.click(likeButton);
    await autoScroll(page);
    console.log(likedVideos);
    browser.close();
}

async function activateReqInterceptor() {
    console.log("Interceptor Activated");
    await page.setRequestInterception(true);
    page.on('request', async (interceptedRequest) => {
      const url = interceptedRequest.url();
      if (url.includes('https://us.tiktok.com/api/favorite/'))
      {
        console.log("Intercepted a Like list...")
        await addVideosToVideoUrls(interceptedRequest)
        console.log('\x1b[32m%s\x1b[0m', `RESOLVED, likedVideos length is now: ${Object.values(likedVideos).length} / ${totalLikedVideos}`);
      }
      interceptedRequest.continue();
    })
    };

  async function addVideosToVideoUrls(interceptedRequest)
  {
    const res = await axios.get(interceptedRequest.url())
    const itemList = res.data.itemList;
    itemList.forEach(element => {
      const urlKey = element.video.bitrateInfo[0].PlayAddr.urlKey;
      const fileHash = element.video.bitrateInfo[0].PlayAddr.FileHash;
      const url = element.video.bitrateInfo[0].PlayAddr.UrlList[0];
      if (!likedVideos[fileHash])
      {
        likedVideos[fileHash] = { urlKey: urlKey, url: url }
      }
    })
  }

  const autoScroll = async (page) => {
    while (true)
    {
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`)
      await new Promise((resolve => setTimeout(resolve, 500)))
    }
  }

  // async function autoScroll(page) {
    //   await page.evaluate(async () => {
    //     await new Promise((resolve) => {
    //       let totalHeight = 0;
    //       let distance = 400;
    //       let timer = setInterval(() => {
    //         let scrollHeight = document.body.scrollHeight;
    //         window.scrollBy(0, distance);
    //         totalHeight += distance;

    //         if(totalHeight >= scrollHeight - window.innerHeight) {
    //           clearInterval(timer);
    //           resolve();
    //         }
    //       }, 100);
    //     });
    //   });
    // }






