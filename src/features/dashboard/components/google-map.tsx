import { useEffect, useRef, useState } from 'react'
import { Users, MapPin } from 'lucide-react'
import { loadGoogleMapsScript } from '@/utils/google-maps'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface GoogleMapProps {
  state: string
  district: string
  totalMembers: number
  isLoading: boolean
}

export default function GoogleMap({
  state,
  district,
  totalMembers,
  isLoading,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  // Load Google Maps script
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setLoading(false)
      })
      .catch((_error) => {
        setLoading(false)
      })
  }, [])

  // Initialize map when the component mounts and Google Maps is loaded
  useEffect(() => {
    if (loading || !mapRef.current || !state || !district) return

    // Geocode the state and district to get coordinates
    const geocoder = new google.maps.Geocoder()
    const address = `${district}, ${state}, India`

    geocoder.geocode(
      { address },
      (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus
      ) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location
          const mapOptions = {
            center: location,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            gestureHandling: 'none',
          }

          // Create the map
          const newMap = new google.maps.Map(mapRef.current!, mapOptions)

          // Add a marker for the district
          const newMarker = new google.maps.Marker({
            position: location,
            map: newMap,
            title: `${district}, ${state}`,
            animation: google.maps.Animation.DROP,
          })

          // Add an info window to the marker
          const infoWindow = new google.maps.InfoWindow({
            content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px 0;">${district}, ${state}</h3>
              <p style="margin: 0;">Total Members: ${totalMembers.toLocaleString()}</p>
            </div>
          `,
          })

          newMarker.addListener('click', () => {
            infoWindow.open(newMap, newMarker)
          })
        } else {
          // Log error but don't show to user
          // eslint-disable-next-line no-console
          console.error(
            'Geocode was not successful for the following reason: ' + status
          )
        }
      }
    )
  }, [loading, state, district, totalMembers])

  if (isLoading || loading) {
    return (
      <Card className='lg:col-span-4'>
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
    <Card className='lg:col-span-4'>
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
        <div ref={mapRef} className='h-[500px] w-full rounded-md border' />
      </CardContent>
    </Card>
  )
}
