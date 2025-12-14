import React, { useState } from 'react';
import { useTasks } from '../context/TasksContext.jsx';

export default function TasksOverall() {
  const { generalTasks, updateGeneralTask, removeGeneralTask, addGeneralTask } = useTasks();
  const [newTask, setNewTask] = useState({ description: '', dueDate: '', type: 'Única' });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ description: '', dueDate: '', type: 'Única' });

  const toggleDone = (id) => {
    const task = generalTasks.find((t) => t.id === id);
    if (task) updateGeneralTask(id, { done: !task.done });
  };

  const addTask = () => {
    if (!newTask.description.trim()) return;
    addGeneralTask({ description: newTask.description.trim(), type: newTask.type || 'Única', dueDate: newTask.dueDate || null });
    setNewTask({ description: '', dueDate: '', type: 'Única' });
  };

  const saveEdit = (id) => {
    updateGeneralTask(id, { description: editValues.description.trim(), dueDate: editValues.dueDate || null, type: editValues.type || 'Única' });
    setEditingId(null);
  };

  const startEditing = (task) => {
      setEditingId(task.id);
      setEditValues({ description: task.description, dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '', type: task.type });
  }

  const now = new Date();
  const activeTasks = generalTasks.filter(t => !t.deleted && !t.done);
  const completedTasks = generalTasks.filter(t => !t.deleted && t.done);

  const TaskItem = ({ task }) => {
    const due = task.dueDate ? new Date(task.dueDate) : null;
    const isOverdue = due && due < now && !task.done;
    const isEditing = editingId === task.id;

    if (isEditing) {
        return (
            <div className="bg-white p-4 rounded-xl border-2 border-primary shadow-sm flex flex-col gap-3 mb-3">
                <input type="text" className="w-full border-gray-200 rounded focus:ring-primary focus:border-primary text-sm" value={editValues.description} onChange={e => setEditValues({...editValues, description: e.target.value})} />
                <div className="flex gap-2">
                    <input type="date" className="border-gray-200 rounded text-sm" value={editValues.dueDate} onChange={e => setEditValues({...editValues, dueDate: e.target.value})} />
                    <select className="border-gray-200 rounded text-sm" value={editValues.type} onChange={e => setEditValues({...editValues, type: e.target.value})}>
                         <option value="Única">Única</option><option value="Continuada">Continuada</option><option value="Periódica">Periódica</option>
                    </select>
                    <button onClick={() => saveEdit(task.id)} className="bg-primary text-white px-3 py-1 rounded text-sm ml-auto">Salvar</button>
                </div>
            </div>
        )
    }

    return (
        <div className={`group flex items-center justify-between p-4 bg-white rounded-xl border ${isOverdue ? 'border-red-200 bg-red-50/30' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all mb-2`}>
            <div className="flex items-center gap-3 flex-grow">
                <div onClick={() => toggleDone(task.id)} className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center transition-colors ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-primary'}`}>
                    {task.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <div>
                    <p className={`text-sm font-medium ${task.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{task.description}</p>
                    <div className="flex gap-2 text-xs mt-1">
                        <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{task.type}</span>
                        {due && <span className={`${isOverdue ? 'text-red-500 font-bold' : 'text-gray-400'}`}>Até {due.toLocaleDateString()}</span>}
                    </div>
                </div>
            </div>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEditing(task)} className="p-1 text-gray-400 hover:text-blue-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                <button onClick={() => removeGeneralTask(task.id)} className="p-1 text-gray-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex-shrink-0">Tarefas Gerais</h2>
      
      {/* Input Area - Fixed at top */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <input type="text" placeholder="Adicionar nova tarefa..." className="flex-grow border-none focus:ring-0 text-gray-700 bg-transparent px-4" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} onKeyDown={e => e.key === 'Enter' && addTask()} />
          <div className="flex gap-2">
            <select className="border-none bg-gray-50 rounded-xl text-sm text-gray-600 focus:ring-0" value={newTask.type} onChange={e => setNewTask({...newTask, type: e.target.value})}>
                <option value="Única">Única</option><option value="Continuada">Continuada</option>
            </select>
            <input type="date" className="border-none bg-gray-50 rounded-xl text-sm text-gray-600 focus:ring-0" value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} />
            <button onClick={addTask} className="bg-primary hover:bg-primary-dark text-white rounded-xl px-6 font-medium transition-colors">Add</button>
          </div>
      </div>

      {/* Scrollable List Container */}
      <div className="flex-grow overflow-y-auto max-h-[600px] pr-2 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        <div>
            <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm py-2 z-10 mb-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Pendentes ({activeTasks.length})</h3>
            </div>
            <div className="space-y-1">
                {activeTasks.length > 0 ? activeTasks.map(t => <TaskItem key={t.id} task={t} />) : <p className="text-gray-400 italic ml-1 p-4 text-center border border-dashed border-gray-200 rounded-xl">Tudo feito! 🎉</p>}
            </div>
        </div>
        
        {completedTasks.length > 0 && (
            <div>
                 <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm py-2 z-10 mb-2 mt-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Concluídas ({completedTasks.length})</h3>
                 </div>
                <div className="space-y-1 opacity-60 hover:opacity-100 transition-opacity">
                    {completedTasks.map(t => <TaskItem key={t.id} task={t} />)}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}