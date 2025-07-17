// src/components/maps/mapChart.tsx
import React, { useMemo, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  GeographyProps,
  ZoomableGroup,
} from 'react-simple-maps'
import india from '@/assets/maps/india.json'
import andaman_and_nicobar_islands from '@/assets/maps/states/andamannicobar.json'
import andhra_pradesh from '@/assets/maps/states/andhrapradesh.json'
import arunachal_pradesh from '@/assets/maps/states/arunachalpradesh.json'
import assam from '@/assets/maps/states/assam.json'
import bihar from '@/assets/maps/states/bihar.json'
import chandigarh from '@/assets/maps/states/chandigarh.json'
import chhattisgarh from '@/assets/maps/states/chhattisgarh.json'
import dadra_and_nagar_haveli_and_daman_and_diu from '@/assets/maps/states/dadranagarhaveli.json'
import delhi from '@/assets/maps/states/delhi.json'
import goa from '@/assets/maps/states/goa.json'
import gujarat from '@/assets/maps/states/gujarat.json'
import haryana from '@/assets/maps/states/haryana.json'
import himachal_pradesh from '@/assets/maps/states/himachalpradesh.json'
import jammu_and_kashmir from '@/assets/maps/states/jammukashmir.json'
import jharkhand from '@/assets/maps/states/jharkhand.json'
import karnataka from '@/assets/maps/states/karnataka.json'
import kerala from '@/assets/maps/states/kerala.json'
import ladakh from '@/assets/maps/states/ladakh.json'
import lakshadweep from '@/assets/maps/states/lakshadweep.json'
import madhya_pradesh from '@/assets/maps/states/madhyapradesh.json'
import maharashtra from '@/assets/maps/states/maharashtra.json'
import manipur from '@/assets/maps/states/manipur.json'
import meghalaya from '@/assets/maps/states/meghalaya.json'
import mizoram from '@/assets/maps/states/mizoram.json'
import nagaland from '@/assets/maps/states/nagaland.json'
import odisha from '@/assets/maps/states/odisha.json'
import puducherry from '@/assets/maps/states/puducherry.json'
import punjab from '@/assets/maps/states/punjab.json'
import rajasthan from '@/assets/maps/states/rajasthan.json'
import sikkim from '@/assets/maps/states/sikkim.json'
import tamil_nadu from '@/assets/maps/states/tamilnadu.json'
import telangana from '@/assets/maps/states/telangana.json'
import tripura from '@/assets/maps/states/tripura.json'
import uttarakhand from '@/assets/maps/states/uttarakhand.json'
import uttar_pradesh from '@/assets/maps/states/uttarpradesh.json'
import west_bengal from '@/assets/maps/states/westbengal.json'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ProjectionConfig {
  scale: number
  center: [number, number]
}

interface StateProjections {
  [key: string]: ProjectionConfig
}

interface MapChartProps {
  state: string
  dist?: string
  SelectedTab?: string
}

interface GeoProperty {
  district?: string
  name?: string
  ST_NM?: string
}

interface DistrictData {
  district: string
  totalMembers: number
  totalPopulation: number
  registeredVoters: number
  activeVolunteers: number
}

// Mock data for districts
const mockDistrictData: {
  [state: string]: { [district: string]: DistrictData }
} = {
  maharashtra: {
    jalgaon: {
      district: 'Jalgaon',
      totalMembers: 12000,
      totalPopulation: 4229000,
      registeredVoters: 2800000,
      activeVolunteers: 150,
    },
    pune: {
      district: 'Pune',
      totalMembers: 15000,
      totalPopulation: 5057709,
      registeredVoters: 3200000,
      activeVolunteers: 200,
    },
    mumbai: {
      district: 'Mumbai',
      totalMembers: 25000,
      totalPopulation: 12442373,
      registeredVoters: 8500000,
      activeVolunteers: 500,
    },
    nashik: {
      district: 'Nashik',
      totalMembers: 10000,
      totalPopulation: 6107187,
      registeredVoters: 4000000,
      activeVolunteers: 120,
    },
  },
  gujarat: {
    ahmedabad: {
      district: 'Ahmedabad',
      totalMembers: 18000,
      totalPopulation: 5577940,
      registeredVoters: 3800000,
      activeVolunteers: 250,
    },
    surat: {
      district: 'Surat',
      totalMembers: 14000,
      totalPopulation: 4467797,
      registeredVoters: 3000000,
      activeVolunteers: 180,
    },
  },
  karnataka: {
    bangalore: {
      district: 'Bangalore',
      totalMembers: 20000,
      totalPopulation: 12345678,
      registeredVoters: 8000000,
      activeVolunteers: 300,
    },
    mysore: {
      district: 'Mysore',
      totalMembers: 8000,
      totalPopulation: 3001127,
      registeredVoters: 2000000,
      activeVolunteers: 100,
    },
  },
  // Add more states and districts as needed
}

const stateProjections: StateProjections = {
  andhra_pradesh: { scale: 4000, center: [80.0, 15.9] },
  arunachal_pradesh: { scale: 4000, center: [94.7, 28.2] },
  assam: { scale: 4000, center: [92.7, 26.2] },
  bihar: { scale: 4000, center: [85.9, 25.8] },
  chhattisgarh: { scale: 4000, center: [82.0, 21.3] },
  goa: { scale: 4000, center: [74.0, 15.3] },
  gujarat: { scale: 4000, center: [71.0, 22.5] },
  haryana: { scale: 4000, center: [76.0, 29.0] },
  himachal_pradesh: { scale: 4000, center: [77.5, 31.9] },
  jharkhand: { scale: 4000, center: [85.5, 23.6] },
  karnataka: { scale: 4000, center: [76.0, 15.0] },
  kerala: { scale: 4000, center: [76.5, 10.5] },
  madhya_pradesh: { scale: 4000, center: [78.0, 23.5] },
  maharashtra: { scale: 4000, center: [77.0, 18.5] },
  manipur: { scale: 4000, center: [93.9, 24.8] },
  meghalaya: { scale: 4000, center: [91.5, 25.5] },
  mizoram: { scale: 4000, center: [92.8, 23.4] },
  nagaland: { scale: 4000, center: [94.5, 26.0] },
  odisha: { scale: 4000, center: [84.5, 20.5] },
  punjab: { scale: 4000, center: [75.5, 31.0] },
  rajasthan: { scale: 4000, center: [73.5, 26.5] },
  sikkim: { scale: 4000, center: [88.5, 27.5] },
  tamil_nadu: { scale: 4000, center: [78.5, 11.0] },
  telangana: { scale: 4000, center: [79.0, 17.5] },
  tripura: { scale: 4000, center: [91.8, 23.8] },
  uttar_pradesh: { scale: 4000, center: [80.5, 27.0] },
  uttarakhand: { scale: 4000, center: [79.0, 30.0] },
  west_bengal: { scale: 4000, center: [88.0, 23.0] },
  andaman_and_nicobar_islands: { scale: 4000, center: [92.8, 11.7] },
  chandigarh: { scale: 4000, center: [76.8, 30.7] },
  dadra_and_nagar_haveli_and_daman_and_diu: {
    scale: 4000,
    center: [72.9, 20.3],
  },
  delhi: { scale: 4000, center: [77.2, 28.6] },
  jammu_and_kashmir: { scale: 4000, center: [75.0, 34.0] },
  ladakh: { scale: 4000, center: [77.5, 34.5] },
  lakshadweep: { scale: 4000, center: [72.6, 10.5] },
  puducherry: { scale: 4000, center: [79.8, 11.9] },
}

const MapChart: React.FC<MapChartProps> = ({ state, dist }) => {
  const [openTooltip, setOpenTooltip] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [districtData, setDistrictData] = useState<DistrictData | null>(null)
  const [loading, setLoading] = useState(false)

  const getProjectionConfig = useMemo(() => {
    const normalizedState = state.toLowerCase().replace(/\s+/g, '_')
    const baseScale = window.innerWidth < 640 ? 2000 : 4000
    return {
      scale: baseScale,
      center: stateProjections[normalizedState]?.center || [78, 20],
    }
  }, [state])

  const mapData = useMemo(() => {
    const normalizedState = state.toLowerCase().replace(/\s+/g, '_')
    switch (normalizedState) {
      case 'andhra_pradesh':
        return andhra_pradesh
      case 'arunachal_pradesh':
        return arunachal_pradesh
      case 'assam':
        return assam
      case 'bihar':
        return bihar
      case 'chhattisgarh':
        return chhattisgarh
      case 'goa':
        return goa
      case 'gujarat':
        return gujarat
      case 'haryana':
        return haryana
      case 'himachal_pradesh':
        return himachal_pradesh
      case 'jharkhand':
        return jharkhand
      case 'karnataka':
        return karnataka
      case 'kerala':
        return kerala
      case 'madhya_pradesh':
        return madhya_pradesh
      case 'maharashtra':
        return maharashtra
      case 'manipur':
        return manipur
      case 'meghalaya':
        return meghalaya
      case 'mizoram':
        return mizoram
      case 'nagaland':
        return nagaland
      case 'odisha':
        return odisha
      case 'punjab':
        return punjab
      case 'rajasthan':
        return rajasthan
      case 'sikkim':
        return sikkim
      case 'tamil_nadu':
        return tamil_nadu
      case 'telangana':
        return telangana
      case 'tripura':
        return tripura
      case 'uttar_pradesh':
        return uttar_pradesh
      case 'uttarakhand':
        return uttarakhand
      case 'west_bengal':
        return west_bengal
      case 'andaman_and_nicobar_islands':
        return andaman_and_nicobar_islands
      case 'chandigarh':
        return chandigarh
      case 'dadra_and_nagar_haveli_and_daman_and_diu':
        return dadra_and_nagar_haveli_and_daman_and_diu
      case 'delhi':
        return delhi
      case 'jammu_and_kashmir':
        return jammu_and_kashmir
      case 'ladakh':
        return ladakh
      case 'lakshadweep':
        return lakshadweep
      case 'puducherry':
        return puducherry
      default:
        return india
    }
  }, [state])

  const getTooltipContent = (geo: GeographyProps['geography']): string => {
    const properties = geo.properties as GeoProperty
    return properties.district || properties.ST_NM || properties.name || ''
  }

  const getFillColor = (geo: GeographyProps['geography']): string => {
    const properties = geo.properties as GeoProperty
    if (dist && properties.district?.toLowerCase() === dist.toLowerCase()) {
      return '#0EA5E9' // User's district
    }
    if (
      selectedDistrict &&
      properties.district?.toLowerCase() === selectedDistrict.toLowerCase()
    ) {
      return '#10B981' // Clicked district
    }
    return '#D1D5DB' // Default
  }

  const handleDistrictClick = (geo: GeographyProps['geography']) => {
    const properties = geo.properties as GeoProperty
    const districtName = properties.district
    if (!districtName) return

    setSelectedDistrict(districtName)
    setLoading(true)

    // Simulate API call with mock data
    const normalizedState = state.toLowerCase().replace(/\s+/g, '_')
    const mockData =
      mockDistrictData[normalizedState]?.[districtName.toLowerCase()]

    setTimeout(() => {
      // Simulate network delay
      if (mockData) {
        setDistrictData(mockData)
      } else {
        setDistrictData(null) // No data for this district
      }
      setLoading(false)
    }, 500) // 500ms delay
  }

  return (
    <div className='relative h-full w-full'>
      <ComposableMap
        projection='geoMercator'
        projectionConfig={getProjectionConfig}
        className='h-full w-full'
      >
        <ZoomableGroup
          minZoom={1}
          maxZoom={5}
          translateExtent={[
            [-window.innerWidth, -window.innerHeight],
            [window.innerWidth * 2, window.innerHeight * 2],
          ]}
          center={getProjectionConfig.center}
        >
          <Geographies geography={mapData}>
            {({
              geographies,
            }: {
              geographies: GeographyProps['geography'][]
            }) =>
              geographies.map((geo: GeographyProps['geography']) => {
                const tooltipContent = getTooltipContent(geo)
                return (
                  <TooltipProvider key={geo.rsmKey}>
                    <Tooltip open={openTooltip === geo.rsmKey}>
                      <TooltipTrigger asChild>
                        <Geography
                          geography={geo}
                          onMouseEnter={() => setOpenTooltip(geo.rsmKey)}
                          onMouseLeave={() => setOpenTooltip('')}
                          onClick={() => handleDistrictClick(geo)}
                          style={{
                            default: {
                              fill: getFillColor(geo),
                              outline: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: window.innerWidth < 640 ? 0.3 : 0.5,
                            },
                            hover: {
                              fill:
                                dist &&
                                (
                                  geo.properties as GeoProperty
                                ).district?.toLowerCase() === dist.toLowerCase()
                                  ? '#0EA5E9'
                                  : '#60A5FA',
                              outline: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: window.innerWidth < 640 ? 0.3 : 0.5,
                              cursor: 'pointer',
                            },
                            pressed: {
                              fill: '#E42',
                              outline: 'none',
                            },
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tooltipContent}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Popup Card for District Data */}
      {selectedDistrict && (
        <div className='absolute right-4 top-4 z-10 w-64'>
          <Card>
            <CardHeader>
              <CardTitle>{selectedDistrict}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : districtData ? (
                <div className='space-y-2'>
                  <p>
                    <strong>Total Members:</strong>{' '}
                    {districtData.totalMembers.toLocaleString()}
                  </p>
                  <p>
                    <strong>Total Population:</strong>{' '}
                    {districtData.totalPopulation.toLocaleString()}
                  </p>
                  <p>
                    <strong>Registered Voters:</strong>{' '}
                    {districtData.registeredVoters.toLocaleString()}
                  </p>
                  <p>
                    <strong>Active Volunteers:</strong>{' '}
                    {districtData.activeVolunteers.toLocaleString()}
                  </p>
                </div>
              ) : (
                <p>No data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default React.memo(MapChart)
