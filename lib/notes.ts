import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Note } from '@/types'

const contentDirectory = path.join(process.cwd(), 'content/notes')

export interface NoteMetadata {
  slug: string
  title: string
  subject: string
  chapter: number
  order: number
}

export interface SubjectNotes {
  subject: string
  notes: NoteMetadata[]
}

export function getAllSubjects(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const subjects = fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  return subjects
}

export function getNotesTree(): SubjectNotes[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const subjects = getAllSubjects()
  const tree: SubjectNotes[] = []

  subjects.forEach((subject) => {
    const subjectPath = path.join(contentDirectory, subject)
    const files = fs.readdirSync(subjectPath)
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

    const notes: NoteMetadata[] = mdxFiles.map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(subjectPath, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        subject: data.subject || subject,
        chapter: data.chapter || 0,
        order: data.order || 0,
      }
    })

    // Sort notes by order
    notes.sort((a, b) => a.order - b.order)

    tree.push({
      subject,
      notes,
    })
  })

  return tree
}

export function getNotesBySubject(subject: string): NoteMetadata[] {
  const subjectPath = path.join(contentDirectory, subject)

  if (!fs.existsSync(subjectPath)) {
    return []
  }

  const files = fs.readdirSync(subjectPath)
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  const notes: NoteMetadata[] = mdxFiles.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const fullPath = path.join(subjectPath, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      subject: data.subject || subject,
      chapter: data.chapter || 0,
      order: data.order || 0,
    }
  })

  return notes.sort((a, b) => a.order - b.order)
}

export function getNoteBySlug(subject: string, slug: string): Note | null {
  try {
    const fullPath = path.join(contentDirectory, subject, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      subject: data.subject || subject,
      chapter: data.chapter || 0,
      order: data.order || 0,
      content,
    }
  } catch (error) {
    return null
  }
}

export function getAllNotesForSubject(subject: string): Note[] {
  const subjectPath = path.join(contentDirectory, subject)

  if (!fs.existsSync(subjectPath)) {
    return []
  }

  const files = fs.readdirSync(subjectPath)
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  const notes: Note[] = mdxFiles.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const fullPath = path.join(subjectPath, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      subject: data.subject || subject,
      chapter: data.chapter || 0,
      order: data.order || 0,
      content,
    }
  })

  return notes.sort((a, b) => a.order - b.order)
}
