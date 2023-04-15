import acwingScraper from '~/scrapers/acwing';
import cheerioFile from 'url:~/scrapers/cheerio.ts';
import path from 'path';

import type { PlasmoMessaging } from '@plasmohq/messaging';

const injectJquery = (tabId) =>
  new Promise<void>((resolve, _reject) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        world: 'MAIN',
        files: [
          // path.basename(jqueryFile).split('?')[0],
          path.basename(cheerioFile).split('?')[0]
        ]  // remove ?xxx
      },
      () => {
        resolve();
      }
    );
  });

const scrape = (tabId) =>
  new Promise<CodePracticeInfo>((resolve, _reject) => {
    chrome.scripting.executeScript(
      {
        target: {
          tabId // the tab you want to inject into
        },
        world: 'MAIN', // MAIN to access the window object
        func: acwingScraper
      },
      (injectionResults) => {
        const result = injectionResults[0].result;
        console.log('scrapedata result', result);
        resolve(result);
      }
    );
  });

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });

  console.log('scrape prepare to inject to', tab.url);

  await injectJquery(tab.id);

  console.log('jquery injected');

  const result = await scrape(tab.id);

  res.send(result);
};

export default handler;
