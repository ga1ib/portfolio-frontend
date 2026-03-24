import { Helmet } from 'react-helmet-async'
import { motion, type Variants } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons'
import ContactForm from '../components/ContactForm'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'www.abdurrahmangalib99@gmail.com',
    href: 'mailto:www.abdurrahmangalib99@gmail.com',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/ga1ib',
    href: 'https://github.com/ga1ib',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/galib',
    href: 'https://www.linkedin.com/in/abdur-rahman-07411921a/',
  },
  {
    icon: TwitterIcon,
    label: 'Twitter',
    value: '@AbdurRa31926740',
    href: 'https://x.com/AbdurRa31926740',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bangladesh 🇧🇩',
    href: undefined,
  },
]

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Galib</title>
        <meta name="description" content="Get in touch with Galib — open for freelance projects, collaborations, and full-time opportunities." />
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
            Get In Touch
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Contact Me
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have a project in mind, a question, or just want to say hello? My inbox is always open.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info cards */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Contact Info
            </h2>
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-900/30 shrink-0">
                  <Icon size={18} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Currently available for freelance & full-time
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}

