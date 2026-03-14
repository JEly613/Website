import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import NotesLandingClient from '@/components/notes/NotesLandingClient'

function getNotesIntroduction() {
  const filePath = path.join(process.cwd(), 'content', 'notes', 'introduction.mdx')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return { frontmatter: data, content }
}

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getNotesIntroduction()
  return {
    title: frontmatter.title || 'Notes',
    description: frontmatter.description || 'Physics notes organized by subject, chapter, and topic.',
  }
}

export default function NotesPage() {
  const { content } = getNotesIntroduction()

  const introductionContent = (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  )

  return <NotesLandingClient introductionContent={introductionContent} />
}
