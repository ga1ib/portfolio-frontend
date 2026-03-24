import { motion, type Variants } from 'framer-motion'

interface Skill {
  name: string
  level: number // 0–100
  color: string
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

const skillData: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 92, color: 'bg-blue-500' },
      { name: 'TypeScript', level: 88, color: 'bg-blue-600' },
      { name: 'Tailwind CSS', level: 90, color: 'bg-cyan-500' },
      { name: 'Framer Motion', level: 78, color: 'bg-violet-500' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express', level: 88, color: 'bg-green-500' },
      { name: 'MongoDB / Mongoose', level: 84, color: 'bg-green-600' },
      { name: 'REST APIs', level: 90, color: 'bg-emerald-500' },
      { name: 'JWT Auth', level: 85, color: 'bg-teal-500' },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', level: 90, color: 'bg-orange-500' },
      { name: 'Docker', level: 70, color: 'bg-blue-400' },
      { name: 'Vercel / Render', level: 85, color: 'bg-gray-500' },
      { name: 'VS Code', level: 95, color: 'bg-blue-500' },
    ],
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

interface SkillSectionProps {
  compact?: boolean
}

export default function SkillSection({ compact = false }: SkillSectionProps) {
  const dataToShow = compact ? skillData.slice(0, 2) : skillData

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
    >
      {dataToShow.map(({ category, skills }) => (
        <motion.div
          key={category}
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-5 tracking-wide uppercase text-xs text-sky-600 dark:text-sky-400">
            {category}
          </h3>
          <ul className="space-y-4">
            {skills.map(({ name, level, color }) => (
              <li key={name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
                  <span className="text-gray-400 dark:text-gray-500">{level}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}

