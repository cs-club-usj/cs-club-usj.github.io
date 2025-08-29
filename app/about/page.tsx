import Link from '@/components/Link'
import StatCard from '@/components/StatCard'
import { genPageMetadata } from 'app/seo'
import { FaInfinity } from 'react-icons/fa6'
import { GoGoal } from 'react-icons/go'
import { MdGroups } from 'react-icons/md'

export const metadata = genPageMetadata({ title: 'About' })

export default function About() {
  return (
    <div className="mt-10 space-y-16">
      <div className="mx-auto space-y-4 text-center">
        <h1 className="text-5xl font-bold">Computer Science Club USJ</h1>
        <p className="mx-auto max-w-3xl text-xl">Empowering Tech Leaders of Tomorrow</p>
      </div>
      {/*<div className="max-w-4xl mx-auto">
        <div className="flex flex-row items-center justify-center gap-6 text-center">
          <StatCard value='100' label='Active Members' />
          <StatCard value='100' label='Active Members' />
          <StatCard value='100' label='Active Members' />
        </div>
      </div>*/}
      <div className="space-y-10">
        <div className="mx-auto space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-white">
              <GoGoal className="h-12 w-12" />
            </div>
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="max-w-3xl text-xl">
              We aim to build a welcoming and collaborative community for anyone passionate about
              computer science. By organizing workshops, hackathons, seminars, and more, we help
              members develop practical skills, gain real-world experience, build connections, and
              explore new ideas.
            </p>
          </div>
        </div>
        <div className="mx-auto space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-white">
              <MdGroups className="h-12 w-12" />
            </div>
            <h2 className="text-4xl font-bold">Our Values</h2>
            <p className="max-w-3xl text-xl">
              We believe in growing a community where everyone feels welcome, supported, and
              respected. We value diversity across background and experience, and we're committed to
              creating an inclusive space where all voices are heard.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto space-y-6 pt-4 text-center">
        <h2 className="text-4xl font-bold">Join us and be part of something amazing!</h2>
        <p className="mx-auto max-w-3xl text-xl">
          Whether you're a beginner just starting your journey or an experienced developer looking
          to share knowledge, there's a place for you in our community.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=NGnZKuVDwkGXYfM1_iFMw3XHbG_Qm39JsdCpCi0bIXpUQkFLM0ZMVDRXMEE2RENPRFlUQlJXWUpRNi4u&origin=Invitation&channel=0"
            target="_blank"
            className="flex w-fit items-center justify-center rounded-md bg-primary-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Become a Member
          </Link>
        </div>
      </div>
    </div>
  )
}
