export default async function acwingScraper(): Promise<CodePracticeInfo> {
  const data = {
    title: 'A+B',
    description: 'A+B Problem',
    url: 'https://www.acwing.com/problem/content/1/',
    tags: ['Math'],
    difficulty: 'Easy',
    source: 'AcWing',
    sourceUrl: 'https://www.acwing.com/',
    code: 'a, b = map(int, input().split())\nprint(a + b)',
    language: 'Python',
  };
  console.log('getAcwingData', data);
  return data;
}
