// src/components/AppLayout.tsx
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom'; // 1. Importe o Outlet

export default function AppLayout() { // 2. Remova a prop children
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Mobile */}
        <header className="flex h-16 items-center border-b bg-white px-4 lg:hidden">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Menu size={28} />
          </button>
          <span className="ml-4 font-bold text-gray-800 text-lg">Marketing Data</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            {/* 3. Substitua {children} por <Outlet /> */}
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
}