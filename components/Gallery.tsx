'use client'

import Image from './Image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export function Gallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(-1)

  return (
    <div className="columns-1 space-y-4 py-10 sm:columns-2 md:py-20 lg:columns-3">
      {images.map((src, i) => (
        <div key={src} className="break-inside-avoid">
          <Image
            src={src}
            alt="gallery-photo"
            className="w-full rounded-lg object-cover transition-transform duration-300 hover:scale-95" //
            width={544}
            height={306}
            onClick={() => setIndex(i)}
          />
        </div>
      ))}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((src) => ({ src }))}
      />
    </div>
  )
}
