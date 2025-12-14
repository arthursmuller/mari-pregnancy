import React, { useEffect, useState } from 'react';
import { PRENATAL_CARE_TEAM_AND_SCHEDULE } from '../data';

export default function MedicTeam() {
  const specialists = PRENATAL_CARE_TEAM_AND_SCHEDULE.specialists;
  const [contacts, setContacts] = useState({});
  const [records, setRecords] = useState({});
  const [recordForm, setRecordForm] = useState({});
  const [loaded, setLoaded] = useState(false);
  const MEDIC_SEED_VERSION = 1;

  useEffect(() => {
    // ... [Original loading logic remains exactly the same to preserve data] ...
    try {
      const savedContacts = localStorage.getItem('medicContacts');
      const savedContactsSeed = localStorage.getItem('medicContactsSeed');
      if (savedContactsSeed && parseInt(savedContactsSeed, 10) === MEDIC_SEED_VERSION && savedContacts) {
        setContacts(JSON.parse(savedContacts));
      } else {
        setContacts({});
        localStorage.setItem('medicContacts', JSON.stringify({}));
        localStorage.setItem('medicContactsSeed', MEDIC_SEED_VERSION.toString());
      }
    } catch (e) {}
    try {
      const savedRecords = localStorage.getItem('medicRecords');
      const savedRecordsSeed = localStorage.getItem('medicRecordsSeed');
      if (savedRecordsSeed && parseInt(savedRecordsSeed, 10) === MEDIC_SEED_VERSION && savedRecords) {
        setRecords(JSON.parse(savedRecords));
      } else {
        setRecords({});
        localStorage.setItem('medicRecords', JSON.stringify({}));
        localStorage.setItem('medicRecordsSeed', MEDIC_SEED_VERSION.toString());
      }
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('medicContacts', JSON.stringify(contacts));
  }, [contacts, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('medicRecords', JSON.stringify(records));
  }, [records, loaded]);

  const handleContactChange = (role, field, value) => {
    setContacts((prev) => ({ ...prev, [role]: { ...prev[role], [field]: value }, }));
  };

  const handleRecordSubmit = (role) => {
    const entry = recordForm[role];
    if (!entry || !entry.name) return;
    setRecords((prev) => ({ ...prev, [role]: [...(prev[role] || []), { ...entry, id: Date.now() }], }));
    setRecordForm((prev) => ({ ...prev, [role]: { name: '', date: '', notes: '' } }));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Equipe Médica</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {specialists.map((spec) => {
          const role = spec.role;
          const contact = contacts[role] || { nome: '', telefone: '', email: '' };
          const recs = records[role] || [];
          const entry = recordForm[role] || { name: '', date: '', notes: '' };
          
          return (
            <div key={role} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{role}</h3>
                <p className="text-xs text-gray-500 mt-1">{spec.importance}</p>
              </div>
              
              <div className="p-4 flex-grow space-y-4">
                {/* Contact Fields */}
                <div className="space-y-2">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">👤</span>
                        <input type="text" placeholder="Nome do profissional" value={contact.nome} onChange={(e) => handleContactChange(role, 'nome', e.target.value)} className="w-full pl-8 text-sm border-gray-200 rounded focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Tel" value={contact.telefone} onChange={(e) => handleContactChange(role, 'telefone', e.target.value)} className="text-sm border-gray-200 rounded focus:ring-primary focus:border-primary" />
                        <input type="email" placeholder="Email" value={contact.email} onChange={(e) => handleContactChange(role, 'email', e.target.value)} className="text-sm border-gray-200 rounded focus:ring-primary focus:border-primary" />
                    </div>
                </div>

                {/* Key Info */}
                <div className="text-xs text-gray-600 bg-pink-50 p-2 rounded">
                    <p><strong>Freq:</strong> {spec.frequency}</p>
                    <p className="mt-1"><strong>Ações:</strong> {spec.key_actions}</p>
                </div>

                {/* Records Section */}
                <div>
                     <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Notas & Exames</h4>
                     <ul className="space-y-1 mb-2 max-h-24 overflow-y-auto custom-scrollbar">
                        {recs.map(r => (
                            <li key={r.id} className="text-xs text-gray-600 border-b border-gray-50 pb-1">
                                <span className="font-semibold text-primary">{r.date}:</span> {r.name}
                            </li>
                        ))}
                        {recs.length === 0 && <li className="text-xs text-gray-400 italic">Nenhum registro.</li>}
                     </ul>
                     <div className="flex space-x-1">
                         <input type="text" placeholder="Nova nota..." className="flex-grow text-xs border-gray-200 rounded" value={entry.name} onChange={(e) => setRecordForm(prev => ({ ...prev, [role]: { ...entry, name: e.target.value } }))} />
                         <input type="date" className="w-24 text-xs border-gray-200 rounded" value={entry.date} onChange={(e) => setRecordForm(prev => ({ ...prev, [role]: { ...entry, date: e.target.value } }))} />
                         <button onClick={() => handleRecordSubmit(role)} className="bg-primary text-white rounded px-2 text-xs hover:bg-primary-dark">+</button>
                     </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}