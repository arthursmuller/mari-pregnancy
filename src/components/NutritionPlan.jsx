import React, { useState } from 'react';
import { useNutrition } from '../context/NutritionContext.jsx';

const MEAL_OPTIONS = ['Café da Manhã', 'Almoço', 'Jantar', 'Lanche', 'Sobremesa'];

export default function NutritionPlan() {
  const { generalFoods, addFoodItem, removeFoodItem, generalSupplements, addSupplementItem, removeSupplementItem } = useNutrition();
  
  // State Foods
  const [newFood, setNewFood] = useState({ name: '', category: 'Proteína', nutrients: '', quantity: '', mealTypes: [], description: '' });
  
  // State Supplements
  const [newSup, setNewSup] = useState({ name: '', dosage: '', frequency: '', notes: '' });

  // --- Handlers Foods ---
  const handleAddFood = () => {
    if (!newFood.name.trim()) return;
    const nutrientsArray = newFood.nutrients.split(',').map(s => s.trim()).filter(Boolean);
    addFoodItem({ ...newFood, nutrients: nutrientsArray });
    setNewFood({ name: '', category: 'Proteína', nutrients: '', quantity: '', mealTypes: [], description: '' });
  };

  const toggleMealType = (meal) => {
    setNewFood(prev => {
        if (prev.mealTypes.includes(meal)) return { ...prev, mealTypes: prev.mealTypes.filter(m => m !== meal) };
        else return { ...prev, mealTypes: [...prev.mealTypes, meal] };
    });
  };

  // --- Handlers Supplements ---
  const handleAddSup = () => {
      if(!newSup.name.trim()) return;
      addSupplementItem(newSup);
      setNewSup({ name: '', dosage: '', frequency: '', notes: '' });
  };

  return (
    <div className="space-y-12">
      
      {/* ============ BANCO DE ALIMENTOS ============ */}
      <section className="space-y-6">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h2 className="text-3xl font-bold text-green-900 mb-2">Banco de Alimentos</h2>
            <p className="text-green-700">Cadastre aqui alimentos e suas possibilidades de refeição.</p>
        </div>

        {/* Form Alimentos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Novo Alimento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome</label>
                    <input type="text" placeholder="Ex: Batata Doce" className="w-full text-sm border-gray-200 rounded focus:ring-green-500" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoria</label>
                    <select className="w-full text-sm border-gray-200 rounded focus:ring-green-500" value={newFood.category} onChange={e => setNewFood({...newFood, category: e.target.value})}>
                        <option value="Proteína">Proteína</option>
                        <option value="Vegetais">Vegetais</option>
                        <option value="Frutas">Frutas</option>
                        <option value="Carboidratos">Carboidratos</option>
                        <option value="Gordura Boa">Gordura Boa</option>
                        <option value="Laticínios">Laticínios</option>
                        <option value="Doce/Extra">Doce/Extra</option>
                        <option value="Substituto/Veg">Substituto/Veg</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Qtd. Padrão</label>
                    <input type="text" placeholder="Ex: 1 porção" className="w-full text-sm border-gray-200 rounded focus:ring-green-500" value={newFood.quantity} onChange={e => setNewFood({...newFood, quantity: e.target.value})} />
                </div>
                <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição</label>
                    <textarea placeholder="Benefícios..." className="w-full text-sm border-gray-200 rounded focus:ring-green-500" rows="2" value={newFood.description} onChange={e => setNewFood({...newFood, description: e.target.value})} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nutrientes</label>
                    <input type="text" placeholder="Ex: Vit A, Fibras" className="w-full text-sm border-gray-200 rounded focus:ring-green-500" value={newFood.nutrients} onChange={e => setNewFood({...newFood, nutrients: e.target.value})} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Refeições Possíveis</label>
                    <div className="flex flex-wrap gap-2">
                        {MEAL_OPTIONS.map(meal => (
                            <button key={meal} onClick={() => toggleMealType(meal)} className={`text-[10px] px-2 py-1 rounded border ${newFood.mealTypes.includes(meal) ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4 text-right">
                <button onClick={handleAddFood} className="bg-green-600 text-white font-medium py-2 px-6 rounded hover:bg-green-700">Adicionar Alimento</button>
            </div>
        </div>

        {/* Grid Alimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalFoods.map(food => (
                <div key={food.id} className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
                    <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${food.category === 'Doce/Extra' ? 'bg-pink-400' : food.category === 'Proteína' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                    <div className="pl-3">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800">{food.name}</h4>
                            <button onClick={() => removeFoodItem(food.id)} className="text-gray-300 hover:text-red-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{food.category}</span>
                        <p className="text-xs text-gray-500 italic mt-1 mb-2 min-h-[1.5em]">{food.description}</p>
                        <div className="text-sm text-gray-600 space-y-1">
                             <div className="flex flex-wrap gap-1 mb-2">
                                {food.mealTypes && food.mealTypes.map(m => <span key={m} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{m}</span>)}
                             </div>
                             <p className="text-xs"><strong>Nutrientes:</strong> {Array.isArray(food.nutrients) ? food.nutrients.join(', ') : food.nutrients}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* ============ BANCO DE SUPLEMENTOS ============ */}
      <section className="space-y-6 pt-6 border-t border-gray-200">
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h2 className="text-3xl font-bold text-purple-900 mb-2">Banco de Vitaminas & Suplementos</h2>
            <p className="text-purple-700">Gerencie as vitaminas que podem ser prescritas ao longo da gestação.</p>
        </div>

        {/* Form Suplementos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4">Nova Vitamina/Suplemento</h3>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome</label>
                    <input type="text" placeholder="Ex: Ômega 3" className="w-full text-sm border-gray-200 rounded focus:ring-purple-500" value={newSup.name} onChange={e => setNewSup({...newSup, name: e.target.value})} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dosagem</label>
                    <input type="text" placeholder="Ex: 500mg" className="w-full text-sm border-gray-200 rounded focus:ring-purple-500" value={newSup.dosage} onChange={e => setNewSup({...newSup, dosage: e.target.value})} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Frequência</label>
                    <input type="text" placeholder="Ex: 1x ao dia" className="w-full text-sm border-gray-200 rounded focus:ring-purple-500" value={newSup.frequency} onChange={e => setNewSup({...newSup, frequency: e.target.value})} />
                </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Notas</label>
                    <input type="text" placeholder="Ex: Tomar longe do café" className="w-full text-sm border-gray-200 rounded focus:ring-purple-500" value={newSup.notes} onChange={e => setNewSup({...newSup, notes: e.target.value})} />
                </div>
             </div>
             <div className="mt-4 text-right">
                <button onClick={handleAddSup} className="bg-purple-600 text-white font-medium py-2 px-6 rounded hover:bg-purple-700">Adicionar Vitamina</button>
            </div>
        </div>

        {/* Grid Suplementos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generalSupplements.map(sup => (
                <div key={sup.id} className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
                     <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl bg-purple-400"></div>
                     <div className="pl-3">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800">{sup.name}</h4>
                            <button onClick={() => removeSupplementItem(sup.id)} className="text-gray-300 hover:text-red-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                        <div className="mt-2 space-y-1 text-xs text-gray-600">
                             <p><strong className="text-purple-600">Dose:</strong> {sup.dosage}</p>
                             <p><strong className="text-purple-600">Freq:</strong> {sup.frequency}</p>
                             <p className="italic">{sup.notes}</p>
                        </div>
                     </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}