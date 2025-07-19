let isLoaded = false
let loadPromise: Promise<void> | null = null

export const loadLeafletStyles = (): Promise<void> => {
  if (isLoaded) {
    return Promise.resolve()
  }

  if (loadPromise) {
    return loadPromise
  }

  loadPromise = new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.crossOrigin = ''

    link.onload = () => {
      isLoaded = true
      resolve()
    }

    link.onerror = () => {
      loadPromise = null
      resolve() // Resolve even on error to avoid blocking
    }

    document.head.appendChild(link)
  })

  return loadPromise
}
