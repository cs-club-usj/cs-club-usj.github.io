'use client'

import Image from './Image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Masonry from 'react-masonry-css'

export function Gallery({ images }: { images: { src: string; blurDataURL: string }[] }) {
  const [index, setIndex] = useState(-1)

  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1024: 2,
        640: 1,
      }}
      className="flex w-auto gap-4 py-10 md:py-20"
      columnClassName="flex flex-col gap-4"
    >
      {images.map(({ src, blurDataURL }, i) => (
        <div key={src} className="break-inside-avoid">
          <Image
            src={src}
            alt="gallery-photo"
            className="w-full rounded-lg object-cover transition-transform duration-300 hover:scale-95" //
            width={2400}
            height={1600}
            placeholder="blur"
            blurDataURL={blurDataURL}
            onClick={() => setIndex(i)}
          />
        </div>
      ))}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map(({ src }) => ({ src }))}
      />
    </Masonry>
  )
}
