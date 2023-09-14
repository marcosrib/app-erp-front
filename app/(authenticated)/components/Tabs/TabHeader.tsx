"use client"
import { ReactNode } from "react";
import { useTabs } from "../../contexts/TabContext";

type Props = {
    label: string,
    active: boolean,
    onClick: () => void,
    children: ReactNode
}

export function TabHeader({label, children}) {
    const { activeTab, setActiveTab } = useTabs();
  
    const handleTabClick = () => {
        setActiveTab(label);
    };

    return (
        <div>
         <div className="flex"> 
          <div
            className={`py-2 px-6 cursor-pointer rounded-t-lg text-blue-500 border-t-2 border-r-2 border-l-2 bg-white
                    `}
                onClick={handleTabClick}
            >
            {label}
          </div>
          </div>
            <div className="p-4">
                <p className="text-lg font-semibold">{activeTab === label ? label: ''}</p>
                {activeTab === label ? children : ''}
            </div>
        </div>
    );
  }