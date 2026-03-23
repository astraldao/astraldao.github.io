export function Header() {
  const navItems = [
    ['Features', '#features'],
    ['Showcase', '#showcase'],
    ['Contact', '#cta'],
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-2xl sm:px-7">
        <a href="#hero" className="text-sm font-medium tracking-[0.24em] text-white/80 uppercase">
          Astral Drift
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-white/58 transition duration-300 hover:text-white focus:text-white focus:outline-none"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/82 transition duration-300 hover:border-white/20 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-white/25"
        >
          Begin quietly
        </a>
      </div>
    </header>
  )
}
