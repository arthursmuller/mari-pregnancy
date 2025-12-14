import React from 'react';

export default function AfterBorn() {
  const guidance = [
    { title: 'Primeiro mês', items: ['Consulta pós-parto (6 semanas)', 'Pediatra: 7 dias e 30 dias', 'Amamentação livre demanda', 'Vacinas: BCG e Hep B', 'Registro civil'] },
    { title: '2–3 meses', items: ['Rotina de sono', 'Vacinas 2º mês', 'Massagem para cólicas', 'Estimulação visual', 'Dentista (se dentes nascerem)'] },
    { title: '4–6 meses', items: ['Introdução alimentar (6m)', 'Vacinas 4º mês', 'Meningocócica C', 'Tummy time'] },
    { title: '7–12 meses', items: ['Diversificação alimentar', 'Engatinhar', 'Vacinas 6 e 9 meses', 'Reforços 12 meses', 'Rotina em viagens'] },
    { title: '1–3 anos', items: ['Vacinas 15 meses', 'Natação (2 anos)', 'Desenvolvimento da fala', 'Socialização', 'Dieta balanceada'] },
  ];

  return (
    <div className="relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Jornada Pós-Parto</h2>
      <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {guidance.map((section, idx) => (
            <div key={idx} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold text-sm shadow-sm z-10">
                    {idx + 1}
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-primary mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                        {section.items.map((item, i) => (
                            <li key={i} className="flex items-start text-gray-700">
                                <span className="w-1.5 h-1.5 bg-pink-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}