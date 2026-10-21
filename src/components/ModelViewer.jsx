import { useEffect } from 'react'

// model-viewer sadece ihtiyaç olunca yüklenir (ayrı bir paket parçası)
export default function ModelViewer({ src, controls = true }) {
  useEffect(() => { import('@google/model-viewer') }, [])
  return (
    <model-viewer
      src={src}
      auto-rotate
      {...(controls ? { 'camera-controls': true } : {})}
      shadow-intensity="1"
      interaction-prompt="none"
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    />
  )
}
