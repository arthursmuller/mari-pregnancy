import React from 'react';
import { maternalVaccines, babyVaccines } from '../data';

export default function VaccinesSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Calendário de Vacinas</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Mother */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="bg-pink-50 p-4 border-b border-pink-100 flex items-center">
                 <span className="text-2xl mr-3">🤰</span>
                 <h3 className="font-bold text-pink-800 text-lg">Para a Mamãe</h3>
             </div>
             <div className="p-0">
                 {maternalVaccines.map((vac, idx) => (
                     <div key={idx} className="p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                         <div className="flex justify-between items-start mb-1">
                             <span className="font-bold text-gray-800">{vac.name}</span>
                             <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600">{vac.schedule}</span>
                         </div>
                         <p className="text-sm text-gray-500">{vac.notes}</p>
                     </div>
                 ))}
             </div>
        </div>

        {/* Baby */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center">
                 <span className="text-2xl mr-3">👶</span>
                 <h3 className="font-bold text-blue-800 text-lg">Para o Bebê</h3>
             </div>
             <div className="p-4 space-y-6">
                 {babyVaccines.map((entry) => (
                     <div key={entry.age} className="relative pl-4 border-l-2 border-blue-100">
                         <span className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
                         <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">{entry.age}</h4>
                         <ul className="space-y-2">
                             {entry.vaccines.map((vac, i) => (
                                 <li key={i} className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                                     <strong>{vac.name}</strong>
                                     {vac.notes && <span className="block text-xs text-gray-500 mt-0.5">{vac.notes}</span>}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 ))}
             </div>
        </div>

      </div>
    </div>
  );
}