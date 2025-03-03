export interface Event {
  slug: string
  title: string
  description: string
  speakers?: string
  date: string
  location: string
  imgSrc?: string
}

const eventsData: Event[] = [
  {
    slug: 'game-design-2025',
    title: 'An Introduction to Game Design',
    description: `Join us for our first talk of the year! The Computer Science Club is kicking things off with “An Introduction to Game Design”, a talk by Salim Slim, Co-Founder and CEO of Phoenician Studios. He will guide us through the fundamentals of creating engaging games and breaking into the industry.`,
    imgSrc: '/static/images/flyers/game-design-flyer.png',
    speakers: 'Salim Slim, CEO Phoenician Studios',
    date: 'February 26th, 2025',
    location: 'Science and Technology Campus, USJ',
  },
]

export default eventsData
