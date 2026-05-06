/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Home, 
  ClipboardList, 
  CreditCard, 
  Settings, 
  HelpCircle,
  Bell,
  ChevronDown,
  CheckCircle2,
  Utensils,
  User,
  X
} from "lucide-react";
import { useState } from "react";
import data from "./data.json";

export default function App() {
  const { menu } = data;
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      {/* Top Banner */}
      <div className="bg-[#fef3c7] border-b border-[#fde68a] py-2 px-4 text-center">
        <p className="text-[11px] sm:text-[13px] font-bold tracking-wider text-[#92400e] uppercase">
          RECIBIRÁS TUS TACOS EN <span className="text-red-600">[25]</span> MINUTOS
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:flex w-20 flex-col items-center py-6 bg-white border-r border-slate-200 z-20">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-10 overflow-hidden">
             <div className="w-10 h-10 bg-[#7c2d12] rounded-full flex items-center justify-center text-white text-[8px] border-2 border-orange-200 font-bold leading-tight text-center">
               MONTY<br/>TACOS
             </div>
          </div>
          
          <nav className="flex flex-col gap-8 flex-1">
            <button className="p-3 text-red-600 bg-red-50 rounded-2xl"><Home size={24} /></button>
            <button className="p-3 text-slate-400 hover:text-red-500 transition-colors"><ClipboardList size={24} /></button>
            <button className="p-3 text-slate-400 hover:text-red-500 transition-colors"><CreditCard size={24} /></button>
            <button className="p-3 text-slate-400 hover:text-red-500 transition-colors"><Settings size={24} /></button>
          </nav>

          <div className="flex flex-col gap-6 items-center">
            <button className="p-2 text-slate-400"><HelpCircle size={20} /></button>
            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
              <User size={24} className="text-slate-400" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto pb-24 lg:pb-0">
          {/* Dashboard Header */}
          <header className="h-16 px-6 sm:px-8 flex items-center justify-between bg-transparent">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Bell size={22} className="text-slate-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                 <div className="w-8 h-8 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 font-bold overflow-hidden shadow-sm">
                   <User size={18} />
                 </div>
                 <span className="text-sm font-semibold hidden sm:inline">Cliente</span>
                 <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          </header>

          <div className="px-6 sm:px-8 py-4 flex flex-col lg:flex-row gap-8">
            {/* Menu Grid Section */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight uppercase text-slate-900 leading-none">TU PEDIDO</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-100 transition-all active:scale-95 uppercase tracking-wide">
                  <ShoppingBag size={14} /> HACER PEDIDO
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {menu.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer text-center flex flex-col items-center"
                  >
                    <div className="w-24 h-24 mb-6 bg-slate-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Utensils className="text-orange-500 w-12 h-12" />
                    </div>
                    <div className="flex-1 mb-4">
                      <h3 className="font-bold text-md leading-tight mb-2 min-h-[2.5rem] flex items-center justify-center">
                        {item.nombre}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">${item.precio.toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Extra Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-red-500 transition-colors">
                      <ClipboardList size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Gestión de Inventario</span>
                  </div>
                  <ChevronDown className="text-slate-300 -rotate-90 group-hover:text-slate-500" size={18} />
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-red-500 transition-colors">
                      <MapPin size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Logística de Reparto</span>
                  </div>
                  <ChevronDown className="text-slate-300 -rotate-90 group-hover:text-slate-500" size={18} />
                </div>
              </div>
            </div>

            {/* Active Orders Sidebar */}
            <div className="w-full lg:w-80 space-y-6">
              <h2 className="text-xl font-bold tracking-tight uppercase text-slate-900 leading-none">PEDIDOS ACTIVOS</h2>
              
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[450px]">
                <div className="flex border-b border-slate-100">
                  <button className="flex-1 py-4 text-[11px] font-bold uppercase tracking-widest text-red-600 border-b-2 border-red-600">Active Activos</button>
                  <button className="flex-1 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Status</button>
                </div>

                <div className="p-6 flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Tacos de 0-oitos</h3>
                    <span className="font-bold text-lg">$2.00</span>
                  </div>

                  <div className="space-y-6 relative ml-1">
                    <div className="absolute left-2.5 top-2 bottom-2 w-[1px] bg-slate-100"></div>
                    
                    <div className="flex items-center gap-4 relative">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white z-10 p-0.5">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="text-emerald-600 font-bold text-sm italic">Peridesuedio</span>
                    </div>
                    
                    <div className="flex items-center gap-4 relative">
                      <div className="w-5 h-5 bg-slate-100 rounded-full z-10 border border-slate-200"></div>
                      <span className="text-slate-400 font-semibold text-sm">Carne Asada</span>
                    </div>

                    <div className="flex items-center gap-4 relative">
                      <div className="w-5 h-5 bg-slate-100 rounded-full z-10 border border-slate-200"></div>
                      <span className="text-slate-400 font-semibold text-sm">Tacos de Alambre</span>
                    </div>

                    <div className="flex items-center gap-4 relative">
                      <div className="w-5 h-5 bg-slate-100 rounded-full z-10 border border-slate-200"></div>
                      <span className="text-slate-400 font-semibold text-sm">Tacos de Discada</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-red-100 uppercase tracking-widest active:scale-95">
                    CONFIRMAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 h-16 flex items-center justify-between z-30">
        <button className="flex flex-col items-center gap-1 text-red-600 border-t-2 border-red-600 py-2 pt-1 transition-all">
          <Utensils size={20} />
          <span className="text-[10px] font-bold uppercase">Menú</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 py-2 transition-all">
          <ClipboardList size={20} />
          <span className="text-[10px] font-bold uppercase">Mis Pedidos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 py-2 transition-all">
          <User size={20} />
          <span className="text-[10px] font-bold uppercase">Perfil</span>
        </button>
      </footer>

      {/* Floating PWA Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex items-center justify-between z-50 overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <div className="text-white text-[6px] font-black leading-[1] text-center">MONTY<br/>TACOS</div>
              </div>
              <p className="text-sm font-semibold text-slate-700 tracking-tight">
                ¡Añadir <span className="text-orange-600">Tacos Monty</span> a tu pantalla de inicio!
              </p>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 bg-white rotate-45 border-l border-t border-slate-100"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

