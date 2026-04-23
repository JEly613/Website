export default function Footer() {
  return (
    <footer className="mt-24 bg-text relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-pop via-accent to-cyan" />
      {/* Geometric accent shapes */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-12 w-16 h-16 bg-pop/15 rotate-45" />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-accent-2/40" />

      <div className="max-w-7xl mx-auto px-6 py-10 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-sharp bg-pop text-text text-sm font-bold">J</span>
            <span className="font-display font-bold text-bg tracking-tight">E</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-accent-2" />
              <span className="w-2 h-2 rounded-full bg-pop" />
              <span className="w-2 h-2 rounded-full bg-cyan" />
            </div>
            <div className="text-bg/50 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
