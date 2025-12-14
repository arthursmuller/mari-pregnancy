import React from 'react';

/**
 * AfterBorn component offers guidance for the immediate post‑partum
 * period and the first years of life.  It covers important tasks,
 * common concerns, feeding and sleep advice and vaccine reminders.
 */
export default function AfterBorn() {
  const guidance = [
    {
      title: 'Primeiro mês',
      items: [
        'Agende sua consulta pós-parto com o obstetra (cerca de 6 semanas após o parto).',
        'Visita ao pediatra com 7 dias e novamente aos 30 dias para avaliar peso, icterícia e amamentação.',
        'Mantenha amamentação exclusiva sob livre demanda. Hidrate‑se bem e descanse sempre que possível.',
        'Vacinas do bebê: BCG e Hepatite B devem ser aplicadas logo após o nascimento (verifique a carteira de vacinação).',
        'Registre o bebê no cartório e providencie CPF/plano de saúde se aplicável.',
      ],
    },
    {
      title: '2–3 meses',
      items: [
        'Observe padrões de sono e tente estabelecer uma rotina com sonecas durante o dia.',
        'Vacinas do 2º mês: Pentavalente, Poliomielite, Rotavírus, Pneumocócica 10-valente.',
        'Atente para sinais de cólica: massagem abdominal suave, banhos mornos e posição vertical após mamar podem aliviar.',
        'Comece a estimular o bebê com conversas, músicas e brinquedos de cores fortes.',
        'Agende a primeira consulta odontopediátrica quando os dentes começarem a aparecer (normalmente por volta dos 6 meses).',
      ],
    },
    {
      title: '4–6 meses',
      items: [
        'Inicie a introdução alimentar conforme orientação do pediatra, geralmente aos 6 meses.',
        'Ofereça alimentos amassados e bem cozidos. Continue amamentando em livre demanda.',
        'Vacinas do 4º mês: 2ª dose de Pentavalente, Poliomielite, Rotavírus e Pneumocócica 10-valente.',
        'Vacina meningocócica C: primeira dose aos 3 meses e reforço aos 5 meses.',
        'Mantenha o bebê em posição segura de dormir (barriga para cima) e alterne a posição da cabeça para evitar plagiocefalia.',
      ],
    },
    {
      title: '7–12 meses',
      items: [
        'Continue a diversificação alimentar incluindo leguminosas, grãos e frutas variadas.',
        'Estimule o engatinhar com brinquedos no chão e supervisione constantemente.',
        'Vacinas de 6 meses: 3ª dose de Pentavalente e Poliomielite. Vacina da gripe (Influenza) anual.',
        'Vacina de 9 meses: Febre amarela se indicado para sua região.',
        'Vacinas de 12 meses: Tríplice Viral, reforço da Pneumocócica e Meningocócica.',
        'Evite viagens longas sem planejamento: mantenha a rotina de sono e alimentação do bebê.',
      ],
    },
    {
      title: '1–3 anos',
      items: [
        'Vacinas de 15 meses: DTP, Hepatite A e Tetra Viral (inclui varicela).',
        'A partir de 2 anos, introduza pequenos cursos de natação ou atividades físicas lúdicas.',
        'Fique atento ao desenvolvimento da fala e coordenação motora; consulte fonoaudiólogo ou fisioterapeuta se houver atrasos.',
        'Considere berçário ou educação infantil para socialização e estímulo cognitivo.',
        'Continue proporcionando dieta balanceada com frutas, verduras, leguminosas e restringindo doces e ultraprocessados.',
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Após o nascimento</h2>
      <p className="text-sm text-gray-700 mb-4">
        Orientações e cuidados para as primeiras semanas e meses com o bebê,
        incluindo vacinas, alimentação, sono e desenvolvimento.
      </p>
      <div className="space-y-6">
        {guidance.map((section) => (
          <div key={section.title} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">
              {section.title}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}