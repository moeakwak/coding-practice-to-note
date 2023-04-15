import * as cheerio from 'cheerio';

if (!window.$) window.$ = cheerio.load(document.body.innerHTML);
