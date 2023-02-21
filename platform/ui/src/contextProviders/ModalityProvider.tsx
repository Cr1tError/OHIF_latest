import { createContext, useState } from 'react';
import React from 'react';

interface IContext {
  currentModality: string;
  setCurrentModality: (modality: string) => void;
}

export const ModalityContext = createContext<IContext>({
  currentModality: 'null',
  setCurrentModality: () => {},
});

export const ModalityProvider = ({ children }: any) => {
  const [currentModality, setCurrentModality] = useState<string>('null');
  const value = { currentModality, setCurrentModality };
  return (
    <ModalityContext.Provider value={value}>
      {children}
    </ModalityContext.Provider>
  );
};
