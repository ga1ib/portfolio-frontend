interface LoaderProps {
  fullPage?: boolean
}

export default function Loader({ fullPage = false }: LoaderProps) {
  const spinner = (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
      <span className="text-sm text-gray-500 dark:text-gray-400">Loading…</span>
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950 z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-sky-600 border-t-transparent animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading…</p>
        </div>
      </div>
    )
  }

  return spinner
}

