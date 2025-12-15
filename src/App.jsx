import React from 'react';
import { TasksProvider } from './context/TasksContext.jsx';
import { NutritionProvider } from './context/NutritionContext.jsx';
import Navbar from './components/Navbar.jsx';
import Overview from './components/Overview.jsx';
import Cronograma from './components/Cronograma.jsx';
import Financial from './components/Financial.jsx';
import GuidanceTabs from './components/GuidanceTabs.jsx';
import MedicTeam from './components/MedicTeam.jsx';
import TasksOverall from './components/TasksOverall.jsx';
import AfterBorn from './components/AfterBorn.jsx';
import VaccinesSection from './components/VaccinesSection.jsx';
import NutritionPlan from './components/NutritionPlan.jsx';
import MedicalRecord from './components/MedicalRecord.jsx';

export default function App() {
  return (
    <TasksProvider>
      <NutritionProvider>
        <div className="relative min-h-screen overflow-hidden selection:bg-primary selection:text-white">
          
          {/* Background Blobs Animados */}
          <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
             <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
             <div className="absolute top-0 -right-4 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <Navbar />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 mt-20">
            <section id="overview" className="scroll-mt-28">
              <Overview />
            </section>
            <div className="glass-panel p-6 sm:p-10">
                <section id="cronograma" className="scroll-mt-28">
                <Cronograma />
                </section>
            </div>
            <div className="glass-panel p-6 sm:p-10">
                <section id="nutrition-plan" className="scroll-mt-28">
                <NutritionPlan />
                </section>
            </div>
            <div className="glass-panel p-6 sm:p-10">
                <section id="financial" className="scroll-mt-28">
                <Financial />
                </section>
            </div>
            <div className="glass-panel p-6 sm:p-10">
                <section id="guidance" className="scroll-mt-28">
                <GuidanceTabs />
                </section>
            </div>
            <div className="glass-panel p-6 sm:p-10">
                <section id="medic-team" className="scroll-mt-28">
                <MedicTeam />
                </section>
            </div>
            <div className="glass-panel p-6 sm:p-10">
                <section id="tasks" className="scroll-mt-28">
                <TasksOverall />
                </section>
            </div>
            <div className="glass-panel p-6 sm:p-10">
                <section id="after-born" className="scroll-mt-28">
                <AfterBorn />
                </section>
            </div>
            <div className="glass-panel p-6 sm:p-10">
                <section id="vaccines" className="scroll-mt-28">
                <VaccinesSection />
                </section>
            </div>

            <div className="glass-panel p-6 sm:p-10">
                <section id="medical-record" className="scroll-mt-28">
                  <MedicalRecord />
                </section>
            </div>
          </main>
          
          <footer className="text-center py-10 text-gray-500 text-sm font-medium">
             <p>Feito com ❤️ para a Mari & Bebê</p>
          </footer>
        </div>
      </NutritionProvider>
    </TasksProvider>
  );
}