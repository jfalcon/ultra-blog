import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// nothing to see here, it's just a proxy
export default function RootLayout({children}: Props) {
  return children;
}
