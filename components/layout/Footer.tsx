export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center text-text-muted text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  )
}
