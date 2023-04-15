import type { Cheerio } from 'cheerio';

declare global {
  interface Window {
    $: Cheerio.CheerioAPI
  }
}
