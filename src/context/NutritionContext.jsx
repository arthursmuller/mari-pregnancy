import React, { createContext, useContext, useState, useEffect } from 'react';
import { weeklyData } from '../data';

const NutritionContext = createContext();

export const useNutrition = () => useContext(NutritionContext);

// Atualizado para 8 para aplicar a nova estrutura de dados com valores nutricionais
const NUTRITION_SEED_VERSION = 8; 

// --- METAS DIÁRIAS (Baseado no Guia) ---
export const DAILY_NUTRIENT_GOALS = {
  'Proteína': { target: 75, unit: 'g' }, // Guia sugere ~71g+
  'Ferro': { target: 48, unit: 'mg' },   // Guia específico
  'Cálcio': { target: 1000, unit: 'mg' },
  'Colina': { target: 450, unit: 'mg' },
  'Vitamina B12': { target: 2.6, unit: 'mcg' },
  'Folato': { target: 600, unit: 'mcg' }, // 400 suplemento + 200 dieta
  'Vitamina C': { target: 85, unit: 'mg' },
  'Vitamina D': { target: 600, unit: 'UI' },
  'Ômega-3': { target: 300, unit: 'mg' }, // DHA/EPA
  'Fibras': { target: 28, unit: 'g' },
  'Magnésio': { target: 350, unit: 'mg' }
};

export const NUTRIENT_LIST = Object.keys(DAILY_NUTRIENT_GOALS);

// --- BANCO DE ALIMENTOS COM VALORES (Estimativas por porção padrão) ---
const DEFAULT_FOODS = [
  { id: '1', name: 'Ovos Cozidos/Mexidos', category: 'Proteína', nutrients: ['Colina', 'Proteína', 'Vitamina B12'], nutritionalValues: { 'Proteína': 13, 'Colina': 294, 'Vitamina B12': 1.0, 'Ferro': 1.2 }, quantity: '2 unidades', mealTypes: ['Café da Manhã', 'Jantar'], description: 'Fonte excelente de colina.' },
  { id: '2', name: 'Fígado Bovino', category: 'Proteína', nutrients: ['Ferro', 'Vitamina A', 'Vitamina B12'], nutritionalValues: { 'Proteína': 20, 'Ferro': 5, 'Vitamina B12': 60, 'Colina': 300 }, quantity: '1 bife pq (80g)', mealTypes: ['Almoço', 'Jantar'], description: 'Superalimento para anemia.' },
  { id: '3', name: 'Tilápia / Peixe Branco', category: 'Proteína', nutrients: ['Proteína', 'Ômega-3'], nutritionalValues: { 'Proteína': 20, 'Ômega-3': 150 }, quantity: '1 filé (100g)', mealTypes: ['Almoço', 'Jantar'], description: 'Leve.' },
  { id: '4', name: 'Tofu (Grelhado)', category: 'Substituto/Veg', nutrients: ['Cálcio', 'Proteína', 'Ferro'], nutritionalValues: { 'Proteína': 10, 'Cálcio': 250, 'Ferro': 2 }, quantity: '100g', mealTypes: ['Almoço', 'Jantar'], description: 'Rico em cálcio.' },
  { id: '5', name: 'Lentilhas / Feijões', category: 'Leguminosas', nutrients: ['Ferro', 'Fibras', 'Folato'], nutritionalValues: { 'Ferro': 3.5, 'Fibras': 8, 'Folato': 180, 'Proteína': 9 }, quantity: '1 concha', mealTypes: ['Almoço', 'Jantar'], description: 'Ferro vegetal.' },
  { id: '6', name: 'Azeite Extra Virgem', category: 'Gordura Boa', nutrients: ['Gorduras Boas'], nutritionalValues: { 'Gorduras Boas': 14 }, quantity: '1 colher sopa', mealTypes: ['Almoço', 'Jantar'], description: 'Cru na salada.' },
  { id: '7', name: 'Brócolis (Vapor)', category: 'Vegetais', nutrients: ['Cálcio', 'Vitamina C', 'Fibras'], nutritionalValues: { 'Cálcio': 40, 'Vitamina C': 80, 'Fibras': 5, 'Folato': 50 }, quantity: '1 xícara', mealTypes: ['Almoço', 'Jantar'], description: 'Imunidade.' },
  { id: '8', name: 'Espinafre (Refogado)', category: 'Vegetais', nutrients: ['Ferro', 'Cálcio', 'Folato'], nutritionalValues: { 'Ferro': 3, 'Cálcio': 120, 'Folato': 100, 'Fibras': 4 }, quantity: '1 pires', mealTypes: ['Almoço', 'Jantar'], description: 'Folhas escuras.' },
  { id: '9', name: 'Iogurte Natural', category: 'Laticínios', nutrients: ['Cálcio', 'Proteína'], nutritionalValues: { 'Cálcio': 300, 'Proteína': 8, 'Vitamina B12': 0.5 }, quantity: '1 pote (170g)', mealTypes: ['Café da Manhã', 'Lanche'], description: 'Flora intestinal.' },
  { id: '10', name: 'Aveia em Flocos', category: 'Carboidratos', nutrients: ['Fibras', 'Ferro'], nutritionalValues: { 'Fibras': 4, 'Ferro': 1.5, 'Proteína': 5 }, quantity: '2 colheres sopa', mealTypes: ['Café da Manhã', 'Lanche'], description: 'Intestino.' },
  { id: '11', name: 'Suco de Laranja', category: 'Frutas', nutrients: ['Vitamina C', 'Folato'], nutritionalValues: { 'Vitamina C': 100, 'Folato': 50 }, quantity: '1 copo (200ml)', mealTypes: ['Café da Manhã', 'Lanche'], description: 'Absorção de ferro.' },
  { id: '12', name: 'Queijo Mussarela', category: 'Laticínios', nutrients: ['Cálcio', 'Proteína'], nutritionalValues: { 'Cálcio': 400, 'Proteína': 14 }, quantity: '2 fatias', mealTypes: ['Café da Manhã', 'Lanche'], description: 'Cálcio prático.' },
  { id: '13', name: 'Banana Prata', category: 'Frutas', nutrients: ['Potássio', 'Vitamina B6'], nutritionalValues: { 'Potássio': 400, 'Vitamina B6': 0.4, 'Fibras': 3 }, quantity: '1 unidade', mealTypes: ['Lanche'], description: 'Câimbras.' },
  { id: '14', name: 'Grão de Bico', category: 'Leguminosas', nutrients: ['Folato', 'Proteína', 'Fibras'], nutritionalValues: { 'Folato': 280, 'Proteína': 10, 'Fibras': 10, 'Ferro': 3 }, quantity: '1 concha', mealTypes: ['Almoço', 'Jantar'], description: 'Muito folato.' },
  { id: '15', name: 'Semente de Abóbora', category: 'Gordura Boa', nutrients: ['Magnésio', 'Ferro'], nutritionalValues: { 'Magnésio': 150, 'Ferro': 2.5, 'Proteína': 7 }, quantity: '1 colher sopa', mealTypes: ['Lanche'], description: 'Magnésio top.' },
  { id: '16', name: 'Frango Grelhado', category: 'Proteína', nutrients: ['Proteína', 'Vitamina B6'], nutritionalValues: { 'Proteína': 30, 'Vitamina B6': 0.5 }, quantity: '1 filé (100g)', mealTypes: ['Almoço', 'Jantar'], description: 'Básico.' },
  { id: '17', name: 'Chocolate 70%', category: 'Doce/Extra', nutrients: ['Magnésio'], nutritionalValues: { 'Magnésio': 40 }, quantity: '2 quadradinhos', mealTypes: ['Sobremesa'], description: 'Alegria.' },
  { id: '18', name: 'Kiwi', category: 'Frutas', nutrients: ['Vitamina C', 'Fibras'], nutritionalValues: { 'Vitamina C': 130, 'Fibras': 4 }, quantity: '2 unidades', mealTypes: ['Lanche'], description: 'Vitamina C pura.' },
];

// --- BANCO DE SUPLEMENTOS ---
const DEFAULT_SUPPLEMENTS = [
    { id: 's1', name: 'Metilfolato', nutrients: ['Folato'], nutritionalValues: { 'Folato': 400 }, dosage: '400mcg', frequency: '1x dia', notes: 'Tubo Neural.' },
    { id: 's2', name: 'Vitamina B12', nutrients: ['Vitamina B12'], nutritionalValues: { 'Vitamina B12': 9.0 }, dosage: 'Exame dep.', frequency: '1x dia', notes: 'Essencial.' },
    { id: 's3', name: 'Ferro', nutrients: ['Ferro'], nutritionalValues: { 'Ferro': 40 }, dosage: '40mg', frequency: '1x dia', notes: 'Anemia.' },
    { id: 's4', name: 'Ômega-3', nutrients: ['Ômega-3'], nutritionalValues: { 'Ômega-3': 300 }, dosage: '2 caps', frequency: '1x dia', notes: 'Cérebro.' },
    { id: 's5', name: 'Cálcio + D', nutrients: ['Cálcio', 'Vitamina D'], nutritionalValues: { 'Cálcio': 500, 'Vitamina D': 400 }, dosage: '1 comp', frequency: '1x dia', notes: 'Ossos.' },
    { id: 's6', name: 'Polivitamínico', nutrients: ['Folato', 'Ferro', 'Vitamina D', 'Vitamina B12'], nutritionalValues: { 'Folato': 400, 'Ferro': 30, 'Vitamina D': 400, 'Vitamina B12': 2.6 }, dosage: '1 caps', frequency: '1x dia', notes: 'Geral.' },
];

const STANDARD_FOOD_ROUTINE = [
  { foodId: '1', assignedMeal: 'Café da Manhã' }, // Ovos
  { foodId: '10', assignedMeal: 'Café da Manhã' }, // Aveia
  { foodId: '13', assignedMeal: 'Lanche' }, // Banana
  { foodId: '5', assignedMeal: 'Almoço' }, // Feijão
  { foodId: '7', assignedMeal: 'Almoço' }, // Brócolis
  { foodId: '16', assignedMeal: 'Almoço' }, // Frango
  { foodId: '6', assignedMeal: 'Almoço' }, // Azeite
  { foodId: '17', assignedMeal: 'Sobremesa' }, // Choc
  { foodId: '9', assignedMeal: 'Lanche' }, // Iogurte
  { foodId: '3', assignedMeal: 'Jantar' }, // Peixe
];

export const NutritionProvider = ({ children }) => {
  const [generalFoods, setGeneralFoods] = useState([]);
  const [generalSupplements, setGeneralSupplements] = useState([]);
  const [weeklyPlans, setWeeklyPlans] = useState({}); 
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const initData = () => {
      try {
        const savedSeed = localStorage.getItem('nutrition_seed_version');
        const savedFoods = localStorage.getItem('nutrition_general_foods');
        const savedSupplements = localStorage.getItem('nutrition_general_supplements');
        const savedPlans = localStorage.getItem('nutrition_weekly_plans');

        if (savedSeed && parseInt(savedSeed) === NUTRITION_SEED_VERSION && savedFoods && savedPlans && savedSupplements) {
          setGeneralFoods(JSON.parse(savedFoods));
          setGeneralSupplements(JSON.parse(savedSupplements));
          setWeeklyPlans(JSON.parse(savedPlans));
        } else {
          setGeneralFoods(DEFAULT_FOODS);
          setGeneralSupplements(DEFAULT_SUPPLEMENTS);
          const initialPlans = {};
          
          weeklyData.forEach(week => {
            const foodItems = STANDARD_FOOD_ROUTINE.map(routineItem => {
              const food = DEFAULT_FOODS.find(f => f.id === routineItem.foodId);
              if (!food) return null;
              return {
                uniqueId: Date.now() + Math.random().toString(),
                foodId: food.id,
                name: food.name,
                quantity: food.quantity,
                portions: 1, // NOVO CAMPO: Porções
                nutrients: food.nutrients,
                nutritionalValues: food.nutritionalValues || {}, // NOVO
                mealTypeAssigned: routineItem.assignedMeal,
                description: food.description
              };
            }).filter(Boolean);

            let vitaminIds = ['s2', 's6']; // B12 + Poli
            if (week.weekNumber <= 13) vitaminIds.push('s1');
            if (week.weekNumber > 13) vitaminIds.push('s3', 's4');
            if (week.weekNumber > 20) vitaminIds.push('s5');

            const vitaminItems = vitaminIds.map(vid => {
                const sup = DEFAULT_SUPPLEMENTS.find(s => s.id === vid);
                if(!sup) return null;
                return {
                    uniqueId: Date.now() + Math.random().toString(),
                    supplementId: sup.id,
                    name: sup.name,
                    nutrients: sup.nutrients || [],
                    nutritionalValues: sup.nutritionalValues || {}, // NOVO
                    dosage: sup.dosage,
                    frequency: sup.frequency,
                    notes: sup.notes
                };
            }).filter(Boolean);

            // Metas Smart Default
            let targets = ['Proteína', 'Ferro', 'Cálcio', 'Colina', 'Fibras']; 

            initialPlans[week.weekNumber] = {
              goals: week.dietaryFocus ? week.dietaryFocus.join(', ') : '',
              targetNutrients: targets,
              description: '',
              items: foodItems,
              supplements: vitaminItems
            };
          });
          setWeeklyPlans(initialPlans);
          localStorage.setItem('nutrition_seed_version', NUTRITION_SEED_VERSION.toString());
        }
      } catch (e) {
        console.error("Erro seeding", e);
      }
      setLoaded(true);
    };
    initData();
  }, []);

  useEffect(() => { if (loaded) localStorage.setItem('nutrition_general_foods', JSON.stringify(generalFoods)); }, [generalFoods, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem('nutrition_general_supplements', JSON.stringify(generalSupplements)); }, [generalSupplements, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem('nutrition_weekly_plans', JSON.stringify(weeklyPlans)); }, [weeklyPlans, loaded]);

  const addFoodItem = (food) => setGeneralFoods(prev => [...prev, { ...food, id: Date.now().toString() }]);
  const removeFoodItem = (id) => setGeneralFoods(prev => prev.filter(f => f.id !== id));
  const addSupplementItem = (sup) => setGeneralSupplements(prev => [...prev, { ...sup, id: Date.now().toString() }]);
  const removeSupplementItem = (id) => setGeneralSupplements(prev => prev.filter(s => s.id !== id));

  const addFoodToWeek = (week, foodData) => {
    setWeeklyPlans(prev => {
      const current = prev[week] || { items: [], supplements: [], targetNutrients: [] };
      // Garante que porções seja 1 se não vier
      return { ...prev, [week]: { ...current, items: [...current.items, { ...foodData, portions: 1, uniqueId: Date.now().toString() }] } };
    });
  };

  const removeFoodFromWeek = (week, uniqueId) => {
    setWeeklyPlans(prev => {
      const current = prev[week];
      return { ...prev, [week]: { ...current, items: current.items.filter(i => i.uniqueId !== uniqueId) } };
    });
  };
  
  // NOVA FUNÇÃO: Atualizar item específico na semana (para porções)
  const updateFoodInWeek = (week, uniqueId, updates) => {
      setWeeklyPlans(prev => {
          const current = prev[week];
          const updatedItems = current.items.map(item => {
              if (item.uniqueId === uniqueId) return { ...item, ...updates };
              return item;
          });
          return { ...prev, [week]: { ...current, items: updatedItems }};
      });
  };

  const addVitaminToWeek = (week, vitaminData) => {
    setWeeklyPlans(prev => {
        const current = prev[week] || { items: [], supplements: [], targetNutrients: [] };
        return { ...prev, [week]: { ...current, supplements: [...(current.supplements||[]), { ...vitaminData, uniqueId: Date.now().toString() }] } };
    });
  };
  const removeVitaminFromWeek = (week, uniqueId) => {
    setWeeklyPlans(prev => {
        const current = prev[week];
        return { ...prev, [week]: { ...current, supplements: current.supplements.filter(s => s.uniqueId !== uniqueId) } };
    });
  };
  const updateWeekPlan = (week, updates) => {
    setWeeklyPlans(prev => ({ ...prev, [week]: { ...(prev[week] || { items: [], supplements: [], targetNutrients: [] }), ...updates } }));
  };
  const swapFoodInWeek = (week, uniqueId, newFoodId) => {
    const newFood = generalFoods.find(f => f.id === newFoodId);
    if (!newFood) return;
    setWeeklyPlans(prev => {
      const current = prev[week];
      const updatedItems = current.items.map(item => {
        if (item.uniqueId === uniqueId) {
          return { 
              ...item, 
              foodId: newFood.id, name: newFood.name, quantity: newFood.quantity, 
              nutrients: newFood.nutrients, nutritionalValues: newFood.nutritionalValues || {},
              description: newFood.description 
          };
        }
        return item;
      });
      return { ...prev, [week]: { ...current, items: updatedItems } };
    });
  };

  return (
    <NutritionContext.Provider value={{ 
      generalFoods, generalSupplements, weeklyPlans, 
      addFoodItem, removeFoodItem, addSupplementItem, removeSupplementItem,
      addFoodToWeek, removeFoodFromWeek, updateFoodInWeek, // Exportada nova função
      addVitaminToWeek, removeVitaminFromWeek,
      updateWeekPlan, swapFoodInWeek 
    }}>
      {children}
    </NutritionContext.Provider>
  );
};