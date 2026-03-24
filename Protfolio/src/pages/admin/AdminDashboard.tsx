import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, RefreshCw, LayoutGrid, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../../components/ProjectCard'
import Loader from '../../components/Loader'
import { fetchProjects, addProject, removeProject } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import type { Project } from '../../types'

type NewProjectForm = Omit<Project, '_id' | 'createdAt'>

const EMPTY: NewProjectForm = {
  title: '',
  description: '',
  techStack: [],
  githubLink: '',
  liveLink: '',
  image: '',
  featured: false,
}

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<NewProjectForm>(EMPTY)
  const [techInput, setTechInput] = useState('')
  const [error, setError] = useState('')

  const loadProjects = () => {
    setLoading(true)
    fetchProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadProjects() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await removeProject(id)
    setProjects((prev) => prev.filter((p) => p._id !== id))
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const addTech = () => {
    const t = techInput.trim()
    if (t && !form.techStack.includes(t)) {
      setForm((prev) => ({ ...prev, techStack: [...prev.techStack, t] }))
    }
    setTechInput('')
  }

  const removeTech = (t: string) => setForm((prev) => ({ ...prev, techStack: prev.techStack.filter((x) => x !== t) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    try {
      const created = await addProject(form)
      setProjects((prev) => [created, ...prev])
      setForm(EMPTY)
      setTechInput('')
      setShowForm(false)
    } catch {
      setError('Failed to add project. Make sure you are authenticated.')
    } finally {
      setAdding(false)
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const inputClass = 'w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400'

  return (
    <>
      <Helmet><title>Admin Dashboard | Galib</title></Helmet>

      <div className="pt-20 pb-16 px-4 sm:px-6 min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                <LayoutGrid size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{projects.length} projects total</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={loadProjects} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Refresh">
                <RefreshCw size={18} />
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md shadow-indigo-200 dark:shadow-indigo-900/30"
              >
                <Plus size={16} /> Add Project
              </button>
              <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {/* Add Project Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-10 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">New Project</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="title" required value={form.title} onChange={handleFieldChange} placeholder="Title *" className={inputClass} />
                  <input name="image" value={form.image} onChange={handleFieldChange} placeholder="Image URL" className={inputClass} />
                  <textarea name="description" required value={form.description} onChange={handleFieldChange} placeholder="Description *" rows={3} className={`${inputClass} sm:col-span-2 resize-none`} />
                  <input name="githubLink" value={form.githubLink} onChange={handleFieldChange} placeholder="GitHub URL" className={inputClass} />
                  <input name="liveLink" value={form.liveLink} onChange={handleFieldChange} placeholder="Live Demo URL" className={inputClass} />

                  {/* Tech stack input */}
                  <div className="sm:col-span-2">
                    <div className="flex gap-2 mb-2">
                      <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="Add tech (press Enter)" className={inputClass} />
                      <button type="button" onClick={addTech} className="px-3 py-2 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {form.techStack.map((t) => (
                        <span key={t} className="flex items-center gap-1 px-2 py-0.5 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md">
                          {t}
                          <button type="button" onClick={() => removeTech(t)} className="ml-1 text-indigo-400 hover:text-red-500">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured toggle */}
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleFieldChange} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                    Mark as Featured
                  </label>

                  {/* Actions */}
                  <div className="sm:col-span-2 flex gap-3 pt-2">
                    <button type="submit" disabled={adding} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
                      {adding ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={16} />}
                      {adding ? 'Adding…' : 'Add Project'}
                    </button>
                    <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY) }} className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects grid */}
          {loading ? (
            <div className="py-20 flex justify-center"><Loader /></div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center text-gray-400 dark:text-gray-500">
              No projects yet. Add your first one above!
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} isAdmin onDelete={handleDelete} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  )
}

