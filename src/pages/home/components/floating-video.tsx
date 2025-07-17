import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Maximize2 } from 'lucide-react'
import introVideo from '@/assets/videos/bppIntro.mp4'

const VIDEO_URL = introVideo

const FloatingVideo: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        } else if (
          (
            videoRef.current as HTMLVideoElement & {
              webkitRequestFullscreen?: () => Promise<void>
            }
          ).webkitRequestFullscreen
        ) {
          ;(
            videoRef.current as HTMLVideoElement & {
              webkitRequestFullscreen?: () => Promise<void>
            }
          ).webkitRequestFullscreen!()
        } else if (
          (
            videoRef.current as HTMLVideoElement & {
              msRequestFullscreen?: () => Promise<void>
            }
          ).msRequestFullscreen
        ) {
          ;(
            videoRef.current as HTMLVideoElement & {
              msRequestFullscreen?: () => Promise<void>
            }
          ).msRequestFullscreen!()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (
          (
            document as Document & {
              webkitExitFullscreen?: () => Promise<void>
            }
          ).webkitExitFullscreen
        ) {
          ;(
            document as Document & {
              webkitExitFullscreen?: () => Promise<void>
            }
          ).webkitExitFullscreen!()
        } else if (
          (document as Document & { msExitFullscreen?: () => Promise<void> })
            .msExitFullscreen
        ) {
          ;(document as Document & { msExitFullscreen?: () => Promise<void> })
            .msExitFullscreen!()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const handleVideoClick = () => {
    togglePlayPause()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            left: 24,
            bottom: 24,
            zIndex: 1000,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            background: '#000',
            width: 280,
            height: 400,
            transition: 'all 0.3s',
          }}
          className='floating-video-card'
        >
          {/* Close Button */}
          <button
            onClick={() => setVisible(false)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 3,
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label='Close video'
          >
            ×
          </button>

          {/* Video Element */}
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            onClick={handleVideoClick}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              cursor: 'pointer',
            }}
          />

          {/* Play/Pause Overlay */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.3)',
                  zIndex: 2,
                }}
                onClick={handleVideoClick}
              >
                <div
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    borderRadius: '50%',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Play size={24} color='white' />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              zIndex: 3,
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label='Toggle fullscreen'
          >
            <Maximize2 size={16} />
          </button>

          <style>{`
            @media (max-width: 768px) {
              .floating-video-card {
                left: 5vw !important;
                bottom: 5vw !important;
                width: 50vw !important;
                height: 40vh !important;
                border-radius: 12px !important;
                right: auto !important;
                top: auto !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingVideo
