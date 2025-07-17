import MapChart from '@/components/maps/mapChart'

interface StateMapProps {
  state: string
  dist: string
  totalMembers: number
}

export default function StateMap({ state, dist, totalMembers }: StateMapProps) {
  return (
    <div className='flex h-full flex-col rounded-lg bg-white p-4 shadow'>
      <h3 className='mb-2 text-lg font-semibold'>{state}</h3>
      <p className='text-sm text-muted-foreground'>
        Total Members: {totalMembers.toLocaleString()}
      </p>
      <div className='min-h-0 flex-1'>
        <MapChart state={state} dist={dist} />
      </div>
    </div>
  )
}
