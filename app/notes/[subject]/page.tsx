import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { notes, getSubject } from '@/lib/notes'
import ContinuousNotesLayout from '@/components/notes/ContinuousNotesLayout'

interface PageProps {
  params: { subject: string }
}

export function generateStaticParams() {
  return notes.map((s) => ({ subject: s.subject }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const subject = getSubject(params.subject)
  if (!subject) return { title: 'Subject Not Found' }

  return {
    title: subject.label,
    description: `${subject.label} notes: ${subject.chapters.length} chapters covering key physics concepts.`,
  }
}

export default function SubjectPage({ params }: PageProps) {
  const subject = getSubject(params.subject)

  if (!subject) {
    notFound()
  }

  return (
    <ContinuousNotesLayout notes={notes} currentSubject={params.subject}>
      <div className="space-y-20">
        {subject.chapters.map((chapter) => (
          <section key={chapter.slug} className="space-y-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text border-b border-border pb-4">
              {chapter.order}. {chapter.title}
            </h2>
            
            <div className="space-y-16">
              {chapter.topics.map((topic) => (
                <article
                  key={topic.slug}
                  id={`topic-${chapter.slug}-${topic.slug}`}
                  className="scroll-mt-24"
                >
                  <h3 className="font-display text-lg font-semibold text-text mb-6">
                    {chapter.order}.{topic.order} {topic.title}
                  </h3>
                  <embed
                    src={`/notes/${params.subject}/${chapter.slug}/${topic.slug}.pdf#toolbar=0&navpanes=0&scrollbar=0`}
                    type="application/pdf"
                    className="w-full rounded-lg"
                    style={{ height: '800px' }}
                    title={topic.title}
                  />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ContinuousNotesLayout>
  )
}
