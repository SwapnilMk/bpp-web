import { useNavigate } from '@tanstack/react-router'
import {
  Users,
  Vote,
  UserPlus,
  FileText,
  Users2,
  ScrollText,
  Network,
  Award,
  Layout as LayoutIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const MembershipPrivilege = () => {
  const navigate = useNavigate()
  const privileges = [
    {
      title: 'Right to Vote',
      description:
        'Every member shall have the right to vote in party elections. Voting rights are applicable as per the rules outlined in the constitution, and each member is entitled to one vote.',
      icon: Vote,
    },
    {
      title: 'Right to Stand for Election',
      description:
        "Members who fulfill the eligibility criteria specified in the Bharatiya Popular Party constitution have the right to stand for election to any party position or office subject to the party's bylaws and election processes.",
      icon: UserPlus,
    },
    {
      title: 'Access to Party Information',
      description:
        'Members shall have access to policies, meeting minutes, plans, and annual reports.',
      icon: FileText,
    },
    {
      title: 'Participation in Party Activities',
      description:
        'Members are encouraged to participate in all party activities, including meetings, campaigns, seminars, and community outreach programs.',
      icon: Users2,
    },
    {
      title: 'Right to Propose Resolutions and Amendments',
      description:
        "Members may propose resolutions and amendments to the party's policies, organizational structures, and constitution.",
      icon: ScrollText,
    },
    {
      title: 'Networking and Collaboration',
      description:
        "Members shall have opportunities to network with professionals and organizations, both locally and internationally, to promote the party's vision, expand influence, and foster collaborations.",
      icon: Network,
    },
    {
      title: 'Recognition and Rewards',
      description:
        "Members who demonstrate outstanding dedication, leadership, or contribution to the party's activities shall be recognized through awards, titles, or other forms of acknowledgment.",
      icon: Award,
    },
    {
      title: 'Access to Party Platforms',
      description:
        'Members shall have access to platforms for voting, sharing views and ideas, and contributing on key political, economic, and social issues.',
      icon: LayoutIcon,
    },
  ]

  return (
    <>
      <HeaderComponent
        heading='Membership Privilege'
        text='Rights and privileges of Bharatiya Popular Party members'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Membership', href: '/membership' },
          { label: 'Membership Privilege', href: '/membership/privilege' },
        ]}
        imgUrl={'null'}
      />

      <section className='relative mx-auto max-w-7xl overflow-hidden bg-background py-8 dark:bg-slate-900 sm:py-12'>
        {/* Background Pattern - adjusted for dark mode */}
        <div className='pointer-events-none absolute inset-0' />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZTg1YTMyIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-50 dark:opacity-30" />

        <div className='container relative mx-auto max-w-7xl px-4'>
          <div className='mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e85a32] shadow-lg sm:h-16 sm:w-16'>
              <Users className='h-7 w-7 text-white sm:h-8 sm:w-8' />
            </div>
            <div>
              <h1 className='text-md font-bold tracking-tight text-foreground dark:text-white sm:text-xl md:text-3xl'>
                Membership Privileges
              </h1>
              <p className='text-md mt-2 text-muted-foreground dark:text-gray-300 sm:text-lg'>
                Empowering Active Participation
              </p>
            </div>
          </div>

          <Separator className='my-8 bg-[#e85a32]/20 dark:bg-[#e85a32]/30 sm:my-12' />

          <div className='space-y-8 sm:space-y-16'>
            {privileges.map((privilege, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} transition-all duration-300 hover:-translate-y-1 hover:transform`}
              >
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[#e85a32] to-[#e85a32]/80 shadow-xl sm:h-16 sm:w-16 ${index % 2 === 0 ? 'sm:rotate-3' : 'sm:-rotate-3'}`}
                >
                  <privilege.icon className='h-7 w-7 text-white sm:h-7 sm:w-7' />
                </div>
                <div className='flex-1 space-y-3 rounded-2xl bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:bg-slate-800/50 sm:p-6'>
                  <h2 className='text-center text-xl font-semibold tracking-tight text-[#e85a32] dark:text-[#ff6b42] sm:text-left sm:text-2xl'>
                    {privilege.title}
                  </h2>
                  <p className='text-md sm:text-md text-center leading-relaxed text-muted-foreground dark:text-gray-300 sm:text-left'>
                    {privilege.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-12 space-y-6 text-center sm:mt-16 sm:space-y-8'>
            <div className='mx-auto max-w-2xl px-4'>
              <p className='text-md text-muted-foreground dark:text-gray-300 sm:text-lg'>
                By exercising these privileges, you are shaping the future of
                the party and contributing to its mission.
              </p>
            </div>
            <Button
              className='sm:text-md w-full rounded-md bg-[#e85a32] px-8 py-4 text-sm font-semibold text-white hover:bg-[#e85a32]/90 sm:w-auto sm:px-12 sm:py-4'
              size='lg'
              onClick={() => navigate({ to: '/sign-up' })}
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default MembershipPrivilege
