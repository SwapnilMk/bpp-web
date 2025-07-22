import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, MapPin } from 'lucide-react'

// Types for props
interface UserAddress {
  district: string
  state: string
  coordinates: [number, number]
}

interface ContributionMapProps {
  userAddress: UserAddress
  totalMembers: number
}

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

export function ContributionMap({ userAddress, totalMembers }: ContributionMapProps) {
  const defaultCenter: [number, number] = userAddress?.coordinates || [22.5, 78.9629]

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div>
          <CardTitle>Overview</CardTitle>
        </div>
        <Badge variant='outline' className='flex items-center gap-1'>
          <MapPin className='h-3 w-3' />
          <span>
            {userAddress.district}, {userAddress.state}
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
        <div className='overflow-hidden w-full min-h-[250px] rounded-lg'>
          <MapContainer
            center={defaultCenter}
            zoom={10}
            minZoom={5}
            maxZoom={18}
            scrollWheelZoom={false}
            style={{ height: '380px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {/* User's location marker */}
            {userAddress?.coordinates && (
              <Marker position={userAddress.coordinates as L.LatLngExpression}>
                <Popup>
                  <div>
                    <strong>{userAddress.district}, {userAddress.state}</strong>
                    <br />
                    {totalMembers.toLocaleString()} members in your district
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
