import { useEffect, useRef, useCallback } from 'react'
import { loadGoogleMapsScript } from '@/utils/google-maps'

interface Address {
  addressLine1: string
  addressLine2?: string
  cityOrVillage: string
  district: string
  state: string
  pincode: string
}

interface GoogleAddressAutocompleteProps {
  onAddressSelect: (address: Address) => void
  required?: boolean
  className?: string
  value: string // Controlled value
  onChange: (value: string) => void // Handle input changes
}

interface GoogleMapsPlace {
  address_components: Array<{
    long_name: string
    short_name: string
    types: string[]
  }>
  formatted_address?: string
}

interface AutocompleteInstance {
  addListener: (event: 'place_changed', callback: () => void) => void
  getPlace: () => GoogleMapsPlace | null
}

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: {
            new (
              inputField: HTMLInputElement,
              options: unknown
            ): AutocompleteInstance
          }
        }
      }
    }
  }
}

export const GoogleAddressAutocomplete = ({
  onAddressSelect,
  required,
  className = '',
  value,
  onChange,
}: GoogleAddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<AutocompleteInstance | null>(null)

  const initializeAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google?.maps?.places?.Autocomplete) {
      return
    }

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: 'in' },
        fields: ['address_components', 'formatted_address'],
        types: ['address'],
      }
    )

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace()
      if (!place?.address_components) return

      let addressLine1 = ''
      let addressLine2 = ''
      let cityOrVillage = ''
      let district = ''
      let state = ''
      let pincode = ''

      const formattedAddress = place.formatted_address || ''

      for (const component of place.address_components) {
        const componentType = component.types[0]

        switch (componentType) {
          case 'street_number':
            addressLine1 = component.long_name
            break
          case 'route':
            addressLine1 += ` ${component.long_name}`
            break
          case 'sublocality_level_1':
          case 'sublocality':
            addressLine2 = component.long_name
            break
          case 'locality':
            cityOrVillage = component.long_name
            break
          case 'administrative_area_level_2':
            district = component.long_name
            break
          case 'administrative_area_level_1':
            state = component.long_name
            break
          case 'postal_code':
            pincode = component.long_name
            break
        }
      }

      // Fallback to formatted address if addressLine1 is empty
      if (!addressLine1.trim()) {
        addressLine1 = formattedAddress.split(',').slice(0, 2).join(',').trim()
      }

      // Update the input value to the formatted address
      onChange(formattedAddress)

      // Pass the address details to the parent
      onAddressSelect({
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2 || undefined,
        cityOrVillage: cityOrVillage || '',
        district: district || '',
        state: state || '',
        pincode: pincode || '',
      })
    })

    return () => {
      // Clean up listener (Note: Google Maps API doesn't provide a direct way to remove listeners, so we rely on unmount)
      autocompleteRef.current = null
    }
  }, [onAddressSelect, onChange])

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        initializeAutocomplete()
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to load Google Maps:', error)
      })
  }, [initializeAutocomplete])

  // Sync input value with prop
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
  }, [value])

  return (
    <input
      ref={inputRef}
      type='text'
      placeholder='Enter your address'
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  )
}
