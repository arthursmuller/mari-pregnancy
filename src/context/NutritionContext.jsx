import React, { createContext, useContext, useState, useEffect } from 'react';
import { weeklyData } from '../data';

const NutritionContext = createContext();

export const useNutrition = () => useContext(NutritionContext);

const NUTRITION_SEED_VERSION = 3; // Incrementado para incluir Suplementos

// --- BANCO DE ALIMENTOS (Mantido) ---
const DEFAULT_FOODS = [
  { id: '1', name: 'Ovos Cozidos/Mexidos', category: 'Proteína', nutrients: ['Colina', 'Proteína', 'B12'], quantity: '2 unidades', mealTypes: ['Café da Manhã', 'Jantar'], description: 'Fonte excelente de colina para o cérebro do bebê.' },
  { id: '2', name: 'Fígado Bovino (Bem passado)', category: 'Proteína', nutrients: ['Ferro', 'Vitamina A', 'B12'], quantity: '1 bife pq', mealTypes: ['Almoço', 'Jantar'], description: 'Superalimento para combater anemia.' },
  { id: '3', name: 'Tilápia / Peixe Branco', category: 'Proteína', nutrients: ['Proteína', 'Ômega-3 leve'], quantity: '1 filé médio', mealTypes: ['Almoço', 'Jantar'], description: 'Proteína leve de fácil digestão.' },
  { id: '4', name: 'Tofu (Grelhado)', category: 'Substituto/Veg', nutrients: ['Cálcio', 'Proteína'], quantity: '100g', mealTypes: ['Almoço', 'Jantar'], description: 'Opção vegetal rica em cálcio.' },
  { id: '5', name: 'Lentilhas / Feijões', category: 'Leguminosas', nutrients: ['Ferro', 'Fibras', 'Folato'], quantity: '1 concha', mealTypes: ['Almoço', 'Jantar'], description: 'Essencial para fibras e ferro vegetal.' },
  { id: '6', name: 'Azeite de Oliva Extra Virgem', category: 'Gordura Boa', nutrients: ['Gorduras Mono', 'Vit E'], quantity: '1 colher sopa', mealTypes: ['Almoço', 'Jantar'], description: 'Use cru sobre a salada.' },
  { id: '7', name: 'Manteiga', category: 'Gordura', nutrients: ['Energia', 'Vit A'], quantity: 'Ponta de faca', mealTypes: ['Café da Manhã', 'Lanche'], description: 'Com moderação no pão integral.' },
  { id: '8', name: 'Espinafre / Escuro Verde', category: 'Vegetais', nutrients: ['Ferro', 'Cálcio', 'Folato'], quantity: '1 pires', mealTypes: ['Almoço', 'Jantar'], description: 'Folhas escuras são vitais.' },
  { id: '9', name: 'Chocolate 70% Cacau', category: 'Doce/Extra', nutrients: ['Antioxidantes', 'Magnésio'], quantity: '2 quadradinhos', mealTypes: ['Sobremesa', 'Lanche'], description: 'Para matar a vontade de doce com saúde.' },
  { id: '10', name: 'Açaí (Puro)', category: 'Doce/Extra', nutrients: ['Antioxidantes', 'Energia'], quantity: '1 bowl peq', mealTypes: ['Lanche', 'Café da Manhã'], description: 'Sem xarope, bata com banana.' },
  { id: '11', name: 'Iogurte Natural', category: 'Laticínios', nutrients: ['Cálcio', 'Probióticos'], quantity: '1 pote', mealTypes: ['Café da Manhã', 'Lanche', 'Sobremesa'], description: 'Bom para a flora intestinal.' },
  { id: '12', name: 'Mix Castanhas', category: 'Gordura Boa', nutrients: ['Ômega-3', 'Magnésio'], quantity: '3 unidades', mealTypes: ['Lanche', 'Café da Manhã'], description: 'Lanche prático para levar na bolsa.' },
  { id: '13', name: 'Frango Grelhado', category: 'Proteína', nutrients: ['Proteína', 'Vit B6'], quantity: '1 filé', mealTypes: ['Almoço', 'Jantar'], description: 'Proteína magra básica.' },
  { id: '14', name: 'Aveia em Flocos', category: 'Carboidratos', nutrients: ['Fibras', 'Ferro'], quantity: '2 colheres sopa', mealTypes: ['Café da Manhã', 'Lanche'], description: 'Ótimo para regular o intestino.' },
];

// --- BANCO DE SUPLEMENTOS (Novo) ---
const DEFAULT_SUPPLEMENTS = [
    { id: 's1', name: 'Metilfolato / Ácido Fólico', dosage: '400mcg', frequency: '1x dia (Manhã)', notes: 'Essencial até 12 semanas (Tubo Neural).' },
    { id: 's2', name: 'Vitamina B12', dosage: 'Conforme exame', frequency: '1x dia', notes: 'Crítico para vegetarianas (Sistema Nervoso).' },
    { id: 's3', name: 'Ferro (Quelado)', dosage: '30-60mg', frequency: '1x dia (Almoço)', notes: 'Evitar anemia. Tomar com Vit C (limão/laranja).' },
    { id: 's4', name: 'Ômega-3 (DHA)', dosage: '200mg DHA', frequency: '1x dia (Jantar)', notes: 'Desenvolvimento cerebral do bebê.' },
    { id: 's5', name: 'Cálcio + Vit D', dosage: '500mg', frequency: '1x dia (Lanche)', notes: 'Ossos do bebê. Longe do ferro.' },
    { id: 's6', name: 'Polivitamínico Gestante', dosage: '1 caps', frequency: '1x dia', notes: 'Suporte geral (checar se tem ferro/cálcio).' },
    { id: 's7', name: 'Magnésio', dosage: '200mg', frequency: 'Noite', notes: 'Ajuda no sono e câimbras.' },
];

// Rotina Alimentar Padrão
const STANDARD_FOOD_ROUTINE = [
  { foodId: '1', assignedMeal: 'Café da Manhã' },
  { foodId: '14', assignedMeal: 'Café da Manhã' },
  { foodId: '5', assignedMeal: 'Almoço' },
  { foodId: '8', assignedMeal: 'Almoço' },
  { foodId: '13', assignedMeal: 'Almoço' },
  { foodId: '6', assignedMeal: 'Almoço' },
  { foodId: '9', assignedMeal: 'Sobremesa' },
  { foodId: '11', assignedMeal: 'Lanche' },
  { foodId: '3', assignedMeal: 'Jantar' },
];

export const NutritionProvider = ({ children }) => {
  const [generalFoods, setGeneralFoods] = useState([]);
  const [generalSupplements, setGeneralSupplements] = useState([]); // Novo State
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
          // Seeding inicial
          setGeneralFoods(DEFAULT_FOODS);
          setGeneralSupplements(DEFAULT_SUPPLEMENTS);

          const initialPlans = {};
          
          weeklyData.forEach(week => {
            // 1. Criar Itens de Comida
            const foodItems = STANDARD_FOOD_ROUTINE.map(routineItem => {
              const food = DEFAULT_FOODS.find(f => f.id === routineItem.foodId);
              if (!food) return null;
              return {
                uniqueId: Date.now() + Math.random().toString(),
                foodId: food.id,
                name: food.name,
                quantity: food.quantity,
                nutrients: food.nutrients,
                mealTypeAssigned: routineItem.assignedMeal,
                description: food.description
              };
            }).filter(Boolean);

            // 2. Definir Vitaminas baseadas na Semana
            let vitaminIds = [];
            // B12 sempre (vegetariana)
            vitaminIds.push('s2'); 

            if (week.weekNumber <= 13) {
                // 1º Tri: Foco em Metilfolato
                vitaminIds.push('s1'); 
            } else {
                // 2º e 3º Tri: Ferro, Cálcio, Omega 3
                vitaminIds.push('s3', 's4');
                if (week.weekNumber > 20) vitaminIds.push('s5'); // Cálcio extra mais tarde
            }

            const vitaminItems = vitaminIds.map(vid => {
                const sup = DEFAULT_SUPPLEMENTS.find(s => s.id === vid);
                if(!sup) return null;
                return {
                    uniqueId: Date.now() + Math.random().toString(),
                    supplementId: sup.id,
                    name: sup.name,
                    dosage: sup.dosage,
                    frequency: sup.frequency,
                    notes: sup.notes
                };
            }).filter(Boolean);

            initialPlans[week.weekNumber] = {
              goals: week.dietaryFocus ? week.dietaryFocus.join(', ') : 'Dieta equilibrada e hidratação.',
              description: 'Rotina padrão equilibrada com foco em proteínas e ferro.',
              items: foodItems,
              supplements: vitaminItems // Novo Array
            };
          });
          
          setWeeklyPlans(initialPlans);
          
          localStorage.setItem('nutrition_general_foods', JSON.stringify(DEFAULT_FOODS));
          localStorage.setItem('nutrition_general_supplements', JSON.stringify(DEFAULT_SUPPLEMENTS));
          localStorage.setItem('nutrition_weekly_plans', JSON.stringify(initialPlans));
          localStorage.setItem('nutrition_seed_version', NUTRITION_SEED_VERSION.toString());
        }
      } catch (e) {
        console.error("Erro seeding nutrição", e);
        setGeneralFoods(DEFAULT_FOODS);
        setGeneralSupplements(DEFAULT_SUPPLEMENTS);
        setWeeklyPlans({});
      }
      setLoaded(true);
    };

    initData();
  }, []);

  // Persistência
  useEffect(() => { if (loaded) localStorage.setItem('nutrition_general_foods', JSON.stringify(generalFoods)); }, [generalFoods, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem('nutrition_general_supplements', JSON.stringify(generalSupplements)); }, [generalSupplements, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem('nutrition_weekly_plans', JSON.stringify(weeklyPlans)); }, [weeklyPlans, loaded]);

  // Actions FOODS
  const addFoodItem = (food) => setGeneralFoods(prev => [...prev, { ...food, id: Date.now().toString() }]);
  const removeFoodItem = (id) => setGeneralFoods(prev => prev.filter(f => f.id !== id));

  // Actions SUPPLEMENTS
  const addSupplementItem = (sup) => setGeneralSupplements(prev => [...prev, { ...sup, id: Date.now().toString() }]);
  const removeSupplementItem = (id) => setGeneralSupplements(prev => prev.filter(s => s.id !== id));

  // Actions WEEKLY PLAN (Foods)
  const addFoodToWeek = (week, foodData) => {
    setWeeklyPlans(prev => {
      const current = prev[week] || { items: [], supplements: [] };
      return { ...prev, [week]: { ...current, items: [...current.items, { ...foodData, uniqueId: Date.now().toString() }] } };
    });
  };

  const removeFoodFromWeek = (week, uniqueId) => {
    setWeeklyPlans(prev => {
      const current = prev[week];
      return { ...prev, [week]: { ...current, items: current.items.filter(i => i.uniqueId !== uniqueId) } };
    });
  };

  // Actions WEEKLY PLAN (Supplements)
  const addVitaminToWeek = (week, vitaminData) => {
    setWeeklyPlans(prev => {
        const current = prev[week] || { items: [], supplements: [] };
        const currentSupplements = current.supplements || []; // Safety check
        return { 
            ...prev, 
            [week]: { 
                ...current, 
                supplements: [...currentSupplements, { ...vitaminData, uniqueId: Date.now().toString() }] 
            } 
        };
    });
  };

  const removeVitaminFromWeek = (week, uniqueId) => {
    setWeeklyPlans(prev => {
        const current = prev[week];
        return { 
            ...prev, 
            [week]: { 
                ...current, 
                supplements: current.supplements.filter(s => s.uniqueId !== uniqueId) 
            } 
        };
    });
  };

  const updateWeekPlan = (week, updates) => {
    setWeeklyPlans(prev => ({ ...prev, [week]: { ...(prev[week] || { items: [], supplements: [] }), ...updates } }));
  };

  const swapFoodInWeek = (week, uniqueId, newFoodId) => {
    const newFood = generalFoods.find(f => f.id === newFoodId);
    if (!newFood) return;
    setWeeklyPlans(prev => {
      const current = prev[week];
      const updatedItems = current.items.map(item => {
        if (item.uniqueId === uniqueId) {
          return { ...item, foodId: newFood.id, name: newFood.name, quantity: newFood.quantity, nutrients: newFood.nutrients, description: newFood.description };
        }
        return item;
      });
      return { ...prev, [week]: { ...current, items: updatedItems } };
    });
  };

  return (
    <NutritionContext.Provider value={{ 
      generalFoods, generalSupplements, weeklyPlans, 
      addFoodItem, removeFoodItem, 
      addSupplementItem, removeSupplementItem,
      addFoodToWeek, removeFoodFromWeek, 
      addVitaminToWeek, removeVitaminFromWeek,
      updateWeekPlan, swapFoodInWeek 
    }}>
      {children}
    </NutritionContext.Provider>
  );
};