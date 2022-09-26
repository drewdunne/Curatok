const puppeteer = require('puppeteer');
const axios = require('axios');

let browser;
let page;
let likedVideos = [];

setup();

async function setup() {
    browser = await puppeteer.launch({
      // headless: false
        // args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    getData();
}

async function getData() {
    console.log("Invoking getData");
    await page.goto('https://www.tiktok.com/@drewdunnehere?lang=en');
    
    const likeButton = '.tiktok-1dcmmcm-PLike';
    await page.waitForSelector(likeButton);
    const innerText = await page.$eval(likeButton, el => el.innerText);
    console.log(innerText);

    page.on('request', async (interceptedRequest) => {
      // console.log(interceptedRequest.url());
      const url = interceptedRequest.url();
      if (url.includes('https://us.tiktok.com/api/favorite/'))
      {
        getResponse(interceptedRequest)
      }
      });

    page.click(likeButton);
    // await autoScroll(page);
    // await wait(10000); // wait to make sure all the requests have fired once reaching bottom, and let array be built out. Hacked together.
    }

    async function getResponse(interceptedRequest)
    {
      const videoUrls = [];
      const res = await axios.get(interceptedRequest.url())
      const itemList = res.data.itemList;
      itemList.forEach(element => {
        const url = element.video.bitrateInfo[0].PlayAddr.UrlList[0];
        // console.log(url);
        videoUrls.push(url);
      })
      console.log(videoUrls.length);
      // console.log(videoUrls);
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

    function parseResponseForVideoUrls() {

    }









