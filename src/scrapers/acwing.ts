export default async function acwingScraper(): Promise<ScrapeData> {
  const url = window.location.href;

  // get id
  const match = url.match(/content\/(\d+)\/$/);
  const id = match ? match[1] : null;
  if (!id) {
    throw new Error('Could not find id in url');
  }

  // get title
  const title_regex = /(\d+)\.(.*)/;
  const full_title = window.$('div.problem-content-title').text().trim();
  const display_id = full_title.match(title_regex)[1].trim();
  const title = full_title.match(title_regex)[2].trim();

  const raw_description = window
    .$('[data-tab=\'preview-tab-content\']')
    .html()
    .trim();

  // @ts-expect-error: ace is injected by the background script
  const code = window.ace
    .edit(document.getElementById('code_editor'))
    .getValue();
  const language = window
    .$('select[name=\'language\']')
    .children(':selected')
    .text()
    .toLowerCase();

  const tags = [];
  window.$('span.problem-algorithm-tag-field-item').each(function () {
    tags.push(window.$(this).text().trim());
  });

  const difficulty = window
    .$(
      '#acwing_page > div > div > div > div > div.row > div.col-sm-3.hidden-xs > div > table > tbody > tr:nth-child(1) > td > span'
    )
    .text()
    .trim();

  const data: ScrapeData = {
    id: display_id,
    display_id,
    title,
    full_title,
    raw_description,
    url,
    tags,
    difficulty,
    source: 'AcWing',
    sourceUrl: 'https://www.acwing.com/',
    code,
    language
  };
  console.log('getAcwingData', data);
  return data;
}
