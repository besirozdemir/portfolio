import { Github, Instagram, Linkedin, Mail, Youtube } from 'lucide-react'
import { profile, socials } from '../data'

const items = [
  { label: 'YouTube', href: socials.youtube, Icon: Youtube, primary: true },
  { label: 'GitHub', href: socials.github, Icon: Github },
  { label: 'LinkedIn', href: socials.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: socials.instagram, Icon: Instagram },
  { label: 'E-posta', href: socials.mail, Icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-24 text-center">
      <h2 className="bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-7xl">
        Birlikte bir şey üretelim.
      </h2>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {items.map(({ label, href, Icon, primary }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
              primary ? 'bg-white text-black hover:bg-neutral-200' : 'glass hover:bg-white/10'
            }`}
          >
            <Icon size={18} /> {label}
          </a>
        ))}
      </div>
      <p className="mt-16 text-sm text-neutral-600">© {new Date().getFullYear()} {profile.first} {profile.last}</p>
    </footer>
  )
}
