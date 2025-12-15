import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'overview', label: 'Visão' },
  { id: 'cronograma', label: 'Jornada' },
  { id: 'nutrition-plan', label: 'Nutri' },
  { id: 'financial', label: 'R$' },
  { id: 'guidance', label: 'Guia' },
  { id: 'medic-team', label: 'Equipe' },
  { id: 'tasks', label: 'Tarefas' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}>
      <nav className={`
        relative mx-4 w-full max-w-5xl 
        bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-full
        transition-all duration-300 px-6 py-3 flex items-center justify-between
      `}>
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-primary-light rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">M</div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 hidden sm:block">
            Jornada da Mari
            </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-1">
          {sections.map((sec) => (
            <li key={sec.id}>
              <a 
                href={`#${sec.id}`} 
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-primary hover:bg-white/50 transition-all hover:shadow-sm"
              >
                {sec.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-600 focus:outline-none p-2 bg-white/50 rounded-full"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

        {/* Mobile Dropdown */}
        {open && (
          <div className="absolute top-16 right-0 w-64 glass-panel p-2 flex flex-col gap-1 animate-fade-in-up origin-top-right">
            {sections.map((sec) => (
              <a 
                key={sec.id} 
                href={`#${sec.id}`} 
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary font-medium transition-colors" 
                onClick={() => setOpen(false)}
              >
                {sec.label}
              </a>
            ))}
            <a href="#after-born" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary font-medium transition-colors" onClick={() => setOpen(false)}>Pós-Parto</a>
            <a href="#vaccines" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary font-medium transition-colors" onClick={() => setOpen(false)}>Vacinas</a>
          </div>
        )}
      </nav>
    </div>
  );
}