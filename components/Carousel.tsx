'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState, useCallback } from 'react'
import Image from '@/components/Image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Carousel({ images }: { images: { src: string; blurDataURL: string }[] }) {
  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000 })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => {
      if (embla) embla.scrollTo(index)
    },
    [embla]
  )

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev()
  }, [embla])

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext()
  }, [embla])

  useEffect(() => {
    if (!embla) return

    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap())
    }

    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
    onSelect()
  }, [embla])

  return (
    <div className="relative w-full md:w-1/2">
      <div
        className="aspect-[4/3] overflow-hidden shadow-[10px_10px_0px_0px_primary-500] shadow-primary-600"
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
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1 transition-colors hover:bg-white/70"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-4 w-4 stroke-[3] text-primary-600" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1 transition-colors hover:bg-white/70"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-4 w-4 stroke-[3] text-primary-600" />
      </button>

      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full
              ${index === selectedIndex ? 'bg-primary-600 cursor-default' : 'bg-white/90 transition-colors hover:bg-white/60'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel