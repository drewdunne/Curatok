const puppeteer = require('puppeteer');
const axios = require('axios');

let browser;
let page;
const likedVideos = [];
let likedVideosTargetLength;

setup('https://www.tiktok.com/@drewdunnehere?lang=en');

async function setup(url) {
    browser = await puppeteer.launch({
      // headless: false
        // args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await navigateToLikePage(url);
}

// document. querySelector('[data-id="box1"]')
// data-e2e="liked-tab"
async function navigateToLikePage(url) {
    await page.goto(url);
    const likeButton = '[data-e2e*="liked-tab"]';
    await page.waitForSelector('[data-e2e*="liked-tab"]');
    console.log("found liked-tab")
    const innerText = await page.$eval(likeButton, el => el.innerText);
    activateReqInterceptor();
    page.click(likeButton);
    console.log("Clicked " + innerText);
}

function activateReqInterceptor() {
    console.log("Interceptor Activated");

    page.on('request', async (interceptedRequest) => {
      // console.log(interceptedRequest.url());
      const url = interceptedRequest.url();
      if (url.includes('https://us.tiktok.com/api/favorite/'))
      {
        console.log("Intercepted a Like list...")
        await addVideosToVideoUrls(interceptedRequest)
        console.log('\x1b[32m%s\x1b[0m', `RESOLVED, likedVideos length is now: ${likedVideos.length} / <TOTAL GOES HERE>`);
      }
    });
  }

  async function addVideosToVideoUrls(interceptedRequest)
  {
    const videoUrls = [];
    const res = await axios.get(interceptedRequest.url())
    const itemList = res.data.itemList;
    itemList.forEach(element => {
      const url = element.video.bitrateInfo[0].PlayAddr.UrlList[0];
      videoUrls.push(url);
    })
    likedVideos.push(...videoUrls);
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

    // browser.close();
    // console.log("program terminated");








