import { motion } from 'framer-motion'
import { ExternalLink, Trash2, Edit } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  onDelete?: (id: string) => void
  onEdit?: (project: Project) => void
  isAdmin?: boolean
}

export default function ProjectCard({ project, onDelete, onEdit, isAdmin = false }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-sky-900/10 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Project image */}
      <div className="relative h-48 bg-gradient-to-br from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-sky-200 dark:text-sky-800 font-bold select-none">
            {project.title.charAt(0)}
          </div>
        )}
        {project.featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold bg-sky-600 text-white rounded-full">
            Featured
          </span>
        )}
        {isAdmin && onEdit && (
          <button
            onClick={() => onEdit(project)}
            aria-label={`Edit ${project.title}`}
            className="absolute top-3 right-12 p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Edit size={14} />
          </button>
        )}
        {isAdmin && onDelete && (
          <button
            onClick={() => onDelete(project._id)}
            aria-label={`Delete ${project.title}`}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              <GithubIcon size={15} /> Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

