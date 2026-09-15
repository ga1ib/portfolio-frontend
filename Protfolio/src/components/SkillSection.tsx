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
    category: 'Frontend & Backend',
    skills: [
      { name: 'Next.js / React.js', level: 92, color: 'bg-blue-500' },
      { name: 'TypeScript / Tailwind CSS', level: 88, color: 'bg-cyan-500' },
      { name: 'Node.js / NestJS / Flask', level: 85, color: 'bg-green-500' },
      { name: 'REST API Design / JWT / GraphQL', level: 88, color: 'bg-emerald-500' },
    ],
  },
  {
    category: 'ML / DL',
    skills: [
      { name: 'PyTorch / TensorFlow', level: 88, color: 'bg-orange-500' },
      { name: 'XGBoost / CatBoost / LightGBM', level: 90, color: 'bg-amber-500' },
      { name: 'CNN / Transformer Architectures', level: 84, color: 'bg-red-500' },
      { name: 'Explainable AI (SHAP / LIME)', level: 82, color: 'bg-rose-500' },
    ],
  },
  {
    category: 'LLM & NLP',
    skills: [
      { name: 'LangChain', level: 88, color: 'bg-violet-500' },
      { name: 'LLM Orchestration (Groq, xAI, HF, Gemini, QWEN)', level: 86, color: 'bg-purple-500' },
      { name: 'Prompt Engineering', level: 90, color: 'bg-fuchsia-500' },
      { name: 'Knowledge Augmentation', level: 85, color: 'bg-indigo-500' },
    ],
  },
  {
    category: 'Experimentation & Infra',
    skills: [
      { name: 'Bayesian Optimization / Optuna', level: 84, color: 'bg-teal-500' },
      { name: 'Statistical Testing', level: 82, color: 'bg-sky-500' },
      { name: 'MongoDB / PostgreSQL / ChromaDB / Supabase', level: 86, color: 'bg-blue-400' },
      { name: 'Docker / Linux', level: 78, color: 'bg-gray-500' },
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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