import React, { useState } from 'react';
import {
  DIETARY_GUIDELINES_DETAILED,
  EXERCISE_GUIDELINES,
  MEDICATION_GUIDE_BRAZIL,
  CRITICAL_ALERTS_AND_HIGHLIGHTS,
  PREVENTABLE_RISKS_AND_HOW_TO_REDUCE,
  EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY,
} from '../data';

/**
 * Component displaying multi-tabbed guidance for diet, exercise,
 * medication safety and general tips.  Each tab presents structured
 * information drawn from the underlying data constants along with
 * curated advice for the expecting mother.
 */
export default function GuidanceTabs() {
  const tabs = [
    { id: 'exercise', label: 'Exercícios' },
    { id: 'diet', label: 'Dieta' },
    { id: 'risks', label: 'Riscos & Prevenção' },
    { id: 'tips', label: 'Dicas' },
  ];
  const [activeTab, setActiveTab] = useState('exercise');

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Orientações e dicas</h2>
      {/* Tab headings */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab contents */}
      {activeTab === 'exercise' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            {EXERCISE_GUIDELINES.weekly_goal}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Regra de intensidade:</strong> {EXERCISE_GUIDELINES.intensity_rule}
          </p>
          <div>
            <h4 className="font-semibold text-primary mb-1">Atividades recomendadas</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {EXERCISE_GUIDELINES.approved_activities.map((act) => (
                <li key={act.activity}>
                  <strong>{act.activity}:</strong> {act.benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-1">Evite</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {EXERCISE_GUIDELINES.activities_to_avoid.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-1">Foco por trimestre</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>
                <strong>1º trimestre:</strong> {EXERCISE_GUIDELINES.trimester_focus.first_trimester}
              </li>
              <li>
                <strong>2º trimestre:</strong> {EXERCISE_GUIDELINES.trimester_focus.second_trimester}
              </li>
              <li>
                <strong>3º trimestre:</strong> {EXERCISE_GUIDELINES.trimester_focus.third_trimester}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-1">Protocolo assoalho pélvico</h4>
            <p className="text-sm text-gray-700">
              {EXERCISE_GUIDELINES.pelvic_floor_protocol}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-1">Sinais de alerta</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {EXERCISE_GUIDELINES.warning_signs_stop_immediately.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Informações sobre tênis e beach tennis */}
          {EXERCISE_GUIDELINES.tennis_and_beach_tennis && (
            <div>
              <h4 className="font-semibold text-primary mb-1">Tênis e Beach Tennis</h4>
              <p className="text-sm text-gray-700 mb-1">
                {EXERCISE_GUIDELINES.tennis_and_beach_tennis.can_you_play}
              </p>
              <p className="text-sm text-gray-700">
                {EXERCISE_GUIDELINES.tennis_and_beach_tennis.guidelines_if_experienced}
              </p>
            </div>
          )}
        </div>
      )}
      {activeTab === 'diet' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Tipo de dieta: {DIETARY_GUIDELINES_DETAILED.type}
          </p>
          <div>
            <h4 className="font-semibold text-primary mb-1">
              Alvos nutricionais específicos
            </h4>
            <p className="text-sm text-gray-700">
              {DIETARY_GUIDELINES_DETAILED.specific_nutrient_targets}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-primary mb-1">Consumir</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {DIETARY_GUIDELINES_DETAILED.consume.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Evitar</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {DIETARY_GUIDELINES_DETAILED.avoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-1">Notas</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>{DIETARY_GUIDELINES_DETAILED.notes.caloric_myth}</li>
              <li>{DIETARY_GUIDELINES_DETAILED.notes.vegetarian_focus}</li>
            </ul>
          </div>

        {/* Informações adicionais sobre água e doces */}
        {DIETARY_GUIDELINES_DETAILED.notes.hydration_and_water_info && (
          <div>
            <h4 className="font-semibold text-primary mb-1">Hidratação e água</h4>
            <p className="text-sm text-gray-700">
              {DIETARY_GUIDELINES_DETAILED.notes.hydration_and_water_info}
            </p>
          </div>
        )}
        {DIETARY_GUIDELINES_DETAILED.notes.sweets_guidance && (
          <div>
            <h4 className="font-semibold text-primary mb-1">Doces e açúcar</h4>
            <p className="text-sm text-gray-700">
              {DIETARY_GUIDELINES_DETAILED.notes.sweets_guidance}
            </p>
          </div>
        )}
        </div>
      )}
      {activeTab === 'risks' && (
        <div className="space-y-6">
          {/* Critical alerts */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Alertas críticos</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>{CRITICAL_ALERTS_AND_HIGHLIGHTS.cannabis_abstinence}</li>
              <li>{CRITICAL_ALERTS_AND_HIGHLIGHTS.medications_stimulants}</li>
              <li>{CRITICAL_ALERTS_AND_HIGHLIGHTS.food_safety}</li>
              <li>{CRITICAL_ALERTS_AND_HIGHLIGHTS.immediate_action}</li>
            </ul>
          </div>
          {/* Medication safety principles */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Princípios de segurança de medicação</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {MEDICATION_GUIDE_BRAZIL.safety_principles.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
          {/* Pain and fever guidance */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Analgésicos e anti-inflamatórios</h4>
            <p className="text-sm text-gray-700 mb-2">
              Prefira paracetamol em doses moderadas. AINEs devem ser evitados a partir de 20
              semanas. Consulte sempre o obstetra. O uso excessivo de paracetamol pode
              estar associado a risco de transtornos do neurodesenvolvimento, portanto use
              apenas se realmente necessário.
            </p>
            
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {MEDICATION_GUIDE_BRAZIL.pain_and_fever.avoid_or_only_if_strictly_prescribed.map(
                (item, idx) => (
                  <li key={idx}>
                    <strong>{item.active_ingredient || item.class || 'Medicamento'}:</strong> {item.notes}
                  </li>
                ),
              )}
            </ul>
            {MEDICATION_GUIDE_BRAZIL.pain_and_fever.important_combo_products_to_avoid && (
              <div className="mt-2">
                <h5 className="font-semibold text-primary mb-1 text-sm">Produtos combinados a evitar</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {MEDICATION_GUIDE_BRAZIL.pain_and_fever.important_combo_products_to_avoid.map((prod, idx) => (
                    <li key={idx}>{prod.product_examples.join(', ')} – {prod.why}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">
              Como reduzir o risco de febre com bons hábitos
            </h4>

            <p className="text-sm text-gray-700 mb-3">
              Febre durante a gestação pode estar associada a infecções virais, bacterianas
              ou intoxicações alimentares. Embora nem toda febre seja evitável,
              hábitos preventivos reduzem significativamente o risco.
            </p>

            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>
                <strong>Higiene rigorosa das mãos:</strong> lavar as mãos com água e sabão
                antes de comer, após usar o banheiro, trocar fraldas, mexer em lixo,
                chegar da rua ou tocar em animais.
              </li>

              <li>
                <strong>Segurança alimentar:</strong> cozinhar bem carnes, ovos e peixes;
                evitar carnes cruas ou mal passadas, sushi, ovos crus e leite/queijos
                não pasteurizados. Lavar frutas e vegetais cuidadosamente.
              </li>

              <li>
                <strong>Evitar contaminação cruzada:</strong> usar tábuas e utensílios
                diferentes para alimentos crus e cozidos; higienizar superfícies da cozinha.
              </li>

              <li>
                <strong>Prevenção de infecções virais:</strong> evitar contato próximo com
                pessoas gripadas ou febris; ambientes fechados e lotados aumentam o risco.
              </li>

              <li>
                <strong>Vacinação em dia:</strong> manter vacinas recomendadas na gestação
                (influenza, COVID-19, dTpa, hepatite B quando indicada), pois reduzem
                drasticamente o risco de febre e complicações.
              </li>

              <li>
                <strong>Proteção contra mosquitos:</strong> usar repelentes seguros para
                gestantes, roupas de manga longa e eliminar focos de água parada
                (reduz risco de Zika, dengue e chikungunya).
              </li>

              <li>
                <strong>Evitar alimentos e água de procedência duvidosa:</strong>
                especialmente em viagens ou restaurantes sem boas condições sanitárias,
                prevenindo intoxicações alimentares e gastroenterites.
              </li>

              <li>
                <strong>Boa hidratação e descanso:</strong> desidratação e exaustão
                enfraquecem o sistema imunológico e aumentam a vulnerabilidade a infecções.
              </li>

              <li>
                <strong>Controle de doenças pré-existentes:</strong> diabetes,
                infecções urinárias recorrentes, sinusites e problemas dentários
                mal controlados aumentam risco de febre.
              </li>

              <li>
                <strong>Evitar automedicação:</strong> mascarar sintomas com remédios
                sem orientação pode atrasar diagnóstico de infecções importantes.
              </li>
            </ul>

            <div className="mt-3 bg-gray-50 border rounded p-3">
              <p className="text-sm text-gray-700">
                <strong>Procure avaliação médica imediata</strong> se houver febre
                ≥ 38,0°C, calafrios, dor abdominal, ardor ao urinar, vômitos persistentes,
                dor lombar, redução de movimentos fetais ou mal-estar intenso.
              </p>
            </div>
          </div>

          {/* Nausea and vomiting */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Náuseas e vômitos</h4>
            <p className="text-sm text-gray-700 mb-2">
              {MEDICATION_GUIDE_BRAZIL.nausea_and_vomiting.first_steps_non_drug.join('; ')}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Opções medicamentosas comuns no Brasil (exemplo – Dramin B6, Metoclopramida, Ondansetrona)
              devem ser discutidas com o obstetra.
            </p>
          </div>
          {/* Down syndrome info */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Síndrome de Down</h4>
            <h5 className="font-semibold text-primary text-sm mb-1">O que você pode e não pode fazer</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.down_syndrome.what_you_can_and_cant_do.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <h5 className="font-semibold text-primary text-sm mt-2 mb-1">Opções de rastreio</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.down_syndrome.screening_options.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Microcefalia and congenital infections */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Microcefalia e infecções congênitas</h4>
            <h5 className="font-semibold text-primary text-sm mb-1">Principais causas evitáveis</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.microcephaly_and_congenital_infections.main_preventable_causes.map((cause, idx) => (
                <li key={idx}>{cause}</li>
              ))}
            </ul>
            <h5 className="font-semibold text-primary text-sm mt-2 mb-1">Prevenção prática</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.microcephaly_and_congenital_infections.practical_prevention.map((pr, idx) => (
                <li key={idx}>{pr}</li>
              ))}
            </ul>
            <h5 className="font-semibold text-primary text-sm mt-2 mb-1">Detecção precoce e monitoramento</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.microcephaly_and_congenital_infections.early_detection_and_monitoring.ultrasound_monitoring.map((txt, idx) => (
                <li key={idx}>{txt}</li>
              ))}
              {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.microcephaly_and_congenital_infections.early_detection_and_monitoring.additional_tests_when_indicated.map((txt, idx) => (
                <li key={`add-${idx}`}>{txt}</li>
              ))}
            </ul>
          </div>
          {/* Additional notes */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Notas adicionais</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {PREVENTABLE_RISKS_AND_HOW_TO_REDUCE.additional_medical_notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>

          {/* Exam plan for early detection */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Plano de exames para detecção precoce</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li><strong>Início da gestação:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY.early_pregnancy_initial.join('; ')}</li>
              <li><strong>10–14 semanas:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['10_to_14_weeks'].join('; ')}</li>
              <li><strong>18–24 semanas:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['18_to_24_weeks'].join('; ')}</li>
              <li><strong>24–28 semanas:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY['24_to_28_weeks'].join('; ')}</li>
              <li><strong>Ao longo da gestação:</strong> {EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY.throughout.join('; ')}</li>
            </ul>
          </div>
        </div>
      )}
      {activeTab === 'tips' && (
        <div className="space-y-6 text-sm text-gray-700">
          {/* Ambiente e bem-estar mental */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Ambiente e bem‑estar mental após o parto</h4>
            <p>
              Crie um ambiente calmo, seguro e previsível para o recém‑nascido. Mantenha a casa livre
              de fumaça e evite ruídos excessivos. Fale, cante e leia para o bebê – ele reconhece vozes
              familiares e sente‑se seguro com a sua presença. Responder aos choros e aos gestos com
              carinho ajuda a construir confiança e vínculos afetivos.
            </p>
            <p>
              Evite sacudir o bebê ou manuseá‑lo bruscamente. Bebês têm musculatura cervical frágil e
              sacudi‑los pode causar lesões graves. Para um sono seguro, coloque‑o sempre de costas em
              um colchão firme sem objetos soltos no berço, reduzindo o risco de síndrome da morte súbita infantil.
            </p>
          </div>
          {/* Presentes e limites saudáveis */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Presentes e limites</h4>
            <p>
              O afeto não é medido pela quantidade de brinquedos. Presentear em excesso pode dificultar que a
              criança aprenda a valorizar e cuidar do que tem. Prefira experiências e brincadeiras em família,
              incentive a criatividade com objetos simples e ensine o valor da gratidão. Estabeleça limites
              claros: dizer “não” quando necessário ajuda a formar um adulto equilibrado e responsável.
            </p>
          </div>
          {/* Atividade física e estimulação precoce */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Atividade física e estimulação precoce</h4>
            <p>
              Mesmo pequenos, os bebês precisam se movimentar. Deixe tempo diário para o bebê explorar o chão
              (tummy time) e, à medida que cresce, incentive engatinhar e andar. Deixar o bebê no chão
              fortalece músculos e estimula a exploração do ambiente. Evite deixá‑los por longos períodos
              em cadeirinhas, balanços ou carrinhos.
            </p>
            <p>
              Para o desenvolvimento cognitivo, converse frequentemente, responda aos balbucios, leia livros e
              conte histórias. Esses estímulos favorecem a linguagem. Introduza gradualmente novos sons e,
              mais tarde, outros idiomas; o aprendizado é facilitado quando iniciado de forma lúdica na
              primeira infância.
            </p>
          </div>
          {/* Estímulo de autonomia e responsabilidade */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Autonomia e responsabilidade desde cedo</h4>
            <p>
              Permita que a criança tente fazer pequenas tarefas adequadas à idade, como guardar brinquedos ou
              alimentar‑se sozinha. Valorize o esforço, não apenas o resultado. Ensinar a esperar e a dividir
              ajuda a desenvolver paciência, empatia e independência. Seja um exemplo de comportamento: crianças
              aprendem observando como você lida com frustrações e trata os outros.
            </p>
          </div>
          {/* Estímulo cognitivo e tempo de tela */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Estímulo cognitivo e uso de telas</h4>
            <p>
              Promova momentos de brincadeira livre, música, leitura e contato com a natureza. Interações
              presenciais e brincadeiras com outras pessoas são fundamentais para o desenvolvimento social e
              cognitivo. Para crianças menores de 18 meses, especialistas recomendam evitar o uso de
              telas, exceto videochamadas. Para crianças maiores, escolha conteúdos educativos e assista
              junto, interagindo e fazendo perguntas. Lembre‑se de que a aprendizagem acontece
              principalmente no mundo real.
            </p>
            <p>
              Garanta uma rotina de sono adequada – bebês de 4 a 12 meses precisam dormir cerca de 12 a 16 horas por
              dia, incluindo sonecas. Um bom sono fortalece a memória e o humor, contribuindo para um
              desenvolvimento saudável.
            </p>
          </div>
          {/* Segurança e saúde física */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Segurança e saúde</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Mantenha objetos pequenos, alimentos duros e itens soltos fora do alcance para evitar engasgos.
              </li>
              <li>
                Proteja o bebê de fumaça de cigarro e vapores; não permita que ninguém fume dentro de casa.
              </li>
              <li>
                Nunca transporte líquidos quentes enquanto segura o bebê e evite cobrir seu rosto com cobertores ou brinquedos.
              </li>
              <li>
                Mantenha as vacinas em dia; converse com o pediatra sobre o calendário vacinal.
              </li>
              <li>
                Use sempre cadeirinhas de carro voltadas para trás, conforme orientado pelos órgãos de trânsito.
              </li>
            </ul>
            <p className="mt-2">
              Alimentação equilibrada e exposição moderada ao sol (com proteção adequada) contribuem para ossos fortes,
              pele e cabelos saudáveis. Entretanto, cada criança tem seu próprio ritmo de crescimento; a beleza está em ser saudável.
            </p>
          </div>
          {/* Parentalidade positiva e valores */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Parentalidade positiva e valores</h4>
            <p>
              Modele o respeito e a gentileza no dia a dia. Evite palavrões e atitudes agressivas; em vez disso,
              ensine empatia, acolhimento e resolução pacífica de conflitos. Cultive uma rotina previsível e
              ofereça limites claros. Isso reduz a ansiedade e ajuda a criança a desenvolver autocontrole.
            </p>
            <p>
              Preste atenção aos interesses naturais do seu filho e ofereça atividades variadas sem forçar. Seja
              paciente: permitir que explore diferentes hobbies aumenta as chances de ele encontrar algo de que
              realmente goste e persista. Se houver preocupações com desenvolvimento ou comportamento, procure um
              profissional de saúde qualificado.
            </p>
          </div>
          {/* Situações de risco e primeiros socorros básicos */}
          <div>
            <h4 className="font-semibold text-primary mb-1">Situações de risco e primeiros socorros básicos</h4>
            <p>
              Ter conhecimentos básicos de primeiros socorros pode salvar vidas. Mantenha um kit de primeiros
              socorros em casa e aprenda manobras como a de desengasgo e a ressuscitação cardiopulmonar (RCP)
              para bebês. Caso o bebê engasgue, a Cruz Vermelha Britânica orienta dar até cinco tapas nas costas
              enquanto ele está de bruços e, se necessário, cinco compressões no peito.
              Se o bloqueio não se desfizer, peça ajuda médica imediatamente e repita as manobras até que a
              respiração seja restabelecida.
            </p>
            <p>
              Para quedas, queimaduras, febre alta, dificuldades respiratórias, reações alérgicas ou outros
              sintomas preocupantes, procure atendimento médico. Nunca hesite em contatar o serviço de emergência
              ou o pediatra diante de sinais graves ou se estiver inseguro sobre como agir.
            </p>
          </div>

      {/* Remédios e kit de primeiros socorros */}
      <div>
        <h4 className="font-semibold text-primary mb-1">Remédios e kit de primeiros socorros</h4>
        <p>
          A automedicação em bebês é perigosa. Antes de oferecer qualquer remédio, converse com o pediatra
          sobre a dose e a forma corretas. Para febre ou dor, o paracetamol infantil é geralmente seguro,
          mas bebês com menos de dois anos devem ter a dose ajustada pelo médico e o remédio não deve ser
          dado por conta própria. Anti‑inflamatórios como o ibuprofeno não devem ser usados em crianças com
          menos de seis meses; mesmo após essa idade, use somente se houver prescrição médica. Para cólicas e
          gases, gotas de simeticona podem aliviar o desconforto, mas também precisam de orientação.
        </p>
        <p>
          Medicamentos para enjoo ou náusea em crianças pequenas não devem ser administrados em casa; o
          ideal é oferecer mamadas menores e frequentes e procurar avaliação quando houver vômitos repetidos
          ou sinais de desidratação. Jamais dê xaropes para tosse ou resfriado destinados a adultos ou a
          crianças maiores, nem infusões caseiras sem a aprovação do médico.
        </p>
        <p>
          Para saber quando buscar ajuda, observe os sintomas com atenção: febre persistente acima de 38 °C,
          bebês com menos de três meses com qualquer febre, recusa em mamar, choro inconsolável, diarreia ou
          vômito frequentes, poucas fraldas molhadas, moleira afundada, respiração rápida ou com esforço,
          lábios arroxeados, sangue nas fezes ou no vômito, erupções cutâneas extensas ou qualquer sinal de
          que a criança está sem energia requerem contato imediato com o pediatra ou um pronto‑socorro.
        </p>
        <p>
          Monte um kit de primeiros socorros completo e mantenha‑o fora do alcance de crianças. Os itens
          recomendados incluem: um termômetro digital (preferencialmente de leitura rápida), curativos
          adesivos de vários tamanhos, gaze estéril e fita adesiva, uma bandagem elástica (faixa
          compressiva), pomada ou creme antisséptico para cortes, creme anti‑histamínico e loção de
          calamina para picadas e irritações, gotas de simeticona (anti‑gases), solução salina e um
          aspirador nasal, tesoura de pontas arredondadas, cortador de unhas específico para bebês,
          pinça para remoção de farpas, álcool 70 % e lenços umedecidos antissépticos, uma bolsa de gel
          frio ou bolsa de gelo reutilizável e luvas descartáveis. Guarde também paracetamol e ibuprofeno
          infantis, juntamente com o dosador original, mas use‑os somente sob orientação profissional.
        </p>
      </div>
        </div>
      )}
    </div>
  );
}