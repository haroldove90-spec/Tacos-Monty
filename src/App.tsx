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
  X,
  ChefHat,
  Truck,
  TrendingUp,
  Package,
  ShieldCheck,
  Smartphone,
  Plus,
  Users,
  Edit3,
  Trash2,
  DollarSign,
  AlertTriangle,
  LogOut
} from "lucide-react";
import { useState, useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from "recharts";
import data from "./data.json";
import rolesData from "./roles_config.json";

const LOGO_URL = "https://cossma.com.mx/montytacos.jpeg";

type Role = 'ADMIN' | 'COCINA' | 'REPARTIDOR' | 'CLIENTE';
type AdminModule = 'ANALYTICS' | 'FINANCES' | 'INVENTORY' | 'STAFF' | 'MENU_EDITOR';
type KitchenModule = 'KDS' | 'AVAILABILITY';

export default function App() {
  const { menu, pedidos_activos } = data;
  const { ROLES_CONFIG } = rolesData;
  const [view, setView] = useState<'HOME' | 'DASHBOARD'>('HOME');
  const [currentRole, setCurrentRole] = useState<Role>('CLIENTE');
  const [adminModule, setAdminModule] = useState<AdminModule>('ANALYTICS');
  const [kitchenModule, setKitchenModule] = useState<KitchenModule>('KDS');
  const [showBanner, setShowBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Kitchen State
  const [kitchenOrders, setKitchenOrders] = useState([
    { id: '101', items: [{ name: 'Tacos Discada', qty: 3, notes: 'Sin cebolla, mucha salsa' }, { name: 'Quesadilla Asada', qty: 1, notes: 'Harina' }], status: 'pending', time: '5 min' },
    { id: '102', items: [{ name: 'Chicharrón San Juan', qty: 2, notes: 'Extra limón' }], status: 'preparing', time: '12 min' },
    { id: '103', items: [{ name: 'Vapor Surtidos', qty: 5, notes: 'Solo chicharrón y papa' }], status: 'pending', time: '2 min' },
  ]);

  const [disponibilidadMenu, setDisponibilidadMenu] = useState(
    menu.map(item => ({ ...item, disponible: true }))
  );

  const updateOrderStatus = (orderId: string, nextStatus: string) => {
    setKitchenOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  const toggleAvailability = (itemId: number) => {
    setDisponibilidadMenu(prev => prev.map(i => i.id === itemId ? { ...i, disponible: !i.disponible } : i));
  };

  // ... (rest of the logic remains similar but integrated into the new structure)

  // Mock Admin Data
  const salesData = useMemo(() => [
    { name: 'Lun', sales: 1200 },
    { name: 'Mar', sales: 1900 },
    { name: 'Mie', sales: 1500 },
    { name: 'Jue', sales: 2100 },
    { name: 'Vie', sales: 3800 },
    { name: 'Sab', sales: 4500 },
    { name: 'Dom', sales: 4200 },
  ], []);

  const topProductsData = useMemo(() => [
    { name: 'Tacos Discada', value: 400 },
    { name: 'Chicharrón San Juan', value: 300 },
    { name: 'Asada', value: 250 },
    { name: 'Vapor', value: 200 },
  ], []);

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981'];

  const inventoryItems = useMemo(() => [
    { id: 1, item: 'Carne de Res', stock: 15, unit: 'kg', min: 10, supplier: 'Carnes San Juan' },
    { id: 2, item: 'Tortillas Maíz', stock: 40, unit: 'kg', min: 20, supplier: 'Tortillería La Mexicana' },
    { id: 3, item: 'Jalapeños Philadelphia', stock: 8, unit: 'pzs', min: 15, supplier: 'Congelados S.A.' },
    { id: 4, item: 'Queso Asadero', stock: 12, unit: 'kg', min: 5, supplier: 'Lácteos El Ranchito' },
  ], []);

  const staffItems = useMemo(() => [
    { id: 1, name: 'Juan Perez', role: 'COCINA', joined: '2025-01-10' },
    { id: 2, name: 'Maria Lopez', role: 'REPARTIDOR', joined: '2025-02-15' },
    { id: 3, name: 'Carlos Ruiz', role: 'REPARTIDOR', joined: '2025-03-01' },
    { id: 4, name: 'Ana Gomez', role: 'COCINA', joined: '2025-03-20' },
  ], []);

  const config = ROLES_CONFIG[currentRole];

  const renderHome = () => {
    const roles = [
      { id: 'CLIENTE', name: 'Cliente', icon: <Utensils size={40} />, color: 'bg-orange-500', shadow: 'shadow-orange-100', desc: 'Pedir tacos deliciosos' },
      { id: 'COCINA', name: 'Cocina', icon: <ChefHat size={40} />, color: 'bg-amber-500', shadow: 'shadow-amber-100', desc: 'Gestionar pedidos' },
      { id: 'REPARTIDOR', name: 'Repartidor', icon: <Truck size={40} />, color: 'bg-emerald-500', shadow: 'shadow-emerald-100', desc: 'Entregar a tiempo' },
      { id: 'ADMIN', name: 'Admin', icon: <ShieldCheck size={40} />, color: 'bg-slate-900', shadow: 'shadow-slate-200', desc: 'Control total' },
    ];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <div className="w-32 h-32 bg-white rounded-[2rem] mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-red-100 overflow-hidden border-4 border-white rotate-2">
            <img src={LOGO_URL} alt="Logo Monty Tacos" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Monty Tacos</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] opacity-60">Auténtico sabor a la discada</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {roles.map((role, idx) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                setCurrentRole(role.id as Role);
                setView('DASHBOARD');
                if (role.id === 'ADMIN') setAdminModule('ANALYTICS');
              }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#DF8B42]/30 transition-all group flex items-center gap-6 text-left relative overflow-hidden"
            >
              <div className={`${role.color} p-4 rounded-2xl text-white shadow-xl ${role.shadow} group-hover:scale-110 transition-all duration-300`}>
                {role.id === 'ADMIN' ? <ShieldCheck size={28} /> : 
                 role.id === 'COCINA' ? <ChefHat size={28} /> : 
                 role.id === 'REPARTIDOR' ? <Truck size={28} /> : <Utensils size={28} />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-0.5">{role.name}</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide opacity-80">{role.desc}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity rotate-12 group-hover:scale-125 transition-all">
                {role.icon}
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center gap-4 py-3 px-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Sistema Operativo • V 2.4.0</p>
        </motion.div>
      </div>
    );
  };

  const renderRoleSidebar = () => {
    return (
      <aside className="hidden lg:flex w-24 flex-col items-center py-8 bg-[#8F2A1E] border-r border-[#8F2A1E] z-20 shadow-2xl">
        <div 
          onClick={() => setView('HOME')}
          className="w-16 h-16 rounded-[1.5rem] bg-white border border-white/20 flex items-center justify-center mb-12 overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-xl shadow-black/20"
        >
           <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        
        <nav className="flex flex-col gap-6 flex-1">
          <button 
            onClick={() => {
              if (currentRole === 'ADMIN') setAdminModule('ANALYTICS');
            }}
            className={`p-4 rounded-2xl transition-all ${((currentRole === 'ADMIN' && adminModule === 'ANALYTICS') || (currentRole === 'CLIENTE')) ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
          >
            <Home size={26} />
          </button>
          
          {currentRole === 'ADMIN' ? (
            <>
              <button 
                onClick={() => setAdminModule('FINANCES')}
                className={`p-4 rounded-2xl transition-all ${adminModule === 'FINANCES' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <DollarSign size={26} />
              </button>
              <button 
                onClick={() => setAdminModule('INVENTORY')}
                className={`p-4 rounded-2xl transition-all ${adminModule === 'INVENTORY' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <Package size={26} />
              </button>
              <button 
                onClick={() => setAdminModule('STAFF')}
                className={`p-4 rounded-2xl transition-all ${adminModule === 'STAFF' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <Users size={26} />
              </button>
              <button 
                onClick={() => setAdminModule('MENU_EDITOR')}
                className={`p-4 rounded-2xl transition-all ${adminModule === 'MENU_EDITOR' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <Edit3 size={26} />
              </button>
            </>
          ) : (
            <>
              {config.allowed_modules.includes('pedidos_kanban') || config.allowed_modules.includes('historial') ? (
                <button className="p-4 text-white/40 hover:text-white hover:bg-white/10 transition-all rounded-2xl"><ClipboardList size={26} /></button>
              ) : null}
            </>
          )}
          <button className="p-4 text-white/40 hover:text-white hover:bg-white/10 transition-all rounded-2xl"><Settings size={26} /></button>
        </nav>

        <div className="flex flex-col gap-6 items-center">
          <button className="p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-all" onClick={() => setView('HOME')}><LogOut size={26} /></button>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 shadow-sm">
            {currentRole === 'ADMIN' ? <ShieldCheck size={24} className="text-[#F5DD9F]" /> : <User size={24} className="text-white/50" />}
          </div>
        </div>
      </aside>
    );
  };

  const renderMobileNavigation = () => {
    return (
      <div className="lg:hidden">
        {/* Mobile Header with Menu Toggle */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#8F2A1E] border-b border-white/10 z-50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-white/80 hover:bg-white/10 rounded-xl transition-colors"
            >
              <Smartphone size={24} />
            </button>
            <div className="w-8 h-8 bg-white rounded-lg overflow-hidden flex-shrink-0">
               <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg font-black tracking-tight text-white leading-none truncate max-w-[150px]">
              {currentRole === 'CLIENTE' ? 'Menú' : (currentRole === 'ADMIN' ? adminModule.replace('_', ' ') : config.name)}
            </h1>
          </div>
          <button 
            onClick={() => setView('HOME')}
            className="w-10 h-10 bg-[#F5DD9F] rounded-xl flex items-center justify-center text-[#8F2A1E] shadow-lg"
          >
            <Home size={20} />
          </button>
        </header>

        {/* Mobile Sidebar (Drawer) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[70] p-8 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border border-slate-100 rotate-3">
                       <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">Monty<br/>Tacos</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400"><X size={24} /></button>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Módulos Administrativos</p>
                  {currentRole === 'ADMIN' ? (
                    <>
                      {[
                        { id: 'ANALYTICS', label: 'Estadísticas', icon: <TrendingUp size={20} /> },
                        { id: 'FINANCES', label: 'Finanzas', icon: <DollarSign size={20} /> },
                        { id: 'INVENTORY', label: 'Inventario', icon: <Package size={20} /> },
                        { id: 'STAFF', label: 'Personal', icon: <Users size={20} /> },
                        { id: 'MENU_EDITOR', label: 'Editor de Menú', icon: <Edit3 size={20} /> },
                      ].map(mod => (
                        <button
                          key={mod.id}
                          onClick={() => {
                            setAdminModule(mod.id as AdminModule);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${adminModule === mod.id ? 'bg-red-50 text-red-600 shadow-sm shadow-red-100' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                          {mod.icon}
                          {mod.label}
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Estado del Rol</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm text-red-600">
                           {currentRole === 'COCINA' && <ChefHat size={24} />}
                           {currentRole === 'REPARTIDOR' && <Truck size={24} />}
                           {currentRole === 'CLIENTE' && <Utensils size={24} />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{currentRole}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mt-1">Sesión Activa</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Como {currentRole.toLowerCase()}, tienes acceso a las funciones específicas de tu área. Los módulos administrativos están reservados para dueños.
                      </p>
                    </div>
                  )}
                </nav>

                <div className="pt-8 mt-auto border-t border-slate-100">
                   <button 
                    onClick={() => {
                      setView('HOME');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                   >
                     <LogOut size={20} /> Salir al Inicio
                   </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderAdminContent = () => {
    switch (adminModule) {
      case 'ANALYTICS':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Ventas Hoy</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-slate-900">$12,450</span>
                  <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pedidos Totales</p>
                <span className="text-3xl font-black text-slate-900">84</span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Ticket Promedio</p>
                <span className="text-3xl font-black text-slate-900">$148</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="text-red-500" size={20} /> Ventas Semanales
                </h3>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={4} dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <ShoppingBag className="text-orange-500" size={20} /> Productos Estrella
                </h3>
                <div className="h-64 flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topProductsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {topProductsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-4 pr-8">
                    {topProductsData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-xs font-bold text-slate-600">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'FINANCES':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight">Finanzas del Negocio</h2>
                <button className="bg-[#3F3B78] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#3F3B78]/90 transition-all shadow-lg shadow-indigo-100">
                  <Plus size={16} /> REGISTRAR GASTO
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <p className="text-emerald-600 text-xs font-bold uppercase mb-1">Ingresos Totales (Mes)</p>
                  <p className="text-2xl font-black text-emerald-700">$348,200</p>
                </div>
                <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
                  <p className="text-rose-600 text-xs font-bold uppercase mb-1">Egresos Totales (Mes)</p>
                  <p className="text-2xl font-black text-rose-700">$194,500</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">Concepto</th>
                      <th className="px-6 py-4">Monto</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {[
                      { concept: 'Venta Mostrador', amount: 15600, date: '2025-05-06', type: 'Ingreso' },
                      { concept: 'Insumos Carnicería', amount: -4200, date: '2025-05-06', type: 'Egreso' },
                      { concept: 'Renta Local', amount: -15000, date: '2025-05-01', type: 'Egreso' },
                      { concept: 'Ventas Reparto', amount: 8400, date: '2025-05-06', type: 'Ingreso' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold">{row.concept}</td>
                        <td className={`px-6 py-4 font-black ${row.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {row.amount > 0 ? '+' : ''}${Math.abs(row.amount)}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{row.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${row.type === 'Ingreso' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {row.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'INVENTORY':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Inventario Maestro</h2>
                <button className="bg-[#DF8B42] text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all">GESTIONAR PROVEEDORES</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {inventoryItems.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 mb-4">{item.item}</p>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className={`text-2xl font-black ${item.stock <= item.min ? 'text-red-500' : 'text-slate-900'}`}>{item.stock}</span>
                        <span className="text-slate-400 text-xs ml-1 font-bold">{item.unit}</span>
                      </div>
                      {item.stock <= item.min && <AlertTriangle size={24} className="text-red-500 animate-pulse" />}
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                       <div className={`h-full rounded-full transition-all ${item.stock <= item.min ? 'bg-red-500' : 'bg-[#DF8B42]'}`} style={{ width: `${Math.min(100, (item.stock / 50) * 100)}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Mínimo: {item.min} {item.unit}</p>
                    <p className="text-[10px] text-slate-500 mt-2 italic line-clamp-1">Prov: {item.supplier}</p>
                  </div>
                ))}
              </div>
          </div>
        );

      case 'STAFF':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight">Gestión de Personal</h2>
              <button className="bg-[#3F3B78] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-100">
                <Plus size={16} /> NUEVO EMPLEADO
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffItems.map(person => (
                <div key={person.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{person.name}</h4>
                      <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{person.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><Edit3 size={18} /></button>
                    <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'MENU_EDITOR':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase tracking-tight">Editor de Menú</h2>
                <div className="flex gap-2">
                  <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">CATEGORÍAS</button>
                  <button className="bg-[#DF8B42] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-100 hover:scale-105 transition-all">
                    <Plus size={16} /> NUEVO PRODUCTO
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="divide-y divide-slate-50">
                    {menu.map(item => (
                      <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#DF8B42]">
                              <Utensils size={32} />
                           </div>
                           <div>
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.categoria}</span>
                              <h4 className="font-bold text-lg -mt-1">{item.nombre}</h4>
                              <p className="text-sm text-slate-500 italic max-w-md line-clamp-1">{item.descripcion}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Precio</p>
                              <p className="font-black text-xl text-[#8F2A1E]">${item.precio}</p>
                           </div>
                           <div className="flex gap-2">
                              <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"><Edit3 size={18} /></button>
                              <button className="p-3 bg-slate-100 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    if (currentRole === 'COCINA') {
      return (
        <div className="space-y-6 pt-4 px-4 sm:px-0">
          <div className="flex bg-[#F5DD9F]/30 p-1.5 rounded-[1.2rem] gap-2 w-full max-w-md mx-auto sm:mx-0">
            <button 
              onClick={() => setKitchenModule('KDS')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${kitchenModule === 'KDS' ? 'bg-[#3F3B78] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
            >
              Monitor KDS
            </button>
            <button 
              onClick={() => setKitchenModule('AVAILABILITY')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${kitchenModule === 'AVAILABILITY' ? 'bg-[#3F3B78] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
            >
              Disponibilidad
            </button>
          </div>

          {kitchenModule === 'KDS' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {['pending', 'preparing', 'ready'].map((status) => (
                <div key={status} className="bg-slate-50/50 rounded-[2rem] p-4 border border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">
                      {status === 'pending' ? 'Pendientes' : status === 'preparing' ? 'Preparando' : 'Listos'}
                    </h3>
                    <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-slate-400 border border-slate-100">
                      {kitchenOrders.filter(o => o.status === status).length}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {kitchenOrders.filter(o => o.status === status).map(order => (
                      <motion.div 
                        layoutId={order.id}
                        key={order.id} 
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[#8F2A1E] font-black text-lg">#{order.id}</span>
                          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                            <Clock size={12} /> {order.time}
                          </span>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                              <div className="flex justify-between items-center mb-1">
                                <p className="font-black text-slate-800 text-sm">{item.name}</p>
                                <span className="bg-[#DF8B42] text-white text-[10px] font-black px-2 py-0.5 rounded-lg">x{item.qty}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 italic font-medium leading-relaxed">
                                "{item.notes}"
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          {status === 'pending' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                              className="w-full bg-[#DF8B42] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
                            >
                              Preparar
                            </button>
                          )}
                          {status === 'preparing' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="w-full bg-[#8F2A1E] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
                            >
                              Listo
                            </button>
                          )}
                          {status === 'ready' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              className="w-full bg-[#3F3B78] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
                            >
                              Entregado
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Switch de Disponibilidad</h2>
                 <p className="text-sm text-slate-400 font-medium">Controla los productos visibles para los clientes en tiempo real.</p>
              </div>
              <div className="divide-y divide-slate-50">
                {disponibilidadMenu.map(item => (
                  <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${item.disponible ? 'bg-[#F5DD9F]/20 text-[#DF8B42]' : 'bg-slate-100 text-slate-300'}`}>
                        <Utensils size={28} />
                      </div>
                      <div>
                        <h4 className={`font-black text-lg tracking-tight ${item.disponible ? 'text-slate-900' : 'text-slate-300 line-through'}`}>{item.nombre}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${item.disponible ? 'text-[#8F2A1E]' : 'text-slate-300'}`}>
                          {item.disponible ? 'Disponible' : 'Agotado'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleAvailability(item.id)}
                      className={`relative w-16 h-8 rounded-full transition-all duration-300 ${item.disponible ? 'bg-[#8F2A1E]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-lg ${item.disponible ? 'left-9' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    switch (currentRole) {
      case 'ADMIN':
        return renderAdminContent();

      case 'COCINA':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight uppercase">Dashboard Cocina</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ONLINE
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pedidos_activos.map(pedido => (
                <div key={pedido.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400">{pedido.id}</span>
                    <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-lg ${pedido.estatus === 'pendiente' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {pedido.estatus}
                    </span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {pedido.items.map((item, i) => (
                      <p key={i} className="font-bold text-lg">{item.cantidad}x {item.producto}</p>
                    ))}
                  </div>
                  <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl active:scale-95 transition-all">
                    COMENZAR PREPARACIÓN
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'REPARTIDOR':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <Truck size={40} />
              </div>
              <h2 className="text-2xl font-black">LOGÍSTICA DE REPARTO</h2>
              <p className="text-slate-400 text-sm">3 pedidos asignados para entrega</p>
            </div>
            <div className="space-y-4">
              {pedidos_activos.filter(p => p.estatus === 'en_camino').map(pedido => (
                <div key={pedido.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400"><MapPin /></div>
                    <div>
                      <p className="font-bold">{pedido.cliente}</p>
                      <p className="text-xs text-slate-400">Tlalnepantla Centro</p>
                    </div>
                  </div>
                  <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">
                    ENTREGAR
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          </div>
        );
    }
  };

  if (view === 'HOME') return renderHome();

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      {/* Mobile-only Top elements */}
      {renderMobileNavigation()}

      {/* Top Banner - Responsive Offset */}
      <div className="bg-[#fef3c7] border-b border-[#fde68a] py-2 px-4 text-center mt-16 lg:mt-0 relative z-30">
        <p className="text-[10px] sm:text-[11px] font-black tracking-wider text-[#92400e] uppercase">
          RECIBIRÁS TUS TACOS EN <span className="text-red-600 bg-white/50 px-1.5 rounded-md">[25]</span> MINUTOS
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {renderRoleSidebar()}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto pb-32 lg:pb-0">
          {/* Desktop Header */}
          <header className="hidden lg:flex h-20 px-8 items-center justify-between bg-transparent flex-shrink-0">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 cursor-pointer shadow-md hover:scale-110 active:scale-95 transition-all" 
                onClick={() => setView('HOME')}
              >
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                  {currentRole === 'CLIENTE' ? 'Menú Principal' : (currentRole === 'ADMIN' ? adminModule.replace('_', ' ') : config.name)}
                </h1>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">SISTEMA • {currentRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors group">
                <Bell size={22} className="text-slate-600 group-hover:text-[#8F2A1E]" />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#8F2A1E] rounded-full border-2 border-white"></span>
              </div>
              <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group">
                 <div className="text-right">
                    <p className="text-sm font-black text-slate-900 leading-none mb-1">Usuario Demo</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{currentRole}</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden group-hover:border-[#DF8B42]/30 group-hover:scale-105 transition-all shadow-sm">
                   {currentRole === 'ADMIN' ? <ShieldCheck size={20} className="text-[#8F2A1E]" /> : <User size={20} />}
                 </div>
              </div>
            </div>
          </header>

          <div className="px-6 lg:px-12 py-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Improved Mobile Bottom Navigation */}
      <div className="flex lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <footer className="bg-[#8F2A1E] border-t border-white/5 px-4 h-20 flex items-center justify-between w-full shadow-[0_-10px_50px_-20px_rgba(0,0,0,0.5)] pb-safe">
          {/* Combined Module Shortcuts */}
          <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl flex-1 max-w-[280px]">
            {currentRole === 'ADMIN' ? (
              <>
                {[
                  { id: 'ANALYTICS', icon: <TrendingUp size={20} /> },
                  { id: 'FINANCES', icon: <DollarSign size={20} /> },
                  { id: 'INVENTORY', icon: <Package size={20} /> },
                  { id: 'STAFF', icon: <Users size={20} /> },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setAdminModule(mod.id as AdminModule)}
                    className={`flex flex-1 items-center justify-center p-2.5 rounded-xl transition-all ${
                      adminModule === mod.id 
                        ? 'bg-[#F5DD9F] text-[#8F2A1E] shadow-lg scale-110 -translate-y-1' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {mod.icon}
                  </button>
                ))}
              </>
            ) : (
              <div className="flex items-center gap-3 pl-2">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden shrink-0" onClick={() => setView('HOME')}>
                    <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">{currentRole}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 sm:gap-6 pl-4 border-l border-white/10 ml-4">
            <button 
              onClick={() => {
                if (currentRole === 'ADMIN') setAdminModule('ANALYTICS');
                setIsMobileMenuOpen(false);
              }}
              className={`${((currentRole === 'ADMIN' && adminModule === 'ANALYTICS') || currentRole === 'CLIENTE') ? 'text-[#F5DD9F]' : 'text-white/40'} flex flex-col items-center gap-0.5 group transition-all`}
            >
              <div className={`p-2 rounded-xl transition-all ${((currentRole === 'ADMIN' && adminModule === 'ANALYTICS') || currentRole === 'CLIENTE') ? 'bg-white/10' : 'group-hover:bg-white/5'}`}>
                <Home size={22} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-tighter">Inicio</span>
            </button>
            
            <button 
              onClick={() => {
                setView('HOME');
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-center gap-0.5 group text-white/40 hover:text-white transition-all underline decoration-transparent hover:decoration-[#F5DD9F]"
            >
              <div className="p-2 rounded-xl group-hover:bg-white/10 transition-all">
                <LogOut size={22} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-tighter">Salir</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

