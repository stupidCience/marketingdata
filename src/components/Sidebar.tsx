import { Link, useLocation } from 'react-router-dom';

import { Home, PieChart, Cable, Briefcase, Settings, LogOut, X, Database } from 'lucide-react';
const navigation = [
  { name: 'Dashboard', href: '/home', icon: Home },
  { name: 'Meus Dashboards', href: '/dashboards', icon: PieChart, section: 'Análise' },
  { name: 'Biblioteca de Dados', href: '/data-library', icon: Database, section: 'Análise' },
  // Agrupando a parte de Gestão
  { name: 'Contas de Anúncios', href: '/ads-list', icon: Briefcase }, // <-- Nossa tela atual!
  { name: 'Integrações', href: '/integrations', icon: Cable },        // <-- Nossa tela do Modal!
  
  { name: 'Configurações', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-tight text-blue-400">MarketingData</h1>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => onClose()}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-800 p-4">
          <button className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}