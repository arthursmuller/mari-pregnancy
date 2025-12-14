import React, { useEffect, useState } from 'react';
import {
  GUIDE_METADATA,
  WOMAN_INFO,
  PRENATAL_CARE_TEAM_AND_SCHEDULE,
  phases,
} from '../data';
import { useTasks } from '../context/TasksContext.jsx';

/**
 * Component responsible for summarising the entire pregnancy journey in
 * a high level view.  It displays the guide metadata, countdown to
 * the due date, progress through the weeks, a summary of pending
 * tasks and upcoming appointments and exams.
 */
export default function Overview() {
  // State for countdown and progress
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  // Access tasks from context
  const { generalTasks, cronogramTasks } = useTasks();

  // Compute countdown and current week on mount
  useEffect(() => {
    const now = new Date();
    const dueDate = new Date(WOMAN_INFO.estimated_due_date + 'T00:00:00');
    const diffMs = dueDate - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
    // Estimate current gestational week based on last menstrual period
    const lmp = new Date(WOMAN_INFO.last_menstrual_date + 'T00:00:00');
    const weeks = Math.floor((now - lmp) / (1000 * 60 * 60 * 24 * 7));
    setCurrentWeek(weeks);
    // Compute pending and overdue counts from cronogramTasks, excluding
    // tasks that have been soft-deleted or whose general task has been
    // deleted.  Pending tasks are those not marked as done.  Overdue
    // tasks are pending tasks with a due date earlier than today.
    if (cronogramTasks) {
      let pending = 0;
      let overdue = 0;
      const nowDate = new Date();
      cronogramTasks.forEach((ct) => {
        if (ct.deleted) return;
        if (!ct.done) {
          const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
          if (gTask && gTask.deleted) return;
          pending += 1;
          // Determine due date: override > general > base
          let due = null;
          if (ct.overrideDueDate) due = ct.overrideDueDate;
          else if (gTask && gTask.dueDate) due = gTask.dueDate;
          else due = ct.baseDueDate;
          if (due) {
            try {
              const dueDate = new Date(due);
              if (dueDate < nowDate) overdue += 1;
            } catch (e) {
              /* ignore parse errors */
            }
          }
        }
      });
      setPendingCount(pending);
      setOverdueCount(overdue);
    }
  }, []);

  // Compute number of tasks scheduled for the current gestational week
  // Count tasks for the current gestational week that are not done and not deleted.
  const tasksThisWeekCount = cronogramTasks && currentWeek !== null
    ? cronogramTasks.filter((ct) => {
        if (ct.week !== currentWeek) return false;
        if (ct.done) return false;
        if (ct.deleted) return false;
        const gTask = generalTasks.find((gt) => gt.id === ct.generalTaskId);
        if (gTask && gTask.deleted) return false;
        return true;
      }).length
    : 0;

  // Aggregate unique exams across all phases
  const examsList = Array.from(
    new Set(phases.map((phase) => phase.exams_overview).filter(Boolean)),
  );

  // Compile details for consultations from the prenatal team.  Each
  // specialist contributes a summary including role, objetivo (key
  // actions) e agendamentos previstos.
  const specialistSummaries = PRENATAL_CARE_TEAM_AND_SCHEDULE.specialists.map((spec) => {
    const visits = spec.expected_visits
      ? spec.expected_visits
      : spec.expected_visit
      ? [spec.expected_visit]
      : spec.expected_start
      ? [spec.expected_start]
      : [];
    return {
      role: spec.role,
      frequency: spec.frequency || '',
      keyActions: spec.key_actions || '',
      visits,
    };
  });

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">
          {GUIDE_METADATA.header_title}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          {GUIDE_METADATA.description}
        </p>
      </div>

      {/* Countdown and progress */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Contagem regressiva</h3>
          {daysRemaining !== null ? (
            <p className="text-2xl font-bold text-primary">
              {daysRemaining} dias restantes
            </p>
          ) : (
            <p>Calculando…</p>
          )}
          <p className="text-sm text-gray-500">
            Data prevista de parto: {new Date(WOMAN_INFO.estimated_due_date).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Progresso da gestação</h3>
          {currentWeek !== null ? (
            <div>
              <p className="text-2xl font-bold text-primary mb-2">
                Semana {currentWeek}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: `${(currentWeek / 40) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.min(currentWeek, 40)} de 40 semanas
              </p>
            </div>
          ) : (
            <p>Calculando…</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Tarefas pendentes</h3>
          <p className="text-2xl font-bold text-primary">{pendingCount}</p>
          <p className="text-sm text-gray-500">
            Contagem de tarefas do cronograma que ainda não foram
            concluídas e não estão marcadas como excluídas.
          </p>
        </div>
        {/* Cronograma tasks overview */}
        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Tarefas em atraso</h3>
          <p className="text-2xl font-bold text-primary">{overdueCount}</p>
          <p className="text-sm text-gray-500">
            Tarefas pendentes cujo prazo (data limite) já passou.
          </p>
        </div>
        {/* Current week tasks overview */}
        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Tarefas desta semana</h3>
          <p className="text-2xl font-bold text-primary">{tasksThisWeekCount}</p>
          <p className="text-sm text-gray-500">
            Tarefas planejadas para a semana gestacional atual
            {currentWeek !== null ? ` (${currentWeek})` : ''} que ainda não
            foram concluídas.
          </p>
        </div>
      </div>

      {/* Upcoming exams and consultations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exams list */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Exames a realizar</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {examsList.map((exam) => (
              <li key={exam}>{exam}</li>
            ))}
          </ul>
        </div>
        {/* Consultations and professionals */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Consultas e profissionais</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {specialistSummaries.map((spec) => (
              <li key={spec.role} className="border-b pb-2 last:border-b-0">
                <p className="font-semibold text-primary">{spec.role}</p>
                {spec.keyActions && (
                  <p className="text-gray-600">Objetivo: {spec.keyActions}</p>
                )}
                {spec.frequency && (
                  <p className="text-gray-600">Frequência: {spec.frequency}</p>
                )}
                {spec.visits && spec.visits.length > 0 && (
                  <p className="text-gray-600">Visitas previstas: {spec.visits.join(', ')}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}