import type { Metadata } from 'next'
import { notes } from '@/lib/notes'
import SubjectRow from '@/components/notes/SubjectRow'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

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
  const { frontmatter, content } = getNotesIntroduction()

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">
        {frontmatter.title || 'Notes'}
      </h1>
      
      <div className="mb-12 prose prose-lg max-w-none">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </div>
      
      <h1 className="font-display text-4xl sm:text-4xl font-bold mb-8">
        {'Subjects'}
      </h1>
      <div className="space-y-0">
        {notes.map((subject) => (
          <SubjectRow
            key={subject.subject}
            subject={subject.subject}
            chapterCount={subject.chapters.length}
            href={`/notes/${subject.subject}`}
          />
        ))}
      </div>
    </main>
  )
}
