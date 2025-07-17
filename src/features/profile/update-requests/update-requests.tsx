import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { profileService } from '@/services/profile.service'
import { UpdateRequestsResponse } from '@/types/profile'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function UpdateRequests() {
  const [requests, setRequests] = useState<
    UpdateRequestsResponse['data']['requests']
  >([])
  const [pagination, setPagination] = useState<
    UpdateRequestsResponse['data']['pagination']
  >({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })
  const [loading, setLoading] = useState(true)

  const fetchRequests = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true)
      const response = await profileService.getUpdateRequests(page, limit)
      if (response.success) {
        setRequests(response.data.requests)
        setPagination(response.data.pagination)
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message || 'Failed to fetch update requests'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleCancelRequest = async (requestId: string) => {
    try {
      const response = await profileService.cancelUpdateRequest(requestId)
      if (response.data.success) {
        toast.success('Update request cancelled successfully')
        fetchRequests(pagination.page)
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message || 'Failed to cancel update request'
      )
    }
  }

  const handleResendOtp = async (requestId: string) => {
    try {
      const response = await profileService.resendOtp(requestId)
      if (response.data.success) {
        toast.success('OTP resent successfully')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError.response?.data?.message || 'Failed to resend OTP')
    }
  }

  if (loading) {
    return (
      <div className='text-center text-muted-foreground'>
        Loading update requests...
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Update Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className='text-muted-foreground'>No update requests found.</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell>{request.field}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      {format(new Date(request.createdAt), 'PPp')}
                    </TableCell>
                    <TableCell>
                      {request.isPending && (
                        <>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleCancelRequest(request._id)}
                            className='mr-2'
                          >
                            Cancel
                          </Button>
                          {(request.field === 'email' ||
                            request.field === 'phone') && (
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => handleResendOtp(request._id)}
                            >
                              Resend OTP
                            </Button>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className='mt-4 flex justify-between'>
              <Button
                disabled={pagination.page === 1}
                onClick={() => fetchRequests(pagination.page - 1)}
              >
                Previous
              </Button>
              <Button
                disabled={pagination.page === pagination.pages}
                onClick={() => fetchRequests(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
