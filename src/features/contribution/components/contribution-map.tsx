import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { mockDashboardStats } from '@/features/contribution/data/data'

// Fix for Leaflet marker icons
if (L && L.Icon && L.Icon.Default) {
  // @ts-expect-error: Leaflet types do not include _getIconUrl property
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

export function ContributionMap() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Support Center Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-full w-full overflow-hidden rounded-lg md:h-80'>
          <MapContainer
            center={[22.5, 78.9629]}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {mockDashboardStats.supportCenters.map((center) => (
              <Marker
                key={center.name}
                position={center.position as L.LatLngExpression}
              >
                <Popup>{center.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
