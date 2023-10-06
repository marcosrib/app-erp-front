'use client'
import React, { createContext, useContext, useState } from 'react';

type  Props = {
  children: React.ReactNode
}
type ModalContextType = {
  isOpen: boolean;
  toggleModal: () => void;
}

const ModalContext = createContext({} as ModalContextType); 

export const ModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};