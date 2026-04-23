import { ProjectCard } from '@/components/projects/ProjectCard'

const projects = [
  {
    title: 'Physics Notes Platform',
    description:
      'A continuous-scroll notes viewer with scroll-tracking sidebar, built for organized physics derivations. LaTeX-compiled notes rendered as images with lazy loading and smooth navigation.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'live' as const,
    featured: true,
  },
  {
    title: 'Lottie Scroll Engine',
    description:
      'Frame-accurate Lottie animations driven by scroll position, using canvas rendering and IntersectionObserver.',
    tags: ['Canvas API', 'Lottie', 'React'],
    status: 'live' as const,
  },
  {
    title: 'Photography Portfolio',
    description:
      'Masonry grid gallery with lightbox viewer. Lazy-loaded images served through next/image optimization.',
    tags: ['Next.js', 'Masonry', 'Lightbox'],
    status: 'in-progress' as const,
  },
  {
    title: 'MDX Blog Engine',
    description:
      'File-based blog with MDX, frontmatter validation via Zod, KaTeX math support, and static generation.',
    tags: ['MDX', 'Zod', 'KaTeX'],
    status: 'live' as const,
  },
  {
    title: 'PDF to PNG Pipeline',
    description:
      'Python utility that splits multi-page PDFs into individual topic pages and converts them to optimized PNGs.',
    tags: ['Python', 'PDF', 'Automation'],
    status: 'archived' as const,
  },
  {
    title: 'Contact Form Integration',
    description:
      'Client-validated contact form with Formspree backend, success/error states, and surface card styling.',
    tags: ['React', 'Formspree', 'Validation'],
    status: 'in-progress' as const,
  },
]

export default function ProjectsPage() {
  return (
    <div data-section="projects" className="min-h-screen bg-bg text-text relative overflow-hidden">
      {/* Decorative geometry for dark bg */}
      <div className="absolute top-20 left-8 w-40 h-40 border border-accent/10 rounded-full" />
      <div className="absolute top-32 left-20 w-16 h-16 border border-accent-2/10 rounded-full" />
      <div className="absolute bottom-24 right-12 w-32 h-32 bg-pop/5 rotate-12 rounded-sharp" />
      <div className="absolute top-1/2 right-8 w-3 h-3 bg-accent/30 rounded-full" />
      <div className="absolute bottom-40 left-16 w-2 h-2 bg-accent-2/30 rounded-full" />

      <div className="max-w-5xl mx-auto px-6 py-24 relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 bg-accent rounded-full" />
          <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Showcase</span>
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight">Projects</h1>
        <div className="flex gap-1 mt-3 mb-4">
          <div className="h-1 w-8 bg-accent rounded-full" />
          <div className="h-1 w-4 bg-pop rounded-full" />
          <div className="h-1 w-6 bg-accent-2 rounded-full" />
        </div>
        <p className="text-lg text-text-muted">
          A collection of things I&apos;ve built and am currently working on.
        </p>

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={project.featured ? 'sm:col-span-2 sm:row-span-2' : ''}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
