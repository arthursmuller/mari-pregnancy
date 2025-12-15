import React, { useState } from 'react';
import { weeklyData } from '../data';
import { useTasks } from '../context/TasksContext.jsx';
import { useNutrition, NUTRIENT_LIST, DAILY_NUTRIENT_GOALS } from '../context/NutritionContext.jsx';

// Funções auxiliares (mantidas para consistência)
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

export default function Cronograma() {
  const [expanded, setExpanded] = useState(null);
  const [newTaskInputs, setNewTaskInputs] = useState({});
  const [nutritionInputs, setNutritionInputs] = useState({});
  const [swappingId, setSwappingId] = useState(null);
  const [vitaminInput, setVitaminInput] = useState({});
  const [isGoalSelectorOpen, setIsGoalSelectorOpen] = useState({});

  const { generalTasks, cronogramTasks, addCronogramTask, updateCronogramTask, removeCronogramTask, resetTasks } = useTasks();
  const { 
      generalFoods, generalSupplements, weeklyPlans, 
      addFoodToWeek, removeFoodFromWeek, updateFoodInWeek, updateWeekPlan, swapFoodInWeek,
      addVitaminToWeek, removeVitaminFromWeek 
  } = useNutrition();

  const toggle = (week) => setExpanded(expanded === week ? null : week);
  
  // --- Handlers ---
  const handleInputChange = (week, f, v) => setNewTaskInputs(p => ({...p, [week]: {...(p[week]||{description:'', type:'Única'}), [f]: v}}));
  
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

  const getDueDate = (ct) => {
    const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
    return ct.overrideDueDate || (gTask && gTask.dueDate) || ct.baseDueDate;
  };
  
  const handleDueDateChange = (id, value) => updateCronogramTask(id, { overrideDueDate: value || null });

  // Nutrição Handlers
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
        nutritionalValues: food.nutritionalValues || {},
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
          nutrients: sup.nutrients || [],
          nutritionalValues: sup.nutritionalValues || {},
          dosage: sup.dosage,
          frequency: sup.frequency,
          notes: sup.notes
      });
      setVitaminInput(prev => ({...prev, [weekNumber]: ''}));
  };

  const handleSwapClick = (uniqueId) => setSwappingId(swappingId === uniqueId ? null : uniqueId);
  const confirmSwap = (weekNumber, uniqueId, newFoodId) => {
      if (!newFoodId) return;
      swapFoodInWeek(weekNumber, uniqueId, newFoodId);
      setSwappingId(null);
  };
  
  const toggleNutrientTarget = (weekNumber, nutrient) => {
      const plan = weeklyPlans[weekNumber] || {};
      const currentTargets = plan.targetNutrients || [];
      const newTargets = currentTargets.includes(nutrient) ? currentTargets.filter(n => n !== nutrient) : [...currentTargets, nutrient];
      updateWeekPlan(weekNumber, { targetNutrients: newTargets });
  };

  const handlePortionChange = (weekNumber, uniqueId, delta) => {
      const plan = weeklyPlans[weekNumber];
      const item = plan.items.find(i => i.uniqueId === uniqueId);
      if (!item) return;
      const newPortion = Math.max(0.5, (item.portions || 1) + delta);
      updateFoodInWeek(weekNumber, uniqueId, { portions: newPortion });
  };

  return (
    <div className="relative pb-20">
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
          
          const weekPlan = weeklyPlans[weekItem.weekNumber] || { targetNutrients: [], description: '', items: [], supplements: [] };
          
          // --- CÁLCULO DE TOTAIS ---
          const totals = {};
          weekPlan.items.forEach(item => {
              const vals = item.nutritionalValues || {};
              const p = item.portions || 1;
              Object.entries(vals).forEach(([nut, val]) => { totals[nut] = (totals[nut] || 0) + (val * p); });
          });
          weekPlan.supplements.forEach(sup => {
              const vals = sup.nutritionalValues || {};
              Object.entries(vals).forEach(([nut, val]) => { totals[nut] = (totals[nut] || 0) + val; });
          });

          const targets = weekPlan.targetNutrients || [];
          const targetsMetCount = targets.filter(nut => {
             const current = totals[nut] || 0;
             const goal = DAILY_NUTRIENT_GOALS[nut]?.target || 100;
             return current >= goal * 0.95; // 95% tolerância
          }).length;

          let cost = 0;
          tasksForWeek.forEach((ct) => {
             const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
             const desc = gTask ? gTask.description : '';
             Object.keys(taskCostMap).forEach((key) => { if (desc.toLowerCase().includes(key.toLowerCase())) cost += taskCostMap[key]; });
          });

          return (
            <div key={weekItem.weekNumber} className="relative flex items-start group">
                {/* Marcador da Semana */}
                <div className={`absolute left-0 mt-5 ml-2 w-6 h-6 rounded-full border-2 border-white shadow-sm z-10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary ring-4 ring-pink-50 scale-110' : 'bg-gray-200 group-hover:bg-primary/50'}`}>
                    <span className={`text-[10px] font-bold ${isOpen ? 'text-white' : 'text-gray-600'}`}>{weekItem.weekNumber}</span>
                </div>

                <div className="ml-12 w-full bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 transition-all overflow-hidden">
                    <div onClick={() => toggle(weekItem.weekNumber)} className={`p-4 flex items-center justify-between cursor-pointer ${isOpen ? 'bg-gray-50/50 border-b border-gray-100' : ''}`}>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">{weekItem.week}</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{weekItem.dates}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {targets.length > 0 && (
                                <span className={`text-[10px] px-2 py-1 rounded-full border ${targetsMetCount === targets.length ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                    {targetsMetCount}/{targets.length} Metas
                                </span>
                            )}
                            {tasksForWeek.length > 0 && <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{tasksForWeek.length} tarefas</span>}
                            <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="px-5 pb-6 bg-gray-50/30">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
                                
                                {/* COLUNA ESQUERDA: NUTRIÇÃO */}
                                <div className="space-y-6">
                                    <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 backdrop-blur-sm">
                                        <p className="text-xs font-bold text-blue-600 uppercase mb-1 flex items-center gap-1">
                                            <span className="text-lg">🎯</span> Foco da Semana
                                        </p>
                                        <p className="text-sm text-gray-700 leading-relaxed">{weekItem.focus}</p>
                                    </div>

                                    {/* --- CARD DE NUTRIÇÃO --- */}
                                    <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
                                        <div className="bg-green-50/50 px-4 py-3 border-b border-green-100 flex justify-between items-center">
                                            <p className="text-sm font-bold text-green-800 flex items-center gap-2">
                                                <span className="text-xl">🥗</span> Planejamento Alimentar
                                            </p>
                                            <button onClick={() => setIsGoalSelectorOpen(p => ({...p, [weekItem.weekNumber]: !p[weekItem.weekNumber]}))} className="text-[10px] font-medium text-green-700 hover:text-green-900 bg-white px-3 py-1 rounded-full border border-green-200 shadow-sm transition-all hover:shadow">
                                                    {isGoalSelectorOpen[weekItem.weekNumber] ? 'Fechar Metas' : '⚙️ Configurar Metas'}
                                            </button>
                                        </div>
                                        
                                        <div className="p-4 space-y-5">
                                            {/* Seletor de Metas (Collapsible) */}
                                            {isGoalSelectorOpen[weekItem.weekNumber] && (
                                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 animate-fade-in-up">
                                                    <p className="text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-wider">Monitorar Nutrientes:</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {NUTRIENT_LIST.map(n => (
                                                            <button key={n} onClick={() => toggleNutrientTarget(weekItem.weekNumber, n)} className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${targets.includes(n) ? 'bg-green-500 text-white border-green-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'}`}>{n}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Grid de Metas / Progresso */}
                                            {targets.length > 0 ? (
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                                    {targets.map(nut => {
                                                        const current = totals[nut] || 0;
                                                        const goalInfo = DAILY_NUTRIENT_GOALS[nut] || { target: 100, unit: '' };
                                                        const goal = goalInfo.target;
                                                        const unit = goalInfo.unit;
                                                        const pct = Math.min(100, (current / goal) * 100);
                                                        const missing = Math.max(0, goal - current);
                                                        
                                                        // Cores Dinâmicas
                                                        let barColor = 'bg-rose-400';
                                                        let textColor = 'text-rose-500';
                                                        if (pct > 60) { barColor = 'bg-yellow-400'; textColor = 'text-yellow-600'; }
                                                        if (pct >= 95) { barColor = 'bg-emerald-500'; textColor = 'text-emerald-600'; }

                                                        return (
                                                            <div key={nut} className="col-span-1">
                                                                <div className="flex justify-between items-baseline mb-1">
                                                                    <span className="text-[11px] font-semibold text-gray-700">{nut}</span>
                                                                    <span className={`text-[10px] font-medium ${textColor}`}>
                                                                        {current.toFixed(0)}/{goal}{unit}
                                                                    </span>
                                                                </div>
                                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                                    <div className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`} style={{ width: `${pct}%` }}></div>
                                                                </div>
                                                                <div className="text-[9px] text-right mt-0.5 text-gray-400">
                                                                    {missing > 0 ? `Falta ${missing.toFixed(0)}${unit}` : 'Meta batida!'}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                    <p className="text-xs text-gray-400">Nenhuma meta nutricional definida.</p>
                                                </div>
                                            )}

                                            <div className="border-t border-gray-100 pt-4"></div>

                                            {/* Lista de Alimentos */}
                                            <div className="space-y-2">
                                                {weekPlan.items.length === 0 ? <p className="text-xs text-gray-400 italic text-center">Nenhum alimento planejado.</p> : weekPlan.items.map(item => (
                                                    <div key={item.uniqueId} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-green-200 transition-colors">
                                                        <div className="flex-grow min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-bold text-gray-800 truncate">{item.name}</span>
                                                                {/* Tags compactas */}
                                                                <div className="hidden sm:flex gap-1">
                                                                    {item.nutrients?.slice(0, 2).map(n => targets.includes(n) && (
                                                                        <span key={n} className="text-[8px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100">{n}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                                                <span className="bg-gray-100 px-1.5 rounded">{item.mealTypeAssigned}</span>
                                                                • Base: {item.quantity}
                                                            </p>
                                                        </div>

                                                        {/* Controle de Porção */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-7">
                                                                <button onClick={() => handlePortionChange(weekItem.weekNumber, item.uniqueId, -0.5)} className="w-6 h-full text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-l-lg transition-colors font-medium">-</button>
                                                                <span className="text-[10px] font-bold text-gray-700 w-8 text-center border-x border-gray-200 bg-white h-full flex items-center justify-center">{item.portions || 1}x</span>
                                                                <button onClick={() => handlePortionChange(weekItem.weekNumber, item.uniqueId, 0.5)} className="w-6 h-full text-gray-400 hover:text-green-600 hover:bg-gray-100 rounded-r-lg transition-colors font-medium">+</button>
                                                            </div>
                                                            
                                                            {/* Menu Ações */}
                                                            <div className="flex flex-col gap-1 items-end">
                                                                <button onClick={() => removeFoodFromWeek(weekItem.weekNumber, item.uniqueId)} className="text-gray-300 hover:text-red-400 transition-colors"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                                                                <button onClick={() => handleSwapClick(item.uniqueId)} className="text-[9px] text-blue-400 hover:text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Trocar</button>
                                                            </div>
                                                        </div>

                                                        {/* Painel de Troca */}
                                                        {swappingId === item.uniqueId && (
                                                            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-center p-2 rounded-xl border-2 border-blue-100 animate-in fade-in zoom-in-95 duration-200">
                                                                <div className="w-full max-w-xs">
                                                                    <p className="text-[10px] font-bold text-gray-500 mb-1 text-center">Trocar {item.name} por:</p>
                                                                    <select className="w-full text-xs border-gray-200 rounded-lg py-1.5 mb-2 shadow-sm" onChange={(e) => confirmSwap(weekItem.weekNumber, item.uniqueId, e.target.value)} value="">
                                                                        <option value="">Selecione...</option>
                                                                        {generalFoods.filter(f => f.mealTypes && f.mealTypes.includes(item.mealTypeAssigned) && f.id !== item.foodId).map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                                                    </select>
                                                                    <button onClick={() => setSwappingId(null)} className="text-xs text-gray-500 hover:text-gray-800 underline w-full text-center">Cancelar</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Inputs Add */}
                                            <div className="flex gap-2 pt-2">
                                                <select className="flex-grow text-[11px] py-2 border-gray-200 rounded-lg focus:ring-green-500 bg-gray-50 hover:bg-white transition-colors" value={(nutritionInputs[weekItem.weekNumber]?.selectedFoodId) || ''} onChange={(e) => setNutritionInputs(prev => ({...prev, [weekItem.weekNumber]: {...prev[weekItem.weekNumber], selectedFoodId: e.target.value}}))}>
                                                    <option value="">+ Adicionar Alimento...</option>
                                                    {generalFoods.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                                </select>
                                                <select className="w-28 text-[11px] py-2 border-gray-200 rounded-lg focus:ring-green-500 bg-gray-50" value={(nutritionInputs[weekItem.weekNumber]?.mealTypeAssigned) || 'Lanche'} onChange={(e) => setNutritionInputs(prev => ({...prev, [weekItem.weekNumber]: {...prev[weekItem.weekNumber], mealTypeAssigned: e.target.value}}))}>
                                                    <option value="Café da Manhã">Café</option>
                                                    <option value="Almoço">Almoço</option>
                                                    <option value="Jantar">Jantar</option>
                                                    <option value="Lanche">Lanche</option>
                                                    <option value="Sobremesa">Sobremesa</option>
                                                </select>
                                                <button onClick={() => handleAddNutrition(weekItem.weekNumber)} className="bg-green-100 text-green-700 hover:bg-green-200 rounded-lg px-3 text-lg font-bold transition-colors">+</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tile Vitaminas (Simplificado) */}
                                    <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                                         <div className="flex justify-between items-center mb-3 border-b border-purple-50 pb-2">
                                            <p className="text-sm font-bold text-purple-800 flex items-center gap-2"><span className="text-lg">💊</span> Suplementação</p>
                                        </div>
                                        <div className="space-y-2 mb-3">
                                            {weekPlan.supplements.length === 0 ? <p className="text-xs text-gray-400 italic">Nenhum suplemento.</p> : weekPlan.supplements.map(sup => (
                                                <div key={sup.uniqueId} className="flex justify-between items-center p-2 rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-100">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-700 block">{sup.name}</span>
                                                        <p className="text-[10px] text-purple-600">{sup.dosage} • {sup.frequency}</p>
                                                    </div>
                                                    <button onClick={() => removeVitaminFromWeek(weekItem.weekNumber, sup.uniqueId)} className="text-gray-300 hover:text-red-400"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <select className="flex-grow text-[11px] py-2 border-gray-200 rounded-lg bg-gray-50 focus:ring-purple-500" value={vitaminInput[weekItem.weekNumber] || ''} onChange={(e) => setVitaminInput(prev => ({...prev, [weekItem.weekNumber]: e.target.value}))}>
                                                <option value="">+ Add Vitamina...</option>
                                                {generalSupplements.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                            </select>
                                            <button onClick={() => handleAddVitamin(weekItem.weekNumber)} className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg px-3 text-lg font-bold transition-colors">+</button>
                                        </div>
                                    </div>
                                    
                                    {/* Infos do Bebê */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Desenvolvimento Fetal</p>
                                        <p className="text-sm text-gray-600 italic">"{getExpectation(weekItem.weekNumber)}"</p>
                                    </div>
                                </div>

                                {/* COLUNA DIREITA: TAREFAS */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2">
                                            <span>✅</span> Checklist da Semana
                                        </p>
                                        {cost > 0 && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">R$ {cost.toFixed(2)} estim.</span>}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {tasksForWeek.map(ct => {
                                            const gTask = generalTasks.find(gt => gt.id === ct.generalTaskId);
                                            const due = getDueDate(ct);
                                            const typeColors = { 'Continuada': 'bg-blue-50 text-blue-700 border-blue-100', 'Única': 'bg-emerald-50 text-emerald-700 border-emerald-100', 'Periódica': 'bg-amber-50 text-amber-700 border-amber-100', 'Execução diária': 'bg-purple-50 text-purple-700 border-purple-100' };
                                            return (
                                                <div key={ct.id} className="group flex items-start bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                                                    <input type="checkbox" checked={ct.done} onChange={() => updateCronogramTask(ct.id, { done: !ct.done })} className="mt-1 h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer" />
                                                    <div className="ml-3 flex-grow">
                                                        <div className="flex justify-between items-start">
                                                            <span className={`text-sm font-medium ${ct.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{gTask?.description}</span>
                                                            <button onClick={() => removeCronogramTask(ct.id)} className="text-gray-300 hover:text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                                        </div>
                                                        <div className="flex items-center mt-2 justify-between">
                                                            <span className={`text-[9px] px-2 py-0.5 rounded border ${typeColors[ct.type] || 'bg-gray-50'}`}>{ct.type}</span>
                                                            <input type="date" className="bg-transparent border-0 p-0 text-[10px] text-gray-400 hover:text-primary focus:ring-0 text-right cursor-pointer" value={due ? new Date(due).toISOString().substring(0, 10) : ''} onChange={(e) => handleDueDateChange(ct.id, e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {tasksForWeek.length === 0 && (
                                            <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">
                                                <p className="text-sm text-gray-400">Tudo limpo por aqui! 🎉</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Nova Tarefa */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60">
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Adicionar Rápido</h4>
                                        <div className="space-y-2">
                                            <select value={(newTaskInputs[weekItem.weekNumber]?.selectedGeneralTaskId) || ''} onChange={(e) => handleSelectExisting(weekItem.weekNumber, e.target.value)} className="w-full text-xs bg-white border-gray-200 rounded-lg py-2 focus:ring-primary focus:border-primary shadow-sm">
                                                <option value="">-- Selecionar Existente --</option>
                                                {generalTasks.filter(t => !t.deleted).map(gt => <option key={gt.id} value={gt.id}>{gt.description}</option>)}
                                            </select>
                                            <div className="flex gap-2">
                                                <input type="text" className="flex-grow text-xs bg-white border-gray-200 rounded-lg focus:ring-primary focus:border-primary shadow-sm px-3" placeholder="Ou digite nova..." value={(newTaskInputs[weekItem.weekNumber]?.description) || ''} onChange={(e) => handleInputChange(weekItem.weekNumber, 'description', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask(weekItem.weekNumber, weekItem.dates)} />
                                                <button onClick={() => handleAddTask(weekItem.weekNumber, weekItem.dates)} className="text-xs bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-bold shadow-sm">Add</button>
                                            </div>
                                        </div>
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