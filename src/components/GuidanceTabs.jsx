import React, { useState } from 'react';
import {
  EXERCISE_GUIDELINES,
  MEDICATION_GUIDE_BRAZIL,
  CRITICAL_ALERTS_AND_HIGHLIGHTS,
  PREVENTABLE_RISKS_AND_HOW_TO_REDUCE,
  EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY,
} from '../data';

// --- CONSTANTS & NEW DATA (Mantido do seu arquivo original) ---
const NEONATAL_RISKS_DATA = {
  A: { 
    title: "A. Emergências de Risco Imediato", 
    items: ["Sepse Neonatal", "Meningite Neonatal", "Asfixia Perinatal Grave", "Cardiopatias Congênitas Críticas", "Enterocolite Necrosante (NEC)", "Doença Hemorrágica do RN", "Erros Inatos do Metabolismo", "Hérnia Diafragmática Congênita", "Atresia de Esôfago", "Onfalite Sistêmica", "Hipoglicemia Neonatal Grave", "Hipotermia Neonatal Grave", "Pneumonia Congênita Grave"] 
  },
  B: { 
    title: "B. Problemas Respiratórios Graves", 
    items: ["Síndrome do Desconforto Respiratório", "Taquipneia Transitória Grave", "Persistência do Canal Arterial", "Apneia da Prematuridade", "Hipoplasia Pulmonar"] 
  },
  C: { 
    title: "C. Condições Sérias (Tratamento Especializado)", 
    items: ["Prematuridade e complicações", "Icterícia Neonatal Grave / Kernicterus", "Anemia Neonatal Grave", "Infecções Congênitas (TORCH)", "Síndrome de Down e Genéticas", "Microcefalia", "Fibrose Cística (íleo meconial)", "Displasia de Quadril Grave", "Alergia à Proteína do Leite (APLV) grave", "Refluxo Patológico", "Baixo Peso / RCIU", "Onfalocele / Gastrosquise", "Hiperplasia Adrenal Congênita"] 
  },
  D: { 
    title: "D. Neurológicos e Hemorrágicos", 
    items: ["Hemorragia Intraventricular (Graus III-IV)", "Leucomalácia Periventricular", "Convulsões Neonatais", "Hidrocefalia Congênita"] 
  },
  E: { 
    title: "E. Condições Comuns (Benignas)", 
    items: ["Acne Neonatal", "Candidíase Oral (Sapinho)", "Conjuntivite Neonatal (leve)", "Cólica do Lactente", "Crosta Láctea", "Dermatite de Fraldas", "Eritema Tóxico", "Hérnia Umbilical", "Icterícia Fisiológica", "Milium", "Obstrução do Canal Lacrimal", "Miliária (Brotoeja)", "Pintas/Manchas de Nascença"] 
  },
  F: { 
    title: "F. Exigem Monitoração", 
    items: ["Criptorquidia", "Língua Presa", "Plagiocefalia Posicional", "Malformações Leves", "Síndrome de Abstinência Neonatal"] 
  },
  G: { 
    title: "G. Gastrointestinais", 
    items: ["Intolerância Alimentar Transitória", "Constipação do Recém-nascido", "Vômitos não-biliosos"] 
  }
};

const ALLERGY_PREVENTION = [
    "Amamentação exclusiva até os 6 meses (fortalece o sistema imune e maturação intestinal).",
    "Evitar exposição precoce a alérgenos ambientais fortes (mofo, poeira excessiva, fumaça de cigarro, pelos de animais se houver histórico).",
    "Introdução alimentar na janela correta (6 meses) com oferta variada (exposição tardia demais pode aumentar risco).",
    "Não fumar durante a gestação e não permitir fumo perto do bebê (fator de risco para asma/rinite).",
    "Manter o ambiente de sono arejado, limpo e livre de 'acumuladores de pó' (bichos de pelúcia em excesso no berço)."
];

const NATURAL_PREVENTION_TIPS = [
    "Hidratação Intensa: A melhor forma de prevenir mal-estar e infecções urinárias.",
    "Gengibre e Limão: Aliados naturais contra enjoos matinais, evitando necessidade de remédios.",
    "Sono Regular: Dormir bem fortalece a imunidade e previne dores de cabeça tensionais.",
    "Lavar as Mãos: A medida nº 1 para evitar gripes e viroses que causariam febre.",
    "Fracionar Refeições: Comer pouco e sempre evita hipoglicemia (tontura) e azia severa."
];


export default function GuidanceTabs() {
  const tabs = [
    { id: 'exercise', label: 'Exercícios', icon: '🏃‍♀️' },
    { id: 'risks', label: 'Riscos', icon: '⚠️' },
    { id: 'meds', label: 'Remédios', icon: '💊' },
    { id: 'tips', label: 'Dicas antes de nascer', icon: '💡' },
  ];
  const [activeTab, setActiveTab] = useState('diet'); // Default para Nutrição para visualizar as mudanças

  return (
    <div className="w-full">
      <h2 className="section-title text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-400 mb-6">Orientações e Segurança</h2>
      
      {/* Modern Tabs Navigation */}
      <div className="bg-white/40 backdrop-blur-md p-1.5 rounded-2xl flex overflow-x-auto mb-8 custom-scrollbar border border-white/50 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-white text-rose-500 shadow-md scale-100 ring-1 ring-rose-100' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50 scale-95'
              }
            `}
          >
            <span className="mr-2 text-lg filter drop-shadow-sm">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up">
        {/* ================= EXERCISE TAB ================= */}
        {activeTab === 'exercise' && (
           <div className="space-y-6">
             <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-6 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <p className="font-bold text-blue-900 uppercase text-xs tracking-wider mb-2">Meta Semanal</p>
                <p className="text-lg text-blue-800 font-medium mb-4 leading-relaxed">{EXERCISE_GUIDELINES.weekly_goal}</p>
                <div className="h-px bg-blue-200 w-full mb-4"></div>
                <p className="font-bold text-blue-900 uppercase text-xs tracking-wider mb-2">Regra de Intensidade</p>
                <p className="text-sm text-blue-800 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-blue-100/50">{EXERCISE_GUIDELINES.intensity_rule}</p>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6 bg-emerald-50/30 border-emerald-100">
                    <h4 className="font-bold text-emerald-600 mb-4 flex items-center text-lg"><span className="bg-emerald-100 p-1.5 rounded-lg mr-2 shadow-sm">✓</span> Recomendado</h4>
                    <ul className="space-y-3">
                        {EXERCISE_GUIDELINES.approved_activities.map(a => (
                            <li key={a.activity} className="pb-2 border-b border-emerald-100 last:border-0">
                                <span className="font-bold block text-gray-800 text-sm">{a.activity}</span>
                                <span className="text-gray-500 text-xs leading-relaxed">{a.benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="glass-card p-6 bg-red-50/30 border-red-100">
                    <h4 className="font-bold text-red-500 mb-4 flex items-center text-lg"><span className="bg-red-100 p-1.5 rounded-lg mr-2 shadow-sm">✕</span> Evitar</h4>
                    <ul className="space-y-3">
                         {EXERCISE_GUIDELINES.activities_to_avoid.map(a => (
                            <li key={a} className="flex items-start text-sm text-gray-600 bg-white/40 p-2 rounded-lg"><span className="text-red-400 mr-2 font-bold text-lg leading-none">•</span>{a}</li>
                        ))}
                    </ul>
                </div>
             </div>

             <div className="glass-card p-6">
                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">📅 Foco por Trimestre</h4>
                 <div className="grid gap-4 md:grid-cols-3">
                    {[
                        { title: '1º Trimestre', text: EXERCISE_GUIDELINES.trimester_focus.first_trimester, color: 'bg-pink-50' },
                        { title: '2º Trimestre', text: EXERCISE_GUIDELINES.trimester_focus.second_trimester, color: 'bg-purple-50' },
                        { title: '3º Trimestre', text: EXERCISE_GUIDELINES.trimester_focus.third_trimester, color: 'bg-orange-50' }
                    ].map((t) => (
                        <div key={t.title} className={`${t.color} p-4 rounded-2xl border border-black/5`}>
                            <h5 className="font-bold text-gray-700 text-sm mb-2">{t.title}</h5>
                            <p className="text-xs text-gray-600 leading-relaxed">{t.text}</p>
                        </div>
                    ))}
                 </div>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                 <div className="glass-card p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-rose-500 mb-3">Protocolo Assoalho Pélvico</h4>
                        <p className="text-sm bg-rose-50 p-4 rounded-xl border border-rose-100 text-gray-700 leading-relaxed italic">
                            "{EXERCISE_GUIDELINES.pelvic_floor_protocol}"
                        </p>
                    </div>
                 </div>
                 {EXERCISE_GUIDELINES.tennis_and_beach_tennis && (
                     <div className="glass-card p-6">
                        <h4 className="font-bold text-orange-500 mb-3 flex items-center gap-2">🎾 Tênis e Beach Tennis</h4>
                        <div className="space-y-3 text-sm">
                            <p className="text-gray-600 bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                                <strong className="text-orange-700 block mb-1">Pode jogar?</strong> 
                                {EXERCISE_GUIDELINES.tennis_and_beach_tennis.can_you_play}
                            </p>
                            <p className="text-gray-600 bg-white/50 p-3 rounded-xl">
                                <strong className="text-gray-800 block mb-1">Cuidados Extras:</strong> 
                                {EXERCISE_GUIDELINES.tennis_and_beach_tennis.guidelines_if_experienced}
                            </p>
                        </div>
                     </div>
                 )}
             </div>
           </div>
        )}

        {/* ================= RISKS TAB ================= */}
        {activeTab === 'risks' && (
          <div className="space-y-8">
            {/* Critical Alerts */}
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30 -mr-10 -mt-10"></div>
                <h3 className="text-red-800 font-bold flex items-center mb-6 text-xl relative z-10">
                    <span className="bg-red-100 p-2 rounded-xl mr-3 shadow-sm text-2xl">🚨</span>
                    Alertas Críticos
                </h3>
                <ul className="space-y-4 text-sm text-red-900/90 relative z-10">
                    <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                        <span className="mr-3 font-bold text-red-600 text-lg">•</span>{CRITICAL_ALERTS_AND_HIGHLIGHTS.cannabis_abstinence}
                    </li>
                    <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                        <span className="mr-3 font-bold text-red-600 text-lg">•</span>{CRITICAL_ALERTS_AND_HIGHLIGHTS.medications_stimulants}
                    </li>
                    <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                        <span className="mr-3 font-bold text-red-600 text-lg">•</span>{CRITICAL_ALERTS_AND_HIGHLIGHTS.food_safety}
                    </li>
                    <li className="flex items-start bg-red-100/50 p-4 rounded-2xl border-l-4 border-red-500 shadow-sm">
                        <span className="mr-3 font-bold text-red-600 text-xl">!</span>
                        <span className="font-bold">{CRITICAL_ALERTS_AND_HIGHLIGHTS.immediate_action}</span>
                    </li>
                </ul>
            </div>
            
            {/* Natural Prevention (NEW) */}
            <div className="glass-card p-6 bg-teal-50/30 border-teal-100">
                <h3 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🌿</span> Prevenção Natural (Evitar Medicamentos)
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {NATURAL_PREVENTION_TIPS.map((tip, idx) => (
                        <div key={idx} className="bg-white/60 p-3 rounded-xl border border-teal-50 text-sm text-gray-700 shadow-sm">
                            {tip}
                        </div>
                    ))}
                </div>
            </div>

            {/* Allergy Prevention (NEW) */}
            <div className="glass-card p-6 bg-blue-50/30 border-blue-100">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🛡️</span> Prevenção de Alergias (Rinite, etc.)
                </h3>
                <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                    {ALLERGY_PREVENTION.map((p, idx) => (
                        <li key={idx} className="flex items-start bg-white/50 p-3 rounded-xl border border-blue-50">
                            <span className="text-blue-400 mr-2">🔹</span>{p}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Neonatal Risks List (NEW DATA) */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="text-2xl">👶</span> Riscos Neonatais e Condições</h3>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.values(NEONATAL_RISKS_DATA).map((group, idx) => (
                        <div key={idx} className="glass-card p-5 hover:bg-white/80 transition-all hover:-translate-y-1 duration-300 border-t-4 border-t-primary/20">
                            <h4 className="font-bold text-gray-800 mb-3 text-xs uppercase tracking-wide border-b border-gray-100 pb-2">{group.title}</h4>
                            <ul className="text-xs text-gray-600 space-y-2">
                                {group.items.map((item, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2 flex-shrink-0"></span>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Genetic Info */}
            <div className="glass-panel p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">🧬 Genética e Prevenção</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-gray-700 mb-3 bg-gray-100/50 inline-block px-3 py-1 rounded-lg">Síndrome de Down</h4>
                        <div className="text-sm space-y-3">
                            <p className="bg-white/50 p-3 rounded-xl border border-gray-100 text-gray-600">
                                <strong>O que saber:</strong> {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.down_syndrome.what_you_can_and_cant_do[0]}
                            </p>
                            <ul className="space-y-2 text-gray-500 text-xs pl-2 border-l-2 border-gray-200">
                                {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.down_syndrome.screening_options.slice(0, 4).map((opt, i) => <li key={i}>{opt}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-700 mb-3 bg-gray-100/50 inline-block px-3 py-1 rounded-lg">Microcefalia e Infecções</h4>
                        <div className="text-sm space-y-3">
                             <div className="bg-white/50 p-3 rounded-xl border border-gray-100">
                                <p className="font-bold text-gray-700 mb-1">Prevenção Prática:</p>
                                <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                                    {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.microcephaly_and_congenital_infections.practical_prevention.slice(0, 4).map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exam Plan */}
            <div className="bg-purple-50/50 backdrop-blur-sm p-6 rounded-3xl border border-purple-100 shadow-sm">
                <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><span className="text-xl">🗓️</span> Plano de Rastreio (Detecção Precoce)</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/60 p-4 rounded-xl">
                        <strong className="text-purple-600 block mb-1">Início</strong>
                        <span className="text-gray-600">{EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY.early_pregnancy_initial.join(', ')}</span>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl">
                        <strong className="text-purple-600 block mb-1">10-14 Semanas</strong>
                        <span className="text-gray-600">{EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['10_to_14_weeks'].join(', ')}</span>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl">
                        <strong className="text-purple-600 block mb-1">18-24 Semanas</strong>
                        <span className="text-gray-600">{EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['18_to_24_weeks'].join(', ')}</span>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* ================= MEDICATIONS TAB ================= */}
        {activeTab === 'meds' && (
            <div className="space-y-6">
                <div className="bg-amber-50/60 p-6 rounded-3xl border border-amber-100 shadow-sm">
                    <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><span className="text-xl">🛡️</span> Princípios de Segurança</h4>
                    <ul className="grid md:grid-cols-2 gap-3 text-sm text-amber-900/80">
                        {MEDICATION_GUIDE_BRAZIL.safety_principles.slice(0, 4).map((p, i) => (
                            <li key={i} className="bg-white/50 p-3 rounded-xl flex items-start"><span className="mr-2 mt-0.5">•</span>{p}</li>
                        ))}
                    </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass-card p-6">
                        <h4 className="font-bold text-rose-500 mb-4 text-lg border-b border-rose-100 pb-2">Dor e Febre</h4>
                        <div className="space-y-3">
                            {MEDICATION_GUIDE_BRAZIL.pain_and_fever.avoid_or_only_if_strictly_prescribed.map((item, i) => (
                                <div key={i} className="bg-white/50 border border-gray-100 p-4 rounded-2xl hover:bg-white/80 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-gray-800 text-sm">{item.active_ingredient || item.class}</span>
                                        {item.common_brands_brazil && <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.common_brands_brazil[0]}...</span>}
                                    </div>
                                    <span className="text-xs text-gray-600 leading-relaxed block">{item.notes}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6 bg-teal-50/30 border-teal-100">
                            <h4 className="font-bold text-teal-600 mb-4 text-lg border-b border-teal-100 pb-2">Náuseas</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="italic text-teal-700 bg-teal-50/50 p-3 rounded-xl text-xs">{MEDICATION_GUIDE_BRAZIL.nausea_and_vomiting.first_steps_non_drug.join('. ')}</li>
                                {MEDICATION_GUIDE_BRAZIL.nausea_and_vomiting.medications_common_in_brazil.map((m, i) => (
                                    <li key={i} className="bg-white/60 p-3 rounded-xl border border-white">
                                        <strong className="text-gray-800">{m.active_ingredient}</strong>
                                        <span className="block text-xs text-gray-500 mt-1">{m.pregnancy_safety.overall}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="bg-red-50/80 p-5 rounded-3xl border border-red-200 shadow-sm">
                             <h5 className="font-bold text-red-800 text-sm uppercase mb-3 flex items-center gap-2"><span className="text-lg">⛔</span> Evitar Estritamente</h5>
                             <div className="flex flex-wrap gap-2">
                                 {MEDICATION_GUIDE_BRAZIL.high_risk_meds_to_avoid_strictly.examples_and_common_brand_associations.map((d, i) => (
                                     <span key={i} className="text-xs bg-white/60 text-red-700 px-2 py-1 rounded-lg border border-red-100 font-medium">{d.drug}</span>
                                 ))}
                             </div>
                             <p className="text-[10px] text-red-600 mt-3 italic text-center">Consulte sempre seu obstetra antes de tomar qualquer medicamento.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}