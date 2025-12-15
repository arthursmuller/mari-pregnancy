import React, { useEffect, useState } from 'react';
import {
  GUIDE_METADATA,
  WOMAN_INFO,
  PRENATAL_CARE_TEAM_AND_SCHEDULE,
  phases,
} from '../data';
import { useTasks } from '../context/TasksContext.jsx';

export default function Overview() {
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  const { generalTasks, cronogramTasks } = useTasks();

  useEffect(() => {
    const now = new Date();
    const dueDate = new Date(WOMAN_INFO.estimated_due_date + 'T00:00:00');
    const diffMs = dueDate - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
    
    const lmp = new Date(WOMAN_INFO.last_menstrual_date + 'T00:00:00');
    const weeks = Math.floor((now - lmp) / (1000 * 60 * 60 * 24 * 7));
    setCurrentWeek(weeks);

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
          let due = null;
          if (ct.overrideDueDate) due = ct.overrideDueDate;
          else if (gTask && gTask.dueDate) due = gTask.dueDate;
          else due = ct.baseDueDate;
          if (due) {
            try {
              const dueDateObj = new Date(due);
              if (dueDateObj < nowDate) overdue += 1;
            } catch (e) {}
          }
        }
      });
      setPendingCount(pending);
      setOverdueCount(overdue);
    }
  }, [cronogramTasks, generalTasks]);

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

  const examsList = Array.from(
    new Set(phases.map((phase) => phase.exams_overview).filter(Boolean)),
  );

  const formatDate = (dateStr) => {
      if (!dateStr) return '';
      try {
          // Ajuste de fuso horário simples para exibição correta da data
          const date = new Date(dateStr);
          // Adiciona os minutos do timezone offset para garantir que a data não volte um dia
          const userTimezoneOffset = date.getTimezoneOffset() * 60000;
          const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
          
          return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(adjustedDate);
      } catch (e) { return ''; }
  };

  // Lógica aprimorada para buscar e limpar a lista de visitas
  const getSpecialistSchedule = (roleName, staticVisits) => {
      // Palavras-chave extras para associar tarefas aos papéis corretamente
      const roleKeywords = {
          'Médico Obstetra': ['obstetra', 'pré-natal', 'consulta'],
          'Nutricionista': ['nutricionista', 'nutrição'],
          'Médico de Medicina Fetal': ['medicina fetal', 'ultrassom', 'translucência', 'morfológico', 'doppler', 'ecocardiograma'],
          'Dentista': ['dentista', 'odontológico'],
          'Fisioterapeuta': ['fisioterapeuta', 'pélvica'],
          'Pediatra': ['pediatra'],
          'Anestesiologista': ['anestesiologista', 'anestesia']
      };

      // Identifica qual lista de keywords usar com base no nome do papel
      const currentRoleKey = Object.keys(roleKeywords).find(k => roleName.includes(k.split(' ')[0])) || roleName;
      const keywords = roleKeywords[currentRoleKey] || [roleName.toLowerCase()];

      const scheduledTasks = cronogramTasks.filter(ct => {
          if (ct.deleted) return false;
          const gTask = generalTasks.find(gt => gt.id === ct.generalTaskId);
          if (!gTask || gTask.deleted) return false;
          
          const desc = gTask.description.toLowerCase();
          
          // 1. Verifica se a tarefa contém alguma das palavras-chave do especialista
          const matchesRole = keywords.some(kw => desc.includes(kw.toLowerCase()));
          
          // 2. Filtra apenas visitas/procedimentos reais (exclui agendamentos telefônicos)
          const isScheduling = desc.includes('ligar') || desc.includes('agendar') || desc.includes('marcar') || desc.includes('verificar');
          const isVisitType = (ct.category === 'medical' || ct.category === 'exam') && !isScheduling;
          
          // Exceção: Se for "Consultas Semanais", consideramos visita mesmo que o texto varie
          const isRecurringVisit = desc.includes('consultas semanais');

          return matchesRole && (isVisitType || isRecurringVisit);
      }).sort((a, b) => {
          const dateA = a.overrideDueDate || a.baseDueDate || '9999-99-99';
          const dateB = b.overrideDueDate || b.baseDueDate || '9999-99-99';
          return dateA.localeCompare(dateB);
      });

      if (scheduledTasks.length > 0) {
          return scheduledTasks.map(t => {
             const gTask = generalTasks.find(gt => gt.id === t.generalTaskId);
             const date = t.overrideDueDate || t.baseDueDate;
             const label = formatDate(date);
             return { date: label, desc: gTask.description, done: t.done, fullDate: date };
          });
      }

      // Fallback para dados estáticos se não houver tarefas agendadas
      const visits = staticVisits || [];
      return visits.map(v => ({ date: 'A definir', desc: v, done: false }));
  };

  const progressPercentage = currentWeek ? Math.min((currentWeek / 40) * 100, 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-pink-50 to-white rounded-2xl border border-pink-100">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark mb-3">
          {GUIDE_METADATA.header_title}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          {GUIDE_METADATA.description}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                <div className="h-full bg-primary" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Gestação</h3>
          <div className="text-4xl font-bold text-gray-800 mb-1">
            {currentWeek !== null ? `${currentWeek}` : '-'} <span className="text-lg text-gray-400 font-normal">semanas</span>
          </div>
          <p className="text-xs text-gray-400">de 40 semanas</p>
        </div>

        {/* Countdown Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Contagem</h3>
          <div className="text-4xl font-bold text-primary mb-1">
            {daysRemaining !== null ? daysRemaining : '-'}
          </div>
          <p className="text-xs text-gray-400">dias restantes</p>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Pendências</h3>
          <div className="text-4xl font-bold text-orange-400 mb-1">
            {pendingCount}
          </div>
          <p className="text-xs text-gray-400">tarefas totais</p>
        </div>

         {/* This Week */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Esta Semana</h3>
          <div className="text-4xl font-bold text-blue-400 mb-1">
            {tasksThisWeekCount}
          </div>
          <p className="text-xs text-gray-400">para fazer agora</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Exams Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-pink-100 rounded-lg text-primary mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Próximos Exames (Visão Geral)</h3>
            </div>
          <ul className="space-y-3">
            {examsList.map((exam, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-300 mt-1.5 mr-3 flex-shrink-0"></span>
                <span>{exam}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specialists Section (ENHANCED LIST VIEW) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Agenda Médica</h3>
            </div>
          <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {PRENATAL_CARE_TEAM_AND_SCHEDULE.specialists.map((spec) => {
              const staticVisits = spec.expected_visits || (spec.expected_visit ? [spec.expected_visit] : (spec.expected_start ? [spec.expected_start] : []));
              const schedule = getSpecialistSchedule(spec.role, staticVisits);

              return (
                <div key={spec.role} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-3">
                      <p className="font-bold text-gray-800 text-base">{spec.role}</p>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide bg-gray-50 px-2 py-0.5 rounded">{spec.frequency}</span>
                  </div>
                  
                  {/* Lista Cronológica de Visitas */}
                  <div className="space-y-2">
                      {schedule.map((visit, i) => (
                          <div key={i} className={`flex items-start p-2 rounded-lg border transition-all ${visit.done ? 'bg-green-50/50 border-green-100' : 'bg-white border-gray-100 hover:border-blue-100 hover:bg-blue-50/30'}`}>
                             {/* Coluna Data */}
                             <div className="min-w-[85px] w-[85px] flex flex-col items-center justify-center border-r border-gray-100 pr-2 mr-3 py-1">
                                 <span className="text-xs font-bold text-gray-700 text-center leading-tight">{visit.date.split(' de ')[0]}</span>
                                 <span className="text-[10px] text-gray-400 uppercase">{visit.date.split(' de ')[1] || ''}</span>
                                 {visit.done && <span className="mt-1 text-[9px] font-bold text-green-600 bg-green-100 px-1.5 rounded-full">FEITO</span>}
                             </div>

                             {/* Coluna Descrição */}
                             <div className="flex-grow flex items-center py-1">
                                 <p className={`text-sm ${visit.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                     {visit.desc}
                                 </p>
                             </div>
                          </div>
                      ))}
                      {schedule.length === 0 && (
                          <div className="p-3 bg-gray-50 rounded-lg text-center border border-dashed border-gray-200">
                             <span className="text-xs text-gray-400 italic">Nenhuma visita agendada nas tarefas ainda.</span>
                          </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}