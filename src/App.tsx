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
  LogOut,
  ToggleLeft
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
type AdminModule = 'ANALYTICS' | 'FINANCES' | 'INVENTORY' | 'STAFF' | 'MENU_EDITOR' | 'REPARTIDORES';
type KitchenModule = 'PEDIDOS';
type ClientModule = 'MENU' | 'MIS_PEDIDOS' | 'MI_PERFIL';
type DriverModule = 'PENDIENTES' | 'FINALIZADAS' | 'COMISIONES';

export default function App() {
  const { menu, pedidos_activos } = data;
  const { ROLES_CONFIG } = rolesData;
  const [view, setView] = useState<'HOME' | 'DASHBOARD'>('HOME');
  const [currentRole, setCurrentRole] = useState<Role>('CLIENTE');
  const [adminModule, setAdminModule] = useState<AdminModule>('ANALYTICS');
  const [kitchenModule, setKitchenModule] = useState<KitchenModule>('PEDIDOS');
  const [clientModule, setClientModule] = useState<ClientModule>('MENU');
  const [driverModule, setDriverModule] = useState<DriverModule>('PENDIENTES');
  const [showBanner, setShowBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Config
  const [commissionRate, setCommissionRate] = useState(15); // Percentage

  // Drivers State
  const [drivers, setDrivers] = useState([
    { id: 'R01', name: 'Alonso Valdes', status: 'active', commissions_day: 450, commissions_month: 3200 },
    { id: 'R02', name: 'Beto Sanchez', status: 'active', commissions_day: 320, commissions_month: 2800 },
    { id: 'R03', name: 'Carla Mendez', status: 'suspended', commissions_day: 0, commissions_month: 1500 },
  ]);

  // Client State
  const [cart, setCart] = useState<{ id: number; nombre: string; precio: number; qty: number }[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [clientOrders, setClientOrders] = useState([
    { id: '100', date: '2025-05-06', total: 450, status: 'delivered', items: [{ name: 'Tacos Discada', qty: 5 }] }
  ]);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: item.id, nombre: item.nombre, precio: item.precio, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.precio * item.qty), 0);

  // Unified Orders State (Monitor Global)
  const [orders, setOrders] = useState([
    { id: '101', client: 'Juan P.', items: [{ name: 'Tacos Discada', qty: 3, notes: 'Sin cebolla, mucha salsa' }, { name: 'Quesadilla Asada', qty: 1, notes: 'Harina' }], status: 'pending', time: '5 min', total: 240, driverId: null },
    { id: '102', client: 'Maria L.', items: [{ name: 'Chicharrón San Juan', qty: 2, notes: 'Extra limón' }], status: 'preparing', time: '12 min', total: 180, driverId: null },
    { id: '103', client: 'Carlos R.', items: [{ name: 'Vapor Surtidos', qty: 5, notes: 'Solo chicharrón y papa' }], status: 'ready', time: '2 min', total: 125, driverId: null },
    { id: '104', client: 'Ana G.', items: [{ name: 'Tacos Asada', qty: 4, notes: '' }], status: 'on_way', time: '15 min', total: 220, driverId: 'R01' },
  ]);

  const [disponibilidadMenu, setDisponibilidadMenu] = useState(
    menu.map(item => ({ ...item, disponible: true }))
  );

  const updateOrderStatus = (orderId: string, nextStatus: string, extraData = {}) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus, ...extraData } : o));
    // If completed, add to client orders if it's the client's order (simulated)
    if (nextStatus === 'delivered') {
      const order = orders.find(o => o.id === orderId);
      if (order) setClientOrders(prev => [...prev, { ...order, date: new Date().toISOString().split('T')[0] }]);
    }
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
      { id: 'CLIENTE', name: 'Cliente', icon: <Utensils size={40} />, color: 'bg-[#DF8B42]', shadow: 'shadow-orange-100', desc: 'Pedir tacos deliciosos', textColor: 'text-white' },
      { id: 'COCINA', name: 'Cocina', icon: <ChefHat size={40} />, color: 'bg-[#F5DD9F]', shadow: 'shadow-yellow-100', desc: 'Gestionar pedidos', textColor: 'text-[#8F2A1E]' },
      { id: 'REPARTIDOR', name: 'Repartidor', icon: <Truck size={40} />, color: 'bg-[#3F3B78]', shadow: 'shadow-indigo-100', desc: 'Entregar a tiempo', textColor: 'text-white' },
      { id: 'ADMIN', name: 'Admin', icon: <ShieldCheck size={40} />, color: 'bg-[#8F2A1E]', shadow: 'shadow-red-100', desc: 'Control total', textColor: 'text-white' },
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
                if (role.id === 'COCINA') setKitchenModule('KDS');
              }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#DF8B42]/30 transition-all group flex items-center gap-6 text-left relative overflow-hidden"
            >
              <div className={`${role.color} p-4 rounded-2xl ${role.textColor} shadow-xl ${role.shadow} group-hover:scale-110 transition-all duration-300`}>
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
                onClick={() => setAdminModule('REPARTIDORES')}
                className={`p-4 rounded-2xl transition-all ${adminModule === 'REPARTIDORES' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <Truck size={26} />
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
          ) : currentRole === 'COCINA' ? (
            <>
              <button 
                onClick={() => setKitchenModule('PEDIDOS')}
                className={`p-4 rounded-2xl transition-all ${kitchenModule === 'PEDIDOS' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <ClipboardList size={26} />
              </button>
            </>
          ) : currentRole === 'REPARTIDOR' ? (
             <>
               <button 
                 onClick={() => setDriverModule('PENDIENTES')}
                 className={`p-4 rounded-2xl transition-all ${driverModule === 'PENDIENTES' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                 <Package size={26} />
               </button>
               <button 
                 onClick={() => setDriverModule('FINALIZADAS')}
                 className={`p-4 rounded-2xl transition-all ${driverModule === 'FINALIZADAS' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                 <ClipboardList size={26} />
               </button>
               <button 
                 onClick={() => setDriverModule('COMISIONES')}
                 className={`p-4 rounded-2xl transition-all ${driverModule === 'COMISIONES' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                 <DollarSign size={26} />
               </button>
             </>
          ) : (
            <>
               <button 
                 onClick={() => setClientModule('MENU')}
                 className={`p-4 rounded-2xl transition-all ${clientModule === 'MENU' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                 <Utensils size={26} />
               </button>
               <button 
                 onClick={() => setClientModule('MIS_PEDIDOS')}
                 className={`p-4 rounded-2xl transition-all ${clientModule === 'MIS_PEDIDOS' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                 <ShoppingBag size={26} />
               </button>
               <button 
                 onClick={() => setClientModule('MI_PERFIL')}
                 className={`p-4 rounded-2xl transition-all ${clientModule === 'MI_PERFIL' ? 'text-[#8F2A1E] bg-[#F5DD9F] shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                 <User size={26} />
               </button>
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
              Monty Tacos
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    {currentRole === 'ADMIN' ? 'Módulos Administrativos' : currentRole === 'COCINA' ? 'Módulos de Cocina' : 'Opciones'}
                  </p>
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
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${adminModule === mod.id ? 'bg-[#8F2A1E] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                          {mod.icon}
                          {mod.label}
                        </button>
                      ))}
                    </>
                  ) : currentRole === 'COCINA' ? (
                    <>
                      {[
                        { id: 'KDS', label: 'Monitor KDS', icon: <ClipboardList size={20} /> },
                        { id: 'AVAILABILITY', label: 'Disponibilidad', icon: <ToggleLeft size={20} /> },
                      ].map(mod => (
                        <button
                          key={mod.id}
                          onClick={() => {
                            setKitchenModule(mod.id as KitchenModule);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${kitchenModule === mod.id ? 'bg-[#8F2A1E] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
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

  const renderOrderMonitor = () => {
    const statusConfig = {
      pending: { label: '¡Nuevo Pedido!', sub: 'Tu pedido ha sido recibido 🌮', color: 'bg-amber-400', icon: <Bell className="animate-bounce" />, text: 'text-amber-600', glow: 'shadow-amber-200' },
      preparing: { label: 'En Preparación', sub: 'Tu pedido está en preparación 🔥', color: 'bg-[#DF8B42]', icon: <ChefHat className="animate-pulse" />, text: 'text-[#DF8B42]', glow: 'shadow-orange-200' },
      ready: { label: 'Listo para Entrega', sub: 'Tu pedido está listo para entrega ✅', color: 'bg-emerald-500', icon: <Package className="scale-110" />, text: 'text-emerald-600', glow: 'shadow-emerald-200' },
      on_way: { label: 'En Camino', sub: 'Tu pedido está en camino 🛵', color: 'bg-[#3F3B78]', icon: <Truck className="translate-x-1 animate-pulse" />, text: 'text-[#3F3B78]', glow: 'shadow-indigo-200' },
      delivered: { label: 'Entregado', sub: 'Tu pedido ha llegado 🎉', color: 'bg-slate-800', icon: <CheckCircle2 />, text: 'text-slate-900', glow: 'shadow-slate-200' },
    };

    return (
      <div className="bg-white rounded-[4rem] border-4 border-[#F5DD9F]/30 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] overflow-hidden mb-16 animate-in fade-in zoom-in-95 duration-1000">
        <div className="bg-[#8F2A1E] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 relative overflow-hidden">
          {/* Animated Background Element */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent blur-3xl opacity-20"></div>
          </div>

          <div className="flex items-center gap-8 relative z-10">
             <motion.div 
               animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-24 h-24 bg-gradient-to-br from-white to-slate-50 rounded-[2.5rem] flex items-center justify-center text-[#8F2A1E] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.5)] border-4 border-white"
             >
                <ShoppingBag size={44} className="drop-shadow-lg" />
             </motion.div>
             <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none mb-2 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">Monitor Monty Tacos</h3>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <p className="text-[12px] font-black opacity-80 uppercase tracking-[0.5em] text-amber-100">Transmisión en Tiempo Real</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6 relative z-10 bg-white/10 backdrop-blur-md px-8 py-4 rounded-[2rem] border border-white/20 shadow-2xl">
             <div className="flex -space-x-4">
                {orders.slice(0, 4).map((o, i) => (
                   <motion.div 
                    key={o.id} 
                    whileHover={{ scale: 1.2, zIndex: 50, rotate: i % 2 === 0 ? 5 : -5 }}
                    className="w-12 h-12 rounded-full bg-white border-2 border-[#8F2A1E] flex items-center justify-center text-xs font-black text-[#8F2A1E] shadow-2xl cursor-help"
                   >
                      #{o.id.slice(-2)}
                   </motion.div>
                ))}
                {orders.length > 4 && (
                  <div className="w-12 h-12 rounded-full bg-[#F5DD9F] border-2 border-[#8F2A1E] flex items-center justify-center text-xs font-black text-[#8F2A1E] shadow-2xl">
                    +{orders.length - 4}
                  </div>
                )}
             </div>
             <div className="h-10 w-[1px] bg-white/20"></div>
             <div className="text-right">
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-0.5">Órdenes</p>
                <p className="text-2xl font-black">{orders.length}</p>
             </div>
          </div>
        </div>

        <div className="p-10 lg:p-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => {
            const config = statusConfig[status];
            const filteredOrders = orders.filter(o => o.status === status);
            const isActive = filteredOrders.length > 0;
            
            return (
              <div 
                key={status} 
                className={`flex flex-col items-center text-center p-10 rounded-[4rem] transition-all duration-700 relative group
                  ${isActive 
                    ? `bg-slate-50 border-2 border-[#F5DD9F] shadow-2xl ${config.glow}` 
                    : 'bg-white border-2 border-slate-50 opacity-15 hover:opacity-30 grayscale'
                  }`}
              >
                <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                  ${config.color} ${isActive ? 'animate-in zoom-in duration-700' : ''}`}
                >
                   {config.icon}
                   {isActive && (
                     <motion.div 
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       className="absolute -top-3 -right-3 w-10 h-10 bg-white text-[#8F2A1E] rounded-2xl flex items-center justify-center text-sm font-black shadow-2xl border-4 border-slate-50 rotate-12"
                     >
                        {filteredOrders.length}
                     </motion.div>
                   )}
                </div>
                
                <h4 className={`text-base font-black uppercase tracking-tight leading-none mb-3 ${config.text}`}>
                  {config.label}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed min-h-[30px]">
                  {config.sub}
                </p>
                
                <div className="mt-10 w-full space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredOrders.map(order => (
                      <motion.div 
                        layout
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
                        key={order.id}
                        className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col items-center gap-2 relative overflow-hidden group/card hover:border-[#DF8B42] hover:shadow-orange-100/50 transition-all"
                      >
                        <div className="w-full flex justify-between items-center mb-2">
                          <span className="text-xs font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-full">#{order.id}</span>
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 group-hover/card:text-[#DF8B42] transition-colors">
                            <Clock size={12} className="opacity-50" />
                            <span>{order.time}</span>
                          </div>
                        </div>
                        <p className="text-xs font-black text-[#8F2A1E] uppercase tracking-widest truncate w-full text-center px-2">{order.client}</p>
                        
                        {status === 'preparing' && (
                          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent bg-[length:200%_100%] animate-gradient-x"></div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {filteredOrders.length === 0 && (
                    <div className="py-10 border-4 border-slate-50 border-dashed rounded-[3rem] flex flex-col items-center justify-center gap-3 opacity-40">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200">
                        <ShoppingBag size={20} />
                      </div>
                      <span className="italic text-slate-300 text-[10px] font-black uppercase tracking-widest leading-none">Esperando</span>
                    </div>
                  )}
                </div>

                {isActive && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-6 py-2.5 rounded-full shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] border border-slate-100 flex items-center gap-3 animate-bounce">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-900 tracking-[0.2em] whitespace-nowrap">Actualizado Live</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAdminRepartidores = () => {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Gestión de Repartidores</h2>
            <p className="text-slate-400 font-medium">Administra tu flota de entrega y comisiones.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase">Comisión:</span>
              <input 
                type="number" 
                value={commissionRate} 
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-12 text-sm font-black text-[#8F2A1E] focus:outline-none"
              />
              <span className="text-[10px] font-black text-slate-400">%</span>
            </div>
            <button className="flex-1 md:flex-none bg-[#3F3B78] text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-all">
              Dar de Alta
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {drivers.map(driver => (
            <div key={driver.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${driver.status === 'active' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                  <Truck size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${driver.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {driver.status === 'active' ? 'Activo' : 'Suspendido'}
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 tracking-tight">{driver.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">ID: {driver.id}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Día</p>
                  <p className="text-sm font-black text-emerald-600">${driver.commissions_day}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Mes</p>
                  <p className="text-sm font-black text-[#8F2A1E]">${driver.commissions_month}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all font-black text-[9px] uppercase tracking-widest">Editar</button>
                <button className="flex-1 py-3 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-100 transition-all font-black text-[9px] uppercase tracking-widest">Baja</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderKitchenOrders = () => {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Módulo de Pedidos</h2>
            <p className="text-slate-400 font-medium">Control de comandas y estados de cocina.</p>
          </div>
          <span className="bg-[#8F2A1E] text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">
            {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length} ACTIVOS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6 pb-2 border-b border-slate-50">Comandas Pendientes</h3>
            <div className="space-y-4">
              {orders.filter(o => o.status === 'pending').map(order => (
                <div key={order.id} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-2xl font-black text-[#8F2A1E]">#{order.id}</p>
                      <p className="text-xs font-bold text-slate-400">Cliente: {order.client}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                      <Clock size={14} className="text-amber-500" />
                      <span className="font-black text-[10px] text-slate-600 uppercase tracking-widest">{order.time}</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                        <div className="flex justify-between items-center">
                          <p className="font-black text-slate-800">{item.name}</p>
                          <span className="bg-[#DF8B42] text-white text-xs font-black px-2.5 py-1 rounded-lg">x{item.qty}</span>
                        </div>
                        {item.notes && <p className="mt-2 text-[10px] text-red-500 font-bold italic">"{item.notes}"</p>}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="w-full bg-[#DF8B42] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-100 hover:scale-105 transition-all"
                  >
                    Iniciar Preparación
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6 pb-2 border-b border-slate-50">En Preparación</h3>
            <div className="space-y-4">
              {orders.filter(o => o.status === 'preparing').map(order => (
                <div key={order.id} className="bg-[#F5DD9F]/20 p-6 rounded-[2rem] border border-[#F5DD9F]/30">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-black text-slate-900 tracking-tight italic select-none opacity-50">COCINANDO...</span>
                    <ChefHat size={32} className="text-[#DF8B42] animate-bounce" />
                  </div>
                  <div className="space-y-2 mb-6">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="font-bold text-slate-800 text-sm">{item.qty}x {item.name}</p>
                    ))}
                  </div>
                  <button 
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="w-full bg-[#3F3B78] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:scale-105 transition-all"
                  >
                    Marcar como Listo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCourierView = () => {
    switch (driverModule) {
      case 'PENDIENTES':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Entregas Pendientes</h2>
                <p className="text-slate-400 font-medium">Recoge y entrega los pedidos listos.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ready to pick up */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Listos para Recoger</h3>
                <div className="space-y-4">
                  {orders.filter(o => o.status === 'ready').map(order => (
                    <div key={order.id} className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xl font-black text-emerald-700">#{order.id}</span>
                        <div className="bg-white px-2 py-1 rounded-lg shadow-sm font-black text-[#8F2A1E] text-xs">${order.total}</div>
                      </div>
                      <p className="text-sm font-bold text-slate-600 mb-6"><MapPin size={14} className="inline mr-1" /> Sucursal Centro → Entrega Domicilio</p>
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'on_way', { driverId: 'R01' })}
                        className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-all"
                      >
                        Recoger Pedido
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* In transit */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">En Camino</h3>
                <div className="space-y-4">
                  {orders.filter(o => o.status === 'on_way' && o.driverId === 'R01').map(order => (
                    <div key={order.id} className="p-6 bg-[#3F3B78]/5 rounded-3xl border border-[#3F3B78]/10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-black text-[#3F3B78]">#{order.id}</span>
                        <Truck size={24} className="text-[#3F3B78]" />
                      </div>
                      <div className="space-y-1 mb-6">
                         <p className="font-bold text-slate-900">{order.client}</p>
                         <p className="text-xs text-slate-400">Ver ubicación en mapa →</p>
                      </div>
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="w-full bg-[#3F3B78] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-all"
                      >
                        Finalizar Entrega
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'FINALIZADAS':
        return (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Historial de Entregas</h2>
             <div className="divide-y divide-slate-50">
               {orders.filter(o => o.status === 'delivered' && o.driverId === 'R01').map(order => (
                 <div key={order.id} className="py-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300"><CheckCircle2 size={24} /></div>
                      <div>
                        <p className="font-black text-slate-900">Pedido #{order.id}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hoy • {order.client}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-emerald-600 uppercase">Comisión</p>
                      <p className="text-lg font-black text-slate-900">${(order.total * commissionRate / 100).toFixed(2)}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        );
      case 'COMISIONES':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F5DD9F] p-8 rounded-[2.5rem] border border-[#F5DD9F]/30 shadow-xl shadow-yellow-100/20">
                   <p className="text-[10px] font-black text-[#8F2A1E] uppercase tracking-[0.2em] mb-2">Ganancia del Día</p>
                   <p className="text-4xl font-black text-[#8F2A1E]">$450.00</p>
                   <p className="mt-4 text-xs font-bold text-[#8F2A1E]/60 italic">Comisiones pendientes de retiro: $120.00</p>
                </div>
                <div className="bg-[#8F2A1E] p-8 rounded-[2.5rem] text-white">
                   <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mb-2">Ganancia del Mes</p>
                   <p className="text-4xl font-black">$3,200.00</p>
                   <div className="mt-6 flex gap-2">
                      <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase">Metas del Mes: 85%</span>
                   </div>
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  }

  const renderClientProfile = () => {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-center">
          <div className="w-24 h-24 bg-[#F5DD9F] rounded-full mx-auto mb-6 flex items-center justify-center text-[#8F2A1E] shadow-xl border-4 border-white">
            <User size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Juan Invitado</h3>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Taco Lover • Nivel Oro</p>
          
          <div className="grid grid-cols-2 gap-4 mt-12 text-left">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Pedidos Totales</p>
               <p className="font-black text-lg text-slate-900">{clientOrders.length}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Taco Puntos</p>
               <p className="font-black text-lg text-[#DF8B42]">1,250 PTS</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderClientPedidos = () => {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Mis Pedidos</h2>
        <div className="space-y-4">
          {clientOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#8F2A1E]"><Package size={32} /></div>
                <div>
                  <p className="text-sm font-black text-slate-500 uppercase tracking-widest leading-none mb-1">#{order.id}</p>
                  <p className="font-black text-lg text-slate-900">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total</p>
                    <p className="font-black text-xl text-[#8F2A1E]">${order.total}</p>
                 </div>
                 <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                   {order.status === 'delivered' ? 'Entregado' : 'Procesando'}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentRole) {
      case 'ADMIN':
        return (
          <div className="pt-4 px-4 sm:px-0">
             {renderOrderMonitor()}
             {adminModule === 'REPARTIDORES' ? renderAdminRepartidores() : renderAdminContent()}
          </div>
        );
      case 'REPARTIDOR':
        return (
          <div className="space-y-8 pt-4 px-4 sm:px-0">
             {renderOrderMonitor()}
             {renderCourierView()}
          </div>
        );
      case 'COCINA':
        return (
          <div className="space-y-8 pt-4 px-4 sm:px-0">
            {renderOrderMonitor()}
            {renderKitchenOrders()}
          </div>
        );
      case 'CLIENTE':
        if (clientModule === 'MENU') {
          return (
            <div className="space-y-8 pt-4 px-4 sm:px-0">
              {renderOrderMonitor()}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Menú Digital</h2>
                  <p className="text-slate-400 font-medium">Selecciona tus favoritos y arma tu orden.</p>
                </div>
                {cart.length > 0 && (
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="bg-[#3F3B78] text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 transition-all animate-in zoom-in"
                  >
                    <ShoppingBag size={20} />
                    <span className="font-black uppercase tracking-widest text-xs">Ver Carrito ({cart.length})</span>
                    <span className="bg-white/20 px-2 py-1 rounded-lg font-bold">${cartTotal}</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
                {disponibilidadMenu.map(item => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-[2rem] border border-slate-100 p-4 shadow-sm hover:shadow-xl transition-all flex flex-col relative group ${!item.disponible ? 'opacity-50 grayscale pointer-events-none' : ''}`}
                  >
                    {!item.disponible && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 rounded-[2rem]">
                        <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">Agotado</span>
                      </div>
                    )}
                    <div className="aspect-square bg-slate-50 rounded-2xl mb-4 flex items-center justify-center text-[#DF8B42] group-hover:bg-[#F5DD9F]/20 transition-colors">
                      <Utensils size={40} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-slate-900 leading-tight mb-1">{item.nombre}</h4>
                      <p className="text-[#8F2A1E] font-black text-lg">${item.precio}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      disabled={!item.disponible}
                      className="mt-4 w-full bg-[#DF8B42] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={14} /> Agregar
                    </button>
                  </motion.div>
                ))}
              </div>

              {isCheckoutOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setIsCheckoutOpen(false)}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-70 overflow-hidden"
                  >
                    <div className="bg-[#8F2A1E] p-8 text-white">
                      <h3 className="text-2xl font-black uppercase tracking-tight">Tu Pedido</h3>
                      <p className="opacity-70 text-sm">Monty Tacos - Sucursal Centro</p>
                    </div>
                    
                    <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div>
                            <p className="font-black text-slate-900">{item.nombre}</p>
                            <p className="text-xs text-slate-400 font-bold">Cantidad: {item.qty} x ${item.precio}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-black text-[#8F2A1E]">${item.precio * item.qty}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                          <span className="font-bold text-slate-900">${cartTotal}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-slate-900 font-black text-xl uppercase tracking-tight">Total</span>
                          <span className="text-[#8F2A1E] font-black text-3xl">${cartTotal}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          const newOrder = {
                            id: (Math.floor(Math.random() * 900) + 100).toString(),
                            client: 'Juan Invitado',
                            items: cart.map(i => ({ name: i.nombre, qty: i.qty })),
                            status: 'pending',
                            time: 'Justo ahora',
                            total: cartTotal,
                            driverId: null
                          };
                          setOrders(prev => [newOrder as any, ...prev]);
                          setCart([]);
                          setIsCheckoutOpen(false);
                          setClientModule('MIS_PEDIDOS');
                        }}
                        className="w-full bg-[#DF8B42] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        Confirmar Compra
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          );
        }
        if (clientModule === 'MIS_PEDIDOS') return <div className="pt-4 px-4 sm:px-0 text-left">{renderClientPedidos()}</div>;
        if (clientModule === 'MI_PERFIL') return <div className="pt-4 px-4 sm:px-0">{renderClientProfile()}</div>;
        return null;
      default:
        return null;
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
                  Monty Tacos
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
                  { id: 'REPARTIDORES', icon: <Truck size={20} /> },
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
            ) : currentRole === 'COCINA' ? (
              <>
                {[
                  { id: 'PEDIDOS', icon: <ClipboardList size={20} />, label: 'Pedidos' },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setKitchenModule(mod.id as KitchenModule)}
                    className={`flex flex-1 items-center justify-center p-2.5 rounded-xl transition-all ${
                      kitchenModule === mod.id 
                        ? 'bg-[#F5DD9F] text-[#8F2A1E] shadow-lg scale-110 -translate-y-1' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {mod.icon}
                  </button>
                ))}
              </>
            ) : currentRole === 'REPARTIDOR' ? (
              <>
                {[
                  { id: 'PENDIENTES', icon: <Package size={20} />, label: 'Entregas' },
                  { id: 'FINALIZADAS', icon: <ClipboardList size={20} />, label: 'Historial' },
                  { id: 'COMISIONES', icon: <DollarSign size={20} />, label: 'Dinero' },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setDriverModule(mod.id as DriverModule)}
                    className={`flex flex-1 items-center justify-center p-2.5 rounded-xl transition-all ${
                      driverModule === mod.id 
                        ? 'bg-[#F5DD9F] text-[#8F2A1E] shadow-lg scale-110 -translate-y-1' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {mod.icon}
                  </button>
                ))}
              </>
            ) : (
              <>
                {[
                  { id: 'MENU', icon: <Utensils size={20} />, label: 'Menú' },
                  { id: 'MIS_PEDIDOS', icon: <ShoppingBag size={20} />, label: 'Pedidos' },
                  { id: 'MI_PERFIL', icon: <User size={20} />, label: 'Perfil' },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setClientModule(mod.id as ClientModule)}
                    className={`flex flex-1 items-center justify-center p-2.5 rounded-xl transition-all ${
                      clientModule === mod.id 
                        ? 'bg-[#F5DD9F] text-[#8F2A1E] shadow-lg scale-110 -translate-y-1' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {mod.icon}
                  </button>
                ))}
              </>
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

