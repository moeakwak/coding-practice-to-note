import acwingScraper from '@/scrapers/acwing';

import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

  console.log('scrapedata prepare to inject', tab);

  const injectScript = () => new Promise<CodePracticeInfo>((resolve, reject) => {
    chrome.scripting.executeScript(
      {
        target: {
          tabId: tab.id // the tab you want to inject into
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

  const result = await injectScript();

  res.send(result);
};

export default handler;
