import { motion, type Variants } from 'framer-motion'
import { BrainCircuit, GraduationCap, Rocket } from 'lucide-react'

interface TimelineEntry {
  type: 'research' | 'product' | 'education'
  title: string
  org: string
  period: string
  description: string
}

const entries: TimelineEntry[] = [
  {
    type: 'research',
    title: 'SAM2-MUSTAR-XAI: Explainable Tiny Object Detection',
    org: 'Independent Research',
    period: 'Undergraduate Research',
    description:
      'Proposed a Mamba-enhanced, uncertainty-aware framework combining a SAM2.1 Hiera backbone adapted via AdaLoRA with Adaptive FPN fusion, reaching top precision, F1, and mAP@0.50 on the VisDrone benchmark.',
  },
  {
    type: 'product',
    title: 'Recallo — AI Study Companion',
    org: 'Personal Project',
    period: 'Shipped Product',
    description:
      'Built a public spaced-repetition platform using LangChain to auto-structure documents into topics and quizzes, with an XGBoost-based scheduler for optimal review timing.',
  },
  {
    type: 'research',
    title: 'SECA: Safety-Constrained Evolutionary Credit Assignment',
    org: 'Independent Research',
    period: 'Undergraduate Research',
    description:
      'Identified failure modes in how self-evolving LLM agents assign blame, then designed an interventional ablation protocol with statistical significance testing to attribute causes more reliably.',
  },
  {
    type: 'research',
    title: 'Knowledge-Augmented LLM Dropout Prediction',
    org: 'Independent Research',
    period: 'Undergraduate Research',
    description:
      'Benchmarked 11+ ML models on a 4,424-record UCI dataset, then converted student records into knowledge-augmented text for LLM-based prediction — reaching accuracy competitive with the best classical model.',
  },
  {
    type: 'education',
    title: 'B.Sc. in Computer Science & Engineering',
    org: 'North South University',
    period: '2022 – 2026',
    description:
      'Coursework and independent research spanning algorithms, software engineering, database systems, computer vision, and LLM-based agents.',
  },
  {
    type: 'education',
    title: 'HSC (Science)',
    org: 'Ideal College',
    period: '2018 – 2020',
    description: 'Completed higher secondary education with a focus on science.',
  },
]

const iconFor = (type: TimelineEntry['type']) => {
  switch (type) {
    case 'research':
      return BrainCircuit
    case 'product':
      return Rocket
    case 'education':
      return GraduationCap
  }
}

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
      {entries.map(({ type, title, org, period, description }, idx) => {
        const Icon = iconFor(type)
        return (
          <motion.li key={idx} variants={itemVariants} className="relative">
            {/* Dot */}
            <span className="absolute -left-[2.15rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900 border-2 border-sky-300 dark:border-sky-700">
              <Icon size={14} className="text-sky-600 dark:text-sky-400" />
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
        )
      })}
    </motion.ol>
  )
}