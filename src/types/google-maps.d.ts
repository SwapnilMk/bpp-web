// Type declarations for Google Maps
declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options: MapOptions)
  }

  class Marker {
    constructor(options: MarkerOptions)
    addListener(eventName: string, handler: () => void): void
  }

  class Geocoder {
    constructor()
    geocode(
      request: GeocoderRequest,
      callback: (
        results: GeocoderResult[] | null,
        status: GeocoderStatus
      ) => void
    ): void
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions)
    open(map: Map, marker: Marker): void
  }

  interface MapOptions {
    center: LatLng
    zoom: number
    mapTypeId: MapTypeId
    mapTypeControl?: boolean
    streetViewControl?: boolean
    fullscreenControl?: boolean
  }

  interface MarkerOptions {
    position: LatLng
    map: Map
    title?: string
    animation?: Animation
  }

  interface InfoWindowOptions {
    content: string
  }

  interface GeocoderRequest {
    address?: string
    location?: LatLng
    placeId?: string
  }

  interface GeocoderResult {
    geometry: {
      location: LatLng
    }
    formatted_address: string
  }

  type GeocoderStatus =
    | 'OK'
    | 'ZERO_RESULTS'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'INVALID_REQUEST'
    | 'UNKNOWN_ERROR'

  class LatLng {
    constructor(lat: number, lng: number)
  }

  enum MapTypeId {
    ROADMAP = 'roadmap',
    SATELLITE = 'satellite',
    HYBRID = 'hybrid',
    TERRAIN = 'terrain',
  }

  enum Animation {
    BOUNCE = 1,
    DROP = 2,
  }
}

declare global {
  interface Window {
    google: typeof google
  }
}
