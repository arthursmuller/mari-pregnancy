import React, { useState } from 'react';
import {
  DIETARY_GUIDELINES_DETAILED,
  EXERCISE_GUIDELINES,
  MEDICATION_GUIDE_BRAZIL,
  CRITICAL_ALERTS_AND_HIGHLIGHTS,
  PREVENTABLE_RISKS_AND_HOW_TO_REDUCE,
  EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY,
} from '../data';

// New content from your request
const NEONATAL_RISKS_DATA = {
  A: { title: "A. Emergências de Risco Imediato", items: ["Sepse Neonatal", "Meningite Neonatal", "Asfixia Perinatal Grave", "Cardiopatias Congênitas Críticas", "Enterocolite Necrosante (NEC)", "Doença Hemorrágica do RN", "Erros Inatos do Metabolismo", "Hérnia Diafragmática Congênita", "Atresia de Esôfago", "Onfalite Sistêmica", "Hipoglicemia Neonatal Grave", "Hipotermia Neonatal Grave", "Pneumonia Congênita Grave"] },
  B: { title: "B. Problemas Respiratórios Graves", items: ["Síndrome do Desconforto Respiratório", "Taquipneia Transitória Grave", "Persistência do Canal Arterial", "Apneia da Prematuridade", "Hipoplasia Pulmonar"] },
  C: { title: "C. Condições Sérias (Tratamento Especializado)", items: ["Prematuridade e complicações", "Icterícia Neonatal Grave / Kernicterus", "Anemia Neonatal Grave", "Infecções Congênitas (TORCH)", "Síndrome de Down e Genéticas", "Microcefalia", "Fibrose Cística (íleo meconial)", "Displasia de Quadril Grave", "Alergia à Proteína do Leite (APLV) grave", "Refluxo Patológico", "Baixo Peso / RCIU", "Onfalocele / Gastrosquise", "Hiperplasia Adrenal Congênita"] },
  D: { title: "D. Neurológicos e Hemorrágicos", items: ["Hemorragia Intraventricular (Graus III-IV)", "Leucomalácia Periventricular", "Convulsões Neonatais", "Hidrocefalia Congênita"] },
  E: { title: "E. Condições Comuns (Geralmente Benignas)", items: ["Acne Neonatal", "Candidíase Oral (Sapinho)", "Conjuntivite Neonatal (leve)", "Cólica do Lactente", "Crosta Láctea", "Dermatite de Fraldas", "Eritema Tóxico", "Hérnia Umbilical", "Icterícia Fisiológica", "Milium", "Obstrução do Canal Lacrimal", "Miliária (Brotoeja)", "Pintas/Manchas de Nascença"] },
  F: { title: "F. Exigem Monitoração", items: ["Criptorquidia", "Língua Presa", "Plagiocefalia Posicional", "Malformações Leves", "Síndrome de Abstinência Neonatal"] },
  G: { title: "G. Gastrointestinais", items: ["Intolerância Alimentar Transitória", "Constipação do Recém-nascido", "Vômitos não-biliosos"] }
};

const ALLERGY_PREVENTION = [
    "Amamentação exclusiva até os 6 meses (fortalece o sistema imune).",
    "Evitar exposição precoce a alérgenos ambientais fortes (mofo, poeira excessiva, fumaça de cigarro).",
    "Introdução alimentar na janela correta (6 meses) e oferta variada de alimentos.",
    "Não fumar durante a gestação e não permitir fumo perto do bebê.",
    "Manter o ambiente de sono arejado e limpo."
];

export default function GuidanceTabs() {
  const tabs = [
    { id: 'exercise', label: 'Exercícios', icon: '🏃‍♀️' },
    { id: 'diet', label: 'Dieta', icon: '🥗' },
    { id: 'risks', label: 'Riscos & Saúde', icon: '⚠️' },
    { id: 'meds', label: 'Remédios', icon: '💊' },
    { id: 'tips', label: 'Dicas e Cuidados', icon: '💡' },
  ];
  const [activeTab, setActiveTab] = useState('risks');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100">
        <nav className="flex overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary bg-pink-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2 text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* ================= EXERCISE TAB ================= */}
        {activeTab === 'exercise' && (
           <div className="text-gray-700 space-y-6">
             <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="font-bold text-blue-800">Meta Semanal</p>
                <p className="text-sm text-blue-700 mb-2">{EXERCISE_GUIDELINES.weekly_goal}</p>
                <p className="font-bold text-blue-800">Regra de Intensidade (Teste da Fala)</p>
                <p className="text-sm text-blue-700">{EXERCISE_GUIDELINES.intensity_rule}</p>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-primary mb-3">Atividades Recomendadas</h4>
                    <ul className="space-y-3">
                        {EXERCISE_GUIDELINES.approved_activities.map(a => (
                            <li key={a.activity} className="text-sm border-b border-gray-50 pb-2 last:border-0">
                                <span className="font-semibold block text-gray-800">{a.activity}</span>
                                <span className="text-gray-600">{a.benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-red-500 mb-3">Evitar</h4>
                    <ul className="space-y-2">
                         {EXERCISE_GUIDELINES.activities_to_avoid.map(a => (
                            <li key={a} className="flex items-start text-sm"><span className="text-red-500 mr-2">✕</span>{a}</li>
                        ))}
                    </ul>
                </div>
             </div>

             <div className="bg-gray-50 p-4 rounded-xl">
                 <h4 className="font-bold text-gray-800 mb-2">Foco por Trimestre</h4>
                 <ul className="space-y-2 text-sm">
                     <li><strong>1º Trimestre:</strong> {EXERCISE_GUIDELINES.trimester_focus.first_trimester}</li>
                     <li><strong>2º Trimestre:</strong> {EXERCISE_GUIDELINES.trimester_focus.second_trimester}</li>
                     <li><strong>3º Trimestre:</strong> {EXERCISE_GUIDELINES.trimester_focus.third_trimester}</li>
                 </ul>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="font-bold text-primary mb-2">Protocolo Assoalho Pélvico</h4>
                    <p className="text-sm bg-pink-50 p-3 rounded border border-pink-100">{EXERCISE_GUIDELINES.pelvic_floor_protocol}</p>
                 </div>
                 {EXERCISE_GUIDELINES.tennis_and_beach_tennis && (
                     <div>
                        <h4 className="font-bold text-primary mb-2">Tênis e Beach Tennis</h4>
                        <p className="text-sm text-gray-600 mb-1"><strong>Pode jogar?</strong> {EXERCISE_GUIDELINES.tennis_and_beach_tennis.can_you_play}</p>
                        <p className="text-sm text-gray-600"><strong>Cuidados:</strong> {EXERCISE_GUIDELINES.tennis_and_beach_tennis.guidelines_if_experienced}</p>
                     </div>
                 )}
             </div>

             <div>
                 <h4 className="font-bold text-red-600 mb-2">Sinais de Alerta (Parar Imediatamente)</h4>
                 <div className="flex flex-wrap gap-2">
                     {EXERCISE_GUIDELINES.warning_signs_stop_immediately.map(s => (
                         <span key={s} className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded border border-red-100">{s}</span>
                     ))}
                 </div>
             </div>
           </div>
        )}

        {/* ================= DIET TAB ================= */}
        {activeTab === 'diet' && (
            <div className="space-y-6 text-gray-700">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h4 className="font-bold text-green-800 mb-1">Tipo de Dieta: {DIETARY_GUIDELINES_DETAILED.type}</h4>
                    <p className="text-sm text-green-700">{DIETARY_GUIDELINES_DETAILED.specific_nutrient_targets}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-primary border-b pb-2 mb-3">Consumir</h4>
                        <ul className="space-y-2 text-sm">
                            {DIETARY_GUIDELINES_DETAILED.consume.map(i => <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>{i}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-red-500 border-b pb-2 mb-3">Evitar</h4>
                        <ul className="space-y-2 text-sm">
                            {DIETARY_GUIDELINES_DETAILED.avoid.map(i => <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>{i}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-gray-800">Notas Importantes</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded">
                            <span className="font-bold block mb-1">Mito Calórico</span>
                            {DIETARY_GUIDELINES_DETAILED.notes.caloric_myth}
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <span className="font-bold block mb-1">Foco Vegetariano</span>
                            {DIETARY_GUIDELINES_DETAILED.notes.vegetarian_focus}
                        </div>
                        {DIETARY_GUIDELINES_DETAILED.notes.hydration_and_water_info && (
                            <div className="bg-blue-50 p-3 rounded border border-blue-100">
                                <span className="font-bold block mb-1 text-blue-800">Hidratação</span>
                                {DIETARY_GUIDELINES_DETAILED.notes.hydration_and_water_info}
                            </div>
                        )}
                        {DIETARY_GUIDELINES_DETAILED.notes.sweets_guidance && (
                             <div className="bg-pink-50 p-3 rounded border border-pink-100">
                                <span className="font-bold block mb-1 text-pink-800">Doces e Açúcar</span>
                                {DIETARY_GUIDELINES_DETAILED.notes.sweets_guidance}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* ================= RISKS & PREVENTION TAB ================= */}
        {activeTab === 'risks' && (
          <div className="space-y-8 text-gray-700">
            {/* Critical Alerts */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-red-800 font-bold flex items-center mb-4 text-lg">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Alertas Críticos
                </h3>
                <ul className="space-y-3 text-sm text-red-900">
                    <li className="flex items-start"><span className="mr-2">•</span>{CRITICAL_ALERTS_AND_HIGHLIGHTS.cannabis_abstinence}</li>
                    <li className="flex items-start"><span className="mr-2">•</span>{CRITICAL_ALERTS_AND_HIGHLIGHTS.medications_stimulants}</li>
                    <li className="flex items-start"><span className="mr-2">•</span>{CRITICAL_ALERTS_AND_HIGHLIGHTS.food_safety}</li>
                    <li className="flex items-start font-bold"><span className="mr-2">!</span>{CRITICAL_ALERTS_AND_HIGHLIGHTS.immediate_action}</li>
                </ul>
            </div>

            {/* Allergy Prevention */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-2">Prevenção de Alergias (Rinite, etc.)</h3>
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-1">
                    {ALLERGY_PREVENTION.map((p, idx) => <li key={idx}>{p}</li>)}
                </ul>
            </div>

            {/* NEW NEONATAL RISKS LIST */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Riscos Neonatais e Condições</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {Object.values(NEONATAL_RISKS_DATA).map((group, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <h4 className="font-bold text-primary mb-2 text-sm uppercase">{group.title}</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {group.items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Original Preventable Risks Data (Down Syndrome etc) */}
            <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Informações Genéticas e Prevenção</h3>
                
                <div className="mb-6">
                    <h4 className="font-bold text-gray-700 mb-2">Síndrome de Down</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                        <p><strong>O que saber:</strong> {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.down_syndrome.what_you_can_and_cant_do.join(' ')}</p>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.down_syndrome.screening_options.map((opt, i) => <li key={i}>{opt}</li>)}
                        </ul>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-gray-700 mb-2">Microcefalia e Infecções Congênitas</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                         <p><strong>Causas evitáveis:</strong> {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.microcephaly_and_congenital_infections.main_preventable_causes.slice(0, 3).join(', ')} e outros.</p>
                         <p className="font-semibold mt-2">Prevenção Prática:</p>
                         <ul className="list-disc list-inside text-gray-600">
                            {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.microcephaly_and_congenital_infections.practical_prevention.slice(0, 5).map((p, i) => <li key={i}>{p}</li>)}
                         </ul>
                    </div>
                </div>
            </div>

            {/* Exam Plan */}
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-800 mb-2">Plano de Rastreio (Detecção Precoce)</h4>
                <ul className="space-y-1 text-sm text-purple-900">
                    <li><strong>Início:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY.early_pregnancy_initial.join(', ')}</li>
                    <li><strong>10-14 Semanas:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['10_to_14_weeks'].join(', ')}</li>
                    <li><strong>18-24 Semanas:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['18_to_24_weeks'].join(', ')}</li>
                    <li><strong>24-28 Semanas:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['24_to_28_weeks'].join(', ')}</li>
                </ul>
            </div>
          </div>
        )}

        {/* ================= MEDICATIONS TAB ================= */}
        {activeTab === 'meds' && (
            <div className="space-y-6 text-gray-700">
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                    <h4 className="font-bold text-yellow-800 mb-2">Princípios de Segurança</h4>
                    <ul className="list-disc list-inside text-sm text-yellow-900">
                        {MEDICATION_GUIDE_BRAZIL.safety_principles.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-primary mb-3">Dor e Febre</h4>
                    <div className="space-y-3">
                        {MEDICATION_GUIDE_BRAZIL.pain_and_fever.avoid_or_only_if_strictly_prescribed.map((item, i) => (
                            <div key={i} className="bg-white border border-gray-100 p-3 rounded shadow-sm text-sm">
                                <span className="font-bold block text-gray-800">{item.active_ingredient || item.class}</span>
                                <span className="text-gray-600">{item.notes}</span>
                                {item.common_brands_brazil && <span className="block text-xs text-gray-400 mt-1">Marcas: {item.common_brands_brazil.join(', ')}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-primary mb-2">Náuseas</h4>
                        <ul className="text-sm space-y-2">
                             <li className="italic text-gray-500">{MEDICATION_GUIDE_BRAZIL.nausea_and_vomiting.first_steps_non_drug.join('. ')}</li>
                             {MEDICATION_GUIDE_BRAZIL.nausea_and_vomiting.medications_common_in_brazil.map((m, i) => (
                                 <li key={i} className="bg-gray-50 p-2 rounded">
                                     <strong>{m.active_ingredient}</strong> ({m.common_brands_brazil.join(', ')})
                                     <span className="block text-xs text-gray-500 mt-1">{m.pregnancy_safety.overall}</span>
                                 </li>
                             ))}
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-bold text-primary mb-2">Outros (Gases, Alergia, Intestino)</h4>
                         <div className="space-y-2 text-sm">
                             <p><strong>Gases:</strong> {MEDICATION_GUIDE_BRAZIL.gas_and_heartburn.safe_choices.map(c => c.active_ingredient).join(', ')}</p>
                             <p><strong>Alergia:</strong> {MEDICATION_GUIDE_BRAZIL.allergy_and_colds.preferred[0].options.join(', ')}</p>
                             <p><strong>Constipação:</strong> {MEDICATION_GUIDE_BRAZIL.constipation_and_diarrhea.constipation_preferred.map(s => s.step).join(' -> ')}</p>
                         </div>
                         <div className="mt-4 bg-red-50 p-3 rounded border border-red-100">
                             <h5 className="font-bold text-red-800 text-xs uppercase mb-1">Evitar Estritamente</h5>
                             <ul className="text-xs text-red-700 space-y-1">
                                 {MEDICATION_GUIDE_BRAZIL.high_risk_meds_to_avoid_strictly.examples_and_common_brand_associations.map((d, i) => (
                                     <li key={i}><strong>{d.drug}:</strong> {d.why}</li>
                                 ))}
                             </ul>
                         </div>
                    </div>
                </div>
            </div>
        )}

        {/* ================= TIPS TAB ================= */}
        {activeTab === 'tips' && (
             <div className="text-gray-700 space-y-6 text-sm leading-relaxed">
                 {/* Manually reconstructing the rich content from the original component data to ensure NOTHING is missing */}
                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <h4 className="font-bold text-primary text-base mb-2">Ambiente e bem‑estar mental após o parto</h4>
                     <p className="mb-2">Crie um ambiente calmo, seguro e previsível para o recém‑nascido. Mantenha a casa livre de fumaça e evite ruídos excessivos. Fale, cante e leia para o bebê – ele reconhece vozes familiares e sente‑se seguro com a sua presença.</p>
                     <p>Evite sacudir o bebê ou manuseá‑lo bruscamente (risco de lesões graves). Para um sono seguro, coloque‑o sempre de costas em um colchão firme sem objetos soltos.</p>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-bold text-gray-800 mb-2">Presentes e Limites</h4>
                        <p>O afeto não é medido pela quantidade de brinquedos. Prefira experiências e brincadeiras em família. Estabeleça limites claros: dizer “não” quando necessário ajuda a formar um adulto equilibrado.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-bold text-gray-800 mb-2">Autonomia</h4>
                        <p>Permita que a criança tente fazer pequenas tarefas adequadas à idade. Valorize o esforço, não apenas o resultado. Seja um exemplo de comportamento.</p>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <h4 className="font-bold text-primary text-base mb-2">Segurança e Saúde</h4>
                     <ul className="list-disc list-inside space-y-1">
                         <li>Mantenha objetos pequenos e alimentos duros fora do alcance (engasgo).</li>
                         <li>Proteja o bebê de fumaça de cigarro.</li>
                         <li>Nunca transporte líquidos quentes segurando o bebê.</li>
                         <li>Mantenha vacinas em dia.</li>
                         <li>Use cadeirinha de carro voltada para trás.</li>
                     </ul>
                 </div>

                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <h4 className="font-bold text-primary text-base mb-2">Remédios e Primeiros Socorros</h4>
                     <p className="mb-2"><strong>Automedicação é perigosa.</strong> Dose de paracetamol/ibuprofeno deve ser guiada por peso/médico. Ibuprofeno só após 6 meses (salvo indicação).</p>
                     <p className="mb-2"><strong>Sinais de Emergência:</strong> Febre &gt;38°C (ou qualquer febre em &lt;3 meses), recusa em mamar, choro inconsolável, fontanela (moleira) afundada, lábios roxos.</p>
                     <div className="bg-pink-50 p-3 rounded mt-2">
                         <span className="font-bold text-pink-800 block mb-1">Kit Essencial:</span>
                         Termômetro digital, curativos, gaze, antisséptico, aspirador nasal, tesoura ponta redonda, álcool 70%, solução salina.
                     </div>
                 </div>
             </div>
        )}
      </div>
    </div>
  );
}