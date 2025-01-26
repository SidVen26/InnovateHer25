import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const SearchBar = ({ children }: Props) => {
  return <div className="SearchBar">{children}</div>;
};

export default SearchBar;