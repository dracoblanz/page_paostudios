import React from 'react'
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Pao Studios - No somos studios xd</p>
        <p className="opacity-75">Hecho con locura y bloques</p>
      </div>
    </footer>
    // hecho por dracoblanz
  )
}
