// This tells Next.js that this component runs in the browser (not on the server)
'use client'

// This is our main Navbar component function
export default function Navbar() {
  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="bg-[#0a0a1a] border-b border-purple-900/30 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      {/* This div contains all the navbar content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flex layout with space between title and menu */}
        <div className="flex justify-between items-center py-4">
          {/* This is the title/logo section */}
          <div className="text-white font-bold text-xl sm:text-2xl tracking-tight">
            <span className="bg-white px-3 py-1 rounded text-[#0a0a1a] font-extrabold">
              Maryam Amanat
            </span>
          </div>

          {/* This is the navigation menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* Each link is a button that scrolls to sections */}
            <button 
              onClick={() => scrollToSection('home')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group"
            >
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-[#0a0a1a] px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-purple-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                if (menu) {
                  menu.classList.toggle('hidden');
                }
              }}
              className="text-purple-300 hover:text-purple-200 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4">
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-900/20 text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-900/20 text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-900/20 text-left"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-900/20 text-left"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-purple-300 hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-900/20 text-left"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-[#0a0a1a] px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-purple-200 mt-2"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
