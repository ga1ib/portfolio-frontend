import { motion, type Variants } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'

interface TimelineEntry {
  type: 'work' | 'education'
  title: string
  org: string
  period: string
  description: string
}

const entries: TimelineEntry[] = [
  {
    type: 'work',
    title: 'Full-Stack Developer',
    org: 'Freelance / Remote',
    period: '2023 – Present',
    description:
      'Building end-to-end MERN applications for clients across e-commerce, SaaS, and portfolio domains. Delivering responsive UIs and robust REST APIs with CI/CD pipelines.',
  },
  {
    type: 'work',
    title: 'Junior Web Developer',
    org: 'Tech Startup',
    period: '2022 – 2023',
    description:
      'Developed and maintained React frontends and Node.js services, collaborated in an Agile team, and improved code coverage through unit testing.',
  },
  {
    type: 'education',
    title: 'B.Sc. in Computer Science',
    org: 'University',
    period: '2018 – 2022',
    description:
      'Studied algorithms, data structures, software engineering, and database systems. Graduated with honours.',
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ExperienceTimeline() {
  return (
    <motion.ol
      className="relative border-l-2 border-sky-200 dark:border-sky-800 pl-6 space-y-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {entries.map(({ type, title, org, period, description }, idx) => (
        <motion.li key={idx} variants={itemVariants} className="relative">
          {/* Dot */}
          <span className="absolute -left-[2.15rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 border-2 border-sky-300 dark:border-sky-700">
            {type === 'work' ? (
              <Briefcase size={14} className="text-sky-600 dark:text-sky-400" />
            ) : (
              <GraduationCap size={14} className="text-sky-600 dark:text-sky-400" />
            )}
          </span>

          {/* Card */}
          <div className="ml-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                <p className="text-sm text-sky-600 dark:text-sky-400 font-medium">{org}</p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                {period}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  )
}

