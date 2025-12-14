import React, { useState } from 'react';
import { weeklyData } from '../data';
import { useTasks } from '../context/TasksContext.jsx';

/**
 * Utility to provide a fun, approximate description of fetal
 * development and milestones for a given week.  These descriptions
 * are meant to be encouraging and are based on common pregnancy
 * milestones (not medical advice).
 */
function getExpectation(weekNumber) {
  if (weekNumber < 6) {
    return 'Seu bebê é do tamanho de uma semente de gergelim e está começando a se desenvolver.';
  } else if (weekNumber < 10) {
    return 'O embrião tem o tamanho de uma uva. Coração e membros estão se formando.';
  } else if (weekNumber < 14) {
    return 'O feto já tem dedos e o sexo pode começar a ser identificado em breve.';
  } else if (weekNumber < 20) {
    return 'Você pode sentir os primeiros movimentos e descobrir o sexo no ultrassom.';
  } else if (weekNumber < 24) {
    return 'O bebê ouve sons e está engolindo líquido amniótico, preparatório para respirar.';
  } else if (weekNumber < 28) {
    return 'Os sentidos estão mais aguçados e ele responde à sua voz e músicas.';
  } else if (weekNumber < 32) {
    return 'A partir de agora o bebê ganha mais gordura corporal e se prepara para nascer.';
  } else if (weekNumber < 36) {
    return 'Ele está virando de cabeça para baixo e praticando respirar.';
  } else {
    return 'Pronto para chegar! Qualquer sinal de parto deve ser comunicado ao obstetra.';
  }
}

/**
 * Map a task description to an approximate cost in BRL.  When the
 * description contains one of the keys in the map, the associated
 * cost is returned.  If no keys match the description returns 0.
 */
const taskCostMap = {
  'Ultrassom Translucência Nucal': 500,
  'Ultrassom Morfológico': 600,
  'Teste de Tolerância à Glicose': 150,
  'vacina dTpa': 200,
  'Influenza': 100,
  'Exame do Cotonete': 100,
  'USG com Doppler': 250,
  'Cardiotocografia': 200,
  'Encomendar Móveis': 2000,
  'Carrinho de Bebê': 2500,
  'Enxoval de Roupas': 800,
  'Fraldas': 300,
  'Kit Berço': 400,
  'Banheira': 200,
  'Mala Maternidade': 500,
  'Farmacinha do bebê': 200,
  'Repelente seguro': 50,
  'Creme hidratante': 80,
  'Sutiãs confortáveis': 120,
  'Vitaminas pré-natais': 150,
};

// Determine which maternal vaccines should be considered for a given week
function getVaccinesForWeek(weekNumber) {
  const list = [];
  // Influenza recommended in qualquer trimestre (show at first 10 weeks)
  if (weekNumber <= 40) list.push('Influenza (consultar campanha)');
  // dTpa recommended from 27 to 36 weeks
  if (weekNumber >= 27 && weekNumber <= 36) list.push('dTpa');
  return list;
}

export default function Cronograma() {
  // Expand/collapse state per week
  const [expanded, setExpanded] = useState(null);
  // Temporary input values for adding new tasks per week
  const [newTaskInputs, setNewTaskInputs] = useState({});
  // Access general and cronogram tasks via context
  const {
    generalTasks,
    cronogramTasks,
    addCronogramTask,
    updateCronogramTask,
    removeCronogramTask,
    resetTasks,
  } = useTasks();

  /**
   * Compute a JS Date object representing the last date of a week based on the
   * date range string in the schedule (e.g. "12 Dec – 18 Dec").  It assumes
   * the schedule spans two years (starting late 2025 into 2026) and uses
   * the same month mapping logic found in data/index.js.  Returns a Date
   * instance in UTC or null if parsing fails.
   */
  function computeDueDate(dates) {
    if (!dates) return null;
    const parts = dates.split('–');
    if (parts.length !== 2) return null;
    const endPart = parts[1].trim();
    const [dayStr, monthStr] = endPart.split(' ');
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const monthKey = monthStr?.replace('.', '') ?? '';
    const m = monthMap[monthKey];
    const day = parseInt(dayStr, 10);
    if (Number.isNaN(day) || m === undefined) return null;
    // Determine year: if month is after August we assume 2025; otherwise 2026.
    const year = m >= 8 ? 2025 : 2026;
    return new Date(Date.UTC(year, m, day));
  }

  // Toggle expand/collapse of a week
  const toggle = (week) => {
    setExpanded(expanded === week ? null : week);
  };

  // Handle input changes for new tasks per week
  const handleInputChange = (weekNumber, field, value) => {
    setNewTaskInputs((prev) => ({
      ...prev,
      [weekNumber]: {
        ...(prev[weekNumber] || { description: '', type: 'Única' }),
        [field]: value,
      },
    }));
  };

  // Add a new cronogram task for a given week based on stored inputs
  const handleAddTask = (weekNumber, dates) => {
    const input = newTaskInputs[weekNumber] || { description: '', type: 'Única' };
    const description = (input.description || '').trim();
    const type = input.type || 'Única';
    if (!description) return;
    const due = computeDueDate(dates);
    addCronogramTask({ description, type, week: weekNumber, dueDate: due ? due.toISOString() : null });
    // Reset input for this week
    setNewTaskInputs((prev) => ({
      ...prev,
      [weekNumber]: { description: '', type: 'Única', selectedGeneralTaskId: '' },
    }));
  };

  // When selecting an existing general task from the dropdown, update
  // the new task input fields for the given week.  If the selection
  // is cleared, reset the description and type fields.
  const handleSelectExisting = (weekNumber, selectedId) => {
    // Empty string indicates clearing selection
    if (!selectedId) {
      setNewTaskInputs((prev) => ({
        ...prev,
        [weekNumber]: {
          ...(prev[weekNumber] || {}),
          selectedGeneralTaskId: '',
          description: '',
          type: 'Única',
        },
      }));
      return;
    }
    const id = parseInt(selectedId, 10);
    const gTask = generalTasks.find((gt) => gt.id === id);
    if (!gTask) return;
    setNewTaskInputs((prev) => ({
      ...prev,
      [weekNumber]: {
        ...(prev[weekNumber] || {}),
        selectedGeneralTaskId: id,
        description: gTask.description,
        type: gTask.type || 'Única',
      },
    }));
  };

  // Determine due date for a cronogram task based on override, general task or base
  const getDueDate = (ct) => {
    const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
    // Use override if set, otherwise general task dueDate, otherwise base
    return ct.overrideDueDate || (gTask && gTask.dueDate) || ct.baseDueDate;
  };

  // Toggle done status for a cronogram task
  const toggleDone = (id) => {
    const task = cronogramTasks.find((ct) => ct.id === id);
    if (!task) return;
    updateCronogramTask(id, { done: !task.done });
  };

  // Update due date override for a cronogram task
  const handleDueDateChange = (id, value) => {
    updateCronogramTask(id, { overrideDueDate: value || null });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Cronograma semana a semana</h2>
      <div className="space-y-4">
        {weeklyData.map((weekItem) => {
          const isOpen = expanded === weekItem.weekNumber;
          // Get cronogram tasks for this week, excluding soft-deleted tasks and
          // those whose general task was soft-deleted.  This ensures that
          // removed tasks are not displayed but remain in storage.
          const tasksForWeek = cronogramTasks.filter((ct) => {
            if (ct.week !== weekItem.weekNumber) return false;
            if (ct.deleted) return false;
            const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
            if (!gTask || gTask.deleted) return false;
            return true;
          });
          // Compute cost for tasks in this week based on taskCostMap and description of general tasks
          let cost = 0;
          tasksForWeek.forEach((ct) => {
            const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
            const desc = gTask ? gTask.description : '';
            Object.keys(taskCostMap).forEach((key) => {
              if (desc.toLowerCase().includes(key.toLowerCase())) {
                cost += taskCostMap[key];
              }
            });
          });
          const vaccines = getVaccinesForWeek(weekItem.weekNumber);
          return (
            <div
              key={weekItem.weekNumber}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <button
                onClick={() => toggle(weekItem.weekNumber)}
                className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none hover:bg-gray-50"
              >
                <span className="font-medium">
                  {weekItem.week}: {weekItem.dates}
                </span>
                <svg
                  className={`h-5 w-5 text-primary transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Focus / Milestone */}
                  <div>
                    <h4 className="font-semibold text-primary">Foco da semana</h4>
                    <p className="text-sm text-gray-700">{weekItem.focus}</p>
                  </div>
                  {/* Expectation */}
                  <div>
                    <h4 className="font-semibold text-primary">O que esperar</h4>
                    <p className="text-sm text-gray-700">
                      {getExpectation(weekItem.weekNumber)}
                    </p>
                  </div>
                  {/* Dietary focus */}
                  {weekItem.dietaryFocus.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-primary">Foco alimentar</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {weekItem.dietaryFocus.map((df) => (
                          <li key={df}>{df}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Medical support */}
                  {weekItem.medicalSupport.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-primary">Profissionais necessários</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {weekItem.medicalSupport.map((sup) => (
                          <li key={sup}>{sup}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Tasks */}
                  <div>
                    <h4 className="font-semibold text-primary">Tarefas</h4>
                    {tasksForWeek.length > 0 ? (
                      <ul className="space-y-2">
                        {tasksForWeek.map((ct) => {
                          const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
                          const due = getDueDate(ct);
                          const overdue = due ? new Date(due) < new Date() : false;
                          return (
                            <li key={ct.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-gray-700 border rounded p-2">
                              <div className="flex items-center flex-grow">
                                <input
                                  type="checkbox"
                                  checked={ct.done}
                                  onChange={() => toggleDone(ct.id)}
                                  className="mr-2 mt-0.5"
                                />
                            <span
                                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
                                    ct.type === 'Continuada'
                                      ? 'bg-blue-100 text-blue-800'
                                      : ct.type === 'Única'
                                      ? 'bg-green-100 text-green-800'
                                      : ct.type === 'Periódica'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : ct.type === 'Execução diária'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-purple-100 text-purple-800'
                                  }`}
                                >
                                  {ct.type}
                                </span>
                                <span className={ct.done ? 'line-through text-gray-500' : ''}>{gTask ? gTask.description : ''}</span>
                              </div>
                              {/* Due date input */}
                              <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                                {due && (
                                  <span className={`text-xs ${overdue && !ct.done ? 'text-red-600' : 'text-gray-500'}`}>
                                    Até {new Date(due).toLocaleDateString()}
                                  </span>
                                )}
                                <input
                                  type="date"
                                  className="border rounded px-1 py-0.5 text-xs"
                                  value={due ? new Date(due).toISOString().substring(0, 10) : ''}
                                  onChange={(e) => handleDueDateChange(ct.id, e.target.value)}
                                />
                                <button
                                  onClick={() => removeCronogramTask(ct.id)}
                                  className="text-red-600 text-xs hover:underline"
                                >
                                  Remover
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">Nenhuma tarefa para esta semana.</p>
                    )}
                    {/* Add new task */}
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      {/* Select an existing general task */}
                      <select
                        value={(newTaskInputs[weekItem.weekNumber]?.selectedGeneralTaskId) || ''}
                        onChange={(e) => handleSelectExisting(weekItem.weekNumber, e.target.value)}
                        className="border rounded px-2 py-1 text-sm mb-2 sm:mb-0 flex-grow"
                      >
                        <option value="">Selecione tarefa existente (opcional)</option>
                        {generalTasks.filter((gt) => !gt.deleted).map((gt) => (
                          <option key={gt.id} value={gt.id}>{gt.description}</option>
                        ))}
                      </select>
                      {/* Manual description input */}
                      <input
                        type="text"
                        placeholder="Descrição da tarefa"
                        value={(newTaskInputs[weekItem.weekNumber]?.description) || ''}
                        onChange={(e) => handleInputChange(weekItem.weekNumber, 'description', e.target.value)}
                        className="border rounded px-2 py-1 text-sm mb-2 sm:mb-0 flex-grow"
                      />
                      <select
                        value={(newTaskInputs[weekItem.weekNumber]?.type) || 'Única'}
                        onChange={(e) => handleInputChange(weekItem.weekNumber, 'type', e.target.value)}
                        className="border rounded px-2 py-1 text-sm mb-2 sm:mb-0"
                      >
                        <option value="Única">Única</option>
                        <option value="Continuada">Continuada</option>
                        <option value="Periódica">Periódica</option>
                        <option value="Execução diária">Execução diária</option>
                      </select>
                      <button
                        onClick={() => handleAddTask(weekItem.weekNumber, weekItem.dates)}
                        className="bg-primary text-white px-3 py-1 rounded text-sm"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                  {/* Exams */}
                  {weekItem.exams.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-primary">Exames</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {weekItem.exams.map((ex) => (
                          <li key={ex}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Vaccines */}
                  {vaccines.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-primary">Vacinas</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {vaccines.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Cost */}
                  <div>
                    <h4 className="font-semibold text-primary">Custo estimado</h4>
                    <p className="text-sm text-gray-700">
                      {cost > 0 ? `≈ R$ ${cost.toFixed(2)}` : 'Nenhum gasto previsto'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Reset button: allow the user to revert all custom tasks back to defaults */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={resetTasks}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
        >
          Resetar alterações
        </button>
      </div>
    </div>
  );
}