import {
  CheckCircledIcon,
  CrossCircledIcon,
  ClockIcon,
} from '@radix-ui/react-icons'

export const statuses = [
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  {
    value: 'pending',
    label: 'Pending',
    icon: ClockIcon,
  },
  {
    value: 'failed',
    label: 'Failed',
    icon: CrossCircledIcon,
  },
]
