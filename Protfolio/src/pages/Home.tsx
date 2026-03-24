import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import SkillSection from '../components/SkillSection'
import ProjectCard from '../components/ProjectCard'
import { fetchProjects } from '../services/api'
import type { Project } from '../types'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Home() {
  const [featured, setFeatured] = useState<Project[]>([])

  useEffect(() => {
    fetchProjects()
      .then((projects) => setFeatured(projects.filter((p) => p.featured).slice(0, 3)))
      .catch(() => {
        /* silently ignore — static fallback shown */
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>Galib | Full-Stack Developer</title>
        <meta name="description" content="Galib's portfolio — full-stack developer specialising in React, Node.js, and MongoDB." />
      </Helmet>

      {/* Hero */}
      <Hero />

      {/* Featured Projects */}
      <section className="py-24 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              Selected Work
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              A curated selection of projects I'm most proud of.
            </p>
          </motion.div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'E-Commerce Platform', desc: 'Full-stack store with cart, payments & admin panel.', techs: ['React', 'Node.js', 'MongoDB', 'Stripe'] },
                { title: 'Task Manager API', desc: 'RESTful API with JWT auth, roles, and real-time updates.', techs: ['Express', 'JWT', 'Socket.io'] },
                { title: 'Portfolio CMS', desc: 'This very site — MERN stack with admin dashboard.', techs: ['React', 'TypeScript', 'Tailwind'] },
              ].map((p) => (
                <div key={p.title} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                  <div className="h-32 mb-4 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 flex items-center justify-center text-4xl font-bold text-sky-200 dark:text-sky-800">
                    {p.title.charAt(0)}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techs.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills teaser */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              Tech Stack
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Skills & Technologies
            </h2>
          </motion.div>
          <SkillSection compact />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-sky-600 to-blue-600">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-sky-100 mb-8 text-lg">
            Have a project in mind? I'd love to hear about it.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-all duration-200 shadow-xl text-sm"
          >
            Get In Touch <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}

