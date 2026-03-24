import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Code2, LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-sky-600 dark:text-indigo-400'
        : 'text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-indigo-400'
    }`

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          <Code2 size={24} />
          <span>Galib</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkClass}>
              {label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/admin" className={linkClass}>Dashboard</NavLink>
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link
              to="/admin/login"
              className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkClass} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
              <button onClick={() => { handleLogout(); setOpen(false) }} className="text-left text-sm font-medium text-red-500">
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/admin/login" onClick={() => setOpen(false)} className="text-sm font-medium text-sky-600 dark:text-indigo-400">
              Admin Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

