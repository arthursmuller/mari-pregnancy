import React from 'react';
import { maternalVaccines, babyVaccines } from '../data';

/**
 * VaccinesSection lists immunisations recommended for the mother during
 * pregnancy and the schedule for the baby after birth.  It serves as
 * a quick reference to plan appointments with the clinic or public
 * health service.
 */
export default function VaccinesSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Calendário de vacinas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maternal vaccines */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Para a mãe
          </h3>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 border-b text-gray-700">Vacina</th>
                <th className="px-2 py-1 border-b text-gray-700">Quando</th>
                <th className="px-2 py-1 border-b text-gray-700">Observações</th>
              </tr>
            </thead>
            <tbody>
              {maternalVaccines.map((vac) => (
                <tr key={vac.name} className="even:bg-gray-50">
                  <td className="px-2 py-1 border-b font-medium text-gray-800">
                    {vac.name}
                  </td>
                    <td className="px-2 py-1 border-b text-gray-700">
                    {vac.schedule}
                  </td>
                  <td className="px-2 py-1 border-b text-gray-700">
                    {vac.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Baby vaccines */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-3">Para o bebê</h3>
          {babyVaccines.map((entry) => (
            <div key={entry.age} className="mb-4">
              <h4 className="font-semibold text-primary mb-1">{entry.age}</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {entry.vaccines.map((vac) => (
                  <li key={vac.name}>
                    <strong>{vac.name}</strong>
                    {vac.notes && <span>: {vac.notes}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}