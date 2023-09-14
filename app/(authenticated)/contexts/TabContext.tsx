"use client"
import React, { createContext, useContext, useState } from 'react';


type Props = {
  children: React.ReactNode;
};

type TabContextType = {
    activeTab: number;
    setActiveTab: (index: number) => void; 
};
   
const TabsContext = createContext({} as TabContextType);

export function TabsProvider({ children }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}