import React from 'react';

export default function AfterBorn() {
  const guidance = [
    { title: 'Primeiro mês', items: ['Consulta pós-parto (6 semanas)', 'Pediatra: 7 dias e 30 dias', 'Amamentação livre demanda', 'Vacinas: BCG e Hep B', 'Registro civil'] },
    { title: '2–3 meses', items: ['Rotina de sono', 'Vacinas 2º mês', 'Massagem para cólicas', 'Estimulação visual', 'Dentista (se dentes nascerem)'] },
    { title: '4–6 meses', items: ['Introdução alimentar (6m)', 'Vacinas 4º mês', 'Meningocócica C', 'Tummy time'] },
    { title: '7–12 meses', items: ['Diversificação alimentar', 'Engatinhar', 'Vacinas 6 e 9 meses', 'Reforços 12 meses', 'Rotina em viagens'] },
    { title: '1–3 anos', items: ['Vacinas 15 meses', 'Natação (2 anos)', 'Desenvolvimento da fala', 'Socialização', 'Dieta balanceada'] },
  ];

  const PARENTING_GUIDE = {
    character_and_mindset: [
        {
            title: "Não criar filho mimado",
            tips: [
                "O 'Não' é amor: Frustração controlada gera resiliência. Não dê tudo o que ele pede imediatamente.",
                "Merecimento: Associe recompensas a esforço (ex: arrumar os brinquedos antes de ganhar algo).",
                "Tédio é bom: Não entregue telas ao primeiro sinal de tédio. O tédio estimula a criatividade."
            ]
        },
        {
            title: "Lidar com Dinheiro",
            tips: [
                "Diferença Querer vs. Precisar: Explique desde cedo a diferença entre necessidade e desejo.",
                "Sistema de Envelopes: Ensine a dividir o dinheiro ganho (mesada futura) em: Gastar, Doar e Investir.",
                "Valor do Trabalho: Dinheiro não sai do caixa eletrônico; ele vem da solução de problemas."
            ]
        },
        {
            title: "Tolerância à Frustração",
            tips: [
                "Jogos de Tabuleiro: Ensine a perder. Não deixe ele ganhar sempre 'para não chorar'.",
                "Validação, não Solução: Se ele estiver frustrado, diga 'Entendo que você está bravo', mas não resolva o problema por ele imediatamente.",
                "Exemplo: Mostre como VOCÊ lida com problemas sem explodir."
            ]
        },
        {
            title: "Educação e Polidez",
            tips: [
                "A Regra dos 3 Segundos: Antes de responder, pense.",
                "Exemplo Espelho: Ele não fará o que você fala, fará o que você faz. Diga 'por favor' e 'obrigado' para ele e para os outros.",
                "Respeito Hierárquico: Amizade é diferente de autoridade. Seja pai/mãe primeiro, amigo depois."
            ]
        }
    ],
    physical_and_skills: {
        height_and_strength: [
            "Sono e GH: O hormônio do crescimento é liberado principalmente no sono profundo noturno (22h-02h). Rotina de sono rigorosa é vital para estatura.",
            "Nutrição de Base: Proteína de alta qualidade e cálcio nas fases de estirão.",
            "Esportes de Impacto: Estimulam a densidade sóssea e crescimento."
        ],
        target_skills: [
            { name: "Violão/Música", benefit: "Raciocínio lógico, matemática e sensibilidade." },
            { name: "Inglês", benefit: "Acesso global à informação desde cedo." },
            { name: "Boxe/Artes Marciais", benefit: "Disciplina, controle emocional e autodefesa." },
            { name: "Tênis", benefit: "Tomada de decisão rápida, resiliência solitária." },
            { name: "Programação", benefit: "Estruturação de pensamento e resolução de problemas." },
            { name: "Futebol", benefit: "Trabalho em equipe e socialização." }
        ]
    },
    psychological_tricks: [
        {
            title: "Programação Subconsciente (Aversão/Gosto)",
            desc: "Para evitar gostos indesejados (ex: chocolate/doces) ou criar bons hábitos:",
            tactics: [
                "Paladar Primário (Até 2 anos): Zero açúcar. O cérebro não sentirá falta do que não conhece (programação biológica).",
                "Ancoragem Negativa (Cautela): Se ele comer algo que faz mal, explique calmamente a consequência física (dor de barriga) logo após, criando a associação cerebral 'Isso = Dor'.",
                "Reforço Intermitente: Não elogie sempre. Elogios aleatórios geram mais esforço do que elogios constantes (efeito cassino)."
            ]
        },
        {
            title: "Técnicas de PNL para Pais",
            tactics: [
                "Duplo Vínculo: Não pergunte 'Quer tomar banho?'. Pergunte 'Quer levar o pato ou o barco para o banho?'. A ação (banho) é inegociável, a escolha (brinquedo) dá sensação de controle.",
                "Profecia Autorrealizável: Nunca diga 'ele é bagunceiro'. Diga 'ele está aprendendo a ser organizado'. O rótulo forma a identidade."
            ]
        }
    ],
    negative_parental_attitudes: [
        "Inconsistência: Hora pode, hora não pode (gera ansiedade e teste de limites).",
        "Desautorizar o parceiro: Tirar a autoridade do pai/mãe na frente do filho (divide para conquistar).",
        "Terceirizar a educação: Deixar que a escola ou o tablet ensinem valores.",
        "Superproteção: Impedir que a criança sofra consequências naturais de seus erros pequenos.",
        "Comparação: 'Por que você não é igual ao fulano?'. Isso destrói a autoestima."
    ]
};

  return (
    <>
      <div className="relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Jornada Pós-Parto</h2>
        <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8">
          {guidance.map((section, idx) => (
              <div key={idx} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold text-sm shadow-sm z-10">
                      {idx + 1}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-primary mb-4">{section.title}</h3>
                      <ul className="space-y-2">
                          {section.items.map((item, i) => (
                              <li key={i} className="flex items-start text-gray-700">
                                  <span className="w-1.5 h-1.5 bg-pink-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          ))}
        </div>
      </div>

      <div className="space-y-8 mt-20">
        
        {/* Título da Seção de Educação */}
        <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                Guia de Educação & Futuro
            </h2>
            <p className="text-gray-500 mt-2">Estratégias para criar um ser humano forte, capaz e feliz.</p>
        </div>

        {/* 1. Caráter e Mentalidade (Grid) */}
        <div className="grid md:grid-cols-2 gap-6">
            {PARENTING_GUIDE.character_and_mindset.map((section, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-colors">
                    <h4 className="font-bold text-indigo-800 text-lg mb-4 flex items-center gap-2">
                        <span className="bg-indigo-50 p-1.5 rounded text-xl">🧠</span> {section.title}
                    </h4>
                    <ul className="space-y-3">
                        {section.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-gray-700 leading-relaxed border-l-2 border-indigo-100 pl-3">
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* 2. Físico e Habilidades (Card Destacado) */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="relative z-10">
                <h4 className="font-bold text-2xl mb-6 flex items-center gap-2">
                    ⚡ Físico Forte & Habilidades
                </h4>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h5 className="font-bold text-emerald-400 mb-3 uppercase text-xs tracking-wider">Crescimento (Altura e Força)</h5>
                        <ul className="space-y-2 mb-6">
                            {PARENTING_GUIDE.physical_and_skills.height_and_strength.map((item, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start">
                                    <span className="text-emerald-500 mr-2">✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                         <h5 className="font-bold text-blue-400 mb-3 uppercase text-xs tracking-wider">Arsenal de Habilidades (Meta)</h5>
                         <div className="grid grid-cols-2 gap-2">
                            {PARENTING_GUIDE.physical_and_skills.target_skills.map((skill, i) => (
                                <div key={i} className="bg-white/10 p-2 rounded-lg border border-white/5 hover:bg-white/20 transition-colors">
                                    <p className="font-bold text-sm text-white">{skill.name}</p>
                                    <p className="text-[10px] text-gray-400">{skill.benefit}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. Truques Psicológicos e Subconsciente */}
        <div className="glass-card p-8 bg-purple-50/40 border-purple-100">
             <h4 className="font-bold text-purple-900 text-xl mb-6 flex items-center gap-2">
                <span className="text-2xl">🔮</span> Engenharia Comportamental & Truques
            </h4>
            
            <div className="grid md:grid-cols-2 gap-8">
                {PARENTING_GUIDE.psychological_tricks.map((trick, idx) => (
                    <div key={idx}>
                        <h5 className="font-bold text-purple-700 mb-2">{trick.title}</h5>
                        {trick.desc && <p className="text-xs text-purple-600/80 mb-3 italic">{trick.desc}</p>}
                        <ul className="space-y-3">
                            {trick.tactics.map((tactic, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-700 bg-white/60 p-3 rounded-xl shadow-sm">
                                    <span className="text-purple-500 mr-2 mt-0.5">✨</span>
                                    {tactic}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        {/* 4. O que NÃO fazer (Zona de Perigo) */}
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
             <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                <span className="text-xl">⛔</span> Atitudes que Impactam Negativamente
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
                {PARENTING_GUIDE.negative_parental_attitudes.map((att, i) => (
                    <div key={i} className="flex items-center text-sm text-red-900 bg-white p-3 rounded-lg border border-red-50">
                        <span className="text-red-500 font-bold mr-3 text-lg">×</span>
                        {att}
                    </div>
                ))}
            </div>
        </div>

        {/* Primeiros Socorros (Mantido Original) */}
        <div className="glass-card p-6 bg-rose-50/30 border-rose-100 mt-8">
            <h4 className="font-bold text-rose-600 mb-4 flex items-center gap-2"><span className="text-xl">⛑️</span> Primeiros Socorros Básicos</h4>
            <p className="text-sm text-gray-600 mb-4"><strong>Sinais de Emergência:</strong> Febre &gt;38°C (ou qualquer febre em &lt;3 meses), recusa em mamar, choro inconsolável, fontanela (moleira) afundada, lábios roxos.</p>
            <div className="bg-white/70 p-4 rounded-2xl border border-rose-100 flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="font-bold text-rose-700 mr-2">Kit Essencial:</span>
                <span className="bg-rose-100 px-2 py-1 rounded text-rose-800">Termômetro digital</span>
                <span className="bg-rose-100 px-2 py-1 rounded text-rose-800">Antisséptico</span>
                <span className="bg-rose-100 px-2 py-1 rounded text-rose-800">Aspirador nasal</span>
                <span className="bg-rose-100 px-2 py-1 rounded text-rose-800">Álcool 70%</span>
                <span className="bg-rose-100 px-2 py-1 rounded text-rose-800">Solução salina</span>
            </div>
        </div>
      </div>
    </>
  );
}