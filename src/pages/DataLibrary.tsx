import { useState, useEffect } from 'react';
import { Database, RefreshCw, Download, AlertCircle } from 'lucide-react';
import api from '../services/api';

interface CampaignMetric {
  id: number;
  provider: string;
  account_id: string;
  campaign_id: string;
  campaign_name: string;
  date: string;
  currency: string;
  spend: number;
  impressions: number;
  clicks: number;
}

export default function DataLibrary() {
  const [metrics, setMetrics] = useState<CampaignMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/meta/metrics');
      if (response.data.success) {
        setMetrics(response.data.data || []);
      }
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError('Não foi possível carregar a biblioteca de dados.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // O nosso "Botão Mágico" que aciona o robô no Back-end!
  const handleSyncData = async () => {
    setIsSyncing(true);
    setError('');
    try {
      // Passamos o payload vazio {} e a configuração de timeout de 2 minutos
      await api.post('/meta/sync-metrics', {}, { timeout: 120000 }); 
      
      alert('Sincronização concluída com sucesso! Atualizando tabela...');
      await fetchMetrics(); // Recarrega a tabela com os dados novos
    } catch (err: any) {
      console.error("Erro na sincronização:", err);
      setError(err.response?.data?.message || 'Erro ao sincronizar dados com as integrações.');
    } finally {
      setIsSyncing(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency || 'BRL' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    // A Meta devolve YYYY-MM-DD. Vamos formatar para DD/MM/YYYY
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="text-blue-600" />
            Biblioteca de Dados
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Visualize os dados brutos extraídos das suas integrações.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4 text-gray-500" />
            Exportar CSV
          </button>
          <button 
            onClick={handleSyncData}
            disabled={isSyncing}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors w-full sm:w-auto"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Extraindo Dados...' : 'Sincronizar Agora'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Falha na operação</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : metrics.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Database className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum dado encontrado</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
              Sua biblioteca está vazia. Clique em "Sincronizar Agora" para extrair os dados das suas contas de anúncios conectadas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fonte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gasto</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Impressões</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cliques</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metrics.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(row.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {row.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={row.campaign_name}>
                      {row.campaign_name || row.campaign_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(row.spend, row.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {row.impressions.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {row.clicks.toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}