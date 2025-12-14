import React, { useState } from 'react';

const sections = [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'cronograma', label: 'Cronograma' },
  { id: 'financial', label: 'Financeiro' },
  { id: 'guidance', label: 'Orientações' },
  { id: 'medic-team', label: 'Equipe Médica' },
  { id: 'tasks', label: 'Tarefas' },
  { id: 'after-born', label: 'Pós-Parto' },
  { id: 'vaccines', label: 'Vacinas' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Jornada da Gravidez</h1>
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={handleToggle}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <ul className="hidden sm:flex space-x-4">
          {sections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {sec.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col p-4 space-y-2">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="block text-gray-700 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}