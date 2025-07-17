let isLoading = false
let isLoaded = false
let loadPromise: Promise<void> | null = null

export const loadGoogleMapsScript = (): Promise<void> => {
  if (isLoaded) {
    return Promise.resolve()
  }

  if (loadPromise) {
    return loadPromise
  }

  if (window.google?.maps) {
    isLoaded = true
    return Promise.resolve()
  }

  loadPromise = new Promise((resolve, reject) => {
    if (isLoading) {
      return
    }

    isLoading = true
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      isLoaded = true
      isLoading = false
      resolve()
    }

    script.onerror = () => {
      isLoading = false
      loadPromise = null
      reject(new Error('Failed to load Google Maps script'))
    }

    document.head.appendChild(script)
  })

  return loadPromise
}
