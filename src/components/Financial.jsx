import React, { useState, useEffect } from 'react';
import { weeklyData, BABY_ITEMS_CHECKLIST_PRIORITIZED } from '../data';

// Mapa de custos
const taskCostMap = {
  // Itens Originais
  'Ultrassom Translucência Nucal': 500, 'Ultrassom Morfológico': 600, 'Teste de Tolerância à Glicose': 150,
  'vacina dTpa': 200, 'Influenza': 100, 'Exame do Cotonete': 100, 'USG com Doppler': 250, 'Cardiotocografia': 200,
  'Encomendar Móveis': 2000, 'Carrinho de Bebê': 2500, 'Enxoval de Roupas': 800, 'Fraldas': 300, 'Kit Berço': 400,
  'Banheira': 200, 'Mala Maternidade': 500, 'Farmacinha do bebê': 200, 'Repelente seguro': 50,
  'Creme hidratante': 80, 'Sutiãs confortáveis': 120, 'Vitaminas pré-natais': 150,
  
  // Pós-Parto Recorrente
  'Pediatra': 400,
  'Remédios': 150,
  'Vitaminas Bebê': 100,
  'Alimentação/Papinhas (6m+)': 400,
  'Roupas (Renovação Trimestral)': 800,
  
  // Pós-Parto Compra Única (Futuro)
  'Brinquedos': 300,
  'Video Game': 3500,
  'Raquete de Tenis': 1200,
  'Raqueteira': 400,
  'Violao': 900,
  'Luvas de Boxe': 250,
  'Computador': 4500,
  'Celular': 3000,
  'Bicicleta': 800
};

const doctorKeywords = ['consulta', 'obstetra', 'nutricionista', 'dentista', 'fisioterapeuta', 'pediatra', 'anestesiologista'];
const examKeywords = ['ultrassom', 'usg', 'teste', 'exame', 'curva glicêmica', 'cardiotocografia', 'cultura', 'cotonete'];
const purchaseKeywords = ['comprar', 'compra', 'encomendar', 'mala', 'farmacinha', 'carrinho', 'berço', 'roupa', 'kit', 'banheira', 'fraldas'];

function generatePregnancyItems() {
  const items = [];
  let idCounter = 0;
  
  // 1. Gera a partir das tarefas semanais
  weeklyData.forEach((week) => {
    week.tasks.forEach((task) => {
      const text = task.text || '';
      const lower = text.toLowerCase();
      let include = false;
      let cost = 0;
      if (doctorKeywords.some((kw) => lower.includes(kw))) { include = true; cost = 300; }
      if (examKeywords.some((kw) => lower.includes(kw))) {
        include = true;
        let matched = false;
        Object.keys(taskCostMap).forEach((key) => { if (lower.includes(key.toLowerCase())) { cost = taskCostMap[key]; matched = true; } });
        if (!matched) cost = 200;
      }
      if (purchaseKeywords.some((kw) => lower.includes(kw))) {
        include = true;
        let matchedPurchase = false;
        Object.keys(taskCostMap).forEach((key) => { if (lower.includes(key.toLowerCase())) { cost = taskCostMap[key]; matchedPurchase = true; } });
        if (!matchedPurchase) cost = 100;
      }
      if (include) items.push({ id: idCounter++, name: text, cost, quantity: 1, periodicity: 1, type: 'one_time', included: true });
    });
  });
  
  // 2. Adiciona itens do checklist que não são recorrentes (Investimento Inicial)
  Object.entries(BABY_ITEMS_CHECKLIST_PRIORITIZED).forEach(([category, list]) => {
    list.forEach((it) => {
      // Pula itens que são tratados no pós-parto ou higiene recorrente
      if (it.item.toLowerCase().includes('fralda') || it.item.toLowerCase().includes('lenço') || it.item.toLowerCase().includes('pomada')) return;

      const name = it.item;
      const lower = name.toLowerCase();
      let itemCost = 0;
      Object.keys(taskCostMap).forEach((key) => { if (lower.includes(key.toLowerCase())) itemCost = taskCostMap[key]; });
      if (!itemCost) {
          if (lower.includes('carrinho') || lower.includes('berço') || lower.includes('móveis')) itemCost = 1500;
          else itemCost = 200;
      }
      if (!items.some(i => i.name === name)) {
        items.push({ id: idCounter++, name, cost: itemCost, quantity: 1, periodicity: 1, type: 'one_time', included: true });
      }
    });
  });
  return items;
}

function generateAfterBirthItems() {
  const items = [];
  let idCounter = 1000;

  // 1. ITENS RECORRENTES (Higiene Básica)
  Object.entries(BABY_ITEMS_CHECKLIST_PRIORITIZED).forEach(([category, list]) => {
    list.forEach((it) => {
      const name = it.item;
      const lower = name.toLowerCase();
      if (category === 'diapering_and_hygiene' && (lower.includes('fraldas') || lower.includes('lenços') || lower.includes('pomada'))) {
        let cost = 0;
        if (lower.includes('fralda')) cost = 300;
        else if (lower.includes('lenço')) cost = 30;
        else if (lower.includes('pomada')) cost = 30;
        items.push({ id: idCounter++, name, cost, quantity: 1, periodicity: 1, type: 'recurring', included: true, description: it.note });
      }
    });
  });

  // 2. ITENS RECORRENTES ADICIONAIS (Manuais)
  const recurringExtras = [
      { name: 'Pediatra (Rotina)', cost: 400, periodicity: 1, desc: 'Consultas mensais de acompanhamento e puericultura.' },
      { name: 'Vitaminas Bebê', cost: 100, periodicity: 1, desc: 'Vitamina D (Adetil/Depura) e Ferro conforme prescrição.' },
      { name: 'Remédios (Eventuais)', cost: 150, periodicity: 1, desc: 'Antitérmicos, analgésicos e itens de farmácia.' },
      { name: 'Alimentação/Papinhas (6m+)', cost: 400, periodicity: 1, desc: 'Introdução alimentar (frutas, legumes) e fórmula (se necessário) até 3 anos.' },
      { name: 'Roupas (Renovação Trimestral)', cost: 800, periodicity: 3, desc: 'Inclui meias, botinhas, macacões, bonés e roupas de sair. O bebê muda de tamanho a cada 3 meses.' }
  ];

  recurringExtras.forEach(ex => {
      items.push({ id: idCounter++, name: ex.name, cost: ex.cost, quantity: 1, periodicity: ex.periodicity, type: 'recurring', included: true, description: ex.desc });
  });

  // 3. ITENS DE COMPRA ÚNICA FUTURA
  const oneTimeExtras = [
    { name: 'Celular', desc: 'Para comunicação/segurança futura.' },
    { name: 'Raquete de Tenis', desc: 'Incentivo ao esporte.' },
    { name: 'Raqueteira', desc: 'Equipamento esportivo.' },
    { name: 'Video Game', desc: 'Lazer.' },
    { name: 'Violao', desc: 'Educação musical.' },
    { name: 'Luvas de Boxe', desc: 'Atividade física.' },
    { name: 'Computador', desc: 'Estudos e uso pessoal.' },
    { name: 'Bicicleta', desc: 'Lazer e atividade motora.' },
    { name: 'Brinquedos (Lote Anual)', desc: 'Brinquedos educativos variados.' }
  ];

  oneTimeExtras.forEach(extra => {
      let cost = 200;
      const lower = extra.name.toLowerCase();
      Object.keys(taskCostMap).forEach((key) => { if (lower.includes(key.toLowerCase())) cost = taskCostMap[key]; });
      
      items.push({ id: idCounter++, name: extra.name, cost, quantity: 1, periodicity: 1, type: 'one_time', included: true, description: extra.desc });
  });

  return items;
}

export default function Financial() {
  const [pregnancyItems, setPregnancyItems] = useState(() => {
    try {
      const saved = window.localStorage.getItem('financialPregnancyItems');
      return saved ? JSON.parse(saved) : generatePregnancyItems();
    } catch (e) { return generatePregnancyItems(); }
  });

  const [afterBirthItems, setAfterBirthItems] = useState(() => {
    try {
      const saved = window.localStorage.getItem('financialAfterBirthItems_v3'); 
      if (saved) return JSON.parse(saved);
      return generateAfterBirthItems();
    } catch (e) { return generateAfterBirthItems(); }
  });

  useEffect(() => { localStorage.setItem('financialPregnancyItems', JSON.stringify(pregnancyItems)); }, [pregnancyItems]);
  useEffect(() => { localStorage.setItem('financialAfterBirthItems_v3', JSON.stringify(afterBirthItems)); }, [afterBirthItems]);

  const handlePregChange = (id, field, value) => setPregnancyItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));
  const handleAfterChange = (id, field, value) => setAfterBirthItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));

  const pregnancyTotal = pregnancyItems.reduce((sum, it) => it.included ? sum + (parseFloat(it.cost) * parseFloat(it.quantity)) : sum, 0);
  
  const afterBirthMonthlyTotal = afterBirthItems
    .filter(it => it.type === 'recurring')
    .reduce((sum, it) => it.included ? sum + ((parseFloat(it.cost) * parseFloat(it.quantity)) / parseFloat(it.periodicity)) : sum, 0);

  const afterBirthOneTimeTotal = afterBirthItems
    .filter(it => it.type === 'one_time')
    .reduce((sum, it) => it.included ? sum + (parseFloat(it.cost) * parseFloat(it.quantity)) : sum, 0);

  const TableRow = ({ item, onChange, showPeriodicity = false }) => (
    <div className={`grid grid-cols-12 gap-4 items-center p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!item.included ? 'opacity-50' : ''}`}>
        <div className="col-span-1 flex justify-center">
            <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" checked={item.included} onChange={() => onChange(item.id, 'included', !item.included)} />
        </div>
        <div className="col-span-5 text-sm font-medium text-gray-700 break-words">
            {item.name}
            {item.description && <p className="text-[10px] text-gray-400 font-normal leading-tight mt-0.5">{item.description}</p>}
        </div>
        <div className="col-span-2">
            <input type="number" min="0" className="w-full text-center text-sm border-gray-200 rounded-md focus:border-primary focus:ring-primary" value={item.quantity} onChange={(e) => onChange(item.id, 'quantity', e.target.value)} />
        </div>
        <div className="col-span-2">
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-xs">R$</span></div>
                <input type="number" min="0" step="0.01" className="w-full pl-7 text-sm border-gray-200 rounded-md focus:border-primary focus:ring-primary" value={item.cost} onChange={(e) => onChange(item.id, 'cost', e.target.value)} />
            </div>
        </div>
        <div className="col-span-2 text-right">
             <span className="text-sm font-bold text-gray-800">
                R$ {((parseFloat(item.cost) || 0) * (parseFloat(item.quantity) || 0) / (showPeriodicity ? (parseFloat(item.periodicity) || 1) : 1)).toFixed(0)}
             </span>
             {showPeriodicity && item.periodicity > 1 && <span className="block text-[10px] text-gray-400">/mês (a cada {item.periodicity} meses)</span>}
        </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Financeiro</h2>
      
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl p-5 text-white shadow-lg">
            <p className="text-pink-100 text-xs font-bold uppercase tracking-wide mb-1">Gestação (Investimento)</p>
            <h3 className="text-3xl font-bold">R$ {pregnancyTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</h3>
            <p className="text-xs text-pink-100 mt-2 opacity-80">Enxoval inicial, Exames, Móveis</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
             <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">Pós-Parto (Custo Mensal)</p>
             <h3 className="text-3xl font-bold text-gray-800">R$ {afterBirthMonthlyTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</h3>
             <p className="text-xs text-gray-400 mt-2">Média mensal (Fraldas, Alimentação, Roupas)</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
             <p className="text-blue-500 text-xs font-bold uppercase tracking-wide mb-1">Pós-Parto (Compras Futuras)</p>
             <h3 className="text-3xl font-bold text-gray-800">R$ {afterBirthOneTimeTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</h3>
             <p className="text-xs text-gray-400 mt-2">Bens duráveis, Eletrônicos, Hobbies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Coluna 1: Gestação */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
              <div className="bg-pink-50 px-4 py-3 border-b border-pink-100">
                  <h3 className="font-bold text-pink-800">Durante a Gravidez (Lista Inicial)</h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {pregnancyItems.map(it => <TableRow key={it.id} item={it} onChange={handlePregChange} />)}
              </div>
          </div>

          {/* Coluna 2: Pós-Nascimento */}
          <div className="space-y-6">
            
            {/* Tabela Recorrente */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-green-50 px-4 py-3 border-b border-green-100 flex justify-between items-center">
                    <h3 className="font-bold text-green-800">Pós-Nascimento: Recorrente</h3>
                    <span className="text-xs bg-white text-green-700 px-2 py-1 rounded border border-green-200">Consumo Contínuo</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {afterBirthItems.filter(i => i.type === 'recurring').map(it => <TableRow key={it.id} item={it} onChange={handleAfterChange} showPeriodicity={true} />)}
                </div>
            </div>

            {/* Tabela Compra Única */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
                    <h3 className="font-bold text-blue-800">Pós-Nascimento: Compras Futuras</h3>
                    <span className="text-xs bg-white text-blue-700 px-2 py-1 rounded border border-blue-200">Bens Duráveis</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {afterBirthItems.filter(i => i.type === 'one_time').map(it => <TableRow key={it.id} item={it} onChange={handleAfterChange} />)}
                </div>
            </div>

          </div>
      </div>

      {/* Inventário de Referência (3 Colunas) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Inventário de Referência (Priorizado)</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Coluna 1 */}
            <div>
                <h4 className="font-bold text-primary mb-3">Antes do Nascimento (Essenciais)</h4>
                <ul className="space-y-3">
                    {Object.entries(BABY_ITEMS_CHECKLIST_PRIORITIZED).flatMap(([cat, list]) => list.filter(it => !it.item.toLowerCase().includes('fralda') && !it.item.toLowerCase().includes('lenço')).map(it => (
                        <li key={it.item} className="text-sm border-b border-gray-50 pb-2 last:border-0">
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">{it.item}</span>
                                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 uppercase">{it.priority}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 italic">{it.note}</p>
                        </li>
                    )))}
                </ul>
            </div>

            {/* Coluna 2 */}
            <div>
                <h4 className="font-bold text-green-700 mb-3">Consumíveis & Recorrentes</h4>
                 <ul className="space-y-3">
                    {afterBirthItems.filter(i => i.type === 'recurring').map(it => (
                        <li key={it.id} className="text-sm border-b border-gray-50 pb-2 last:border-0">
                            <span className="font-semibold text-gray-700">{it.name}</span>
                            {it.description && <p className="text-xs text-gray-500 mt-1 italic">{it.description}</p>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Coluna 3 - Nova */}
            <div>
                <h4 className="font-bold text-blue-700 mb-3">Pós-Nascimento (Única Vez)</h4>
                 <ul className="space-y-3">
                    {afterBirthItems.filter(i => i.type === 'one_time').map(it => (
                        <li key={it.id} className="text-sm border-b border-gray-50 pb-2 last:border-0">
                            <span className="font-semibold text-gray-700">{it.name}</span>
                            {it.description && <p className="text-xs text-gray-500 mt-1 italic">{it.description}</p>}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
      </div>
    </div>
  );
}