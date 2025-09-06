'use client'

import Image from './Image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Masonry from 'react-masonry-css'

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Arrow from './Arrow'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Gallery({ images }: { images: { src: string; blurDataURL: string }[] }) {
  const [index, setIndex] = useState(-1)

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
        /*render={{
            iconPrev: () => (
              <button
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1 transition-colors hover:bg-white/70"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-6 w-6 stroke-[3] text-primary-600" />
              </button>
            ),
            iconNext: () => (
              <button
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1 transition-colors hover:bg-white/70"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-6 w-6 stroke-[3] text-primary-600" />
              </button>
            ),
          }}*/
        carousel={{
          imageFit: 'contain',
          padding: 0,
        }}
        plugins={[Fullscreen, Zoom]}
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
        // TODO: implement download functionality
      />
    </Masonry>
  )
}
