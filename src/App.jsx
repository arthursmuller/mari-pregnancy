import React from 'react';
import { TasksProvider } from './context/TasksContext.jsx';
import { NutritionProvider } from './context/NutritionContext.jsx'; // Novo Provider
import Navbar from './components/Navbar.jsx';
import Overview from './components/Overview.jsx';
import Cronograma from './components/Cronograma.jsx';
import Financial from './components/Financial.jsx';
import GuidanceTabs from './components/GuidanceTabs.jsx';
import MedicTeam from './components/MedicTeam.jsx';
import TasksOverall from './components/TasksOverall.jsx';
import AfterBorn from './components/AfterBorn.jsx';
import VaccinesSection from './components/VaccinesSection.jsx';
import NutritionPlan from './components/NutritionPlan.jsx'; // Novo Componente

export default function App() {
  return (
    <TasksProvider>
      <NutritionProvider>
        <div>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <section id="overview" className="py-6">
              <Overview />
            </section>
            <section id="cronograma" className="py-6">
              <Cronograma />
            </section>
            <section id="nutrition-plan" className="py-6">
              <NutritionPlan />
            </section>
            <section id="financial" className="py-6">
              <Financial />
            </section>
            <section id="guidance" className="py-6">
              <GuidanceTabs />
            </section>
            <section id="medic-team" className="py-6">
              <MedicTeam />
            </section>
            <section id="tasks" className="py-6">
              <TasksOverall />
            </section>
            <section id="after-born" className="py-6">
              <AfterBorn />
            </section>
            <section id="vaccines" className="py-6">
              <VaccinesSection />
            </section>
          </main>
        </div>
      </NutritionProvider>
    </TasksProvider>
  );
}