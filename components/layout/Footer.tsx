export default function Footer() {
  return (
    <footer className="border-t border-border/30 mt-24 bg-text">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-bg tracking-tight">JE</span>
          <div className="text-bg/50 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
