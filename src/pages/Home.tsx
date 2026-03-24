import { AppLayout } from '../components/AppLayout';
import { ArrowUpRight, TrendingUp, Users, Target, MousePointer2 } from 'lucide-react';

// Dados estáticos para dar vida à Home (Estático Primeiro)
const quickStats = [
  { label: 'Alcance Total', value: '124.500', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'CTR Médio', value: '2.4%', icon: MousePointer2, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Conversões', value: '850', icon: Target, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Investimento', value: 'R$ 4.200', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
];

export default function Home() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Olá, João! 👋</h1>
        <p className="text-gray-500">Aqui está o que aconteceu nas tuas campanhas nas últimas 24 horas.</p>
      </div>

      {/* Cards de Métricas Rápidas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {quickStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-hover hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`rounded-lg p-2 ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12% <ArrowUpRight size={12} className="ml-1" />
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Secção de Atalhos ou Novidades */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Próximos Passos</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900">Configurar novo Dashboard</p>
                <p className="text-xs text-gray-500">Cria uma visualização personalizada para o teu cliente Alpha.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
              <div className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
              <div>
                <p className="text-sm font-bold text-gray-900">Ligar Google Ads</p>
                <p className="text-xs text-gray-500">Expande os teus dados integrando a API do Google.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder para uma imagem ou gráfico simples de boas-vindas */}
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-2">Domina os teus dados</h3>
          <p className="text-blue-100 text-sm mb-6">
            O Marketing Data permite que transformes tabelas complexas em decisões estratégicas.
          </p>
          <button className="w-fit rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors">
            Ver Documentação
          </button>
        </div>
      </div>
    </AppLayout>
  );
}