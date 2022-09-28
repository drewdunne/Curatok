const Mode = require('../Mode');

class PageScroller {
  constructor(browser, page, mode) {
    this.browser = browser;
    this.page = page;
    this.mode = mode;
    this.scrollTimeout = (mode === Mode.Dev) ? 500 : 8000;
    this.active = false;
  }

  endScrolling = () => {
    this.active = false;
    return true;
  };

  tryScrollToBottom = async () => {
    let documentPreviousHeight;
    this.active = true;

    /* eslint-disable no-await-in-loop */
    while (this.active) {
      documentPreviousHeight = await this.page.evaluate('document.body.scrollHeight');
      await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await this.attemptTriggerPageLoad(documentPreviousHeight);
    }
  };

  attemptTriggerPageLoad = async (documentPreviousHeight) => {
    let loaded = false;
    setTimeout(() => {
      if (loaded === false) {
        console.error(`Disabling scrolling due to exceeding ${this.scrollTimeout / 1000} seconds`);
        this.endScrolling();
      }
    }, this.scrollTimeout);
    await this.page.waitForFunction(`document.body.scrollHeight > ${documentPreviousHeight}`);
    if (this.active) {
      loaded = true;
    }
  };
}

module.exports = PageScroller;
