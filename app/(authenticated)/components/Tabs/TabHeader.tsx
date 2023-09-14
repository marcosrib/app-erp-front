'use client'
import { Children, ReactNode, cloneElement } from "react";
import { useTabs } from "../../contexts/TabContext";

type Props = {
    children: ReactNode
}

export function TabHeader({ children }: Props){
    const { setActiveTab } = useTabs();
    return (
        <div className="flex bg-blue">
           {Children.map(children, (child, index) =>
                cloneElement(child as React.ReactElement<any>, {
                onClick: () => setActiveTab(index),
              })
           )}
        </div>
    )
}