type ScrapeData = {
  source: string
  id: string
  display_id: string
  title: string
  full_title: string
  raw_description: string
  url: string
  tags: string[]
  difficulty: string
  sourceUrl: string
  code: string
  language: string
}

type InjectResponse<D> = {
  data: D,
  error?: Error,
}