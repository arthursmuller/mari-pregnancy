import React, { createContext, useContext, useEffect, useState } from 'react';
import { allTasks, weeklyData } from '../data';

// Version constant for seeding initial tasks.
// UPDATE: Bumped to 3 to include 'category' field for Medical Team tile logic.
const TASKS_SEED_VERSION = 3;

// Create a context to manage general tasks and cronogram tasks across the app.

const TasksContext = createContext();

/**
 * Derive initial general tasks and cronogram tasks from the static
 * allTasks list. General tasks are deduplicated by description.
 */
function deriveInitialTasks() {
  const generalTaskMap = {};
  let generalId = 1;

  // Helper to categorize tasks automatically based on description
  const categorizeTask = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes('consulta') || d.includes('obstetra') || d.includes('pediatra') || d.includes('nutricionista') || d.includes('dentista') || d.includes('médico') || d.includes('fisioterapeuta') || d.includes('anestesiologista')) {
      return 'medical';
    }
    if (d.includes('ultrassom') || d.includes('exame') || d.includes('teste') || d.includes('coleta') || d.includes('laboratório')) {
      return 'exam';
    }
    return 'general';
  };

  // Build a map of description -> general task
  allTasks.forEach((t) => {
    const desc = t.description.trim();
    if (!generalTaskMap[desc]) {
      generalTaskMap[desc] = {
        id: generalId++,
        description: desc,
        type: t.type || 'Única',
        category: categorizeTask(desc), // New field
        dueDate: null,
        done: false,
        deleted: false,
      };
    }
  });
  const generalTasks = Object.values(generalTaskMap);
  
  // Build cronogram tasks referencing general tasks
  let cronId = 1;
  const cronogramTasks = allTasks.map((t) => {
    const desc = t.description.trim();
    const gTask = generalTaskMap[desc];
    return {
      id: cronId++,
      generalTaskId: gTask.id,
      week: t.week,
      baseDueDate: t.dueDate || null,
      overrideDueDate: null,
      done: t.done || false,
      closed: false,
      actionTaken: '',
      type: gTask.type,
      category: gTask.category, // Mirror category here for easier filtering
      deleted: false,
    };
  });

  /**
   * Helper to compute a due date (ISO string)
   */
  function getWeekDueDate(weekNumber) {
    const weekItem = weeklyData.find((w) => w.weekNumber === weekNumber);
    if (!weekItem) return null;
    const dates = weekItem.dates;
    if (!dates) return null;
    const parts = dates.split('–');
    if (parts.length !== 2) return null;
    const endPart = parts[1].trim();
    const [dayStr, monthStr] = endPart.split(' ');
    const monthMap = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const monthKey = monthStr?.replace('.', '') ?? '';
    const m = monthMap[monthKey];
    const day = parseInt(dayStr, 10);
    if (Number.isNaN(day) || m === undefined) return null;
    const year = m >= 8 ? 2025 : 2026;
    const dateObj = new Date(Date.UTC(year, m, day));
    return dateObj.toISOString();
  }

  // Convert certain continuous tasks into daily execution type
  const dailyKeywords = ['Tomar vitaminas', 'Hidrata', 'Exercícios', 'Contagem de movimentos fetais', 'Massagem perineal', 'Relaxamento'];
  generalTasks.forEach((gt) => {
    dailyKeywords.forEach((kw) => {
      if (gt.description.toLowerCase().includes(kw.toLowerCase())) {
        gt.type = 'Execução diária';
      }
    });
  });
  cronogramTasks.forEach((ct) => {
    const gt = generalTasks.find((g) => g.id === ct.generalTaskId);
    if (gt && gt.type === 'Execução diária') {
      ct.type = 'Execução diária';
    }
  });

  // Additional tasks to enrich the schedule
  const extraTasksByWeek = {
    4: [
      { desc: 'Ligar para marcar consulta inicial com Obstetra', type: 'Única', category: 'general' },
      { desc: 'Agendar consulta com Nutricionista (Dieta Vegetariana)', type: 'Única', category: 'general' },
      { desc: 'Verificar laboratórios cobertos pelo plano para exames de sangue', type: 'Única', category: 'general' },
    ],
    5: [
      { desc: 'Comparecer à consulta com Nutricionista', type: 'Única', category: 'medical' },
      { desc: 'Comparecer à consulta com Obstetra', type: 'Única', category: 'medical' },
      { desc: 'Realizar exames de sangue iniciais', type: 'Única', category: 'exam' },
      { desc: 'Marcar retorno com Obstetra', type: 'Única', category: 'general' },
      { desc: 'Marcar consulta com Ginecologista', type: 'Única', category: 'general' },
    ],
    10: [
       { desc: 'Ligar para agendar Ultrassom Translucência Nucal (para Sem 12)', type: 'Única', category: 'general' },
       { desc: 'Agendar consulta de Medicina Fetal', type: 'Única', category: 'general' },
    ],
    11: [
      { desc: 'Confirmar agendamento Translucência Nucal', type: 'Única', category: 'general' },
    ],
    12: [
      { desc: 'Realizar Ultrassom Translucência Nucal', type: 'Única', category: 'exam' },
      { desc: 'Comparecer consulta de Medicina Fetal', type: 'Única', category: 'medical' },
      { desc: 'Agendar consulta de rotina Obstetra (Mensal)', type: 'Periódica', category: 'general' },
    ],
    16: [
      { desc: 'Ligar para agendar Ultrassom Morfológico (para Sem 21)', type: 'Única', category: 'general' },
      { desc: 'Agendar Ecocardiograma Fetal (se solicitado)', type: 'Única', category: 'general' },
    ],
    18: [
       { desc: 'Agendar consulta de retorno Nutricionista (Ajuste 2º Tri)', type: 'Única', category: 'general' },
    ],
    20: [
      { desc: 'Agendar consulta com Dentista (Check-up)', type: 'Única', category: 'general' },
      { desc: 'Pesquisar e agendar cursos de preparação para o parto', type: 'Única', category: 'general' },
    ],
    21: [
      { desc: 'Realizar Ultrassom Morfológico', type: 'Única', category: 'exam' },
      { desc: 'Comparecer consulta com Dentista', type: 'Única', category: 'medical' },
    ],
    23: [
        { desc: 'Agendar Teste de Tolerância à Glicose (Curva Glicêmica)', type: 'Única', category: 'general' },
        { desc: 'Verificar onde tomar vacinas dTpa e Influenza', type: 'Única', category: 'general' },
    ],
    24: [
      { desc: 'Marcar vacinas dTpa e Influenza (se ainda não agendou)', type: 'Única', category: 'general' },
    ],
    26: [
      { desc: 'Realizar Teste de Tolerância à Glicose', type: 'Única', category: 'exam' },
      { desc: 'Tomar vacinas dTpa e Influenza', type: 'Única', category: 'medical' }, // tecnicamente medical procedure
      { desc: 'Agendar retorno Nutricionista (Ajuste Final 3º Tri)', type: 'Única', category: 'general' },
    ],
    28: [
      { desc: 'Ligar para agendar Ultrassom 3º Trimestre (Doppler)', type: 'Única', category: 'general' },
      { desc: 'Agendar consulta pré-natal com Pediatra', type: 'Única', category: 'general' },
      { desc: 'Agendar visita à Maternidade', type: 'Única', category: 'general' },
    ],
    30: [
      { desc: 'Comparecer consulta com Pediatra', type: 'Única', category: 'medical' },
      { desc: 'Realizar visita à Maternidade', type: 'Única', category: 'general' },
      { desc: 'Lavar roupas do bebê e organizar enxoval', type: 'Única', category: 'general' },
      { desc: 'Preparar mala da maternidade e instalar bebê conforto', type: 'Única', category: 'general' },
    ],
    32: [
        { desc: 'Agendar consulta com Anestesiologista (Avaliação pré-parto)', type: 'Única', category: 'general' },
        { desc: 'Agendar Exame do Cotonete (para Sem 35-36)', type: 'Única', category: 'general' },
    ],
    35: [
        { desc: 'Realizar Exame do Cotonete (Estreptococo B)', type: 'Única', category: 'exam' },
    ],
    36: [
        { desc: 'Deixar agendadas consultas semanais com Obstetra até o parto', type: 'Única', category: 'general' },
    ],
    38: [
      { desc: 'Comparecer consultas semanais com Obstetra', type: 'Única', category: 'medical' },
      { desc: 'Monitorar contrações e perda de líquido diariamente', type: 'Execução diária', category: 'general' },
    ],
  };

  Object.entries(extraTasksByWeek).forEach(([weekStr, tasks]) => {
    const week = parseInt(weekStr, 10);
    tasks.forEach((item) => {
      const desc = item.desc.trim();
      let gTask = generalTaskMap[desc];
      if (!gTask) {
        gTask = {
          id: generalId++,
          description: desc,
          type: item.type,
          category: item.category || categorizeTask(desc),
          dueDate: null,
          done: false,
          deleted: false,
        };
        generalTaskMap[desc] = gTask;
        generalTasks.push(gTask);
      } else {
        gTask.type = item.type;
        if (item.category) gTask.category = item.category;
      }
      
      const dueIso = getWeekDueDate(week);
      cronogramTasks.push({
        id: cronId++,
        generalTaskId: gTask.id,
        week: week,
        baseDueDate: dueIso,
        overrideDueDate: null,
        done: false,
        closed: false,
        actionTaken: '',
        type: gTask.type,
        category: gTask.category,
        deleted: false,
      });
    });
  });
  return { generalTasks, cronogramTasks };
}

export function TasksProvider({ children }) {
  const [generalTasks, setGeneralTasks] = useState([]);
  const [cronogramTasks, setCronogramTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedGeneralJson = localStorage.getItem('generalTasks');
      const storedCronoJson = localStorage.getItem('cronogramTasks');
      const generalSeed = localStorage.getItem('generalTasksSeed');
      const cronoSeed = localStorage.getItem('cronogramTasksSeed');
      const seedOk =
        generalSeed && parseInt(generalSeed, 10) === TASKS_SEED_VERSION &&
        cronoSeed && parseInt(cronoSeed, 10) === TASKS_SEED_VERSION;
      if (seedOk && storedGeneralJson && storedCronoJson) {
        const parsedGeneral = JSON.parse(storedGeneralJson);
        const parsedCrono = JSON.parse(storedCronoJson);
        if (Array.isArray(parsedGeneral) && Array.isArray(parsedCrono)) {
          setGeneralTasks(parsedGeneral);
          setCronogramTasks(parsedCrono);
          setLoaded(true);
          return;
        }
      }
    } catch (e) { }

    const { generalTasks: defaultsGeneral, cronogramTasks: defaultsCronogram } = deriveInitialTasks();
    setGeneralTasks(defaultsGeneral);
    setCronogramTasks(defaultsCronogram);
    try {
      localStorage.setItem('generalTasks', JSON.stringify(defaultsGeneral));
      localStorage.setItem('cronogramTasks', JSON.stringify(defaultsCronogram));
      localStorage.setItem('generalTasksSeed', TASKS_SEED_VERSION.toString());
      localStorage.setItem('cronogramTasksSeed', TASKS_SEED_VERSION.toString());
    } catch (e) { }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem('generalTasks', JSON.stringify(generalTasks)); } catch (e) { }
  }, [generalTasks, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem('cronogramTasks', JSON.stringify(cronogramTasks)); } catch (e) { }
  }, [cronogramTasks, loaded]);

  const addGeneralTask = ({ description, type = 'Única', category = 'general', dueDate = null }) => {
    const trimmed = description.trim();
    if (!trimmed) return null;
    const existing = generalTasks.find((t) => t.description.toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing.id;
    const newId = (generalTasks.length ? Math.max(...generalTasks.map((t) => t.id)) : 0) + 1;
    
    // Auto categorize if not provided explicitly
    let finalCat = category;
    if (category === 'general') {
       const d = trimmed.toLowerCase();
       if (d.includes('consulta') || d.includes('médico') || d.includes('obstetra')) finalCat = 'medical';
       else if (d.includes('exame') || d.includes('ultrassom')) finalCat = 'exam';
    }

    const newTask = {
      id: newId,
      description: trimmed,
      type,
      category: finalCat,
      dueDate,
      done: false,
      deleted: false,
    };
    setGeneralTasks((prev) => {
      const updated = [...prev, newTask];
      try { localStorage.setItem('generalTasks', JSON.stringify(updated)); } catch (e) { }
      return updated;
    });
    return newId;
  };

  const updateGeneralTask = (id, updates) => {
    setGeneralTasks((prev) => {
      const updatedGeneral = prev.map((task) => (task.id === id ? { ...task, ...updates } : task));
      try { localStorage.setItem('generalTasks', JSON.stringify(updatedGeneral)); } catch (e) { }
      return updatedGeneral;
    });
    if (updates && Object.prototype.hasOwnProperty.call(updates, 'dueDate')) {
      const newDueDate = updates.dueDate;
      setCronogramTasks((prev) => {
        const updatedCrono = prev.map((ct) => {
          if (ct.generalTaskId === id && !ct.overrideDueDate) {
            return { ...ct, baseDueDate: newDueDate };
          }
          return ct;
        });
        try { localStorage.setItem('cronogramTasks', JSON.stringify(updatedCrono)); } catch (e) { }
        return updatedCrono;
      });
    }
  };

  const removeGeneralTask = (id) => {
    setGeneralTasks((prev) => {
      const updated = prev.map((t) => t.id === id ? { ...t, deleted: true } : t);
      try { localStorage.setItem('generalTasks', JSON.stringify(updated)); } catch (e) { }
      return updated;
    });
    setCronogramTasks((prev) => {
      const updated = prev.map((ct) => ct.generalTaskId === id ? { ...ct, deleted: true } : ct);
      try { localStorage.setItem('cronogramTasks', JSON.stringify(updated)); } catch (e) { }
      return updated;
    });
  };

  const addCronogramTask = ({ description, type = 'Única', category = 'general', week, dueDate = null }) => {
    if (!description || !week) return null;
    const trimmed = description.trim();
    let generalId = addGeneralTask({ description: trimmed, type, category, dueDate: null });
    const newCronId = (cronogramTasks.length ? Math.max(...cronogramTasks.map((ct) => ct.id)) : 0) + 1;
    
    // Fetch category from the created/found general task to ensure consistency
    const gTask = generalTasks.find(g => g.id === generalId) || {};

    const newTask = {
      id: newCronId,
      generalTaskId: generalId,
      week,
      baseDueDate: dueDate,
      overrideDueDate: null,
      done: false,
      closed: false,
      actionTaken: '',
      type,
      category: gTask.category || category,
      deleted: false,
    };
    setCronogramTasks((prev) => {
      const updated = [...prev, newTask];
      try { localStorage.setItem('cronogramTasks', JSON.stringify(updated)); } catch (e) { }
      return updated;
    });
    return newCronId;
  };

  const updateCronogramTask = (id, updates) => {
    setCronogramTasks((prev) => {
      const updated = prev.map((ct) => (ct.id === id ? { ...ct, ...updates } : ct));
      try { localStorage.setItem('cronogramTasks', JSON.stringify(updated)); } catch (e) { }
      return updated;
    });
  };

  const removeCronogramTask = (id) => {
    setCronogramTasks((prev) => {
      const updated = prev.map((ct) => ct.id === id ? { ...ct, deleted: true } : ct);
      try { localStorage.setItem('cronogramTasks', JSON.stringify(updated)); } catch (e) { }
      return updated;
    });
  };

  const resetTasks = () => {
    const { generalTasks: defaultsGeneral, cronogramTasks: defaultsCronogram } = deriveInitialTasks();
    setGeneralTasks(defaultsGeneral);
    setCronogramTasks(defaultsCronogram);
    try {
      localStorage.setItem('generalTasks', JSON.stringify(defaultsGeneral));
      localStorage.setItem('cronogramTasks', JSON.stringify(defaultsCronogram));
      localStorage.setItem('generalTasksSeed', TASKS_SEED_VERSION.toString());
      localStorage.setItem('cronogramTasksSeed', TASKS_SEED_VERSION.toString());
    } catch (e) { }
  };

  return (
    <TasksContext.Provider
      value={{
        generalTasks,
        setGeneralTasks,
        cronogramTasks,
        setCronogramTasks,
        addGeneralTask,
        updateGeneralTask,
        removeGeneralTask,
        addCronogramTask,
        updateCronogramTask,
        removeCronogramTask,
        resetTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return ctx;
}