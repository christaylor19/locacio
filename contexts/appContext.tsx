import { createContext, Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';

interface ContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<ContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

interface Props {
  children: ReactElement;
}

const AppContextProvider: FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
