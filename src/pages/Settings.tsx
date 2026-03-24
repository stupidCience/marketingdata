import { useState } from 'react';
import { User, Building2, Bell, ShieldCheck, Save } from 'lucide-react';


export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'notifications'>('profile');

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500">Gerencie as preferências da sua conta e da sua empresa.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navegação Lateral de Configurações */}
        <aside className="w-full lg:w-64 space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-blue-600'
            }`}
          >
            <User size={18} />
            <span>Perfil Pessoal</span>
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'company' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-blue-600'
            }`}
          >
            <Building2 size={18} />
            <span>Minha Empresa</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-blue-600'
            }`}
          >
            <Bell size={18} />
            <span>Notificações</span>
          </button>
        </aside>

        {/* Conteúdo da Aba */}
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-gray-900">Informações do Perfil</h3>
                <p className="text-sm text-gray-500">Atualize os seus dados de acesso.</p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nome Completo</label>
                  <input type="text" defaultValue="João Vitor Andrade" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input type="email" defaultValue="joao@exemplo.com" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="pt-4">
                <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-shadow shadow-md">
                  <Save size={18} />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-gray-900">Dados da Agência</h3>
                <p className="text-sm text-gray-500">Configurações globais para todos os usuários da empresa.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nome da Organização</label>
                <input type="text" defaultValue="WSA Marketing Digital" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none" />
              </div>

              <div className="rounded-lg bg-blue-50 p-4 flex items-start space-x-3 border border-blue-100">
                <ShieldCheck className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-bold text-blue-900">Plano Pro Ativo</p>
                  <p className="text-xs text-blue-700">A sua agência tem acesso ilimitado a conectores de dados.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
             <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell size={48} className="text-gray-200 mb-4" />
                <h3 className="text-lg font-bold text-gray-900">Em breve</h3>
                <p className="text-sm text-gray-500 max-w-xs">Estamos a trabalhar num sistema de alertas inteligentes para as tuas campanhas.</p>
             </div>
          )}
        </div>
      </div>
    </>
  );
}