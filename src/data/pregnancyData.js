/*
 * This file contains the original pregnancy guide constants.  It is a
 * verbatim copy of the uploaded `pregnancy_guide_consts.js` file.  The
 * rest of the application imports from this module to access the
 * underlying data.  Keeping these constants in one place makes it
 * straightforward to update the guide later without touching the rest
 * of the codebase.
 */

export const GUIDE_METADATA = {
  "title": "Jornada da Gravidez • Rose Edition",
  "header_title": "Uma jornada de amor e saúde",
  "description":
    "Use este guia como seu \"mapa\" pessoal para acompanhar cada semana, nutrição e cuidados até a chegada do seu bebê.",
  "timeline_range": {
    "start": "2025-12-12",
    "end": "2026-08-19",
  },
};

export const CRITICAL_ALERTS_AND_HIGHLIGHTS = {
  cannabis_abstinence:
    "A maconha não tem indicações médicas na gravidez e o seu princípio ativo (THC) atravessa a placenta, podendo reduzir o peso do recém-nascido e afetar o desenvolvimento neurológico. Interrompa o uso imediatamente e evite fumaça passiva.",
  medications_stimulants:
    "Se estiver a utilizar estimulantes como lisdexanfetamina (Vyvanse®), converse com seu médico. O uso no final da gestação pode reduzir o crescimento fetal e causar sintomas de abstinência no recém‑nascido.",
  food_safety:
    "Evite carnes/ovos crus, queijos não pasteurizados e brotos crus. Prefira peixes com baixo mercúrio. Cafeína: máximo 200mg/dia.",
  immediate_action:
    "Suspender cannabis, revisar remédios, iniciar vitaminas (Fólico, B12, Ferro).",
};

export const WOMAN_INFO = {
  last_menstrual_date: "2025-11-12",
  probable_conception_date: "2025-11-26",
  estimated_due_date: "2026-08-19",
  current_status_dec_2025: "4 Semanas (Início do Primeiro Trimestre)",
  pregnancy_discovery_date: "2025-12-12",
  height_m: 1.74,
  weight_kg: 70,
  birth: "1994-05-14",
  diet: "ovolactovegetariana",
  renda_do_casal: "19.000 BRL/mês",
};

export const PRENATAL_CARE_TEAM_AND_SCHEDULE = {
  description:
    "Visão geral consolidada da equipe multidisciplinar e momentos chave para agendamento.",
  specialists: [
    {
      role: "Médico Obstetra",
      importance: "Crítica",
      frequency:
        "Mensal até 28 semanas, Quinzenal até 36 semanas, Semanal até o parto.",
      key_actions:
        "Pré-natal rotina, pedidos de exames, vacinas, parto.",
      expected_start: "Imediato (Dez 2025)",
    },
    {
      role: "Nutricionista (Foco Vegetariano)",
      importance: "Alta",
      frequency: "Pelo menos 1 vez por trimestre.",
      key_actions: "Ajuste de B12, Ferro, Cálcio e controle de peso.",
      expected_visits: [
        "Dez/Jan (Planejamento Inicial)",
        "Abril (Ajuste 2º Trimestre)",
        "Junho (Ajuste 3º Trimestre)",
      ],
    },
    {
      role: "Médico de Medicina Fetal (Ultrassonografista)",
      importance: "Alta",
      frequency: "Pontual (nos ultrassons morfológicos).",
      key_actions: "Ultrassom TN (12 sem), Morfológico (22 sem), Doppler (32 sem).",
      expected_visits: [
        "Fev 2026 (TN)",
        "Abr 2026 (Morfológico)",
        "Jun 2026 (Crescimento)",
      ],
    },
    {
      role: "Dentista",
      importance: "Média",
      frequency: "1 check-up no 2º trimestre (mais seguro).",
      key_actions: "Limpeza, prevenção de gengivite (comum na gravidez).",
      expected_visit: "Março/Abril 2026",
    },
    {
      role: "Fisioterapeuta Pélvica",
      importance: "Média/Alta",
      frequency:
        "Avaliação inicial no 2º trimestre + preparação parto.",
      key_actions: "Prevenção de incontinência, exercícios perineais.",
      expected_start: "Abril 2026",
    },
    {
      role: "Pediatra (Consulta Pré-Natal)",
      importance: "Alta",
      frequency: "1 visita no 3º trimestre.",
      key_actions:
        "Escolha do pediatra para sala de parto, dúvidas sobre amamentação/cuidados RN.",
      expected_visit: "Julho 2026",
    },
    {
      role: "Anestesiologista",
      importance: "Opcional (depende do plano de parto)",
      frequency: "1 visita pré-parto.",
      key_actions:
        "Avaliação de riscos para analgesia/anestesia.",
      expected_visit: "Julho/Agosto 2026",
    },
  ],
};

export const CRONOGRAMA_CALENDARIZADO = {
  phase_1_immediate_action: {
    title: "Fase 1: Confirmação e Ajustes Imediatos",
    dates: "13/12/2025 - 07/01/2026",
    weeks: "4 a 8 semanas",
    medical_support_needed: [
      "Obstetra (1ª Consulta)",
      "Laboratório de Análises Clínicas (Exames de Sangue)",
      "Nutricionista (Ajuste dieta vegetariana)",
    ],
    dietary_focus:
      "Ácido Fólico/Metilfolato, Gengibre (se náusea), Hidratação intensa. Evitar doces em excesso.",
    tasks: {
      continuous: [
        "Tomar vitaminas diariamente (B12, Fólico, Ferro se indicado).",
        "Hidratação (2-3L água).",
        "Abstinência total de álcool, fumo e cannabis.",
      ],
      phase_specific: [
        "Agendar 1ª consulta pré-natal.",
        "Agendar ultrassom de datação (para fazer em Jan).",
        "Realizar bateria de exames de sangue (HCG, Tipagem, Sorologias).",
        "Revisar cosméticos (ácidos proibidos) e medicações (Venvanse).",
      ],
      shopping_and_preparation: [
        "Comprar: Vitaminas pré-natais.",
        "Comprar: Repelente seguro (Icaridina/DEET) - Prevenção Zika.",
        "Comprar: Creme hidratante para prevenção de estrias (começar cedo).",
        "Comprar: Sutiãs confortáveis (seios podem ficar sensíveis).",
      ],
    },
    exams_overview: "Beta HCG, Hemograma, Tipagem, Sorologias, Urina.",
  },
  phase_2_first_trimester_screening: {
    title: "Fase 2: Rastreamento Genético e Vitalidade",
    dates: "28/01/2026 - 18/02/2026",
    weeks: "11 a 14 semanas",
    medical_support_needed: [
      "Médico de Medicina Fetal (Especialista para Translucência Nucal)",
      "Obstetra (Rotina)",
    ],
    dietary_focus: "Proteína vegetal (Tofu, feijões), Vitamina B6 (náuseas), Iodo.",
    tasks: {
      continuous: [
        "Uso de hidratante na barriga/seios.",
        "Caminhadas leves (se liberado).",
      ],
      phase_specific: [
        "Realizar Ultrassom Translucência Nucal (Data crítica: não perder janela 11-13s).",
        "Decidir sobre NIPT (exame genético de sangue - opcional/pago).",
        "Contar a novidade para família/trabalho (geralmente após a TN).",
      ],
      shopping_and_preparation: [
        "Planejamento Financeiro: Iniciar 'poupança do bebê' agressiva.",
        "Pesquisa: Começar a pesquisar modelos de carrinho e berço (apenas pesquisar).",
      ],
    },
    exams_overview: "USG Translucência Nucal, Doppler Ducto Venoso, Osso Nasal.",
  },
  phase_3_second_trimester_morphology: {
    title: "Fase 3: Anatomia Detalhada e Compras Maiores",
    dates: "01/04/2026 - 29/04/2026",
    weeks: "20 a 24 semanas",
    medical_support_needed: [
      "Médico de Medicina Fetal (Morfológico)",
      "Dentista (Check-up seguro)",
      "Fisioterapeuta Pélvica (Avaliação assoalho pélvico)",
    ],
    dietary_focus:
      "Cálcio (fortalecimento ósseo fetal), Ferro (volume sanguíneo aumenta muito).",
    tasks: {
      continuous: [
        "Exercícios físicos moderados.",
        "Monitoramento de pressão arterial nas consultas.",
      ],
      phase_specific: [
        "Realizar Ultrassom Morfológico do 2º Trimestre.",
        "Medir colo do útero (prevenção parto prematuro).",
        "Visita ao Dentista.",
        "Iniciar aulas de preparação para o parto/amamentação.",
      ],
      shopping_and_preparation: [
        "**COMPRA GRANDE:** Encomendar Móveis (Berço, Cômoda) - prazos de entrega podem ser longos.",
        "**COMPRA GRANDE:** Carrinho de Bebê e Bebê Conforto (Item de segurança obrigatório).",
        "Comprar: Roupas de gestante para a mãe (barriga cresce rápido agora).",
      ],
    },
    exams_overview: "USG Morfológico 2º Tri, Medida do Colo Uterino.",
  },
  phase_4_glucose_and_vaccines: {
    title: "Fase 4: Diabetes, Vacinas e Enxoval Têxtil",
    dates: "29/04/2026 - 27/05/2026",
    weeks: "24 a 28 semanas",
    medical_support_needed: [
      "Obstetra (Análise Curva Glicêmica)",
      "Sala de Vacinação (Posto de Saúde/Clínica)",
    ],
    dietary_focus:
      "Fibras (evitar constipação), Baixo índice glicêmico (prevenção diabetes), Omega-3 (DHA cérebro bebê).",
    tasks: {
      continuous: [
        "Contagem de movimentos fetais (ficar atenta aos padrões).",
        "Hidratação da pele.",
      ],
      phase_specific: [
        "Realizar Teste de Tolerância à Glicose (TOTG).",
        "Tomar vacina dTpa (Coqueluche) e Influenza.",
        "Se Rh Negativo: Tomar imunoglobulina (Rogan) se indicado.",
      ],
      shopping_and_preparation: [
        "**COMPRA MÉDIA:** Enxoval de Roupas (Bodies, Calças, Macacões RN e P).",
        "Comprar: Fraldas (Estoque inicial tam RN e P).",
        "Comprar: Kit Berço/Lençóis, Toalhas de banho bebê.",
        "Comprar: Banheira e itens de higiene (sabonete, pomada, algodão).",
      ],
    },
    exams_overview: "Curva Glicêmica (TOTG 75g), Hemograma (Anemia), Coombs (se Rh-).",
  },
  phase_5_third_trimester_prep: {
    title: "Fase 5: Reta Final, Mala Pronta e Pediatra",
    dates: "27/05/2026 - 29/07/2026",
    weeks: "28 a 37 semanas",
    medical_support_needed: [
      "Obstetra (Consultas quinzenais)",
      "Pediatra (Consulta Pré-Natal)",
      "Anestesiologista (Opcional)",
    ],
    dietary_focus:
      "Refeições pequenas e frequentes (azia/refluxo), Colina, Vitamina C + Ferro.",
    tasks: {
      continuous: [
        "Massagem perineal (se orientada pela fisio).",
        "Repouso relativo (reduzir ritmo de trabalho).",
      ],
      phase_specific: [
        "Realizar Exame do Cotonete (Estreptococo B) ~35-37sem.",
        "Consulta pré-natal com Pediatra.",
        "Visitar maternidade (tour físico ou virtual).",
        "Definir plano de parto com obstetra.",
      ],
      shopping_and_preparation: [
        "**AÇÃO FINAL DE COMPRA:** Tudo deve estar comprado até 36 semanas.",
        "Comprar: Itens da Mala Maternidade (Absorventes pós-parto, camisolas amamentação, chinelo).",
        "Comprar: Farmacinha do bebê (Álcool 70%, termômetro, aspirador nasal).",
        "**PRÁTICA:** Lavar todas as roupinhas do bebê com sabão neutro.",
        "**PRÁTICA:** Montar a Mala da Maternidade e deixar no carro/porta.",
        "**PRÁTICA:** Instalar o Bebê Conforto no carro (treinar instalação).",
      ],
    },
    exams_overview:
      "USG com Doppler (Crescimento), Cultura Strepto B, Cardiotocografia (se necessário).",
  },
  phase_6_delivery_window: {
    title: "Fase 6: Aguardando o Parto",
    dates: "05/08/2026 - 26/08/2026",
    weeks: "38 a 41 semanas",
    medical_support_needed: [
      "Obstetra (Consultas Semanais)",
      "Maternidade (Pronto Socorro se entrar em trabalho de parto)",
    ],
    dietary_focus:
      "Alimentos leves, de fácil digestão. Tâmaras (estudos sugerem ajuda no parto). Muita água.",
    tasks: {
      continuous: [
        "Monitorar contrações e perda de líquido.",
        "Relaxamento e sono sempre que possível.",
      ],
      phase_specific: [
        "Consultas semanais de toque/avaliação.",
        "Monitoramento de vitalidade fetal (Cardio).",
      ],
      shopping_and_preparation: [
        "**NADA A COMPRAR.**",
        "Foco total em: Descanso, estoque de comida congelada para o pós-parto, deixar a casa organizada.",
        "Garantir quem cuidará da casa/animais enquanto você estiver no hospital.",
      ],
    },
    exams_overview: "Cardiotocografia, Perfil Biofísico Fetal.",
  },
};

export const DIETARY_GUIDELINES_DETAILED = {
  type: "Nutrição Vegetariana (Ovo-Lacto)",
  specific_nutrient_targets:
    "Gestantes vegetarianas precisam de atenção à B12 (2,6 µg/dia), Ferro (~48,6 mg/dia), Colina (450 mg/dia), Cálcio (1.000 mg), Vitamina D e Ômega-3 (ALA/DHA).",
  consume: [
    "Leguminosas, soja, tofu",
    "Cereais integrais (aveia, quinoa)",
    "Ovos e laticínios pasteurizados",
    "Nozes, sementes, linhaça (ALA)",
    "Frutas coloridas (Vit C)",
    "Algas ou suplemento DHA",
  ],
  avoid: [
    "Leite cru / Queijos não pasteurizados",
    "Ovos moles ou crus",
    "Peixe cru / alto mercúrio",
    "Brotos crus / saladas não lavadas",
    "Álcool & Energéticos",
    "Cafeína > 200mg/dia",
  ],
  notes: {
    caloric_myth:
      "Comer 'por dois' é um mito. Você só precisa de ~300 calorias extras (1 lanche extra) começando no 2º trimestre.",
    vegetarian_focus:
      "Como ela é vegetariana, a nutricionista deve focar em Ferro (Feijões + Vitamina C) e suplementação de B12.",
    // Informações adicionais de hidratação e consumo de doces para a dieta.  A hidratação adequada e
    // o consumo moderado de açúcar são cruciais para o bem‑estar da mãe e do bebê.  Ver
    // diretrizes do NHS e da ACOG para ingestão de líquidos e recomendações de especialistas sobre
    // açúcar durante a gestação.
    hydration_and_water_info:
      "Mantenha‑se bem hidratada: recomenda‑se beber de 6 a 8 copos (200 ml) de líquidos por dia – cerca de 1,6 litro – ou aproximadamente 10 copos (~2,3 litros) de água e outras bebidas saudáveis conforme sugestão do Colégio Americano de Obstetras e Ginecologistas. Ajuste a ingestão conforme o clima e o nível de atividade e observe se a urina permanece de cor clara. Evite bebidas açucaradas ou com cafeína em excesso.",
    sweets_guidance:
      "Doces em moderação: as alterações hormonais podem aumentar a vontade de comer açúcar, mas o consumo exagerado pode levar ao ganho de peso, cáries e diabetes gestacional. Uma ingestão moderada de açúcar (~25 g/dia) é considerada segura. Prefira frutas frescas para satisfazer o paladar doce e limite refrigerantes e sucos industrializados, que contêm grandes quantidades de açúca. Beba água para ajudar a controlar a vontade de comer doces e converse com a nutricionista se houver dúvidas sobre substituições mais saudáveis.",
  },
};

export const EXERCISE_GUIDELINES = {
  weekly_goal:
    "150 minutos de atividade aeróbica de moderada intensidade por semana (ex: 30 min, 5x na semana).",
  intensity_rule:
    "Teste da Fala: Você deve conseguir manter uma conversa enquanto se exercita. Se estiver ofegante demais para falar, diminua o ritmo imediatamente.",
  approved_activities: [
    {
      activity: "Caminhada",
      benefit: "Baixo impacto, melhora circulação e é seguro em todos os trimestres.",
    },
    {
      activity: "Natação / Hidroginástica",
      benefit:
        "Excelente para reduzir inchaço e aliviar dores nas costas (a água suporta o peso).",
    },
    {
      activity: "Yoga Pré-Natal",
      benefit:
        "Foco em respiração, relaxamento e abertura pélvica. (Evite 'Hot Yoga').",
    },
    {
      activity: "Pilates Adaptado",
      benefit:
        "Fortalecimento do 'core' profundo e postura, essencial para prevenir dor lombar.",
    },
    {
      activity: "Musculação Leve",
      benefit:
        "Manutenção muscular. Evite prender a respiração (manobra de Valsalva) ao levantar peso.",
    },
  ],
  activities_to_avoid: [
    "Esportes de contato (futebol, basquete, lutas) - Risco de trauma abdominal.",
    "Atividades com alto risco de queda (hipismo, esqui, ciclismo off-road, ginástica olímpica).",
    "Mergulho com cilindro (Risco de doença descompressiva fetal).",
    "Hot Yoga / Bikram (Risco de hipertermia e má formação no 1º tri).",
    "Abdominais tradicionais (crunch) após o 1º trimestre (Risco de diástase).",
  ],
  trimester_focus: {
    first_trimester:
      "Respeite a fadiga e náusea. Hidratação é crítica. Se estiver muito cansada, faça apenas alongamentos.",
    second_trimester:
      "O centro de gravidade muda (cuidado com equilíbrio). EVITE exercícios deitada de barriga para cima (supina) para não comprimir a veia cava e reduzir oxigênio para o bebê.",
    third_trimester:
      "Reduza a intensidade. Foco em mobilidade de quadril (agachamentos sustentados) e preparação para o parto.",
  },
  pelvic_floor_protocol:
    "Kegel Diário: Contraia os músculos da vagina (como se segurasse o xixi) por 5 segundos, relaxe por 10. Faça 3 séries de 10 repetições por dia para prevenir incontinência.",
  warning_signs_stop_immediately: [
    "Sangramento vaginal ou perda de líquido",
    "Tontura, desmaio ou dor de cabeça súbita",
    "Falta de ar antes do esforço",
    "Dor no peito ou palpitações",
    "Dor ou inchaço súbito na panturrilha",
    "Contrações uterinas regulares e dolorosas",
  ],

  // Secção adicional sobre a prática de tênis e beach tennis na gestação.  Apesar de serem
  // esportes de raquete populares, apresentam riscos devido a mudanças bruscas de direção
  // e possibilidade de queda ou trauma abdominal.  As recomendações a seguir resumem
  // orientações de entidades de saúde como ACOG, NHS e especialistas em exercício na gravide.
  tennis_and_beach_tennis: {
    can_you_play:
      "Tênis e beach tennis exigem deslocamentos rápidos e mudanças de direção. As diretrizes de saúde recomendam evitar esportes de contato ou com risco de queda, incluindo tênis e squash, especialmente quando o útero já ultrapassa a proteção pélvic. A instabilidade postural e os ligamentos mais frouxos aumentam a chance de torção e quedas; por isso, converse com seu obstetra antes de continuar a prática.",
    guidelines_if_experienced:
      "Se você já joga e está liberada pelo médico, adote precauções: use roupas e sutiãs de suporte, ajuste a numeração do calçado se houver inchaço e garanta bom amortecimento. Reduza a intensidade – evite saques fortes, correr atrás de bolas largas ou movimentos que exijam grande extensão; prefira partidas em duplas e jogue em quadras de areia ou grama para minimizar o impacto. Hidrate‑se, proteja‑se do sol e evite jogar em dias muito quentes. Nunca inicie tênis ou beach tennis pela primeira vez durante a gestação e interrompa imediatamente se houver sangramento, tontura, dor abdominal ou contrações.",
  },
};

export const WEEKLY_JOURNEY_SCHEDULE = [
  {
    week: "Semana 5",
    dates: "12 Dec – 18 Dec",
    focus:
      "Ação Principal: Confirmar a gravidez e agendar a primeira consulta. Suspender cannabis, revisar remédios. Iniciar vitaminas (Fólico, B12, Ferro). Evitar alimentos de risco.",
  },
  {
    week: "Semana 6",
    dates: "19 Dec – 25 Dec",
    focus:
      "Primeira consulta pré‑natal (exames de sangue). Discutir cessação da cannabis. Iniciar exercícios leves. Limitar cafeína.",
  },
  {
    week: "Semana 7",
    dates: "26 Dec – 01 Jan",
    focus:
      "Controlar náuseas (gengibre, refeições pequenas). Agendar ultrassom precoce. Praticar Kegel. Diário alimentar.",
  },
  {
    week: "Semana 8",
    dates: "02 Jan – 08 Jan",
    focus:
      "Ultrassom de Datação. Considerar teste NIPT. Consulta odontológica. Foco em ferro.",
  },
  {
    week: "Semana 9",
    dates: "09 Jan – 15 Jan",
    focus:
      "Aumentar cálcio. Monitorar peso. Evitar brotos crus. Manejo do estresse.",
  },
  {
    week: "Semana 10",
    dates: "16 Jan – 22 Jan",
    focus:
      "Consulta de acompanhamento. Pesquisar cursos. Exercícios assoalho pélvico. Ferro + Vitamina C.",
  },
  {
    week: "Semana 11",
    dates: "23 Jan – 29 Jan",
    focus:
      "Foco em Colina (ovos/soja). Hidratação. Planejar Translucência Nucal.",
  },
  {
    week: "Semana 12",
    dates: "30 Jan – 05 Feb",
    focus:
      "Translucência Nucal. Revisar resultados. Compartilhar a notícia? Incluir Ômega-3/DHA.",
  },
  {
    week: "Semana 13",
    dates: "06 Feb – 12 Feb",
    focus:
      "Início do segundo trimestre! Energia melhora. Agendar 2ª consulta. Roupas de maternidade.",
    milestone: "2º Trimestre",
  },
  {
    week: "Semana 14",
    dates: "13 Feb – 19 Feb",
    focus:
      "Treinamento de força leve. Priorizar o sono. B12. Diário de gravidez.",
  },
  {
    week: "Semana 15",
    dates: "20 Feb – 26 Feb",
    focus:
      "Teste quádruplo/triagem. Planejar ultrassom morfológico. Envolver parceiro.",
  },
  {
    week: "Semana 16",
    dates: "27 Feb – 05 Mar",
    focus:
      "Consulta pré-natal. Revisar vacinas (dTpa). Proteína (71g/dia). Exercícios pélvicos.",
  },
  {
    week: "Semana 17",
    dates: "06 Mar – 12 Mar",
    focus:
      "Agendar morfológico. Aumentar fibras. Técnicas de relaxamento.",
  },
  {
    week: "Semana 18",
    dates: "13 Mar – 19 Mar",
    focus:
      "Ultrassom Morfológico. Meio da gestação. Pesquisar pediatras. Aulas pré-natais.",
  },
  {
    week: "Semana 19",
    dates: "20 Mar – 26 Mar",
    focus:
      "Monitorar primeiros chutes. Natação/Baixo impacto. Planos de licença.",
  },
  {
    week: "Semana 20",
    dates: "27 Mar – 02 Apr",
    focus:
      "Consulta meio da gestação. Revisar morfologia. Ferro. Kegel.",
  },
  {
    week: "Semana 21",
    dates: "03 Apr – 09 Apr",
    focus:
      "Cursos de parto. Pesquisar odontopediatra. Lista enxoval. Finanças.",
  },
  {
    week: "Semana 22",
    dates: "10 Apr – 16 Apr",
    focus:
      "Preparar quarto. Fotos maternidade (opcional). Manter-se ativa.",
  },
  {
    week: "Semana 23",
    dates: "17 Apr – 23 Apr",
    focus:
      "Reduzir açúcar. Contagem de chutes. Apoio pós-natal.",
  },
  {
    week: "Semana 24",
    dates: "24 Apr – 30 Apr",
    focus:
      "Teste de Glicose. Consulta rotina. Ferro. Massagem pré-natal?",
  },
  {
    week: "Semana 25",
    dates: "01 May – 07 May",
    focus:
      "Revisar glicose. Caminhar. Planejar vacina dTpa. Colina/B12.",
  },
  {
    week: "Semana 26",
    dates: "08 May – 14 May",
    focus:
      "Consulta pré-natal (inchaço?). Ajustar dieta. Posições de parto. Planos finais de licença.",
  },
  {
    week: "Semana 27",
    dates: "15 May – 21 May",
    focus:
      "Início do 3º trimestre. Vacina dTpa. Sinais parto prematuro. Contagem diária de chutes.",
    milestone: "3º Trimestre",
  },
  {
    week: "Semana 28",
    dates: "22 May – 28 May",
    focus:
      "Consulta. Revisar glicose/ferro. Massagem perineal. Contracepção pós-parto.",
  },
  {
    week: "Semana 29",
    dates: "29 May – 04 Jun",
    focus:
      "Mala da maternidade! Finalizar plano de parto. Exercícios abertura de quadril.",
  },
  {
    week: "Semana 30",
    dates: "05 Jun – 11 Jun",
    focus:
      "Consulta (anemia/pressão). Cadeirinha do carro. Massagem perineal.",
  },
  {
    week: "Semana 31",
    dates: "12 Jun – 18 Jun",
    focus:
      "Ultrassom 3D/4D (opc). Monitorar Braxton Hicks. Congelar refeições.",
  },
  {
    week: "Semana 32",
    dates: "19 Jun – 25 Jun",
    focus:
      "Consulta. Planejar Estreptococo B. Pré-registro no hospital. Sinais pré-eclâmpsia.",
  },
  {
    week: "Semana 33",
    dates: "26 Jun – 02 Jul",
    focus:
      "Montagem quarto. Aulas parto. Vacinas em dia.",
  },
  {
    week: "Semana 34",
    dates: "03 Jul – 09 Jul",
    focus:
      "Consulta. Preparar lanches. Não carregar peso. Apoio amamentação.",
  },
  {
    week: "Semana 35",
    dates: "10 Jul – 16 Jul",
    focus:
      "Consultas semanais iniciam. Mala pronta? Abastecer casa.",
  },
  {
    week: "Semana 36",
    dates: "17 Jul – 23 Jul",
    focus:
      "Teste Estreptococo B. Cuidado para animais/irmãos. Finalizar plano de parto.",
  },
  {
    week: "Semana 37",
    dates: "24 Jul – 30 Jul",
    focus:
      "Consulta + exame cervical. Sinais de trabalho de parto. Descansar.",
    milestone: "A Termo",
  },
  {
    week: "Semana 38",
    dates: "31 Jul – 06 Aug",
    focus:
      "Consulta. Opções de indução. Rota para hospital. Relaxar.",
  },
  {
    week: "Semana 39",
    dates: "07 Aug – 13 Aug",
    focus:
      "Consulta (descolamento membranas?). Suprimentos pós-parto prontos.",
  },
  {
    week: "Semana 40",
    dates: "14 Aug – 20 Aug",
    focus:
      "Semana da data prevista! Consultas. Discutir indução se >41 sem. Preparar-se.",
    milestone: "Data Prevista",
  },
];

export const MEDICATION_GUIDE_BRAZIL = {
  safety_principles: [
    "Prefira medicamentos com um único princípio ativo (evite produtos 'combo' para gripe/resfriado).",
    "Use a menor dose eficaz pelo menor tempo possível.",
    "Evite AINEs (ibuprofeno/naproxeno/diclofenaco/etc.) a partir de 20 semanas, a menos que o obstetra prescreva explicitamente e monitore.",
    "Evite álcool, tabaco/nicotina e cannabis durante a gravidez.",
    "Não pare medicamentos de uso contínuo sem falar com o médico (risco de efeito rebote pode ser pior que o remédio).",
    "Se febre >= 38.0°C, vômito persistente, desidratação, sangramento, forte dor abdominal, redução de movimentos fetais (final da gravidez) ou dor de cabeça severa/sintomas visuais: procure atendimento urgente.",
  ],
  pain_and_fever: {
    avoid_or_only_if_strictly_prescribed: [
      {
        active_ingredient: "Dipirona (Metamizol)",
        common_brands_brazil: ["Novalgina", "Dipirona (genéricos)"],
        notes:
          "Muito comum no Brasil. Prefira paracetamol primeiro. Use apenas se seu obstetra concordar (especialmente no final da gestação).",
      },
      {
        active_ingredient: "Paracetamol (Acetaminofeno)",
        common_brands_brazil: [
          "Tylenol",
          "Efferalgan",
          "Paracetamol (genéricos)",
        ],
        notes:
          "Analgésico/antitérmico preferido na gravidez. Evite uso crônico/frequente sem orientação médica. Alguns estudos observacionais sugerem uma possível associação entre o uso excessivo de paracetamol/Tylenol na gestação e maior risco de transtornos do neurodesenvolvimento, como autismo. A relação causal não está comprovada, portanto use apenas se realmente necessário e sempre sob orientação do obstetra.",
      },
      {
        class: "AINEs (Anti-inflamatórios)",
        examples_active_ingredients: [
          "Ibuprofeno",
          "Naproxeno",
          "Diclofenaco",
          "Cetoprofeno",
          "Meloxicam",
          "Indometacina",
          "Celecoxibe",
        ],
        common_brands_brazil: [
          "Advil",
          "Alivium",
          "Flanax",
          "Voltaren",
          "Cataflam",
          "Profenid",
        ],
        notes:
          "Evite a partir de 20 semanas (risco renal/baixo líquido amniótico). No final da gravidez também pode afetar a circulação fetal.",
      },
      {
        active_ingredient: "Ácido acetilsalicílico (AAS) – dose alta",
        common_brands_brazil: ["AAS", "Aspirina"],
        notes:
          "Aspirina em baixa dose pode ser prescrita para prevenir pré-eclâmpsia em casos específicos; NÃO use dose alta para dor rotineira.",
      },
      {
        active_ingredient: "Cetorolaco",
        common_brands_brazil: ["Toragesic"],
        notes: "Evite, a menos que um especialista prescreva explicitamente.",
      },
    ],
    important_combo_products_to_avoid: [
      {
        product_examples: ["Dorflex", "Neosaldina"],
        why:
          "Fórmulas combo podem incluir relaxantes musculares/vasoconstritores/cafeína; a segurança na gravidez pode ser incerta ou desfavorável.",
      },
    ],
  },
  nausea_and_vomiting: {
    first_steps_non_drug: [
      "Pequenas refeições frequentes; evite jejum prolongado",
      "Chá de gengibre/cápsulas de gengibre (quantidades moderadas)",
      "Vitamina B6 (piridoxina) pode ajudar (Obstetra deve guiar a dose)",
    ],
    medications_common_in_brazil: [
      {
        active_ingredient: "Dimenidrinato + Vitamina B6 (Piridoxina)",
        common_brands_brazil: ["Dramin B6"],
        pregnancy_safety: {
          overall:
            "Geralmente considerado uma opção comum para náusea na gravidez; sem sinal consistente de risco grave em dados humanos.",
          trimester_notes:
            "Frequentemente usado no 1º trimestre quando necessário, idealmente na menor dose eficaz.",
        },
        maternal_side_effects: ["Sonolência", "Tontura", "Boca seca"],
        practical_notes: [
          "Prefira à noite se causar sono.",
          "Evite dirigir/atividades perigosas após tomar.",
        ],
      },
      {
        active_ingredient: "Metoclopramida",
        common_brands_brazil: ["Plasil", "Metoclopramida (genéricos)"],
        pregnancy_safety: {
          overall:
            "Grandes estudos não mostraram aumento de risco de malformações congênitas quando usado no início da gravidez.",
          trimester_notes:
            "Usado durante a gravidez quando clinicamente necessário; use a menor dose e evite uso contínuo prolongado sem supervisão.",
        },
        maternal_side_effects: [
          "Inquietação/ansiedade (acatisia)",
          "Tremor ou rigidez muscular (efeitos extrapiramidais, incomum)",
          "Sonolência (às vezes)",
        ],
        practical_notes: [
          "Se sentir agitação, tremor, rigidez no pescoço/mandíbula ou movimentos incomuns, pare e contate um médico.",
        ],
      },
      {
        active_ingredient: "Ondansetrona",
        common_brands_brazil: ["Vonau", "Zofran (quando disponível)"],
        pregnancy_safety: {
          overall:
            "Evidências mistas; a maioria dos dados é tranquilizadora, mas alguns estudos sugerem um pequeno aumento no risco de fenda oral no 1º trimestre.",
          trimester_notes:
            "Geralmente tratado como opção posterior no 1º trimestre se outras medidas falharem; discuta risco/benefício com obstetra.",
        },
        maternal_side_effects: [
          "Constipação (prisão de ventre)",
          "Dor de cabeça",
          "Raro: risco de ritmo cardíaco (prolongamento QT), especialmente com outros remédios ou problemas de eletrólitos",
        ],
        practical_notes: [
          "Evite combinar com outras drogas que prolongam o QT sem revisão médica.",
          "Procure atendimento se desmaio, palpitações, tontura severa ou vômito/desidratação persistente.",
        ],
      },
    ],
  },
  gas_and_heartburn: {
    safe_choices: [
      {
        active_ingredient: "Simeticona",
        common_brands_brazil: ["Luftal", "Simeticona (genéricos)"],
        notes: "Seguro para gases.",
      },
      {
        active_ingredient: "Alginato/combinações antiácidas",
        common_brands_brazil: ["Gaviscon", "Mylanta (varia por região)"],
        notes: "Frequentemente usado para refluxo/azia.",
      },
    ],
    if_persistent_discuss_with_ob: [
      {
        active_ingredient: "Omeprazol",
        common_brands_brazil: ["Losec", "Omeprazol (genéricos)"],
        notes:
          "Comum para refluxo quando antiácidos não são suficientes.",
      },
    ],
  },
  allergy_and_colds: {
    preferred: [
      {
        symptom: "Rinite alérgica",
        options: ["Soro fisiológico nasal/lavagem", "Loratadina", "Cetirizina"],
        common_brands_brazil: ["Claritin", "Zyrtec"],
        notes:
          "Opções geralmente preferidas; confirme com obstetra se uso frequente.",
      },
    ],
    avoid_or_use_only_if_ob_approves: [
      {
        class: "Descongestionantes",
        examples: ["Pseudoefedrina", "Fenilefrina", "Nafazolina (gotas nasais)"],
        common_brands_brazil: ["Neosoro (nafazolina) e similares"],
        notes:
          "Não é a primeira escolha na gravidez — especialmente no início e se houver risco de hipertensão.",
      },
      {
        class: "Sachês combo gripe/resfriado",
        examples: [
          "pós multi-sintomas com descongestionante + cafeína + anti-histamínico + analgésico",
        ],
        notes:
          "Difícil avaliar ingredientes; maior risco de exposição não intencional.",
      },
    ],
  },
  constipation_and_diarrhea: {
    constipation_preferred: [
      {
        step: "Estilo de vida primeiro (diário)",
        options: [
          "Água: goles frequentes ao longo do dia (meta: urina amarelo-claro)",
          "Alimentos com fibra: frutas (mamão, ameixa, laranja com bagaço), vegetais, feijão/lentilha, aveia",
          "Atividade física se obstetra aprovar: caminhada diária 20–30 min",
          "Rotina de banheiro: vá quando sentir vontade; não segure",
        ],
        notes:
          "Constipação é muito comum na gravidez (progesterona 'alenta' o intestino; ferro pode piorar).",
      },
      {
        step: "Fibra formadora de massa (opção segura de remédio inicial)",
        active_ingredient: "Psyllium",
        common_brands_brazil: [
          "Plantago ovata / Psyllium (vários)",
          "Metamucil (se disponível)",
        ],
        how_to_use_notes:
          "Deve ser tomado com um copo cheio de água; comece devagar para evitar gases.",
      },
      {
        step: "Laxantes osmóticos (comumente usados na gravidez)",
        active_ingredients: ["Lactulose", "Macrogol / PEG (polietilenoglicol)"],
        common_brands_brazil: [
          "Duphalac (lactulose)",
          "Lactulose (genéricos)",
          "Muvinlax / Movicol / PEG (varia por região)",
        ],
        notes:
          "Geralmente considerados seguros; podem causar inchaço no início.",
      },
      {
        step: "Se hemorroidas/fezes dolorosas",
        options: [
          "Estratégias de amolecimento de fezes acima (especialmente PEG/lactulose)",
          "Banho de assento (água morna) 10–15 min",
          "Discuta tratamentos tópicos com obstetra (evite automedicação com cremes multi-ingredientes)",
        ],
      },
    ],
    constipation_use_with_caution_or_discuss_with_ob: [
      {
        class: "Laxantes estimulantes",
        examples_active_ingredients: ["Sene", "Bisacodil"],
        common_brands_brazil: ["Laxante de Sene (vários)", "Dulcolax (bisacodil)"],
        notes:
          "Podem causar cólicas/diarreia; tipicamente para resgate de curto prazo apenas. Evite uso frequente.",
      },
      {
        class: "Preparações retais",
        examples: ["Supositório de glicerina", "Enema (Lavagem)"],
        notes:
          "Ocasionalmente usado a curto prazo; prefira opções orais/estilo de vida e consulte obstetra se recorrente.",
      },
    ],
    diarrhea_preferred: [
      {
        step: "Hidratação é prioridade",
        options: [
          "Soro de reidratação oral (SRO) em pequenos goles frequentes",
          "Se leve: água + sopas; evite sucos açucarados/refrigerantes",
        ],
        notes:
          "Desidratação pode desencadear contrações no final da gravidez — hidrate-se cedo.",
      },
      {
        step: "Abordagem alimentar (24–48h)",
        options: [
          "Arroz, banana, maçã, torradas/bolachas, batatas",
          "Proteínas magras conforme tolerado",
          "Probióticos/iogurte apenas se pasteurizado e tolerado",
        ],
      },
      {
        step: "Quando procurar avaliação médica urgente",
        red_flags: [
          "Febre (>= 38.0°C)",
          "Sangue ou muco nas fezes",
          "Dor abdominal severa",
          "Sinais de desidratação (urina muito escura, tontura, desmaio, boca seca)",
          "Incapacidade de reter líquidos (vômitos)",
          "Diarreia durando > 24–48h",
          "Viagem recente, suspeita de intoxicação alimentar ou contato com alguém muito doente",
        ],
      },
    ],
    diarrhea_meds_discuss_with_ob: [
      {
        active_ingredient: "Loperamida (curto prazo)",
        common_brands_brazil: ["Imosec", "Loperamida (genéricos)"],
        notes:
          "Às vezes usado para controle de curto prazo se não houver sinais de alerta. Evite se febre/diarreia com sangue.",
      },
    ],
    avoid: [
      {
        item: "Óleo de rícino",
        why:
          "Pode estimular contrações uterinas e causar diarreia/desidratação severa.",
      },
      {
        item: "Produtos com subsalicilato de bismuto",
        why: "Contém salicilato; geralmente evitado na gravidez.",
      },
      {
        item: "Óleo mineral e laxantes de magnésio em dose alta sem supervisão",
        why:
          "Pode interferir na absorção de vitaminas ou causar problemas eletrolíticos se usado em excesso.",
      },
      {
        item: "Chás laxantes 'detox' / misturas desconhecidas",
        why:
          "Dosagem e segurança não confiáveis; algumas ervas podem ser uterotônicas.",
      },
    ],
    special_notes: [
      "Suplementos de ferro frequentemente pioram a constipação — se isso ocorrer, peça ao obstetra para trocar a formulação/dose/horário (não pare por conta própria).",
      "Se a constipação for severa com vômitos, incapacidade de soltar gases ou dor intensa, procure atendimento urgente.",
    ],
  },
  high_risk_meds_to_avoid_strictly: {
    examples_and_common_brand_associations: [
      {
        drug: "Isotretinoína",
        brand_examples: ["Roacutan e genéricos"],
        why: "Forte teratógeno (causa malformação).",
      },
      {
        drug: "Misoprostol",
        brand_examples: ["Cytotec"],
        why: "Pode induzir aborto/sangramento.",
      },
      {
        drug: "Varfarina",
        brand_examples: ["Marevan"],
        why: "Riscos teratogênicos/sangramento.",
      },
      {
        drug: "IECA/ARA (remédios de pressão)",
        brand_examples: ["captopril/enalapril/losartana/etc."],
        why: "Riscos renais fetais (esp. final da gravidez).",
      },
      {
        drug: "Valproato",
        brand_examples: ["Depakene/Depakote"],
        why: "Risco de defeito no tubo neural e outras malformações.",
      },
      {
        drug: "Metotrexato",
        brand_examples: ["vários"],
        why: "Teratogênico.",
      },
      {
        drug: "Tetraciclinas",
        brand_examples: ["doxiciclina e outros"],
        why: "Efeitos nos dentes/ossos.",
      },
    ],
    note:
      "Se ela usa algum desses, contate o médico prescritor urgentemente — não pare abruptamente sem orientação.",
  },
  vitamins_common_brands_brazil: {
    prenatal_multivitamins_examples: ["Damater", "Natele", "Ogestan", "DTN-Fol (varia por fórmula)"],
    key_points: [
      "Ácido fólico/folato é o mais crítico antes da concepção até 12 semanas (dose individualizada).",
      "Evite suplementação de vitamina A (retinol) em dose alta a menos que prescrito.",
      "Escolha UM pré-natal (evite empilhar múltiplos multivitamínicos).",
    ],
  },
};

/*
 * Additional data for preventable risks and exam planning.  These
 * constants are based on guidance provided by the user and are used
 * to enrich the "Riscos & Prevenção" tab and the inventory/financial
 * planning sections.  They are kept separate to avoid cluttering
 * existing structures.
 */

// Information about conditions like Down syndrome and microcefalia,
// including what can and cannot be done to prevent them and how to
// detect problems early.
export const PREVENTABLE_RISKS_AND_HOW_TO_REDUCE = {
  down_syndrome: {
    what_you_can_and_cant_do: [
      "A Síndrome de Down é causada por uma alteração genética aleatória (trissomia do cromossomo 21) e não pode ser prevenida por dieta, vitaminas, exercícios ou medicamentos.",
      "O principal fator de risco conhecido é a idade materna mais avançada, mas a maioria dos bebês com Síndrome de Down nasce de mães jovens.",
      "Não existe suplemento, vitamina ou comportamento comprovado que reduza especificamente o risco de Síndrome de Down.",
      "O que pode ser feito é garantir um pré-natal de qualidade com rastreio e diagnóstico precoce, permitindo planejamento e acompanhamento adequados."
    ],
    screening_options: [
      "Rastreio combinado do primeiro trimestre (11–14 semanas): ultrassom morfológico com medida da translucência nucal + exames de sangue materno (PAPP-A e beta-hCG livre).",
      "NIPT (Teste Pré-Natal Não Invasivo – DNA fetal livre no sangue materno) a partir de ~10 semanas: alta sensibilidade (>99%) para trissomia 21, mas ainda considerado teste de rastreio.",
      "Resultados de alto risco devem ser confirmados com exames diagnósticos invasivos.",
      "Biópsia de vilo corial (11–14 semanas) ou amniocentese (geralmente após 15 semanas) confirmam o diagnóstico com precisão.",
      "Exames diagnósticos invasivos possuem pequeno risco de complicações e são indicados quando o benefício do diagnóstico supera os riscos.",
      "O NIPT não avalia todas as síndromes genéticas nem substitui o ultrassom morfológico.",
      "Resultados de NIPT podem sofrer interferência por mosaicismo placentário, gestações múltiplas ou condições maternas raras.",
      "A decisão por exames invasivos deve considerar idade gestacional, risco estimado, histórico familiar e preferência informada dos pais.",
      "O aconselhamento genético é recomendado quando há resultado alterado em exames de rastreio."
    ]
  },
  microcephaly_and_congenital_infections: {
    main_preventable_causes: [
      "Infecção pelo vírus Zika durante a gestação (principal causa evitável associada à microcefalia no Brasil).",
      "Toxoplasmose adquirida na gravidez (carne crua/mal passada, alimentos mal higienizados, fezes de gatos ou terra contaminada).",
      "Citomegalovírus (CMV), especialmente por contato com saliva ou urina de crianças pequenas.",
      "Rubéola e varicela em gestantes não imunes.",
      "Consumo de álcool durante a gravidez (não existe dose segura).",
      "Uso de drogas recreativas, incluindo cannabis (maconha).",
      "Uso de medicamentos teratogênicos sem orientação médica (ex.: ácido valproico, isotretinoína, varfarina).",
      "Exposição intrauterina a radiação ionizante em doses elevadas (exames radiológicos sem proteção adequada).",
      "Deficiências nutricionais graves e prolongadas, especialmente em contextos de insegurança alimentar.",
      "Hipóxia fetal crônica por doenças maternas não controladas (ex.: hipertensão grave, diabetes mal controlado)."
    ],
    practical_prevention: [
      "Evitar picadas de mosquito durante toda a gestação: usar repelentes seguros para grávidas (DEET, icaridina ou IR3535), reaplicar conforme orientação, usar roupas de manga longa e eliminar focos de água parada.",
      "Segurança alimentar rigorosa: cozinhar bem todas as carnes; evitar carne crua ou mal passada; lavar frutas e vegetais; evitar leite e queijos não pasteurizados; evitar ovos crus.",
      "Toxoplasmose: evitar limpar caixa de areia de gatos; se inevitável, usar luvas e lavar bem as mãos; evitar contato com terra sem proteção; manter gatos alimentados apenas com ração ou comida bem cozida.",
      "Prevenção de CMV: lavar as mãos após trocar fraldas ou contato com saliva/urina de crianças pequenas; não compartilhar talheres, copos ou chupetas; evitar beijar crianças na boca.",
      "Vacinas: manter esquema vacinal atualizado antes e durante a gestação conforme orientação médica (ex.: influenza, dTpa, hepatite B, COVID-19).",
      "Evitar completamente álcool durante a gestação; não existe quantidade segura.",
      "Evitar totalmente maconha/cannabis durante gravidez e amamentação; o THC atravessa a placenta e pode afetar o desenvolvimento neurológico fetal.",
      "Nunca iniciar, suspender ou ajustar medicamentos sem orientação médica.",
      "Revisar com obstetra e médico assistente o uso de medicamentos contínuos (ex.: lisdexanfetamina/Venvanse); em muitos casos, manter tratamento monitorado é mais seguro do que interromper abruptamente.",
      "Realizar pré-natal regular e seguir todas as orientações médicas para exames e acompanhamentos.",
      "Planejar viagens: evitar áreas com surtos ativos de Zika ou outras arboviroses durante a gestação.",
      "Usar preservativo durante a gravidez se o parceiro tiver risco de exposição ao Zika, pois há transmissão sexual documentada.",
      "Realizar sorologias no início da gestação conforme protocolo (toxoplasmose, sífilis, HIV, hepatites, rubéola).",
      "Tratar prontamente infecções maternas diagnosticadas para reduzir risco de transmissão vertical.",
      "Manter controle rigoroso de doenças maternas crônicas (hipertensão, diabetes, doenças autoimunes).",
      "Garantir ingestão adequada de micronutrientes essenciais (iodo, ferro, vitamina B12, colina), especialmente em dietas vegetarianas.",
      "Evitar exposição ocupacional ou doméstica a solventes, pesticidas e metais pesados."
    ],
    additional_risk_factors: [
      "Exposição intrauterina a radiação ionizante em doses elevadas (exames radiológicos sem proteção adequada).",
      "Deficiências nutricionais graves e prolongadas, especialmente em contextos de insegurança alimentar.",
      "Hipóxia fetal crônica por doenças maternas não controladas (ex.: hipertensão grave, diabetes mal controlado)."
    ],
    early_detection_and_monitoring: {
      ultrasound_monitoring: [
        "Ultrassom morfológico do 1º trimestre (11–14 semanas): avaliação inicial do desenvolvimento fetal.",
        "Ultrassom morfológico do 2º trimestre (20–24 semanas): avaliação detalhada da anatomia fetal, incluindo perímetro cefálico.",
        "Ultrassons seriados se houver suspeita de infecção congênita ou restrição de crescimento."
      ],
      additional_tests_when_indicated: [
        "Sorologias seriadas para toxoplasmose quando há risco ou soroconversão.",
        "Avaliação para infecções congênitas (TORCH) quando há alterações no ultrassom.",
        "Ressonância magnética fetal em casos selecionados para avaliação neurológica detalhada."
      ]
    }
  },
  additional_medical_notes: [
    "A maioria dos casos de Síndrome de Down ocorre por erro na divisão celular (não disjunção) no momento da formação do óvulo ou espermatozoide, geralmente antes mesmo da gravidez iniciar.",
    "Há formas raras hereditárias (translocação), mas representam pequena parcela dos casos e normalmente só são suspeitadas quando há histórico familiar.",
    "Deficiências nutricionais, exposição ambiental ou hábitos maternos não demonstraram relação causal direta com trissomia 21.",
    "O uso adequado de ácido fólico é essencial para prevenção de defeitos do tubo neural, mas não reduz o risco de Síndrome de Down.",
    // Nota motivacional: seguir as orientações alimentares e de segurança garante proteção à gestante e ao bebê.
    "É mais importante que a gestante siga as recomendações nutricionais e de segurança deste guia, mesmo que seja estressante limitar certos alimentos. Essas orientações previnem infecções alimentares, malformações e outras complicações, garantindo o melhor desfecho para mãe e filho."
  ]
};

// Simple exam plan detailing recommended investigations across
// different gestational windows to detect problems early.  Values
// represent typical Brazilian prenatal protocols.
export const EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY = {
  early_pregnancy_initial: [
    "Exames laboratoriais de base (tipo sanguíneo/Rh, hemograma, HIV, sífilis, hepatites, urina) conforme protocolo local",
    "Ultrassom de datação (confirma idade gestacional/viabilidade)"
  ],
  "10_to_14_weeks": [
    "Ultrassom de translucência nucal (e labs de rastreio combinado opcionais)",
    "NIPT opcional (rastreio de trissomias) a partir de ~10 semanas"
  ],
  "18_to_24_weeks": [
    "Ultrassom morfológico/anatômico (grandes anomalias estruturais)",
    "Avaliação direcionada se exposição a infecção ou rastreio anormal"
  ],
  "24_to_28_weeks": [
    "Rastreio de diabetes gestacional (protocolo varia)"
  ],
  throughout: [
    "Repetição de testes de sífilis/HIV conforme recomendado no pré-natal",
    "Monitoramento de pressão arterial e avaliação de risco de pré-eclâmpsia"
  ]
};

// Checklist of essential and optional baby items with priority and
// notes.  This structure is used in the financial planning section to
// help parents plan purchases before and after birth.  Items marked
// as depletable (e.g. fraldas) will be presented with monthly
// quantity estimates in the inventory card.
export const BABY_ITEMS_CHECKLIST_PRIORITIZED = {
  sleep_and_nursery: [
    {
      item: "Berço portátil/Moisés (Co-sleeper Compacto)",
      priority: "Alta",
      note: "Crítico para economizar espaço em apto de 2 quartos. Cabe no quarto dos pais."
    },
    {
      item: "Colchão Firme (sob medida)",
      priority: "Alta",
      note: "Segurança (Prevenção de morte súbita - SIDS)."
    },
    {
      item: "Protetores Impermeáveis (x2)",
      priority: "Alta",
      note: "Necessidade de higiene."
    },
    {
      item: "Lençóis com elástico (x3)",
      priority: "Alta",
      note: "Alta rotatividade devido a vazamentos."
    },
    {
      item: "Babá Eletrônica (Vídeo)",
      priority: "Média",
      note: "Bom para trabalhar no escritório enquanto o bebê dorme."
    },
    {
      item: "Cortinas Blackout",
      priority: "Média",
      note: "Ajuda na qualidade do sono."
    },
    {
      item: "Berço tamanho padrão",
      priority: "Baixa",
      note: "Adie a compra até o bebê não caber mais no moisés ou o espaço do escritório ser resolvido."
    },
    {
      item: "Decoração/Móbiles",
      priority: "Baixa",
      note: "Apenas estético."
    }
  ],
  transport_and_travel: [
    {
      item: "Bebê Conforto / Cadeirinha (Voltada para trás)",
      priority: "Alta",
      note: "Obrigatório por lei e segurança. Compre novo."
    },
    {
      item: "Carrinho Compacto",
      priority: "Alta",
      note: "Essencial. Escolha um que dobre pequeno para porta-malas/apartamento."
    },
    {
      item: "Canguru/Sling",
      priority: "Média",
      note: "Mãos livres em casa."
    },
    {
      item: "Bolsa de maternidade",
      priority: "Média",
      note: "Pode usar uma mochila normal para economizar."
    }
  ],
  diapering_and_hygiene: [
    {
      item: "Fraldas Descartáveis (RN/P)",
      priority: "Alta",
      note: "Estoque mensal. ~8-10/dia."
    },
    {
      item: "Lenços Umedecidos/Algodão",
      priority: "Alta",
      note: "Higiene diária."
    },
    {
      item: "Pomada de Assadura (Óxido de Zinco)",
      priority: "Alta",
      note: "Saúde preventiva."
    },
    {
      item: "Termômetro Digital",
      priority: "Alta",
      note: "Necessidade médica."
    },
    {
      item: "Banheira de Bebê",
      priority: "Média",
      note: "Útil, mas pode lavar na pia inicialmente."
    },
    {
      item: "Aspirador Nasal",
      priority: "Média",
      note: "Para resfriados/congestão."
    }
  ],
  feeding: [
    {
      item: "Bomba Tira-leite (Elétrica)",
      priority: "Média",
      note: "Útil para esposa voltar ao trabalho/dividir mamadas."
    },
    {
      item: "Mamadeiras (Kit inicial)",
      priority: "Alta",
      note: "Backup mesmo se amamentar."
    },
    {
      item: "Paninhos de boca",
      priority: "Alta",
      note: "Protege roupas de regurgitação."
    },
    {
      item: "Almofada de Amamentação",
      priority: "Média",
      note: "Conforto para a mãe."
    },
    {
      item: "Esterilizador de Mamadeira",
      priority: "Baixa",
      note: "Água fervente funciona bem."
    }
  ],
  clothing: [
    {
      item: "Macacões/Bodies (Zíper)",
      priority: "Alta",
      note: "Uniforme diário. Zíper > Botões de pressão."
    },
    {
      item: "Meias/Botinhas",
      priority: "Média",
      note: "Manter aquecido."
    },
    {
      item: "Roupas de sair",
      priority: "Baixa",
      note: "Bebê cresce muito rápido."
    }
  ],
  other: [
    {
      item: "Kit de Primeiros Socorros",
      priority: "Alta",
      note: "Inclui termômetro digital, curativos adesivos, gaze estéril, fita adesiva, bandagem elástica, pomada antisséptica, creme anti-histamínico, loção de calamina, gotas de simeticona, solução salina e aspirador nasal, tesoura de pontas arredondadas, cortador de unhas, pinça, álcool 70%, lenços antissépticos, bolsa de gel frio, luvas descartáveis e dosadores de remédios."
    },
    {
      item: "Paracetamol infantil",
      priority: "Alta",
      note: "Analgésico/antitérmico para uso apenas sob orientação do pediatra; dose ajustada conforme idade e peso."
    },
    {
      item: "Ibuprofeno infantil (>6 meses)",
      priority: "Média",
      note: "Anti-inflamatório para bebês maiores de 6 meses, usar somente com prescrição médica."
    },
    {
      item: "Gotas de simeticona",
      priority: "Média",
      note: "Alívio de cólicas e gases; utilize com orientação profissional."
    },
    {
      item: "Chupetas",
      priority: "Baixa",
      note: "Opcional."
    },
    {
      item: "Brinquedos/Mordedores",
      priority: "Baixa",
      note: "Não necessário para recém-nascido."
    }
  ]
};
