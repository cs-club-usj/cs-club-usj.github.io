'use client'

import { useState } from 'react'
import Link from './Link'
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, User } from 'lucide-react'
import Arrow from './Arrow'

interface CalendarEvent {
  slug: string
  title: string
  date: string
  location: string
  speaker?: string
  upcoming?: boolean
  more: string
}

interface CalendarProps {
  events: CalendarEvent[]
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay()
  // Convert Sunday (0) to 6, and shift other days back by 1 (Monday becomes 0)
  return day === 0 ? 6 : day - 1
}

export default function Calendar({ events }: CalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const eventsThisMonth = events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
  })

  const eventsByDay: Record<number, CalendarEvent[]> = {}
  eventsThisMonth.forEach((event) => {
    const day = new Date(event.date).getDate()
    if (!eventsByDay[day]) {
      eventsByDay[day] = []
    }
    eventsByDay[day].push(event)
  })

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
    setSelectedEvent(null)
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
    setSelectedEvent(null)
  }

  const goToToday = () => {
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setSelectedEvent(null)
  }

  const isToday = (day: number): boolean => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    )
  }

  const isPast = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayStart
  }

  const calendarDays: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              Today
            </button>
            <button
              onClick={goToPreviousMonth}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[80px] rounded-lg border p-1 transition-colors sm:min-h-[100px] ${
                day === null
                  ? 'border-transparent bg-transparent'
                  : isPast(day) && !isToday(day)
                    ? 'border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50'
                    : 'border-gray-200 bg-white hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600'
              }`}
            >
              {day !== null && (
                <>
                  <div
                    className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                      isToday(day)
                        ? 'bg-primary-600 text-white'
                        : isPast(day)
                          ? 'text-gray-400 dark:text-gray-600'
                          : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {day}
                  </div>
                  {eventsByDay[day] && (
                    <div className="flex flex-col gap-1">
                      {eventsByDay[day].map((event) => (
                        <button
                          key={event.slug}
                          onClick={() => setSelectedEvent(event)}
                          className={`w-full rounded px-1 py-0.5 text-left text-xs font-medium transition-colors ${
                            event.upcoming
                              ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900'
                              : 'bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900/50 dark:text-primary-300 dark:hover:bg-primary-900'
                          }`}
                          title={event.title}
                        >
                          {event.title}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-green-100 dark:bg-green-900/50"></div>
            <span className="text-gray-600 dark:text-gray-400">Upcoming Event</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-primary-100 dark:bg-primary-900/50"></div>
            <span className="text-gray-600 dark:text-gray-400">Past Event</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="rounded-lg border-2 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Event Details
          </h3>
          {selectedEvent ? (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {selectedEvent.title}
              </h4>
              <div className="flex flex-grow flex-col items-start justify-center gap-2 py-2 text-sm">
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {selectedEvent.location}
                </p>
                {selectedEvent.speaker && (
                  <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-pre-line">{selectedEvent.speaker}</span>
                  </p>
                )}
              </div>
              {selectedEvent.upcoming && (
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/50 dark:text-green-300">
                  Upcoming
                </span>
              )}
              <div className="mt-auto flex flex-col gap-2">
                <Link
                  href={`/blog/${selectedEvent.more}`}
                  className="inline-flex items-center gap-1 text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
                >
                  <Arrow direction="right">Read more</Arrow>
                </Link>
                {!selectedEvent.upcoming && (
                  <Link
                    href={`/events/${selectedEvent.slug}`}
                    className="inline-flex items-center gap-1 text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
                  >
                    <Arrow direction="right">View gallery</Arrow>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Click on an event in the calendar to see its details.
            </p>
          )}
        </div>

        {/*{eventsThisMonth.length > 0 && (
          <div className="mt-4 rounded-lg border-2 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Events in {MONTHS[currentMonth]}
            </h3>
            <ul className="space-y-2">
              {eventsThisMonth
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event) => (
                  <li key={event.slug}>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full rounded-md p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        selectedEvent?.slug === event.slug
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {event.title}
                        </span>
                        {event.upcoming && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900/50 dark:text-green-300">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}*/}
      </div>
    </div>
  )
}
