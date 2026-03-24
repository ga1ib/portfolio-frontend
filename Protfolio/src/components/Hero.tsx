import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import bgImg from '../assets/Background.png'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.85, x: 40 },
  show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={bgImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-20 dark:opacity-10"
        />
        {/* Overlay to keep text readable */}
        <div className="absolute inset-0 bg-white/60 dark:bg-gray-950/70" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* ── Left: Text content ── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Galib
              </span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.p variants={item} className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-4">
              Full-Stack Developer & UI Craftsman
            </motion.p>

            {/* Description */}
            <motion.p variants={item} className="max-w-xl text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 mx-auto lg:mx-0">
              I build scalable web applications with the MERN stack — turning ideas into clean,
              performant, and accessible digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-sky-200 dark:shadow-sky-900/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                View Projects <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400 font-semibold rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-200"
              >
                Hire Me <Mail size={18} />
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-5">
              {[
                { href: 'https://github.com/ga1ib', label: 'GitHub', icon: GithubIcon },
                { href: 'https://www.linkedin.com/in/abdur-rahman-07411921a/', label: 'LinkedIn', icon: LinkedinIcon },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile image ── */}
          <motion.div
            className="flex-shrink-0 flex justify-center lg:justify-end"
            variants={imageVariant}
            initial="hidden"
            animate="show"
          >
            <div className="relative">
              {/* Glow ring behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 blur-2xl opacity-25 scale-110" />
              {/* Decorative dashed ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-sky-300 dark:border-sky-700 opacity-60 animate-[spin_20s_linear_infinite]" />
              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl shadow-sky-200 dark:shadow-sky-900/40 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/40 dark:to-blue-950/40">
                <img
                  src={bgImg}
                  alt="Galib — Full-Stack Developer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <span className="text-lg">💻</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-none">Full Stack</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Developer</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 1.2 } }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

