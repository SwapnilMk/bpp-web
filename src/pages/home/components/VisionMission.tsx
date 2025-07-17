import {
  GraduationCapIcon,
  Handshake,
  ShieldCheck,
  ShieldCheckIcon,
  Target,
  Users,
  UsersRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const VisionMission = () => {
  const { t } = useTranslation('homePage')

  return (
    <section className='w-full bg-background py-8 dark:bg-gray-900 md:py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Tabs defaultValue='vision' className='mx-auto w-full'>
          <TabsList className='mx-auto grid w-full max-w-md grid-cols-2 rounded-lg bg-white/50 p-1 shadow-sm backdrop-blur-sm dark:bg-gray-800/50'>
            <TabsTrigger
              value='vision'
              className='text-base font-semibold transition-all duration-300 data-[state=active]:bg-[#2563ec] data-[state=active]:text-primary-foreground'
            >
              Vision
            </TabsTrigger>
            <TabsTrigger
              value='mission'
              className='text-base font-semibold transition-all duration-300 data-[state=active]:bg-[#2563ec] data-[state=active]:text-primary-foreground'
            >
              Mission
            </TabsTrigger>
          </TabsList>

          {/* Vision Tab */}
          <TabsContent value='vision' className='mt-6'>
            <div className='flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-10'>
              <div className='order-1'>
                <div>
                  <span className='inline-block rounded bg-[#2563ec] px-2 py-1 text-xs text-white'>
                    {t('VisionMission.vision.visionStatement.heading')}
                  </span>
                  <h3 className='mt-3 border-b pb-3 text-2xl font-bold tracking-tight transition-colors first:mt-0 sm:text-3xl xl:text-4xl'>
                    {t('VisionMission.vision.visionStatement.heading2')}{' '}
                    <span className='mt-1 block'>
                      <span className='text-[#e85a32]'>
                        {t('VisionMission.vision.visionStatement.heading3')}
                      </span>{' '}
                      <span className='text-blue-500'>
                        {t('VisionMission.vision.visionStatement.heading4')}
                      </span>{' '}
                      <span>
                        {t('VisionMission.vision.visionStatement.heading5')}
                      </span>
                    </span>
                  </h3>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {t('VisionMission.vision.visionStatement.text1')}
                  </p>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {t('VisionMission.vision.visionStatement.text2')}
                  </p>
                </div>
              </div>
              <div className='order-2 space-y-3 lg:order-2 lg:space-y-3'>
                <div className='flex rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 hover:bg-muted/40 dark:border-gray-700 dark:bg-gray-800'>
                  <span className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-[#2563ec] text-white'>
                    <UsersRound className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-4 sm:ms-6'>
                    <h3 className='text-sm font-semibold sm:text-base'>
                      {t('VisionMission.vision.features.items.0.title')}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {t('VisionMission.vision.features.items.0.description')}
                    </p>
                  </div>
                </div>
                <div className='flex rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 hover:bg-muted/40 dark:border-gray-700 dark:bg-gray-800'>
                  <span className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-[#2563ec] text-white'>
                    <GraduationCapIcon className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-4 sm:ms-6'>
                    <h3 className='text-sm font-semibold sm:text-base'>
                      {t('VisionMission.vision.features.items.1.title')}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {t('VisionMission.vision.features.items.1.description')}
                    </p>
                  </div>
                </div>
                <div className='flex rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 hover:bg-muted/40 dark:border-gray-700 dark:bg-gray-800'>
                  <span className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-[#2563ec] text-white'>
                    <ShieldCheckIcon className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-4 sm:ms-6'>
                    <h3 className='text-sm font-semibold sm:text-base'>
                      {t('VisionMission.vision.features.items.2.title')}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {t('VisionMission.vision.features.items.2.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Mission Tab */}
          <TabsContent value='mission' className='mt-6'>
            <div className='flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-10'>
              <div className='order-1'>
                <span className='inline-block rounded bg-[#2563ec] px-2 py-1 text-xs text-white'>
                  {t('VisionMission.mission.missionStatement.heading')}
                </span>
                <h3 className='mt-3 border-b pb-3 text-2xl font-bold tracking-tight transition-colors first:mt-0 sm:text-3xl xl:text-4xl'>
                  {t('VisionMission.mission.missionStatement.heading2')}{' '}
                  <span className='mt-1 block'>
                    <span className='text-[#e85a32]'>
                      {t('VisionMission.mission.missionStatement.heading3')}
                    </span>{' '}
                    <span className='text-blue-500'>
                      {t('VisionMission.mission.missionStatement.heading4')}
                    </span>{' '}
                    <span>
                      {t('VisionMission.mission.missionStatement.heading5')}
                    </span>
                  </span>
                </h3>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text1')}
                </p>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text2')}
                </p>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text3')}
                </p>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text4')}
                </p>
              </div>
              <div className='order-2 space-y-3 lg:order-2 lg:space-y-3'>
                <div className='flex rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 hover:bg-muted/40 dark:border-gray-700 dark:bg-gray-800'>
                  <span className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-[#2563ec] text-white'>
                    <Users className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-4 sm:ms-6'>
                    <h3 className='text-sm font-semibold sm:text-base'>
                      {t('VisionMission.mission.features.items.0.title')}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {t('VisionMission.mission.features.items.0.description')}
                    </p>
                  </div>
                </div>
                <div className='flex rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 hover:bg-muted/40 dark:border-gray-700 dark:bg-gray-800'>
                  <span className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-[#2563ec] text-white'>
                    <Target className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-4 sm:ms-6'>
                    <h3 className='text-sm font-semibold sm:text-base'>
                      {t('VisionMission.mission.features.items.1.title')}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {t('VisionMission.mission.features.items.1.description')}
                    </p>
                  </div>
                </div>
                <div className='flex rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 hover:bg-muted/40 dark:border-gray-700 dark:bg-gray-800'>
                  <span className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-[#2563ec] text-white'>
                    <ShieldCheck className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-4 sm:ms-6'>
                    <h3 className='text-sm font-semibold sm:text-base'>
                      {t('VisionMission.mission.features.items.2.title')}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {t('VisionMission.mission.features.items.2.description')}
                    </p>
                  </div>
                </div>
                <div className='flex rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 hover:bg-muted/40 dark:border-gray-700 dark:bg-gray-800'>
                  <span className='inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-[#2563ec] text-white'>
                    <Handshake className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-4 sm:ms-6'>
                    <h3 className='text-sm font-semibold sm:text-base'>
                      {t('VisionMission.mission.features.items.3.title')}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground'>
                      {t('VisionMission.mission.features.items.3.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default VisionMission
