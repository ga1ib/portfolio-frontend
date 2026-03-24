import { useEffect, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import Loader from '../components/Loader'
import { fetchProjects } from '../services/api'
import type { Project } from '../types'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeTech, setActiveTech] = useState<string>('All')

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects. Please try again later.'))
      .finally(() => setLoading(false))
  }, [])

  // Collect all unique techs
  const allTechs = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.techStack.forEach((t) => set.add(t)))
    return ['All', ...Array.from(set).sort()]
  }, [projects])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      const matchesTech = activeTech === 'All' || p.techStack.includes(activeTech)
      return matchesSearch && matchesTech
    })
  }, [projects, search, activeTech])

  return (
    <>
      <Helmet>
        <title>Projects | Galib</title>
        <meta name="description" content="Browse Galib's full-stack projects built with React, Node.js, MongoDB, and more." />
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            Portfolio
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            All Projects
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            A full catalogue of things I've built — from side projects to client work.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Tech filter pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  activeTech === tech
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-500 dark:text-red-400">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400 dark:text-gray-500">
              No projects found matching your criteria.
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                {filtered.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  )
}

