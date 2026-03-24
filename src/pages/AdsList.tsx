import { Megaphone, RefreshCw } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';

// Precisamos manter os dados (mesmo que mockados por enquanto) para a tabela renderizar
const mockAdsResponse = {
  success: true,
  data: [
    { id: "act_123456789", name: "Conta Principal - Marketing", account_status: 1, currency: "BRL" },
    { id: "act_987654321", name: "Cliente Alpha - Promo", account_status: 1, currency: "BRL" },
  ]
};

export default function AdsList() {
  // TODO MUNDO PRECISA DO RETURN
  return (
    <AppLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-center sm:text-left">Contas de Anúncios Meta</h1>
          <p className="text-gray-500 text-center sm:text-left">Gerencie suas contas integradas.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors">
          <RefreshCw size={18} />
          <span>Sincronizar</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 whitespace-nowrap">Conta</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 whitespace-nowrap">Moeda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockAdsResponse.data.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 flex items-center space-x-3">
                    <Megaphone size={16} className="text-blue-500" />
                    <span>{account.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{account.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      account.account_status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {account.account_status === 1 ? 'Ativa' : 'Desativada'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-mono">{account.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}