import React, { useState } from 'react';
import { weeklyData } from '../data';
import { useTasks } from '../context/TasksContext.jsx';
import { useNutrition } from '../context/NutritionContext.jsx';

function getExpectation(weekNumber) {
  if (weekNumber < 6) return 'Seu bebê é do tamanho de uma semente de gergelim.';
  else if (weekNumber < 10) return 'O embrião tem o tamanho de uma uva. Coração se formando.';
  else if (weekNumber < 14) return 'O feto já tem dedos e o sexo pode ser identificado em breve.';
  else if (weekNumber < 20) return 'Você pode sentir os primeiros movimentos.';
  else if (weekNumber < 24) return 'O bebê ouve sons e pratica a respiração.';
  else if (weekNumber < 28) return 'Os sentidos estão aguçados, responde à voz.';
  else if (weekNumber < 32) return 'Ganho de gordura corporal, preparando para nascer.';
  else if (weekNumber < 36) return 'Virando de cabeça para baixo.';
  else return 'Pronto para chegar! Fique atenta aos sinais.';
}

const taskCostMap = {
  'Ultrassom Translucência Nucal': 500, 'Ultrassom Morfológico': 600, 'Teste de Tolerância à Glicose': 150,
  'vacina dTpa': 200, 'Influenza': 100, 'Exame do Cotonete': 100, 'USG com Doppler': 250, 'Cardiotocografia': 200,
  'Encomendar Móveis': 2000, 'Carrinho de Bebê': 2500, 'Enxoval de Roupas': 800, 'Fraldas': 300, 'Kit Berço': 400,
  'Banheira': 200, 'Mala Maternidade': 500, 'Farmacinha do bebê': 200, 'Repelente seguro': 50,
  'Creme hidratante': 80, 'Sutiãs confortáveis': 120, 'Vitaminas pré-natais': 150,
};

function getVaccinesForWeek(weekNumber) {
  const list = [];
  if (weekNumber <= 40) list.push('Influenza (consultar campanha)');
  if (weekNumber >= 27 && weekNumber <= 36) list.push('dTpa');
  return list;
}

export default function Cronograma() {
  const [expanded, setExpanded] = useState(null);
  const [newTaskInputs, setNewTaskInputs] = useState({});
  const [nutritionInputs, setNutritionInputs] = useState({});
  const [swappingId, setSwappingId] = useState(null);
  
  // State for Vitamins inputs
  const [vitaminInput, setVitaminInput] = useState({});

  const { generalTasks, cronogramTasks, addCronogramTask, updateCronogramTask, removeCronogramTask, resetTasks } = useTasks();
  const { 
      generalFoods, generalSupplements, weeklyPlans, 
      addFoodToWeek, removeFoodFromWeek, updateWeekPlan, swapFoodInWeek,
      addVitaminToWeek, removeVitaminFromWeek 
  } = useNutrition();

  function computeDueDate(dates) {
    if (!dates) return null;
    const parts = dates.split('–');
    if (parts.length !== 2) return null;
    const endPart = parts[1].trim();
    const [dayStr, monthStr] = endPart.split(' ');
    const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const monthKey = monthStr?.replace('.', '') ?? '';
    const m = monthMap[monthKey];
    const day = parseInt(dayStr, 10);
    if (Number.isNaN(day) || m === undefined) return null;
    const year = m >= 8 ? 2025 : 2026;
    return new Date(Date.UTC(year, m, day));
  }

  const toggle = (week) => setExpanded(expanded === week ? null : week);

  const handleInputChange = (weekNumber, field, value) => {
    setNewTaskInputs((prev) => ({
      ...prev,
      [weekNumber]: { ...(prev[weekNumber] || { description: '', type: 'Única' }), [field]: value },
    }));
  };

  const handleAddTask = (weekNumber, dates) => {
    const input = newTaskInputs[weekNumber] || { description: '', type: 'Única' };
    const description = (input.description || '').trim();
    if (!description) return;
    const due = computeDueDate(dates);
    addCronogramTask({ description, type: input.type || 'Única', week: weekNumber, dueDate: due ? due.toISOString() : null });
    setNewTaskInputs((prev) => ({ ...prev, [weekNumber]: { description: '', type: 'Única', selectedGeneralTaskId: '' } }));
  };

  const handleSelectExisting = (weekNumber, selectedId) => {
    if (!selectedId) {
      setNewTaskInputs((prev) => ({ ...prev, [weekNumber]: { ...(prev[weekNumber] || {}), selectedGeneralTaskId: '', description: '', type: 'Única' } }));
      return;
    }
    const id = parseInt(selectedId, 10);
    const gTask = generalTasks.find((gt) => gt.id === id);
    if (!gTask) return;
    setNewTaskInputs((prev) => ({
      ...prev,
      [weekNumber]: { ...(prev[weekNumber] || {}), selectedGeneralTaskId: id, description: gTask.description, type: gTask.type || 'Única' },
    }));
  };

  const handleAddNutrition = (weekNumber) => {
    const inputs = nutritionInputs[weekNumber] || {};
    if (!inputs.selectedFoodId) return;
    const food = generalFoods.find(f => f.id === inputs.selectedFoodId);
    if (!food) return;
    addFoodToWeek(weekNumber, {
        foodId: food.id,
        name: food.name,
        quantity: food.quantity,
        nutrients: food.nutrients,
        mealTypeAssigned: inputs.mealTypeAssigned || 'Lanche',
        description: food.description
    });
    setNutritionInputs(prev => ({...prev, [weekNumber]: { selectedFoodId: '', mealTypeAssigned: 'Lanche' }}));
  };

  const handleAddVitamin = (weekNumber) => {
      const selectedId = vitaminInput[weekNumber];
      if(!selectedId) return;
      const sup = generalSupplements.find(s => s.id === selectedId);
      if(!sup) return;

      addVitaminToWeek(weekNumber, {
          supplementId: sup.id,
          name: sup.name,
          dosage: sup.dosage,
          frequency: sup.frequency,
          notes: sup.notes
      });
      setVitaminInput(prev => ({...prev, [weekNumber]: ''}));
  };

  const getDueDate = (ct) => {
    const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
    return ct.overrideDueDate || (gTask && gTask.dueDate) || ct.baseDueDate;
  };
  
  const handleDueDateChange = (id, value) => {
    updateCronogramTask(id, { overrideDueDate: value || null });
  };

  const handleSwapClick = (uniqueId) => setSwappingId(swappingId === uniqueId ? null : uniqueId);

  const confirmSwap = (weekNumber, uniqueId, newFoodId) => {
      if (!newFoodId) return;
      swapFoodInWeek(weekNumber, uniqueId, newFoodId);
      setSwappingId(null);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h2 className="text-3xl font-bold text-gray-800">Cronograma</h2>
           <p className="text-gray-500 mt-1">Sua jornada semana a semana</p>
        </div>
        <button onClick={resetTasks} className="text-xs text-red-500 hover:text-red-700 underline">
          Resetar Tarefas
        </button>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        {weeklyData.map((weekItem) => {
          const isOpen = expanded === weekItem.weekNumber;
          const tasksForWeek = cronogramTasks.filter((ct) => {
            if (ct.week !== weekItem.weekNumber || ct.deleted) return false;
            const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
            return gTask && !gTask.deleted;
          });
          
          const weekPlan = weeklyPlans[weekItem.weekNumber] || { goals: '', description: '', items: [], supplements: [] };
          const weekNutrients = Array.from(new Set(weekPlan.items.flatMap(i => i.nutrients || []))).join(', ');

          let cost = 0;
          tasksForWeek.forEach((ct) => {
            const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
            const desc = gTask ? gTask.description : '';
            Object.keys(taskCostMap).forEach((key) => { if (desc.toLowerCase().includes(key.toLowerCase())) cost += taskCostMap[key]; });
          });
          const vaccines = getVaccinesForWeek(weekItem.weekNumber);

          return (
            <div key={weekItem.weekNumber} className="relative flex items-start group">
                <div className={`absolute left-0 mt-5 ml-2 w-6 h-6 rounded-full border-2 border-white shadow-sm z-10 flex items-center justify-center ${isOpen ? 'bg-primary ring-4 ring-pink-50' : 'bg-gray-200 group-hover:bg-primary/50'}`}>
                    <span className={`text-[10px] font-bold ${isOpen ? 'text-white' : 'text-gray-600'}`}>{weekItem.weekNumber}</span>
                </div>

                <div className="ml-12 w-full bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 transition-all">
                    <div onClick={() => toggle(weekItem.weekNumber)} className={`p-4 flex items-center justify-between cursor-pointer ${isOpen ? 'border-b border-gray-100' : ''}`}>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">{weekItem.week}</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{weekItem.dates}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {weekPlan.supplements && weekPlan.supplements.length > 0 && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">{weekPlan.supplements.length} vits</span>}
                            {tasksForWeek.length > 0 && <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{tasksForWeek.length} tarefas</span>}
                            <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="px-5 pb-6 bg-gray-50/30 rounded-b-xl cursor-default">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                
                                {/* Coluna Esquerda: Foco & Nutrição & Vitaminas */}
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <p className="text-xs font-bold text-blue-600 uppercase mb-1">Foco</p>
                                        <p className="text-sm text-gray-700">{weekItem.focus}</p>
                                    </div>

                                    {/* TILE DE NUTRIÇÃO */}
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                        <div className="flex justify-between items-center mb-3">
                                            <p className="text-xs font-bold text-green-700 uppercase flex items-center"><span className="mr-1">🍎</span> Cardápio / Rotina</p>
                                            <span className="text-[10px] bg-white text-green-600 px-1.5 py-0.5 rounded border border-green-100">Semana {weekItem.weekNumber}</span>
                                        </div>
                                        <div className="mb-4 space-y-2">
                                            <div>
                                                <label className="text-[10px] font-bold text-green-600 uppercase">Descrição</label>
                                                <textarea className="w-full text-xs bg-white border-green-200 rounded p-1 focus:ring-green-500 text-gray-600" rows="2" value={weekPlan.description || ''} onChange={(e) => updateWeekPlan(weekItem.weekNumber, { description: e.target.value })} placeholder="Descreva a rotina..." />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-green-600 uppercase">Metas</label>
                                                <input type="text" className="w-full text-xs bg-white border-green-200 rounded p-1 focus:ring-green-500 text-gray-600" value={weekPlan.goals || ''} onChange={(e) => updateWeekPlan(weekItem.weekNumber, { goals: e.target.value })} placeholder="Objetivo..." />
                                            </div>
                                            {weekNutrients && <p className="text-[10px] text-green-700 mt-1"><strong>Nutrientes:</strong> {weekNutrients}</p>}
                                        </div>
                                        <div className="space-y-2 mb-3">
                                            {weekPlan.items.length === 0 ? <p className="text-xs text-gray-400 italic">Sem planejamento.</p> : weekPlan.items.map(item => (
                                                <div key={item.uniqueId} className="bg-white p-2 rounded border border-green-100 shadow-sm relative">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <span className="text-xs font-bold text-gray-700 block">{item.name}</span>
                                                            <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-0.5">
                                                                <span className="bg-gray-100 px-1 rounded">{item.mealTypeAssigned}</span>
                                                                <span>• {item.quantity}</span>
                                                            </div>
                                                            {item.description && <p className="text-[10px] text-gray-400 mt-1 italic leading-tight">{item.description}</p>}
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <button onClick={() => handleSwapClick(item.uniqueId)} className="text-[10px] text-blue-500 hover:underline bg-blue-50 px-1 rounded">Trocar</button>
                                                            <button onClick={() => removeFoodFromWeek(weekItem.weekNumber, item.uniqueId)} className="text-gray-300 hover:text-red-400 self-end"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                                                        </div>
                                                    </div>
                                                    {swappingId === item.uniqueId && (
                                                        <div className="mt-2 pt-2 border-t border-gray-100 bg-gray-50 p-2 rounded">
                                                            <p className="text-[10px] font-bold text-gray-500 mb-1">Substituir por ({item.mealTypeAssigned}):</p>
                                                            <select className="w-full text-xs border-gray-200 rounded mb-1" onChange={(e) => confirmSwap(weekItem.weekNumber, item.uniqueId, e.target.value)} value="">
                                                                <option value="">Selecione...</option>
                                                                {generalFoods.filter(f => f.mealTypes && f.mealTypes.includes(item.mealTypeAssigned) && f.id !== item.foodId).map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                                            </select>
                                                            <button onClick={() => setSwappingId(null)} className="text-[10px] text-gray-400 underline w-full text-center">Cancelar</button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-1">
                                            <select className="flex-grow text-[10px] py-1 border-green-200 rounded focus:ring-green-500 bg-white" value={(nutritionInputs[weekItem.weekNumber]?.selectedFoodId) || ''} onChange={(e) => setNutritionInputs(prev => ({...prev, [weekItem.weekNumber]: {...prev[weekItem.weekNumber], selectedFoodId: e.target.value}}))}>
                                                <option value="">+ Add Alimento...</option>
                                                {generalFoods.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                            </select>
                                            <select className="w-24 text-[10px] py-1 border-green-200 rounded focus:ring-green-500 bg-white" value={(nutritionInputs[weekItem.weekNumber]?.mealTypeAssigned) || 'Lanche'} onChange={(e) => setNutritionInputs(prev => ({...prev, [weekItem.weekNumber]: {...prev[weekItem.weekNumber], mealTypeAssigned: e.target.value}}))}>
                                                <option value="Café da Manhã">Café</option>
                                                <option value="Almoço">Almoço</option>
                                                <option value="Jantar">Jantar</option>
                                                <option value="Lanche">Lanche</option>
                                                <option value="Sobremesa">Sobremesa</option>
                                            </select>
                                            <button onClick={() => handleAddNutrition(weekItem.weekNumber)} className="bg-green-600 text-white rounded px-2 text-xs hover:bg-green-700">+</button>
                                        </div>
                                    </div>

                                    {/* TILE DE VITAMINAS (NOVO) */}
                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                         <div className="flex justify-between items-center mb-3">
                                            <p className="text-xs font-bold text-purple-700 uppercase flex items-center"><span className="mr-1">💊</span> Vitaminas & Suplementos</p>
                                        </div>
                                        <div className="space-y-2 mb-3">
                                            {(!weekPlan.supplements || weekPlan.supplements.length === 0) ? <p className="text-xs text-gray-400 italic">Nenhum registro.</p> : weekPlan.supplements.map(sup => (
                                                <div key={sup.uniqueId} className="bg-white p-2 rounded border border-purple-100 shadow-sm flex justify-between items-center">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-700 block">{sup.name}</span>
                                                        <p className="text-[10px] text-purple-600">{sup.dosage} • {sup.frequency}</p>
                                                    </div>
                                                    <button onClick={() => removeVitaminFromWeek(weekItem.weekNumber, sup.uniqueId)} className="text-gray-300 hover:text-red-400"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-1">
                                            <select className="flex-grow text-[10px] py-1 border-purple-200 rounded focus:ring-purple-500 bg-white" value={vitaminInput[weekItem.weekNumber] || ''} onChange={(e) => setVitaminInput(prev => ({...prev, [weekItem.weekNumber]: e.target.value}))}>
                                                <option value="">+ Add Vitamina...</option>
                                                {generalSupplements.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                            </select>
                                            <button onClick={() => handleAddVitamin(weekItem.weekNumber)} className="bg-purple-600 text-white rounded px-2 text-xs hover:bg-purple-700">+</button>
                                        </div>
                                    </div>
                                    
                                    {/* Infos Gerais */}
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">O Bebê</p>
                                        <p className="text-sm text-gray-600 italic">"{getExpectation(weekItem.weekNumber)}"</p>
                                    </div>
                                    {weekItem.exams.length > 0 && <div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Exames</p><ul className="space-y-1">{weekItem.exams.map(ex => <li key={ex} className="text-sm text-gray-700 flex items-center"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>{ex}</li>)}</ul></div>}
                                </div>

                                {/* Coluna Direita: Tarefas */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between"><p className="text-xs font-bold text-gray-400 uppercase">Checklist</p>{cost > 0 && <span className="text-xs font-bold text-green-600">Total: R$ {cost.toFixed(2)}</span>}</div>
                                    <div className="space-y-2">
                                        {tasksForWeek.map(ct => {
                                            const gTask = generalTasks.find(gt => gt.id === ct.generalTaskId);
                                            const due = getDueDate(ct);
                                            const typeColors = { 'Continuada': 'bg-blue-100 text-blue-700', 'Única': 'bg-emerald-100 text-emerald-700', 'Periódica': 'bg-amber-100 text-amber-700', 'Execução diária': 'bg-purple-100 text-purple-700' };
                                            return (
                                                <div key={ct.id} className="group flex items-start bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                                    <input type="checkbox" checked={ct.done} onChange={() => updateCronogramTask(ct.id, { done: !ct.done })} className="mt-1 h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
                                                    <div className="ml-3 flex-grow">
                                                        <div className="flex justify-between items-start"><span className={`text-sm ${ct.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>{gTask?.description}</span><button onClick={() => removeCronogramTask(ct.id)} className="text-gray-300 hover:text-red-500 ml-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></div>
                                                        <div className="flex items-center mt-2 space-x-2"><span className={`text-[10px] px-2 py-0.5 rounded ${typeColors[ct.type] || 'bg-gray-100'}`}>{ct.type}</span><input type="date" className="bg-transparent border-0 p-0 text-xs text-gray-500 focus:ring-0" value={due ? new Date(due).toISOString().substring(0, 10) : ''} onChange={(e) => handleDueDateChange(ct.id, e.target.value)} /></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Adicionar Tarefa</h4>
                                        <select value={(newTaskInputs[weekItem.weekNumber]?.selectedGeneralTaskId) || ''} onChange={(e) => handleSelectExisting(weekItem.weekNumber, e.target.value)} className="w-full text-xs bg-white border-gray-200 rounded mb-2 focus:ring-primary focus:border-primary">
                                            <option value="">-- Selecionar (Opcional) --</option>
                                            {generalTasks.filter(t => !t.deleted).map(gt => <option key={gt.id} value={gt.id}>{gt.description}</option>)}
                                        </select>
                                        <input type="text" className="w-full text-sm bg-white border-gray-200 rounded focus:ring-primary focus:border-primary placeholder-gray-400 mb-2" placeholder="Ou digite nova descrição..." value={(newTaskInputs[weekItem.weekNumber]?.description) || ''} onChange={(e) => handleInputChange(weekItem.weekNumber, 'description', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask(weekItem.weekNumber, weekItem.dates)} />
                                        <button onClick={() => handleAddTask(weekItem.weekNumber, weekItem.dates)} className="text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-primary-dark transition-colors font-medium shadow-sm w-full">+ Adicionar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}