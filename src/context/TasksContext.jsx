import React, { createContext, useContext, useEffect, useState } from 'react';
import { allTasks, weeklyData } from '../data';

// Version constant for seeding initial tasks. When you change the
// logic for generating default tasks or modify the structure of
// generalTasks/cronogramTasks, bump this number. This allows the
// application to know when it should reseed localStorage instead
// of using stale data.  See the initialization effect for usage.
const TASKS_SEED_VERSION = 1;

// Create a context to manage general tasks and cronogram tasks across the app.

const TasksContext = createContext();

/**
 * Derive initial general tasks and cronogram tasks from the static
 * allTasks list.  General tasks are deduplicated by description and
 * contain an id, description, type and optional dueDate.  Cronogram
 * tasks reference a generalTaskId and keep track of week, due dates
 * and status.  They can later override their due date individually.
 */
function deriveInitialTasks() {
  const generalTaskMap = {};
  let generalId = 1;
  // Build a map of description -> general task
  allTasks.forEach((t) => {
    const desc = t.description.trim();
    if (!generalTaskMap[desc]) {
      generalTaskMap[desc] = {
        id: generalId++,
        description: desc,
        type: t.type || 'Única',
        dueDate: null, // initial due date is undefined; user can set later
        done: false,
        // track soft deletion status on general tasks
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
      // Use the default dueDate from allTasks; this will be overridden
      // by the general task dueDate if set, or by individual overrides
      baseDueDate: t.dueDate || null,
      overrideDueDate: null,
      done: t.done || false,
      closed: false,
      actionTaken: '',
      type: gTask.type,
      // track soft deletion for cronogram tasks
      deleted: false,
    };
  });

  /**
   * Helper to compute a due date (ISO string) from a week number using
   * weeklyData.  It returns the end date of the week as in the schedule.
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

  // Additional tasks to enrich the schedule (appointments and preparations)
  const extraTasksByWeek = {
    4: [
      { desc: 'Marcar consulta com Nutricionista', type: 'Única' },
      { desc: 'Marcar consulta com Obstetra', type: 'Única' },
      { desc: 'Marcar exames de sangue', type: 'Única' },
    ],
    5: [
      { desc: 'Comparecer à consulta com Nutricionista', type: 'Única' },
      { desc: 'Comparecer à consulta com Obstetra', type: 'Única' },
      { desc: 'Realizar exames de sangue', type: 'Única' },
    ],
    11: [
      { desc: 'Marcar Ultrassom Translucência Nucal', type: 'Única' },
      { desc: 'Marcar consulta de Medicina Fetal', type: 'Única' },
    ],
    12: [
      { desc: 'Realizar Ultrassom Translucência Nucal', type: 'Única' },
      { desc: 'Comparecer consulta de Medicina Fetal', type: 'Única' },
    ],
    20: [
      { desc: 'Marcar Ultrassom Morfológico', type: 'Única' },
      { desc: 'Marcar consulta com Dentista', type: 'Única' },
    ],
    21: [
      { desc: 'Realizar Ultrassom Morfológico', type: 'Única' },
      { desc: 'Comparecer consulta com Dentista', type: 'Única' },
    ],
    24: [
      { desc: 'Marcar Teste de Tolerância à Glicose', type: 'Única' },
      { desc: 'Marcar vacinas dTpa e Influenza', type: 'Única' },
    ],
    26: [
      { desc: 'Realizar Teste de Tolerância à Glicose', type: 'Única' },
      { desc: 'Tomar vacinas dTpa e Influenza', type: 'Única' },
    ],
    28: [
      { desc: 'Marcar exame do Cotonete', type: 'Única' },
      { desc: 'Marcar consulta com Pediatra', type: 'Única' },
    ],
    30: [
      { desc: 'Realizar exame do Cotonete', type: 'Única' },
      { desc: 'Comparecer consulta com Pediatra', type: 'Única' },
      { desc: 'Lavar roupas do bebê e organizar enxoval', type: 'Única' },
      { desc: 'Preparar mala da maternidade e instalar bebê conforto', type: 'Única' },
    ],
    38: [
      { desc: 'Marcar consultas semanais com Obstetra', type: 'Única' },
      { desc: 'Comparecer consultas semanais com Obstetra', type: 'Única' },
      { desc: 'Monitorar contrações e perda de líquido diariamente', type: 'Execução diária' },
    ],
  };

  Object.entries(extraTasksByWeek).forEach(([weekStr, tasks]) => {
    const week = parseInt(weekStr, 10);
    tasks.forEach((item) => {
      const desc = item.desc.trim();
      // Ensure general task exists or create
      let gTask = generalTaskMap[desc];
      if (!gTask) {
        gTask = {
          id: generalId++,
          description: desc,
          type: item.type,
          dueDate: null,
          done: false,
        };
        generalTaskMap[desc] = gTask;
        generalTasks.push(gTask);
      } else {
        // If general exists but type is different, update it to the most important type
        gTask.type = item.type;
      }
      // Add cronogram task
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
        deleted: false,
      });
    });
  });
  return { generalTasks, cronogramTasks };
}

export function TasksProvider({ children }) {
  const [generalTasks, setGeneralTasks] = useState([]);
  const [cronogramTasks, setCronogramTasks] = useState([]);
  // Track whether the initial load of tasks has completed.  This
  // prevents our persistence effects from writing empty arrays to
  // localStorage before the tasks have been initialised.
  const [loaded, setLoaded] = useState(false);

  // Initialize from localStorage or derive from default on first render
  useEffect(() => {
    // When mounting, determine whether to use stored tasks or reseed
    // them based on the seed version.  If either seed version is
    // missing or does not match TASKS_SEED_VERSION, we reseed by
    // deriving defaults.  Otherwise we load from localStorage.  This
    // prevents user-entered tasks from being overwritten by new
    // releases of the app while still allowing us to introduce new
    // default data when the version increases.
    try {
      const storedGeneralJson = localStorage.getItem('generalTasks');
      const storedCronoJson = localStorage.getItem('cronogramTasks');
      const generalSeed = localStorage.getItem('generalTasksSeed');
      const cronoSeed = localStorage.getItem('cronogramTasksSeed');
      const seedOk =
        generalSeed && parseInt(generalSeed, 10) === TASKS_SEED_VERSION &&
        cronoSeed && parseInt(cronoSeed, 10) === TASKS_SEED_VERSION;
      if (
        seedOk &&
        storedGeneralJson && storedCronoJson
      ) {
        const parsedGeneral = JSON.parse(storedGeneralJson);
        const parsedCrono = JSON.parse(storedCronoJson);
        if (
          Array.isArray(parsedGeneral) &&
          Array.isArray(parsedCrono)
        ) {
          setGeneralTasks(parsedGeneral);
          setCronogramTasks(parsedCrono);
          // signal that initial loading has completed
          setLoaded(true);
          return;
        }
      }
    } catch (e) {
      // fall through to reseed on any error
    }
    // Either version mismatch or no valid stored tasks: derive
    // defaults and persist them along with the current seed version
    const { generalTasks: defaultsGeneral, cronogramTasks: defaultsCronogram } = deriveInitialTasks();
    setGeneralTasks(defaultsGeneral);
    setCronogramTasks(defaultsCronogram);
    try {
      localStorage.setItem('generalTasks', JSON.stringify(defaultsGeneral));
      localStorage.setItem('cronogramTasks', JSON.stringify(defaultsCronogram));
      localStorage.setItem('generalTasksSeed', TASKS_SEED_VERSION.toString());
      localStorage.setItem('cronogramTasksSeed', TASKS_SEED_VERSION.toString());
    } catch (e) {
      /* ignore localStorage errors */
    }
    // signal that initial loading has completed
    setLoaded(true);
  }, []);

  // Persist changes to localStorage.  These effects are guarded by
  // the `loaded` flag so they do not run until after the initial
  // seeding has completed.  Without this guard the first render
  // would write empty arrays to localStorage, erasing any saved data.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('generalTasks', JSON.stringify(generalTasks));
    } catch (e) {
      /* ignore */
    }
  }, [generalTasks, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('cronogramTasks', JSON.stringify(cronogramTasks));
    } catch (e) {
      /* ignore */
    }
  }, [cronogramTasks, loaded]);

  /**
   * Add a new general task.  If a task with the same description already
   * exists, reuse it instead of creating a duplicate.  Returns the id
   * of the general task.
   */
  const addGeneralTask = ({ description, type = 'Única', dueDate = null }) => {
    const trimmed = description.trim();
    if (!trimmed) return null;
    // Check if exists
    const existing = generalTasks.find((t) => t.description.toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing.id;
    const newId = (generalTasks.length ? Math.max(...generalTasks.map((t) => t.id)) : 0) + 1;
    const newTask = {
      id: newId,
      description: trimmed,
      type,
      dueDate,
      done: false,
      deleted: false,
    };
    setGeneralTasks((prev) => {
      const updated = [...prev, newTask];
      // persist to localStorage immediately
      try {
        localStorage.setItem('generalTasks', JSON.stringify(updated));
      } catch (e) {
        /* ignore localStorage errors */
      }
      return updated;
    });
    return newId;
  };

  /**
   * Update a general task with new values.  If dueDate changes it
   * propagates to cronogram tasks that do not have individual overrides.
   */
  const updateGeneralTask = (id, updates) => {
    setGeneralTasks((prev) => {
      const updatedGeneral = prev.map((task) => (task.id === id ? { ...task, ...updates } : task));
      // persist to localStorage
      try {
        localStorage.setItem('generalTasks', JSON.stringify(updatedGeneral));
      } catch (e) {
        /* ignore */
      }
      return updatedGeneral;
    });
    // If dueDate updated, propagate to cronogram tasks without override
    if (updates && Object.prototype.hasOwnProperty.call(updates, 'dueDate')) {
      const newDueDate = updates.dueDate;
      setCronogramTasks((prev) => {
        const updatedCrono = prev.map((ct) => {
          if (ct.generalTaskId === id && !ct.overrideDueDate) {
            return { ...ct, baseDueDate: newDueDate };
          }
          return ct;
        });
        // persist to localStorage
        try {
          localStorage.setItem('cronogramTasks', JSON.stringify(updatedCrono));
        } catch (e) {
          /* ignore */
        }
        return updatedCrono;
      });
    }
    // If type updated, propagate type to cronogram tasks
    if (updates && Object.prototype.hasOwnProperty.call(updates, 'type')) {
      const newType = updates.type;
      setCronogramTasks((prev) => {
        const updatedCrono = prev.map((ct) => (ct.generalTaskId === id ? { ...ct, type: newType } : ct));
        try {
          localStorage.setItem('cronogramTasks', JSON.stringify(updatedCrono));
        } catch (e) {
          /* ignore */
        }
        return updatedCrono;
      });
    }
  };

  /**
   * Remove a general task.  Also remove any cronogram tasks that
   * reference it.
   */
  const removeGeneralTask = (id) => {
    // Soft-delete the general task and any associated cronogram tasks
    setGeneralTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, deleted: true } : t,
      );
      try {
        localStorage.setItem('generalTasks', JSON.stringify(updated));
      } catch (e) {
        /* ignore */
      }
      return updated;
    });
    setCronogramTasks((prev) => {
      const updated = prev.map((ct) =>
        ct.generalTaskId === id ? { ...ct, deleted: true } : ct,
      );
      try {
        localStorage.setItem('cronogramTasks', JSON.stringify(updated));
      } catch (e) {
        /* ignore */
      }
      return updated;
    });
  };

  /**
   * Add a cronogram task for a specific week and description/type.  If
   * a general task with the description exists it will be linked,
   * otherwise a new general task is created.  Returns the id of the
   * created cronogram task.
   */
  const addCronogramTask = ({ description, type = 'Única', week, dueDate = null }) => {
    if (!description || !week) return null;
    const trimmed = description.trim();
    let generalId = addGeneralTask({ description: trimmed, type, dueDate: null });
    // Compute a unique cronogram id
    const newCronId = (cronogramTasks.length ? Math.max(...cronogramTasks.map((ct) => ct.id)) : 0) + 1;
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
      deleted: false,
    };
    setCronogramTasks((prev) => {
      const updated = [...prev, newTask];
      try {
        localStorage.setItem('cronogramTasks', JSON.stringify(updated));
      } catch (e) {
        /* ignore */
      }
      return updated;
    });
    return newCronId;
  };

  /**
   * Update a cronogram task by id.  Accepts partial updates.  If
   * overrideDueDate is provided, it sets that property.
   */
  const updateCronogramTask = (id, updates) => {
    setCronogramTasks((prev) => {
      const updated = prev.map((ct) => (ct.id === id ? { ...ct, ...updates } : ct));
      try {
        localStorage.setItem('cronogramTasks', JSON.stringify(updated));
      } catch (e) {
        /* ignore */
      }
      return updated;
    });
  };

  /**
   * Remove a cronogram task by id.
   */
  const removeCronogramTask = (id) => {
    // Soft-delete the cronogram task
    setCronogramTasks((prev) => {
      const updated = prev.map((ct) =>
        ct.id === id ? { ...ct, deleted: true } : ct,
      );
      try {
        localStorage.setItem('cronogramTasks', JSON.stringify(updated));
      } catch (e) {
        /* ignore */
      }
      return updated;
    });
  };

  /**
   * Reset all tasks back to the default seed.  This will discard any
   * user-added or edited tasks.  It also updates the seed version
   * keys to the current TASKS_SEED_VERSION so that subsequent
   * reloads will use these defaults.
   */
  const resetTasks = () => {
    const { generalTasks: defaultsGeneral, cronogramTasks: defaultsCronogram } = deriveInitialTasks();
    setGeneralTasks(defaultsGeneral);
    setCronogramTasks(defaultsCronogram);
    try {
      localStorage.setItem('generalTasks', JSON.stringify(defaultsGeneral));
      localStorage.setItem('cronogramTasks', JSON.stringify(defaultsCronogram));
      localStorage.setItem('generalTasksSeed', TASKS_SEED_VERSION.toString());
      localStorage.setItem('cronogramTasksSeed', TASKS_SEED_VERSION.toString());
    } catch (e) {
      /* ignore localStorage errors */
    }
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

// Hook to use tasks context
export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return ctx;
}