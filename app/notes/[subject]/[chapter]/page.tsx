import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { getAllSubjects, getNotesBySubject, getNoteBySlug, getNotesTree } from '@/lib/notes'
import NotesLayout from '@/components/notes/NotesLayout'

interface PageProps {
  params: {
    subject: string
    chapter: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const note = getNoteBySlug(params.subject, params.chapter)

  if (!note) {
    return {
      title: 'Note Not Found',
    }
  }

  const formatSubjectName = (subject: string) => {
    return subject
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const subjectName = formatSubjectName(params.subject)

  return {
    title: `${note.title} - ${subjectName}`,
    description: `Chapter ${note.chapter}: ${note.title}. Physics notes on ${subjectName}.`,
    openGraph: {
      title: `${note.title} - ${subjectName}`,
      description: `Chapter ${note.chapter}: ${note.title}. Physics notes on ${subjectName}.`,
      type: 'article',
      images: ['/og/default.svg'],
    },
  }
}

export async function generateStaticParams() {
  const subjects = getAllSubjects()
  const params: { subject: string; chapter: string }[] = []

  subjects.forEach((subject) => {
    const notes = getNotesBySubject(subject)
    notes.forEach((note) => {
      params.push({
        subject,
        chapter: note.slug,
      })
    })
  })

  return params
}

export default function ChapterPage({ params }: PageProps) {
  const note = getNoteBySlug(params.subject, params.chapter)
  const notesTree = getNotesTree()

  if (!note) {
    notFound()
  }

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  }

  return (
    <NotesLayout notesTree={notesTree} currentSubject={params.subject}>
      <article className="max-w-3xl">
        <Link
          href="/notes"
          className="inline-flex items-center text-text-muted hover:text-accent transition-colors mb-6 text-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Notes
        </Link>

        <header className="mb-8 sm:mb-12">
          <div className="text-text-muted text-sm mb-2">
            Chapter {note.chapter}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            {note.title}
          </h1>
        </header>

        <div className="prose prose-lg prose-headings:font-display prose-headings:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-code:text-text prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none">
          <MDXRemote source={note.content} options={mdxOptions} />
        </div>
      </article>
    </NotesLayout>
  )
}
