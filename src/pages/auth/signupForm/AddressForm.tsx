import { useState, useCallback, useMemo, useEffect } from 'react'
import { stateWithDistrictData } from '@/data/states'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormWrapper } from './components/FormWrapper'

type AddressData = {
  addressLine1: string
  addressLine2?: string
  cityOrVillage: string
  area: string
  district: string
  state: string
  pincode: string
}

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void
}

export function AddressForm({
  addressLine1,
  addressLine2,
  cityOrVillage,
  area,
  district,
  state,
  pincode,
  updateFields,
}: AddressFormProps) {
  const [districts, setDistricts] = useState<string[]>([])
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressData, string>>
  >({})

  useEffect(() => {
    if (state) {
      const stateData = stateWithDistrictData.states.find(
        (s) => s.state === state
      )
      setDistricts(stateData ? stateData.districts : [])
    }
  }, [state])

  const validateField = useCallback(
    (field: keyof AddressData, value: string) => {
      setErrors((prev) => {
        const newErrors = { ...prev }
        if (!value && field !== 'addressLine2') {
          newErrors[field] = 'This field is required'
        } else if (field === 'pincode' && value && !/^\d{6}$/.test(value)) {
          newErrors[field] = 'Please enter a valid 6-digit pincode'
        } else if (field === 'addressLine1' && value && value.length < 5) {
          newErrors[field] = 'Address line 1 must be at least 5 characters'
        } else {
          delete newErrors[field]
        }
        return newErrors
      })
    },
    []
  )

  const handleInputChange = useCallback(
    (field: keyof AddressData, value: string) => {
      updateFields({ [field]: value })
      validateField(field, value)
    },
    [updateFields, validateField]
  )

  const stateOptions = useMemo(
    () =>
      stateWithDistrictData.states.map(({ state }) => (
        <SelectItem key={state} value={state}>
          {state}
        </SelectItem>
      )),
    []
  )

  return (
    <FormWrapper title='Address Details'>
      <div className='grid gap-4'>
        <div className='text-semibold text-center text-xs text-muted-foreground'>
          * Provide Address as given in Aadhaar Card
        </div>
        <div>
          <Label>
            Address Line 1 <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='Enter address line 1'
            value={addressLine1}
            required
            onChange={(e) => handleInputChange('addressLine1', e.target.value)}
            className={
              errors.addressLine1 ? 'border-red-500 focus:ring-red-500' : ''
            }
          />
          {errors.addressLine1 && (
            <p className='mt-1 text-xs text-red-500'>{errors.addressLine1}</p>
          )}
        </div>
        <div>
          <Label>Address Line 2</Label>
          <Input
            placeholder='Area, Landmark'
            value={addressLine2}
            onChange={(e) => handleInputChange('addressLine2', e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <Label>
              City/Village <span className='text-red-700'>*</span>
            </Label>
            <Input
              placeholder='Enter city/village'
              value={cityOrVillage}
              required
              onChange={(e) =>
                handleInputChange('cityOrVillage', e.target.value)
              }
              className={
                errors.cityOrVillage ? 'border-red-500 focus:ring-red-500' : ''
              }
            />
            {errors.cityOrVillage && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.cityOrVillage}
              </p>
            )}
          </div>
          <div>
            <Label>
              Area <span className='text-red-700'>*</span>
            </Label>
            <Input
              placeholder='Enter area'
              value={area}
              required
              onChange={(e) => handleInputChange('area', e.target.value)}
              className={errors.area ? 'border-red-500 focus:ring-red-500' : ''}
            />
            {errors.area && (
              <p className='mt-1 text-xs text-red-500'>{errors.area}</p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div>
            <Label>
              State <span className='text-red-700'>*</span>
            </Label>
            <Select
              onValueChange={(value) => {
                updateFields({ state: value, district: '' })
                validateField('state', value)
                setDistricts(
                  stateWithDistrictData.states.find((s) => s.state === value)
                    ?.districts || []
                )
              }}
              value={state}
            >
              <SelectTrigger
                className={
                  errors.state ? 'border-red-500 focus:ring-red-500' : ''
                }
              >
                <SelectValue placeholder='Select your state' />
              </SelectTrigger>
              <SelectContent>{stateOptions}</SelectContent>
            </Select>
            {errors.state && (
              <p className='mt-1 text-xs text-red-500'>{errors.state}</p>
            )}
          </div>
          <div>
            <Label>
              District <span className='text-red-700'>*</span>
            </Label>
            <Select
              onValueChange={(value) => handleInputChange('district', value)}
              value={district}
              disabled={!districts.length}
            >
              <SelectTrigger
                className={
                  errors.district ? 'border-red-500 focus:ring-red-500' : ''
                }
              >
                <SelectValue placeholder='Select your district' />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.district && (
              <p className='mt-1 text-xs text-red-500'>{errors.district}</p>
            )}
          </div>
          <div>
            <Label>
              Pincode <span className='text-red-700'>*</span>
            </Label>
            <Input
              placeholder='Enter pincode'
              value={pincode}
              required
              maxLength={6}
              onChange={(e) =>
                handleInputChange(
                  'pincode',
                  e.target.value.replace(/\D/g, '').slice(0, 6)
                )
              }
              className={
                errors.pincode ? 'border-red-500 focus:ring-red-500' : ''
              }
            />
            {errors.pincode && (
              <p className='mt-1 text-xs text-red-500'>{errors.pincode}</p>
            )}
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}
