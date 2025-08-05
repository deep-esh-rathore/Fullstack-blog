import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white text-center py-6 px-4 w-full shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
        <div className="mb-2 md:mb-0">
          <p className="text-lg font-semibold tracking-wide">© 2023 My Blog. All rights reserved.</p>
        </div>
        <div>
          <p className="text-sm">
            Made with <span className="font-bold text-pink-300">Vite</span> & <span className="font-bold text-indigo-300">React</span>
            <img src="/vite.svg" alt="Vite Logo" className="inline-block w-5 h-5 mx-1 align-text-bottom" />
            <span className="mx-2">|</span>
            <span className="italic text-purple-200">Developed by Deepesh</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer