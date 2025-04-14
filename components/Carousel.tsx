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
    [Autoplay({ delay: 3000 })]
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
        className="aspect-[4/3] overflow-hidden shadow-[10px_10px_0px_0px_primary-500] shadow-primary-500"
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

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 w-5 text-black" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 w-5 text-black" />
      </button>

      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full ${
              index === selectedIndex ? 'bg-primary-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
