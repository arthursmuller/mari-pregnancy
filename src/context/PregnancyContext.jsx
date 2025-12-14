import React, { createContext, useContext, useState, useEffect } from 'react';
import { TIMELINE_PHASES } from '../data/initial-data';

const PregnancyContext = createContext();

export const usePregnancy = () => useContext(PregnancyContext);

export const PregnancyProvider = ({ children }) => {
  const [hasInsurance, setHasInsurance] = useState(() => {
    const saved = localStorage.getItem('has_insurance');
    return saved ? JSON.parse(saved) : false; 
  });

  // Regenerate tasks if data structure changes
  const initialTasks = TIMELINE_PHASES.flatMap(phase => 
    phase.tasks.map(t => ({ ...t, phaseId: phase.id, completed: false }))
  );

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pregnancy_tasks_v2'); // New version key
    if (saved) {
        const parsed = JSON.parse(saved);
        // Simple merge strategy: keep completion status if ID matches
        return initialTasks.map(t => {
            const found = parsed.find(p => p.id === t.id);
            return found ? { ...t, completed: found.completed } : t;
        });
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('pregnancy_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('has_insurance', JSON.stringify(hasInsurance));
  }, [hasInsurance]);

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (newTask) => {
    setTasks(prev => [...prev, { ...newTask, id: Date.now().toString(), completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <PregnancyContext.Provider value={{ tasks, toggleTask, addTask, deleteTask, hasInsurance, setHasInsurance }}>
      {children}
    </PregnancyContext.Provider>
  );
};