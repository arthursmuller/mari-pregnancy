import React, { useState } from 'react';
import { useTasks } from '../context/TasksContext.jsx';

/**
 * The TasksOverall component provides a single source of truth for all
 * activities, appointments, purchases and exams up to o parto.  Users
 * can mark tasks as complete, edit their text or due date and remove
 * them entirely.  Tasks persist in localStorage.
 */
export default function TasksOverall() {
  // Access tasks context
  const {
    generalTasks,
    updateGeneralTask,
    removeGeneralTask,
    addGeneralTask,
  } = useTasks();

  const [newTask, setNewTask] = useState({ description: '', dueDate: '', type: 'Única' });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ description: '', dueDate: '', type: 'Única' });

  // Toggle completion status
  const toggleDone = (id) => {
    const task = generalTasks.find((t) => t.id === id);
    if (!task) return;
    updateGeneralTask(id, { done: !task.done });
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditValues({
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
      type: task.type || 'Única',
    });
  };
  const saveEdit = (id) => {
    updateGeneralTask(id, {
      description: editValues.description.trim(),
      dueDate: editValues.dueDate || null,
      type: editValues.type || 'Única',
    });
    setEditingId(null);
    setEditValues({ description: '', dueDate: '', type: 'Única' });
  };

  const addTask = () => {
    if (!newTask.description.trim()) return;
    addGeneralTask({
      description: newTask.description.trim(),
      type: newTask.type || 'Única',
      dueDate: newTask.dueDate || null,
    });
    setNewTask({ description: '', dueDate: '', type: 'Única' });
  };

  const now = new Date();
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Tarefas gerais</h2>
      <p className="text-sm text-gray-700 mb-4">
        Todas as tarefas consolidadas: consultas, compras, exames e
        atividades. Use o campo abaixo para adicionar notas ou tarefas
        adicionais.
      </p>
      {/* Add task form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Descrição da tarefa"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />
          <select
            value={newTask.type}
            onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="Única">Única</option>
            <option value="Continuada">Continuada</option>
            <option value="Periódica">Periódica</option>
            <option value="Execução diária">Execução diária</option>
          </select>
          <button
            onClick={addTask}
            className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark"
          >
            Adicionar
          </button>
        </div>
      </div>
      {/* Task list */}
      <div className="space-y-2">
        {/* Only show tasks that have not been soft-deleted */}
        {generalTasks.filter((t) => !t.deleted).map((task) => {
          const due = task.dueDate ? new Date(task.dueDate) : null;
          let statusColor = 'bg-yellow-50';
          if (task.done) statusColor = 'bg-green-50';
          else if (due && due < now) statusColor = 'bg-red-50';
          return (
            <div
              key={task.id}
              className={`${statusColor} border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                  className="mr-3"
                />
                {editingId === task.id ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm flex-grow mb-2 sm:mb-0"
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                    <input
                      type="date"
                      className="border rounded px-2 py-1 text-sm mb-2 sm:mb-0"
                      value={editValues.dueDate}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, dueDate: e.target.value }))
                      }
                    />
                    <select
                      className="border rounded px-2 py-1 text-sm mb-2 sm:mb-0"
                      value={editValues.type}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, type: e.target.value }))
                      }
                    >
                      <option value="Única">Única</option>
                      <option value="Continuada">Continuada</option>
                      <option value="Periódica">Periódica</option>
                      <option value="Execução diária">Execução diária</option>
                    </select>
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="bg-primary text-white px-2 py-1 rounded text-sm"
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className={`text-sm ${task.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.description}
                    </p>
                    {task.dueDate && (
                      <p className="text-xs text-gray-500">
                        Até {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">{task.type}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                {editingId !== task.id && (
                  <button
                    onClick={() => startEditing(task)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => removeGeneralTask(task.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}