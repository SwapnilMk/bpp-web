import React, { useState, useCallback } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'

interface CropperModalProps {
  open: boolean
  image: string
  onClose: () => void
  onDone: (cropped: string) => void
}

function getCroppedImg(
  imageSrc: string,
  crop: Area,
  rotation: number
): Promise<string> {
  // Utility to crop the image and return base64
  // (Implementation uses canvas)
  return new Promise((resolve, reject) => {
    const image = new window.Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject('No context')
      const safeArea = Math.max(image.width, image.height) * 2
      canvas.width = safeArea
      canvas.height = safeArea
      ctx.translate(safeArea / 2, safeArea / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.translate(-safeArea / 2, -safeArea / 2)
      ctx.drawImage(
        image,
        (safeArea - image.width) / 2,
        (safeArea - image.height) / 2
      )
      const data = ctx.getImageData(0, 0, safeArea, safeArea)
      // Crop
      canvas.width = crop.width
      canvas.height = crop.height
      ctx.putImageData(
        data,
        Math.round(0 - (safeArea / 2 - image.width / 2) - crop.x),
        Math.round(0 - (safeArea / 2 - image.height / 2) - crop.y)
      )
      resolve(canvas.toDataURL('image/jpeg'))
    }
    image.onerror = reject
  })
}

const CropperModal: React.FC<CropperModalProps> = ({
  open,
  image,
  onClose,
  onDone,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [loading, setLoading] = useState(false)

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleDone = async () => {
    if (!croppedAreaPixels) return
    setLoading(true)
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels, rotation)
      onDone(croppedImg)
    } catch (_e) {
      // handle error
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Crop & Adjust Photo</DialogTitle>
        </DialogHeader>
        {/* Notes Section */}
        <div className='mb-2 rounded border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-700'>
          <ul className='list-disc pl-5'>
            <li>
              Add <span className='font-bold'>image only</span>
            </li>
            <li>
              Add <span className='font-bold'>passport size photo</span>
            </li>
            <li>
              Photo should be <span className='font-bold'>less than 3MB</span>
            </li>
            <li>Clear face, plain background recommended</li>
          </ul>
        </div>
        <div className='relative h-72 w-full bg-black'>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape='round'
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className='mt-4 flex flex-col gap-2'>
          <label>Zoom</label>
          <Slider
            min={1}
            max={3}
            step={0.01}
            value={[zoom]}
            onValueChange={([v]: number[]) => setZoom(v as number)}
          />
          <label>Rotate</label>
          <Slider
            min={0}
            max={360}
            step={1}
            value={[rotation]}
            onValueChange={([v]: number[]) => setRotation(v as number)}
          />
        </div>
        <div className='mt-4 flex justify-end gap-2'>
          <Button variant='outline' onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDone} disabled={loading}>
            {loading ? 'Processing...' : 'Done'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CropperModal
