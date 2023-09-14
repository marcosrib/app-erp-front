'use client'
import React, { useState } from "react";
 
export function Tabes() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      { label: "Tab rrrrrr", content: "Conteúdo da Tab 1" },
      { label: "Tab rrrrrr", content: "Conteúdo da Tab 2" },
      { label: "Tab rrrrrr", content: "Conteúdo da Tab 3" },
    ];
  
    return (
      <div className="w-3/3 mx-auto mt-8">
        <div >
          <div className="flex">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`py-2 px-6 cursor-pointer rounded-t-lg ${
                  activeTab === index
                    ? "text-blue-500 border-t-2 border-r-2 border-l-2 bg-white"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </div>
            ))}
          </div>
          <div className="p-4">
            <p className="text-lg font-semibold">{tabs[activeTab].label}</p>
            <p className="mt-2 text-gray-600">fnkrnkfkn</p>
          </div>
        </div>
        </div>
    );
}