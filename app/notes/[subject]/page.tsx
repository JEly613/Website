import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { notes, getSubject } from '@/lib/notes'
import ContinuousNotesLayout from '@/components/notes/ContinuousNotesLayout'
import NoteImages from '@/components/notes/NoteImages'
import fs from 'fs'
import path from 'path'

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

function getTopicImages(subject: string, chapter: string, topic: string): string[] {
  try {
    const topicDir = path.join(process.cwd(), 'public', 'notes-images', subject, chapter, topic)
    const files = fs.readdirSync(topicDir)
    
    // Filter for image files and sort by page number
    const imageFiles = files
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort((a, b) => {
        const aNum = parseInt(a.match(/page-?(\d+)/i)?.[1] || a.match(/(\d+)/)?.[1] || '0')
        const bNum = parseInt(b.match(/page-?(\d+)/i)?.[1] || b.match(/(\d+)/)?.[1] || '0')
        return aNum - bNum
      })
    
    return imageFiles.map(f => `/notes-images/${subject}/${chapter}/${topic}/${f}`)
  } catch (err) {
    console.warn(`No images found for ${subject}/${chapter}/${topic}`)
    return []
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
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-text border-b border-border pb-4">
              {chapter.order}. {chapter.title}
            </h2>
            
            <div className="space-y-16">
              {chapter.topics.map((topic) => {
                const images = getTopicImages(params.subject, chapter.slug, topic.slug)

                return (
                  <article
                    key={topic.slug}
                    id={`topic-${chapter.slug}-${topic.slug}`}
                    className="scroll-mt-24"
                  >
                    <h3 className="font-display text-2xl font-semibold text-text mb-6">
                      {chapter.order}.{topic.order} {topic.title}
                    </h3>
                    <NoteImages
                      images={images}
                      topicTitle={topic.title}
                    />
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </ContinuousNotesLayout>
  )
}
