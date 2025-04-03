'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from '@/components/Image'

function Carousel({ images }: { images }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000 })]
  )

  return (
    <div
      className="aspect-[4/3] w-full overflow-hidden shadow-[10px_10px_0px_0px_primary-500] shadow-primary-500 md:w-1/2"
      ref={emblaRef}
    >
      <div className="flex h-full w-full">
        {images.map(({ src, blurDataURL }, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
              width={1920}
              height={1080}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
