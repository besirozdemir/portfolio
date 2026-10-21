import { Download } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cv } from '../lib/content'

const sections = [['Projeler', 'projeler'], ['Deneyim', 'deneyim'], ['Yetenekler', 'yetenekler']]

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const go = (id) => {
    const run = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (pathname !== '/') { navigate('/'); setTimeout(run, 150) } else run()
  }

  const btn = 'transition hover:text-white'
  return (
    <nav className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0 bg-black/50">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5 text-sm">
        <Link to="/" className="font-semibold tracking-tight">Portfolyo</Link>
        <ul className="flex items-center gap-4 text-neutral-300 md:gap-8">
          <li><button onClick={() => go('projeler')} className={btn}>Projeler</button></li>
          <li><Link to="/galeri" className={btn}>Galeri</Link></li>
          <li className="hidden sm:block"><button onClick={() => go('deneyim')} className={btn}>Deneyim</button></li>
          <li className="hidden sm:block"><button onClick={() => go('yetenekler')} className={btn}>Yetenekler</button></li>
          {cv && (
            <li>
              <a href={cv} download="CV.pdf" className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-neutral-200">
                <Download size={13} /> CV
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
