export default function ProjectsPage() {
  return (
    <div data-section="projects" className="min-h-screen bg-bg text-text">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="font-display text-5xl font-bold tracking-tight">Projects</h1>
        <div className="h-1 w-12 bg-accent rounded-full mt-3 mb-4" />
        <p className="text-lg text-text-muted">
          A collection of things I&apos;ve built and am currently working on.
        </p>

        {/* Bento grid placeholder */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`rounded-sharp border border-border/30 bg-surface/50 p-6 ${
                i === 1 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <div className="h-4 w-24 bg-accent/20 rounded-sharp mb-3" />
              <div className="h-3 w-full bg-text/10 rounded-sharp mb-2" />
              <div className="h-3 w-3/4 bg-text/10 rounded-sharp" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
