import { Link } from 'react-router-dom'
import { Code2, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'

const socials = [
  { href: 'https://github.com/ga1ib', label: 'GitHub', icon: GithubIcon },
  { href: 'https://www.linkedin.com/in/abdur-rahman-07411921a/', label: 'LinkedIn', icon: LinkedinIcon },
  { href: 'https://x.com/AbdurRa31926740', label: 'Twitter', icon: TwitterIcon },
]

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-sky-600 dark:text-sky-400">
            <Code2 size={20} />
            <span>Galib</span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {footerLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
          <span>© {new Date().getFullYear()} Galib. Built with</span>
          <Heart size={14} className="text-red-400 inline" />
          <span>using React & Node.js</span>
        </div>
      </div>
    </footer>
  )
}

