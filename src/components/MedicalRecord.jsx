/* src/components/MedicalRecord.jsx */
import React, { useState, useEffect } from 'react';
import { WOMAN_INFO } from '../data';

export default function MedicalRecord() {
  // --- Estados de Dados ---
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('med_profile_v1');
    return saved ? JSON.parse(saved) : {
        height: WOMAN_INFO.height_m,
        weight: WOMAN_INFO.initial_weight_kg,
        birth: WOMAN_INFO.birth,
        blood: WOMAN_INFO.blood_type || '',
        diet: WOMAN_INFO.diet,
        exercise: WOMAN_INFO.exercise_frequency,
        meds: WOMAN_INFO.medications
    };
  });

  const [weightHistory, setWeightHistory] = useState(() => {
      const saved = localStorage.getItem('med_weight_history');
      return saved ? JSON.parse(saved) : [];
  });

  const [exams, setExams] = useState(() => {
      const saved = localStorage.getItem('med_exams_list');
      return saved ? JSON.parse(saved) : [];
  });

  // --- Estados de Formulário ---
  const [newWeight, setNewWeight] = useState({ date: new Date().toISOString().split('T')[0], kg: '' });
  const [newExam, setNewExam] = useState({ date: '', name: '', result: '', link: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // --- Persistência ---
  useEffect(() => { localStorage.setItem('med_profile_v1', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('med_weight_history', JSON.stringify(weightHistory)); }, [weightHistory]);
  useEffect(() => { localStorage.setItem('med_exams_list', JSON.stringify(exams)); }, [exams]);

  // --- Handlers ---
  const addWeight = () => {
      if(!newWeight.kg) return;
      setWeightHistory(prev => [...prev, { ...newWeight, id: Date.now() }].sort((a,b) => new Date(b.date) - new Date(a.date)));
      setNewWeight({ date: new Date().toISOString().split('T')[0], kg: '' });
  };

  const addExam = () => {
      if(!newExam.name) return;
      setExams(prev => [...prev, { ...newExam, id: Date.now() }].sort((a,b) => new Date(b.date) - new Date(a.date)));
      setNewExam({ date: '', name: '', result: '', link: '' });
  };

  const deleteWeight = (id) => setWeightHistory(prev => prev.filter(i => i.id !== id));
  const deleteExam = (id) => setExams(prev => prev.filter(i => i.id !== id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-bold text-gray-800">Prontuário da Gestante</h2>
         <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-sm text-primary underline">
             {isEditingProfile ? 'Salvar Perfil' : 'Editar Dados'}
         </button>
      </div>

      {/* Cartão de Identificação */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                  <div>
                      <label className="text-pink-100 text-xs font-bold uppercase block mb-1">Nome / Data Nasc.</label>
                      <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">Mari</span>
                          {isEditingProfile ? (
                              <input type="date" className="text-gray-800 text-sm rounded px-2 py-1" value={profile.birth} onChange={e => setProfile({...profile, birth: e.target.value})} />
                          ) : (
                              <span className="text-pink-100 opacity-90 text-sm">({new Date(profile.birth).toLocaleDateString('pt-BR')})</span>
                          )}
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="text-pink-100 text-xs font-bold uppercase block mb-1">Altura</label>
                          {isEditingProfile ? (
                              <input type="number" step="0.01" className="text-gray-800 text-sm rounded w-20 px-2 py-1" value={profile.height} onChange={e => setProfile({...profile, height: e.target.value})} />
                          ) : <span className="font-medium text-lg">{profile.height} m</span>}
                      </div>
                      <div>
                          <label className="text-pink-100 text-xs font-bold uppercase block mb-1">Peso Inicial</label>
                          {isEditingProfile ? (
                              <input type="number" className="text-gray-800 text-sm rounded w-20 px-2 py-1" value={profile.weight} onChange={e => setProfile({...profile, weight: e.target.value})} />
                          ) : <span className="font-medium text-lg">{profile.weight} kg</span>}
                      </div>
                  </div>
                  <div>
                      <label className="text-pink-100 text-xs font-bold uppercase block mb-1">Tipo Sanguíneo</label>
                       {isEditingProfile ? (
                              <input type="text" className="text-gray-800 text-sm rounded w-20 px-2 py-1" value={profile.blood} onChange={e => setProfile({...profile, blood: e.target.value})} />
                          ) : <span className="font-medium text-lg">{profile.blood}</span>}
                  </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">⚠️ Informações Clínicas</h4>
                  <div className="space-y-3 text-sm">
                      <div>
                          <span className="block text-pink-200 text-xs uppercase font-bold">Medicamentos em Uso:</span>
                           {isEditingProfile ? (
                              <textarea className="w-full text-gray-800 text-sm rounded px-2 py-1 mt-1" rows="2" value={profile.meds} onChange={e => setProfile({...profile, meds: e.target.value})} />
                          ) : <p className="font-medium">{profile.meds}</p>}
                      </div>
                      <div>
                          <span className="block text-pink-200 text-xs uppercase font-bold">Dieta:</span>
                           {isEditingProfile ? (
                              <input type="text" className="w-full text-gray-800 text-sm rounded px-2 py-1 mt-1" value={profile.diet} onChange={e => setProfile({...profile, diet: e.target.value})} />
                          ) : <p className="font-medium">{profile.diet}</p>}
                      </div>
                      <div>
                          <span className="block text-pink-200 text-xs uppercase font-bold">Exercícios:</span>
                           {isEditingProfile ? (
                              <input type="text" className="w-full text-gray-800 text-sm rounded px-2 py-1 mt-1" value={profile.exercise} onChange={e => setProfile({...profile, exercise: e.target.value})} />
                          ) : <p className="font-medium">{profile.exercise}</p>}
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Coluna 1: Curva de Peso */}
          <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">⚖️ Controle de Peso</h3>
              
              {/* Input Peso */}
              <div className="flex gap-2 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <input type="date" className="border-gray-200 rounded text-sm bg-white" value={newWeight.date} onChange={e => setNewWeight({...newWeight, date: e.target.value})} />
                  <input type="number" placeholder="Kg" className="border-gray-200 rounded text-sm w-24 bg-white" value={newWeight.kg} onChange={e => setNewWeight({...newWeight, kg: e.target.value})} />
                  <button onClick={addWeight} className="bg-primary text-white px-4 rounded font-bold hover:bg-primary-dark transition-colors">+</button>
              </div>

              {/* Lista Peso */}
              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2">
                  {weightHistory.map((item, idx) => {
                      const prevWeight = weightHistory[idx + 1]?.kg || profile.weight;
                      const diff = (item.kg - prevWeight).toFixed(1);
                      const totalGain = (item.kg - profile.weight).toFixed(1);
                      
                      return (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl">
                            <div>
                                <span className="text-xs text-gray-400 block">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                                <span className="font-bold text-gray-800 text-lg">{item.kg} kg</span>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs block font-medium ${diff > 0 ? 'text-red-400' : 'text-green-500'}`}>
                                    {diff > 0 ? '+' : ''}{diff} kg (mês)
                                </span>
                                <span className="text-[10px] text-gray-400">Total: {totalGain > 0 ? '+' : ''}{totalGain} kg</span>
                            </div>
                            <button onClick={() => deleteWeight(item.id)} className="text-gray-300 hover:text-red-500 ml-2">×</button>
                        </div>
                      )
                  })}
                  {weightHistory.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Nenhum registro ainda.</p>}
              </div>
          </div>

          {/* Coluna 2: Resultados de Exames */}
          <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">📄 Resultados de Exames</h3>
              
              {/* Input Exames */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4 space-y-2">
                  <div className="flex gap-2">
                      <input type="date" className="border-gray-200 rounded text-sm bg-white w-1/3" value={newExam.date} onChange={e => setNewExam({...newExam, date: e.target.value})} />
                      <input type="text" placeholder="Nome do Exame" className="border-gray-200 rounded text-sm bg-white flex-grow" value={newExam.name} onChange={e => setNewExam({...newExam, name: e.target.value})} />
                  </div>
                  <div className="flex gap-2">
                      <input type="text" placeholder="Resultado / Link" className="border-gray-200 rounded text-sm bg-white flex-grow" value={newExam.result} onChange={e => setNewExam({...newExam, result: e.target.value})} />
                      <button onClick={addExam} className="bg-blue-600 text-white px-6 rounded font-bold hover:bg-blue-700 transition-colors">Salvar</button>
                  </div>
              </div>

              {/* Lista Exames */}
              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2">
                  {exams.map(ex => (
                      <div key={ex.id} className="p-3 bg-white border-l-4 border-blue-400 rounded-r-xl shadow-sm hover:shadow-md transition-shadow relative group">
                          <button onClick={() => deleteExam(ex.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                          <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-gray-800 text-sm">{ex.name}</span>
                              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">{ex.date ? new Date(ex.date).toLocaleDateString('pt-BR') : '-'}</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{ex.result}</p>
                      </div>
                  ))}
                  {exams.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Nenhum exame cadastrado.</p>}
              </div>
          </div>
      </div>
    </div>
  );
}