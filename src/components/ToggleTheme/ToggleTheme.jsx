import React, { useEffect, useState } from "react"
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

const ToggleTheme = () => {
  const pageRef = document.documentElement.classList
  const systemThemePreference = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(systemThemePreference)

  useEffect(() => {
    dark && pageRef.add('dark')
  }, [])

  const toggleTheme = () => {
    pageRef.toggle('dark')
    setDark(!dark)
  }

  return (
    <button 
      onClick={toggleTheme}
      className="relative p-2 rounded-lg transition-colors duration-200 hover:bg-emerald-500/10 focus:outline-none"
      aria-label="Toggle theme"
    >
      <SunIcon 
        className={`w-6 h-6 transition-all duration-300 ease-in-out transform text-emerald-400
          ${dark ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'} absolute`}
      />
      <MoonIcon 
        className={`w-6 h-6 transition-all duration-300 ease-in-out transform text-emerald-400
          ${!dark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'} absolute`}
      />
      <div className="w-6 h-6" aria-hidden="true" /> {/* Spacer */}
    </button>
  )
}

export default ToggleTheme
