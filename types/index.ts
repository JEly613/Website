export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  published: boolean
  content: string
  readingTime?: string
}

export interface Note {
  slug: string
  title: string
  subject: string
  chapter: number
  order: number
  content: string
}
