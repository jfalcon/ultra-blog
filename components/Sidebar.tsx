import type { FC, PropsWithChildren } from 'react';

// just showing how to do this with an arrow function
export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <aside>{children}</aside>
  );
};

export default Sidebar;
