import Piston from '../Piston'
import Rocket from './Rocket'

// Yeni bir animasyon eklemek istersen buraya bir satır ekle,
// sonra projenin info.json dosyasında "visual": "anahtar" yaz.
const registry = {
  rocket: () => <Rocket />,
  piston: () => <Piston />,
  image: ({ project }) =>
    project.cover ? <img src={project.cover} alt={project.title} className="h-full w-full rounded-2xl object-cover" /> : null,
}

export default function Visual({ project }) {
  const Comp = registry[project.visual] || registry.image
  return <Comp project={project} />
}
