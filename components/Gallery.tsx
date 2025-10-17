'use client'

import Image from './Image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Masonry from 'react-masonry-css'

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Download from 'yet-another-react-lightbox/plugins/download'
import {
  ChevronLeft,
  ChevronRight,
  X,
  ImageDown,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

export function Gallery({ images }: { images: { src: string; blurDataURL: string }[] }) {
  const [index, setIndex] = useState(-1)

  type DownloadParams = {
    slide?: {
      src?: string
    }
    saveAs?: (url: string, filename?: string) => void
  }

  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1024: 2,
        640: 1,
      }}
      className="mt-4 flex w-auto gap-4 py-10"
      columnClassName="flex flex-col gap-4"
    >
      {images.map(({ src, blurDataURL }, i) => (
        <div key={src} className="group break-inside-avoid">
          <div className="absolute relative inset-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black/0 shadow-lg transition-all transition-all duration-500 duration-500 hover:shadow-2xl group-hover:bg-black/20">
            <Image
              src={src}
              alt={`gallery-photo ${i}`}
              className="w-full cursor-pointer transition-all duration-500 group-hover:scale-105"
              width={2400}
              height={1600}
              placeholder="blur"
              blurDataURL={blurDataURL}
              onClick={() => setIndex(i)}
            />
          </div>
        </div>
      ))}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map(({ src }) => ({ src }))}
        render={{
          iconPrev: () => (
            <button
              className="absolute left-4 rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-6 w-6 stroke-[3] text-primary-600" />
            </button>
          ),
          iconNext: () => (
            <button
              className="absolute right-4 rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-6 w-6 stroke-[3] text-primary-600" />
            </button>
          ),
          iconClose: () => (
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Close"
            >
              <X className="h-6 w-6 stroke-[2.5] text-primary-600" />
            </button>
          ),
          iconDownload: () => (
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Download"
            >
              <ImageDown className="h-6 w-6 stroke-[2.5] text-primary-600" />
            </button>
          ),
          iconEnterFullscreen: () => (
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Enter fullscreen"
            >
              <Maximize className="h-6 w-6 stroke-[2.5] text-primary-600" />
            </button>
          ),
          iconExitFullscreen: () => (
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Exit fullscreen"
            >
              <Minimize className="h-6 w-6 stroke-[2.5] text-primary-600" />
            </button>
          ),
          iconZoomIn: () => (
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-6 w-6 stroke-[2.5] text-primary-600" />
            </button>
          ),
          iconZoomOut: () => (
            <button
              type="button"
              className="rounded-full bg-white/90 p-2 transition-colors hover:bg-white/70"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-6 w-6 stroke-[2.5] text-primary-600" />
            </button>
          ),
        }}
        carousel={{
          imageFit: 'contain',
          padding: 0,
        }}
        plugins={[Fullscreen, Zoom, Download]}
        fullscreen={{
          auto: false,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        download={{
          download: (params: DownloadParams | undefined) => {
            const slide = params?.slide
            const saveAs = params?.saveAs
            const src = slide?.src || ''
            if (!src) return

            let urlObj: URL | null = null
            try {
              urlObj = new URL(
                src,
                typeof window !== 'undefined' ? window.location.href : undefined
              )
            } catch (e) {
              return
            }
            if (!['http:', 'https:'].includes(urlObj.protocol)) return

            const pathname = urlObj.pathname || ''
            const rawBase = pathname.split('/').pop() || 'image'
            let filename = 'image'
            try {
              filename = decodeURIComponent(rawBase)
            } catch (e) {
              filename = rawBase
            }

            filename = filename.replace(/[^a-z0-9._-]/gi, '_')

            const MAX_FILENAME_LEN = 100
            if (filename.length > MAX_FILENAME_LEN) {
              const extMatch = filename.match(/(\.[a-z0-9]{1,8})$/i)
              const ext = extMatch ? extMatch[1] : ''
              filename = filename.slice(0, MAX_FILENAME_LEN - ext.length) + ext
            }

            if (!/\.[a-z0-9]{1,8}$/i.test(filename)) {
              filename = filename + '.jpg'
            }

            if (typeof saveAs === 'function') saveAs(urlObj.toString(), filename)
          },
        }}
      />
    </Masonry>
  )
}
