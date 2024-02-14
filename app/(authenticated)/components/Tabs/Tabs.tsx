'use client';

import { useState } from 'react';
import CostCenterCreateForm from '../../financial/cost-center/_components/CostCenterCreateForm';
import CostCenterList from '../../financial/cost-center/_components/CostCenterList';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // Definição das tabs e seus conteúdos
  const tabs = [
    { label: 'Profile', content: <CostCenterList /> },
    { label: 'Dashboard', content: 'Conteúdo da página de dashboard.' },
    { label: 'Settings', content: 'Conteúdo da página de configurações.' },
    { label: 'Contacts', content: 'Conteúdo da página de contatos.' },
  ];

  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <li key={index} className="me-2">
            <a
              href="#"
              onClick={() => handleTabChange(index)}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === index
                  ? 'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500'
                  : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Renderização do conteúdo da tab ativa */}
      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  );
}
