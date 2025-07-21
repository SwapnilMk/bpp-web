import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { Users, MapPin } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { loadLeafletStyles } from '@/utils/leaflet-utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Fix for Leaflet marker icons in Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface LeafletMapProps {
  city: string
  state: string
  district: string
  totalMembers: number
  isLoading: boolean
  className?: string
}

function GeocodeComponent({
  state,
  district,
  totalMembers,
  city,
}: {
  state: string
  district: string
  totalMembers: number
  city: string
}) {
  const map = useMap()
  const [position, setPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (!state || !district) return

    const address = `${city}, ${district}, ${state}, India`
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0]
          const newPosition: [number, number] = [
            parseFloat(lat),
            parseFloat(lon),
          ]
          setPosition(newPosition)
          map.setView(newPosition, 10)
        }
      })
      .catch(() => {
        // Silently handle errors
      })
  }, [state, district, city, map])

  return position ? (
    <Marker position={position}>
      <Popup>
        <div style={{ padding: '10px' }}>
          <h3 style={{ margin: '0 0 5px 0' }}>
            {district}, {state}
          </h3>
          <p style={{ margin: '0' }}>
            Total Members: {totalMembers.toLocaleString()}
          </p>
        </div>
      </Popup>
    </Marker>
  ) : null
}

export default function LeafletMap({
  state,
  district,
  totalMembers,
  isLoading,
  city,
  className,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeafletStyles()
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (isLoading || loading) {
    return (
      <Card className={className || 'lg:col-span-4'}>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[500px] w-full' />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className || 'lg:col-span-6'}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div>
          <CardTitle>Overview</CardTitle>
        </div>
        <Badge variant='outline' className='flex items-center gap-1'>
          <MapPin className='h-3 w-3' />
          <span>
            {district}, {state}
          </span>
        </Badge>
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Users className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>
              {totalMembers.toLocaleString()} members in your district
            </span>
          </div>
        </div>
        <MapContainer
          center={[20.5937, 78.9629]} // Default center (India)
          zoom={30}
          minZoom={10}
          maxZoom={40}
          scrollWheelZoom={false}
          style={{ height: '500px', width: '100%', zIndex: 0 }}
          zoomControl={false}
          attributionControl={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <GeocodeComponent
            state={state}
            district={district}
            totalMembers={totalMembers}
            city={city}
          />
        </MapContainer>
      </CardContent>
    </Card>
  )
}
