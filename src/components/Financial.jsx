import React, { useState, useEffect } from 'react';
import { weeklyData, BABY_ITEMS_CHECKLIST_PRIORITIZED } from '../data';

// Local cost mapping used across components.  If you update values here,
// please also update the map in Cronograma.jsx for consistency.
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

// Keywords used to categorise tasks from weeklyData
const doctorKeywords = [
  'consulta',
  'obstetra',
  'nutricionista',
  'dentista',
  'fisioterapeuta',
  'pediatra',
  'anestesiologista',
];
const examKeywords = [
  'ultrassom',
  'usg',
  'teste',
  'exame',
  'curva glicêmica',
  'cardiotocografia',
  'cultura',
  'cotonete',
];
const purchaseKeywords = [
  'comprar',
  'compra',
  'encomendar',
  'mala',
  'farmacinha',
  'carrinho',
  'berço',
  'roupa',
  'kit',
  'banheira',
  'fraldas',
];

/*
 * Derive a flat list of costable items during pregnancy.  Each
 * appointment, exam or purchase is represented individually with
 * default cost, quantity and periodicity.  Inventory items that
 * should be bought before birth (e.g. moisés, carrinho) are also
 * included here with a one‑time recurrence.  This granular approach
 * allows the user to toggle each occurrence separately and edit
 * quantity, periodicity and unit cost.
 */
function generatePregnancyItems() {
  const items = [];
  let idCounter = 0;
  // Iterate through weekly tasks and extract those that represent
  // consultations, exams or shopping.  Each occurrence is treated as
  // independent.
  weeklyData.forEach((week) => {
    week.tasks.forEach((task) => {
      const text = task.text || '';
      const lower = text.toLowerCase();
      let include = false;
      let cost = 0;
      // Doctor visits
      if (doctorKeywords.some((kw) => lower.includes(kw))) {
        include = true;
        cost = 300;
      }
      // Exams
      if (examKeywords.some((kw) => lower.includes(kw))) {
        include = true;
        // Try to match a more specific cost from the map
        let matched = false;
        Object.keys(taskCostMap).forEach((key) => {
          if (lower.includes(key.toLowerCase())) {
            cost = taskCostMap[key];
            matched = true;
          }
        });
        if (!matched) cost = 200;
      }
      // Shopping/preparation
      if (purchaseKeywords.some((kw) => lower.includes(kw))) {
        include = true;
        let matchedPurchase = false;
        Object.keys(taskCostMap).forEach((key) => {
          if (lower.includes(key.toLowerCase())) {
            cost = taskCostMap[key];
            matchedPurchase = true;
          }
        });
        if (!matchedPurchase) cost = 100;
      }
      // Only push tasks that were classified as costable
      if (include) {
        items.push({
          id: idCounter++,
          name: text,
          cost,
          quantity: 1,
          periodicity: 1,
          included: true,
        });
      }
    });
  });
  // Add inventory items that are one‑time purchases before birth
  Object.entries(BABY_ITEMS_CHECKLIST_PRIORITIZED).forEach(([category, list]) => {
    list.forEach((it) => {
      const name = it.item;
      // Determine if this item recurs monthly; if not, it's a one‑time purchase
      let recurring = false;
      const lower = name.toLowerCase();
      if (category === 'diapering_and_hygiene') {
        if (lower.includes('fraldas') || lower.includes('lenços') || lower.includes('pomada')) recurring = true;
      }
      if (category === 'feeding') {
        if (lower.includes('paninhos')) recurring = true;
      }
      if (category === 'clothing') recurring = true;
      if (!recurring) {
        // Determine a default cost for the item; try to use taskCostMap
        let itemCost = 0;
        Object.keys(taskCostMap).forEach((key) => {
          if (lower.includes(key.toLowerCase())) itemCost = taskCostMap[key];
        });
        if (!itemCost) {
          // Fallback: assign moderate default based on type
          if (lower.includes('carrinho') || lower.includes('berço') || lower.includes('móveis')) itemCost = 1500;
          else itemCost = 200;
        }
        items.push({
          id: idCounter++,
          name,
          cost: itemCost,
          quantity: 1,
          periodicity: 1,
          included: true,
        });
      }
    });
  });
  return items;
}

/*
 * Derive a list of items that recur after birth.  Most clothing and
 * consumables (fraldas, lenços, etc.) are considered monthly expenses.
 * Additional items requested by the user (botinha, boné, bicicleta,
 * papinha, fraldas) are appended here with sensible default costs.
 */
function generateAfterBirthItems() {
  const items = [];
  let idCounter = 0;
  Object.entries(BABY_ITEMS_CHECKLIST_PRIORITIZED).forEach(([category, list]) => {
    list.forEach((it) => {
      const name = it.item;
      const lower = name.toLowerCase();
      let recurring = false;
      if (category === 'diapering_and_hygiene') {
        if (lower.includes('fraldas') || lower.includes('lenços') || lower.includes('pomada')) recurring = true;
      }
      if (category === 'feeding') {
        if (lower.includes('paninhos')) recurring = true;
      }
      if (category === 'clothing') recurring = true;
      if (recurring) {
        // Determine default cost; try to use taskCostMap if relevant
        let cost = 0;
        Object.keys(taskCostMap).forEach((key) => {
          if (lower.includes(key.toLowerCase())) cost = taskCostMap[key];
        });
        if (!cost) {
          if (lower.includes('fralda')) cost = 300;
          else if (lower.includes('lenço')) cost = 30;
          else if (lower.includes('pomada')) cost = 30;
          else if (lower.includes('macac') || lower.includes('bodies')) cost = 150;
          else if (lower.includes('meias') || lower.includes('botinha')) cost = 50;
          else cost = 100;
        }
        items.push({
          id: idCounter++,
          name,
          cost,
          quantity: 1,
          periodicity: 1,
          included: true,
        });
      }
    });
  });
  // Append extra items explicitly requested.  If an item already
  // exists in the list, we avoid duplicating it.
  const extra = ['Botinha', 'Boné', 'Bicicleta', 'Papinha', 'Fraldas'];
  extra.forEach((label) => {
    const exists = items.some((it) => it.name.toLowerCase() === label.toLowerCase());
    if (!exists) {
      const lower = label.toLowerCase();
      let cost = 100;
      if (lower.includes('fralda')) cost = 300;
      else if (lower.includes('papinha')) cost = 30;
      else if (lower.includes('botinha')) cost = 50;
      else if (lower.includes('boné')) cost = 40;
      else if (lower.includes('bicicleta')) cost = 500;
      items.push({
        id: idCounter++,
        name: label,
        cost,
        quantity: 1,
        periodicity: 1,
        included: true,
      });
    }
  });
  return items;
}

export default function Financial() {
  // State: lists of items for pregnancy and after birth.  We use
  // lazy initialisers to read any previously saved data from
  // localStorage.  This avoids a separate effect for loading and
  // ensures values persist between sessions.  If nothing is stored
  // yet, we fall back to the generated defaults.
  const [pregnancyItems, setPregnancyItems] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('financialPregnancyItems');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
    return generatePregnancyItems();
  });
  const [afterBirthItems, setAfterBirthItems] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('financialAfterBirthItems');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
    return generateAfterBirthItems();
  });

  // Persist changes to localStorage whenever the lists change.  Using
  // separate effects ensures that each list persists independently.
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('financialPregnancyItems', JSON.stringify(pregnancyItems));
      }
    } catch (e) {
      // ignore write errors
    }
  }, [pregnancyItems]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('financialAfterBirthItems', JSON.stringify(afterBirthItems));
      }
    } catch (e) {
      // ignore write errors
    }
  }, [afterBirthItems]);

  // Handlers to update fields on pregnancy items
  const handlePregChange = (id, field, value) => {
    setPregnancyItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    );
  };
  // Handlers to update fields on after birth items
  const handleAfterChange = (id, field, value) => {
    setAfterBirthItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    );
  };

  // Compute totals: pregnancy total (one‑time costs) and after birth monthly total
  const pregnancyTotal = pregnancyItems.reduce((sum, it) => {
    if (!it.included) return sum;
    const qty = parseFloat(it.quantity) || 0;
    const period = parseFloat(it.periodicity) || 1;
    const unitCost = parseFloat(it.cost) || 0;
    return sum + (unitCost * qty) / period;
  }, 0);
  const afterBirthTotal = afterBirthItems.reduce((sum, it) => {
    if (!it.included) return sum;
    const qty = parseFloat(it.quantity) || 0;
    const period = parseFloat(it.periodicity) || 1;
    const unitCost = parseFloat(it.cost) || 0;
    return sum + (unitCost * qty) / period;
  }, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Planejamento financeiro</h2>
      {/* Section: Pregnancy items */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold text-lg mb-3">Durante a gravidez</h3>
        <p className="text-sm text-gray-600 mb-2">
          Ajuste quantidade, periodicidade e valor de cada consulta, exame ou compra única
          realizada antes do parto. A periodicidade indica em quantos meses o valor
          indicado se repete (1 = mensal; para itens únicos mantenha 1).
        </p>
        <div className="hidden md:flex font-semibold text-xs text-gray-600 pb-2 border-b mb-2">
          <div className="w-6">&nbsp;</div>
          <div className="flex-grow">Item</div>
          <div className="w-16 text-center">Qtde</div>
          <div className="w-20 text-center">Período</div>
          <div className="w-20 text-center">Valor (R$)</div>
          <div className="w-24 text-center">Subtotal (R$)</div>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {pregnancyItems.map((it) => (
            <div key={it.id} className="flex flex-col md:flex-row items-start md:items-center text-sm">
              <div className="flex items-center w-full md:w-auto md:mr-2 mb-1 md:mb-0">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={it.included}
                  onChange={() => handlePregChange(it.id, 'included', !it.included)}
                />
                <span className="flex-grow md:w-64 pr-2 break-words">{it.name}</span>
              </div>
              <div className="flex w-full md:w-auto md:space-x-2">
                <input
                  type="number"
                  min="0"
                  className="border rounded w-16 px-1 text-center mb-1 md:mb-0"
                  value={it.quantity}
                  onChange={(e) => handlePregChange(it.id, 'quantity', e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  className="border rounded w-20 px-1 text-center mb-1 md:mb-0"
                  value={it.periodicity}
                  onChange={(e) => handlePregChange(it.id, 'periodicity', e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="border rounded w-20 px-1 text-center mb-1 md:mb-0"
                  value={it.cost}
                  onChange={(e) => handlePregChange(it.id, 'cost', e.target.value)}
                />
                <span className="w-24 text-right font-medium">
                  R$ {((parseFloat(it.cost) || 0) * (parseFloat(it.quantity) || 0) / (parseFloat(it.periodicity) || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right font-bold text-primary">
          Total: R$ {pregnancyTotal.toFixed(2)}
        </div>
      </div>
      {/* Section: After birth items */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold text-lg mb-3">Após o nascimento (mensal)</h3>
        <p className="text-sm text-gray-600 mb-2">
          Ajuste quantidade, periodicidade e valor de cada item recorrente após o nascimento.
          O custo mensal será calculado como (valor × quantidade) dividido pela
          periodicidade em meses.
        </p>
        <div className="hidden md:flex font-semibold text-xs text-gray-600 pb-2 border-b mb-2">
          <div className="w-6">&nbsp;</div>
          <div className="flex-grow">Item</div>
          <div className="w-16 text-center">Qtde</div>
          <div className="w-20 text-center">Período</div>
          <div className="w-20 text-center">Valor (R$)</div>
          <div className="w-24 text-center">Subtotal (R$)</div>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {afterBirthItems.map((it) => (
            <div key={it.id} className="flex flex-col md:flex-row items-start md:items-center text-sm">
              <div className="flex items-center w-full md:w-auto md:mr-2 mb-1 md:mb-0">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={it.included}
                  onChange={() => handleAfterChange(it.id, 'included', !it.included)}
                />
                <span className="flex-grow md:w-64 pr-2 break-words">{it.name}</span>
              </div>
              <div className="flex w-full md:w-auto md:space-x-2">
                <input
                  type="number"
                  min="0"
                  className="border rounded w-16 px-1 text-center mb-1 md:mb-0"
                  value={it.quantity}
                  onChange={(e) => handleAfterChange(it.id, 'quantity', e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  className="border rounded w-20 px-1 text-center mb-1 md:mb-0"
                  value={it.periodicity}
                  onChange={(e) => handleAfterChange(it.id, 'periodicity', e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="border rounded w-20 px-1 text-center mb-1 md:mb-0"
                  value={it.cost}
                  onChange={(e) => handleAfterChange(it.id, 'cost', e.target.value)}
                />
                <span className="w-24 text-right font-medium">
                  R$ {((parseFloat(it.cost) || 0) * (parseFloat(it.quantity) || 0) / (parseFloat(it.periodicity) || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right font-bold text-primary">
          Total mensal: R$ {afterBirthTotal.toFixed(2)}
        </div>
      </div>
      {/* Inventory list retained for reference */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg mb-3">Inventário de itens do bebê (referência)</h3>
        <p className="text-sm text-gray-600 mb-4">
          Esta lista orientativa mostra compras essenciais. Itens únicos devem ser adquiridos
          antes do parto; itens recorrentes precisam de reposição regular após o nascimento.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before birth list */}
          <div>
            <h4 className="font-semibold text-primary mb-2">Antes do nascimento (compra única)</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {Object.entries(BABY_ITEMS_CHECKLIST_PRIORITIZED).flatMap(([category, list]) =>
                list
                  .filter((it) => {
                    // Determine if item is one‑time
                    const lower = it.item.toLowerCase();
                    let recurring = false;
                    if (category === 'diapering_and_hygiene') {
                      if (lower.includes('fraldas') || lower.includes('lenços') || lower.includes('pomada')) recurring = true;
                    }
                    if (category === 'feeding') {
                      if (lower.includes('paninhos')) recurring = true;
                    }
                    if (category === 'clothing') recurring = true;
                    return !recurring;
                  })
                  .map((it) => (
                    <li key={it.item} className="flex flex-col">
                      <span>
                        <strong>{it.item}</strong> – {it.note}
                      </span>
                      <span className="text-xs text-gray-500">Prioridade: {it.priority}</span>
                    </li>
                  ))
              )}
            </ul>
          </div>
          {/* After birth list */}
          <div>
            <h4 className="font-semibold text-primary mb-2">Após o nascimento (reposição mensal)</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {Object.entries(BABY_ITEMS_CHECKLIST_PRIORITIZED).flatMap(([category, list]) =>
                list
                  .filter((it) => {
                    const lower = it.item.toLowerCase();
                    let recurring = false;
                    if (category === 'diapering_and_hygiene') {
                      if (lower.includes('fraldas') || lower.includes('lenços') || lower.includes('pomada')) recurring = true;
                    }
                    if (category === 'feeding') {
                      if (lower.includes('paninhos')) recurring = true;
                    }
                    if (category === 'clothing') recurring = true;
                    return recurring;
                  })
                  .map((it) => (
                    <li key={it.item} className="flex flex-col">
                      <span>
                        <strong>{it.item}</strong>
                      </span>
                      <span className="text-xs text-gray-500">{it.note}</span>
                    </li>
                  ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}