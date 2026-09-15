import { Helmet } from 'react-helmet-async'
import { motion, type Variants } from 'framer-motion'
import {
  BrainCircuit,
  Code2,
  Coffee,
  Download,
  GraduationCap,
} from 'lucide-react'
import SkillSection from '../components/SkillSection'
import ExperienceTimeline from '../components/ExperienceTimeline'
import aboutImg from '../assets/about.png'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const stats = [
  { icon: Code2, value: '6+', label: 'Projects Shipped' },
  { icon: BrainCircuit, value: '4', label: 'AI/ML Research Projects' },
  { icon: GraduationCap, value: '2026', label: 'CSE Graduate, NSU' },
  { icon: Coffee, value: '∞', label: 'Cups of Coffee' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Galib</title>
        <meta
          name="description"
          content="Learn about Abdur Rahman Galib — a full-stack developer and AI/ML engineer building shipped products and independent research spanning computer vision, NLP, and LLM-based agents."
        />
      </Helmet>

      {/* Page header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            Who I Am
          </span>

          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            About Me
          </h1>
        </motion.div>
      </section>

      {/* Bio + Stats */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Profile Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-72 h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 flex items-center justify-center shadow-2xl shadow-sky-200 dark:shadow-sky-900/30">
                <img
                  src={aboutImg}
                  alt="Abdur Rahman Galib"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2 shadow-lg text-sm font-semibold text-sky-600 dark:text-sky-400">
                ✨ Open to Work
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Hi, I'm Abdur Rahman Galib — a Full-Stack Developer & AI/ML Engineer
            </h2>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              I'm a Computer Science & Engineering graduate from North South
              University (2026) who ships full-stack web applications with real
              AI/ML capabilities built in. I work across Next.js/React front
              ends, Node/Flask/NestJS backends, and Python-based ML pipelines —
              end to end, from research to production interface.
            </p>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Alongside product work like Recallo, an AI study companion, I run
              independent research spanning computer vision, NLP, and LLM-based
              agents — including explainable tiny-object detection
              (SAM2-MUSTAR-XAI), interventional credit assignment for
              self-evolving agents (SECA), and knowledge-augmented LLM
              prediction for student dropout risk.
            </p>

            {/* Download Resume */}
            <a
              href="/Abdur_Rahman_Galib.pdf"
              download="Abdur_Rahman_Galib_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-sky-200 dark:shadow-sky-900/30 hover:shadow-xl hover:-translate-y-0.5 text-sm w-fit"
            >
              <Download size={16} />
              Download Resume
            </a>

            {/* Stat chips */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 flex items-center gap-3 border border-gray-100 dark:border-gray-800"
                >
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-900/30">
                    <Icon
                      size={18}
                      className="text-sky-600 dark:text-sky-400"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {value}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              Expertise
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Skills & Technologies
            </h2>
          </motion.div>

          <SkillSection />
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              Journey
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Experience & Education
            </h2>
          </motion.div>

          <ExperienceTimeline />
        </div>
      </section>
    </>
  )
}
