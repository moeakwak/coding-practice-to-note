import path from 'path';
import aceFile from 'url:~/../assets/ace.min.js';
import cheerioFile from 'url:~inject/cheerio.ts';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import acwingScraper from '~/scrapers/acwing';

const injectAce = (tabId) =>
  new Promise<void>((resolve, _reject) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        world: 'MAIN',
        files: [path.basename(aceFile).split('?')[0]]
      },
      () => {
        resolve();
      }
    );
  });

const injectCheerio = (tabId) =>
  new Promise<void>((resolve, _reject) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        world: 'MAIN',
        files: [path.basename(cheerioFile).split('?')[0]]
      },
      () => {
        resolve();
      }
    );
  });

const scrape = (tabId) =>
  new Promise<ScrapeData>((resolve, reject) => {
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
        if (result.data)
          resolve(result.data);
        else
          reject(result.error);
      }
    );
  });

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });

  console.log('scrape prepare to inject to', tab.url);

  await injectAce(tab.id);
  await injectCheerio(tab.id);

  console.log('ace, cheerio injected');

  try {
    const result = await scrape(tab.id);
    res.send(result);
  } catch (e) {
    console.error('scrape error', e);
  }
};

export default handler;
