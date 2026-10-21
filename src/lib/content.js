// src/content klasörünü otomatik okur. Bu dosyayı değiştirmen gerekmez.
const dirOf = (p) => p.slice(0, p.lastIndexOf('/'))
const byDir = (g) => Object.fromEntries(Object.entries(g).map(([p, u]) => [dirOf(p), u]))

const programLabels = { solidworks: 'SolidWorks', catia: 'CATIA', inventor: 'Inventor', fusion360: 'Fusion 360', ansys: 'Ansys', nx: 'Siemens NX' }
const labelOf = (slug) => programLabels[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)

export function youtubeId(v = '') {
  const m = v.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)
  return m ? m[1] : /^[\w-]{11}$/.test(v) ? v : ''
}

// ---- Galeri
const gInfos = import.meta.glob('/src/content/gallery/*/*/info.json', { eager: true, import: 'default' })
const gThumbs = byDir(import.meta.glob('/src/content/gallery/*/*/thumb.{jpg,jpeg,png,webp,svg}', { eager: true, query: '?url', import: 'default' }))
const gModels = byDir(import.meta.glob('/src/content/gallery/*/*/model.{glb,gltf}', { eager: true, query: '?url', import: 'default' }))
const gSources = byDir(import.meta.glob('/src/content/gallery/*/*/source.*', { eager: true, query: '?url', import: 'default' }))

export const gallery = Object.entries(gInfos)
  .map(([path, info]) => {
    const d = dirOf(path)
    const parts = path.split('/')
    return {
      program: parts[4],
      programLabel: labelOf(parts[4]),
      slug: parts[5],
      title: info.title || parts[5],
      text: info.text || '',
      date: info.date || '',
      youtube: youtubeId(info.youtube),
      thumb: gThumbs[d],
      model: gModels[d],
      source: gSources[d],
    }
  })
  .sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title))

export const programs = [...new Set(gallery.map((g) => g.program))].sort().map((slug) => ({
  slug,
  label: labelOf(slug),
  count: gallery.filter((g) => g.program === slug).length,
}))

// ---- Projeler
const pInfos = import.meta.glob('/src/content/projects/*/info.json', { eager: true, import: 'default' })
const pCovers = byDir(import.meta.glob('/src/content/projects/*/cover.{jpg,jpeg,png,webp,svg}', { eager: true, query: '?url', import: 'default' }))
export const projects = Object.entries(pInfos)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, info]) => ({ ...info, slug: path.split('/')[4], cover: pCovers[dirOf(path)] }))

// ---- Fotoğraf & CV
export const photo = Object.values(import.meta.glob('/src/content/profile/photo.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }))[0]
export const cv = Object.values(import.meta.glob('/src/content/cv/*.pdf', { eager: true, query: '?url', import: 'default' }))[0]
