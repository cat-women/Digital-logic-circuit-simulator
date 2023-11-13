import { createContext, useContext, useState } from 'react';

const MethodContext = createContext();

export const MethodProvider = ({ children }) => {
     const [method, setMethod] = useState('sop');
     const [user, setUser] = useState(null);

     return (
          <MethodContext.Provider value={{ method, setMethod, user, setUser }}>
               {children}
          </MethodContext.Provider>
     );
};

export const useMethod = () => {
     return useContext(MethodContext);
};
