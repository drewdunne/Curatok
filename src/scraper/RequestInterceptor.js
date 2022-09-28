const axios = require('axios');
const RequestTypes = require('./RequestTypes');
const { UrlSelectors } = require('./TTSelectors');

class RequestInterceptor {
  constructor(browser, page, data, requestType) {
    this.browser = browser;
    this.page = page;
    this.data = data;
    this.requestType = requestType;
    this.openRequests = [];
  }

  activate = async () => {
    await this.page.setRequestInterception(true);
    let handler;
    switch (this.requestType) {
      case (RequestTypes.UserLikedVideos): {
        handler = this.handleFavoriteListRequests;
        break;
      }
      default: {
        break;
      }
    }
    this.page.on('request', handler);
  };

  deactivate = async () => {
    let handler;
    switch (this.type) {
      case (RequestTypes.UserLikedVideos): {
        handler = this.handleFavoriteListRequests;
        break;
      }
      default: {
        break;
      }
    }
    await this.page.emitter.off('request', handler);
    this.openRequests.forEach((e) => {
      if (e.isInterceptResolutionHandled()) return;
      e.abort();
    });
    await this.page.setRequestInterception(true);
  };

  handleFavoriteListRequests = async (interceptedRequest) => {
    this.openRequests.push(interceptedRequest); // used in teardown
    const url = interceptedRequest.url();

    if (url.includes(UrlSelectors.FavoriteApi)) {
      const res = await axios.get(interceptedRequest.url());
      const { itemList } = res.data;

      itemList.forEach((element) => {
        const fileHash = element.video.bitrateInfo[0].PlayAddr.FileHash;
        if (!this.data[fileHash]) {
          this.data[fileHash] = {
            UrlKey: element.video.bitrateInfo[0].PlayAddr.UrlKey,
            Url: element.video.bitrateInfo[0].PlayAddr.UrlList[0],
          };
        }
      });
      console.log('\x1b[32m%s\x1b[0m', `RESOLVED, likedVideos length is now: ${Object.values(Object.keys(this.data)).length}`);
      interceptedRequest.continue();
    }
  };
}

module.exports = RequestInterceptor;
