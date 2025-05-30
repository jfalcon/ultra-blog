'use client';

import { createContext } from 'react';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';

interface CustomContext {
  isSomething: boolean;
  toggleSomething: () => void;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const CustomContext = createContext<CustomContext | null>(null);

////////////////////////////////////////////////////////////////////////////////////////////////////

export const CustomProvider = ({ children }: PropsWithChildren) => {
  const [isSomething, setIsSomething] = useState(true);
  const toggleSomething = () => setIsSomething(!isSomething);

  return (
    <CustomContext.Provider value={{ isSomething, toggleSomething }}>
      {children}
    </CustomContext.Provider>
  );
};

export default CustomProvider;

////////////////////////////////////////////////////////////////////////////////////////////////////
