import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { getAllSubjects, getAllNotesForSubject, getNotesTree } from '@/lib/notes'
import ContinuousNotesLayout from '@/components/notes/ContinuousNotesLayout'

interface PageProps {
  params: {
    subject: string
  }
}

const formatSubjectName = (subject: string) => {
  return subject
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const notes = getAllNotesForSubject(params.subject)

  if (notes.length === 0) {
    return {
      title: 'Subject Not Found',
    }
  }

  const subjectName = formatSubjectName(params.subject)

  return {
    title: subjectName,
    description: `Physics notes on ${subjectName}. ${notes.length} chapters covering key concepts and equations.`,
    openGraph: {
      title: subjectName,
      description: `Physics notes on ${subjectName}. ${notes.length} chapters covering key concepts and equations.`,
      type: 'article',
      images: ['/og/default.svg'],
    },
  }
}

export async function generateStaticParams() {
  const subjects = getAllSubjects()
  return subjects.map((subject) => ({ subject }))
}

export default function SubjectPage({ params }: PageProps) {
  const notes = getAllNotesForSubject(params.subject)
  const notesTree = getNotesTree()

  if (notes.length === 0) {
    notFound()
  }

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  }

  const chapters = notes.map((note) => ({
    slug: note.slug,
    title: note.title,
    chapter: note.chapter,
  }))

  return (
    <ContinuousNotesLayout
      notesTree={notesTree}
      currentSubject={params.subject}
      chapters={chapters}
    >
      <Link
        href="/notes"
        className="inline-flex items-center text-text-muted hover:text-accent transition-colors mb-8 text-sm"
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

      <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-12">
        {formatSubjectName(params.subject)}
      </h1>

      <div className="space-y-24">
        {notes.map((note) => (
          <article
            key={note.slug}
            id={note.slug}
            className="scroll-mt-24"
          >
            <header className="mb-8">
              <div className="text-text-muted text-sm mb-2">
                Chapter {note.chapter}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-text">
                {note.title}
              </h2>
            </header>

            <div className="prose prose-lg prose-headings:font-display prose-headings:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-code:text-text prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none">
              <MDXRemote source={note.content} options={mdxOptions} />
            </div>
          </article>
        ))}
      </div>
    </ContinuousNotesLayout>
  )
}
