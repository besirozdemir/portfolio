const links = [
  ['Projeler', '#projeler'],
  ['Galeri', '#galeri'],
  ['Deneyim', '#deneyim'],
  ['Yetenekler', '#yetenekler'],
]

export default function Nav() {
  return (
    <nav className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0 bg-black/50">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5 text-sm">
        <a href="#" className="font-semibold tracking-tight">Portfolyo</a>
        <ul className="flex gap-5 text-neutral-300 md:gap-8">
          {links.map(([label, href]) => (
            <li key={href}><a href={href} className="transition hover:text-white">{label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
