import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Chatt = ({ children }: Props) => {
  return <div className="Chatt">{children}</div>;
};

export default Chatt;