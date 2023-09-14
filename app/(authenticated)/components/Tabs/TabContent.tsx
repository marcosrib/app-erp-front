'use client'
import { ReactNode } from "react";
import { useTabs } from "../../contexts/TabContext";

type Props = {
    children: {
        [key: number]: ReactNode;
    };
}
export function TabContent({children}: Props) {
    const { activeTab } = useTabs();    
    return (
        <div className="p-4">
         {children[activeTab]}
        </div>
    )
}