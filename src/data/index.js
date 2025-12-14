/*
 * The purpose of this module is to reorganise the raw constants from
 * `pregnancyData.js` into structures that are easier for the React
 * components to consume.  We parse week ranges, expand phase tasks
 * across their corresponding weeks and attach metadata such as
 * dietary focus, exam names and notes.  The functions in this file
 * centralise all data transformations so the UI remains declarative.
 */

import {
  GUIDE_METADATA,
  CRITICAL_ALERTS_AND_HIGHLIGHTS,
  WOMAN_INFO,
  PRENATAL_CARE_TEAM_AND_SCHEDULE,
  CRONOGRAMA_CALENDARIZADO,
  DIETARY_GUIDELINES_DETAILED,
  EXERCISE_GUIDELINES,
  WEEKLY_JOURNEY_SCHEDULE,
  MEDICATION_GUIDE_BRAZIL,
  PREVENTABLE_RISKS_AND_HOW_TO_REDUCE,
  EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY,
  BABY_ITEMS_CHECKLIST_PRIORITIZED,
} from './pregnancyData';

/**
 * Parse a string like "4 a 8 semanas" and return an object with
 * numerical start and end week numbers.  If parsing fails it
 * defaults to the same week number for both start and end.
 *
 * @param {string} range - A string representing a week range.
 * @returns {{start: number, end: number}}
 */
function parseWeekRange(range) {
  if (!range) return { start: 0, end: 0 };
  const match = range.match(/(\d+)\s*a\s*(\d+)/);
  if (match) {
    return { start: parseInt(match[1], 10), end: parseInt(match[2], 10) };
  }
  const numMatch = range.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[1], 10) : 0;
  return { start: num, end: num };
}

/**
 * Convert the CRONOGRAMA_CALENDARIZADO object into an array of phase
 * definitions, each with numeric week boundaries and tasks prepared
 * for iteration.  This normalisation step makes it trivial to
 * determine which tasks belong to a given week later on.
 */
const phases = Object.values(CRONOGRAMA_CALENDARIZADO).map((phase) => {
  const { start, end } = parseWeekRange(phase.weeks);
  return {
    ...phase,
    startWeek: start,
    endWeek: end,
    // Flatten tasks into labelled arrays so the UI can group them by type
    continuousTasks: phase.tasks?.continuous || [],
    phaseSpecificTasks: phase.tasks?.phase_specific || [],
    shoppingTasks: phase.tasks?.shopping_and_preparation || [],
  };
});

/**
 * Expand weekly schedule by enriching each week object with tasks,
 * exams and dietary focus pulled from the phases array.  Tasks are
 * labelled according to whether they are continuous, one‑time or
 * shopping/preparation.  Exams and diet strings are aggregated.
 */
export const weeklyData = WEEKLY_JOURNEY_SCHEDULE.map((weekItem) => {
  const weekNumber = parseInt(weekItem.week.replace(/[^\d]/g, ''), 10);
  const tasks = [];
  const exams = new Set();
  const dietaryFocus = new Set();
  const supportNeeded = new Set();
  phases.forEach((phase) => {
    if (weekNumber >= phase.startWeek && weekNumber <= phase.endWeek) {
      // Continuous tasks are considered recurring every week in the phase
      phase.continuousTasks.forEach((t) =>
        tasks.push({ text: t, type: 'Continuada' }),
      );
      // Phase specific tasks happen once per phase; assign to the first week in the range
      if (weekNumber === phase.startWeek) {
        phase.phaseSpecificTasks.forEach((t) =>
          tasks.push({ text: t, type: 'Única' }),
        );
        phase.shoppingTasks.forEach((t) =>
          tasks.push({ text: t, type: 'Preparação' }),
        );
        // Generate additional tasks for scheduling consultations when a new phase starts
        if (phase.medical_support_needed && phase.medical_support_needed.length > 0) {
          phase.medical_support_needed.forEach((m) => {
            // remove detail in parentheses for succinct task text
            const role = m.split(' (')[0];
            tasks.push({ text: `Marcar consulta com ${role}`, type: 'Única' });
          });
        }
      }
      if (phase.exams_overview) exams.add(phase.exams_overview);
      if (phase.dietary_focus) dietaryFocus.add(phase.dietary_focus);
      if (phase.medical_support_needed) {
        phase.medical_support_needed.forEach((m) => supportNeeded.add(m));
      }
    }
  });
  return {
    ...weekItem,
    weekNumber,
    tasks,
    exams: Array.from(exams),
    dietaryFocus: Array.from(dietaryFocus),
    medicalSupport: Array.from(supportNeeded),
  };
});

/**
 * Derive a flat list of all tasks from every phase.  Each item
 * includes a unique id, description, the type of task and an
 * approximate due date when possible.  The due date is taken as the
 * last date of the week defined in WEEKLY_JOURNEY_SCHEDULE.  This
 * structure is used for the global tasks section where the user can
 * track everything in one place.
 */
export const allTasks = (() => {
  const items = [];
  let id = 0;
  weeklyData.forEach((week) => {
    // Determine a due date by taking the end date from the dates string
    // Dates are like "12 Dec – 18 Dec"; we'll parse the second part
    let dueDate = null;
    if (week.dates) {
      const parts = week.dates.split('–');
      if (parts.length === 2) {
        const endPart = parts[1].trim();
        // Construct a date with the current year; we assume the schedule is for 2025/2026
        const [day, month] = endPart.split(' ');
        // Map month abbreviations to month numbers
        const monthMap = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        };
        const monthKey = month.replace('.', '');
        const m = monthMap[monthKey] ?? null;
        if (m !== null) {
          // Determine year: if month is after August we assume it's in 2026; otherwise 2025/2026 bridging
          const baseYear = m >= 8 ? 2025 : 2026;
          dueDate = new Date(Date.UTC(baseYear, m, parseInt(day, 10)));
        }
      }
    }
    week.tasks.forEach((task) => {
      items.push({
        id: id++,
        description: task.text,
        type: task.type,
        week: week.weekNumber,
        dueDate: dueDate ? dueDate.toISOString() : null,
        done: false,
      });
    });
  });
  return items;
})();

/**
 * Generate a list of maternal vaccines recommended during pregnancy.
 * These are based on common guidelines in Brazil and include the
 * suggested timing to help the woman schedule each injection.
 */
export const maternalVaccines = [
  {
    name: 'dTpa (Tétano, Difteria, Coqueluche)',
    schedule: 'Entre 27–36 semanas',
    notes:
      'Protege o recém-nascido contra coqueluche. Deve ser aplicada a cada gravidez.',
  },
  {
    name: 'Influenza (Gripe)',
    schedule: 'Em qualquer trimestre, preferencialmente antes do inverno',
    notes:
      'Reduz risco de complicações respiratórias na mãe e oferece anticorpos ao bebê.',
  },
  {
    name: 'Hepatite B (para não imunizadas)',
    schedule: 'Três doses: 0, 1 e 6 meses; pode iniciar durante a gestação',
    notes:
      'Verifique sorologia. Proteção essencial contra hepatite B.',
  },
  {
    name: 'COVID‑19 (reforço)',
    schedule: 'Conforme orientação da autoridade sanitária',
    notes:
      'Vacina recomendada para todas as gestantes; protege contra formas graves.',
  },
];

/**
 * Generate a simplified schedule of vaccines for the baby in the
 * first months and years of life, following typical Brazilian
 * immunisation guidelines.  The schedule is divided by the age when
 * each vaccine or dose should be administered.
 */
export const babyVaccines = [
  {
    age: 'Ao nascer',
    vaccines: [
      { name: 'BCG', notes: 'Proteção contra tuberculose. Aplicada na maternidade.' },
      { name: 'Hepatite B – 1ª dose', notes: 'Ideal nas primeiras 12h de vida.' },
    ],
  },
  {
    age: '2 meses',
    vaccines: [
      { name: 'Pentavalente (DTPa+Hib+Hep B)', notes: 'Protege contra difteria, tétano, coqueluche, Haemophilus influenzae tipo b e hepatite B.' },
      { name: 'Poliomielite – 1ª dose', notes: 'Vacina inativada (VIP).' },
      { name: 'Rotavírus', notes: 'Previne diarreia grave por rotavírus.' },
      { name: 'Pneumocócica 10-valente', notes: 'Contra pneumonia, otite e meningite pneumocócica.' },
    ],
  },
  {
    age: '3 meses',
    vaccines: [
      { name: 'Meningocócica C (ou ACWY)', notes: 'Protege contra meningite meningocócica.' },
    ],
  },
  {
    age: '4 meses',
    vaccines: [
      { name: 'Pentavalente – 2ª dose', notes: '' },
      { name: 'Poliomielite – 2ª dose', notes: '' },
      { name: 'Rotavírus – 2ª dose', notes: '' },
      { name: 'Pneumocócica 10-valente – 2ª dose', notes: '' },
    ],
  },
  {
    age: '5 meses',
    vaccines: [
      { name: 'Meningocócica C – 2ª dose', notes: '' },
    ],
  },
  {
    age: '6 meses',
    vaccines: [
      { name: 'Pentavalente – 3ª dose', notes: '' },
      { name: 'Poliomielite – 3ª dose', notes: '' },
      { name: 'Influenza – 1ª dose (para bebês)', notes: '' },
    ],
  },
  {
    age: '9 meses',
    vaccines: [
      { name: 'Febre Amarela', notes: 'Necessária em áreas endêmicas.' },
    ],
  },
  {
    age: '12 meses',
    vaccines: [
      { name: 'Tríplice viral (sarampo, caxumba, rubéola)', notes: '' },
      { name: 'Pneumocócica 10-valente – reforço', notes: '' },
      { name: 'Meningocócica C – reforço', notes: '' },
    ],
  },
  {
    age: '15 meses',
    vaccines: [
      { name: 'DTP (difteria, tétano, pertussis) – reforço', notes: '' },
      { name: 'Hepatite A', notes: '' },
      { name: 'Tetra viral (sarampo, caxumba, rubéola e varicela)', notes: '' },
    ],
  },
];

// Export raw constants for components that need them directly
export {
  GUIDE_METADATA,
  CRITICAL_ALERTS_AND_HIGHLIGHTS,
  WOMAN_INFO,
  PRENATAL_CARE_TEAM_AND_SCHEDULE,
  DIETARY_GUIDELINES_DETAILED,
  EXERCISE_GUIDELINES,
  MEDICATION_GUIDE_BRAZIL,
  phases,
  PREVENTABLE_RISKS_AND_HOW_TO_REDUCE,
  EXAM_PLAN_TO_FIND_KNOWN_PROBLEMS_EARLY,
  BABY_ITEMS_CHECKLIST_PRIORITIZED,
};