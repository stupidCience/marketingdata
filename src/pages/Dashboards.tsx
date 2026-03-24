import { AppLayout } from '../components/AppLayout';
import { Plus, Layout as LayoutIcon, MoreVertical } from 'lucide-react';

export default function Dashboards() {
  return (
    <AppLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Dashboards</h1>
          <p className="text-gray-500">Visualize seus dados de marketing personalizados.</p>
        </div>
        <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-shadow shadow-md">
          <Plus size={18} />
          <span>Criar Dashboard</span>
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card de exemplo de um Dashboard criado */}
        <div className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <LayoutIcon size={24} />
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>
          <h3 className="font-bold text-gray-900">Performance Mensal Meta</h3>
          <p className="text-xs text-gray-500 mt-1">Última edição: Há 2 horas</p>
          
          <div className="mt-6 flex -space-x-2">
            {/* Mock de imagens de fontes de dados */}
            <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[8px] text-white font-bold">META</div>
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[8px] text-gray-500 font-bold">API</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}