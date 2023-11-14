import { createContext, useContext, useState } from 'react';

const MethodContext = createContext();

export const MethodProvider = ({ children }) => {
     const [method, setMethod] = useState('sop');
     const [user, setUser] = useState(null);
     const [userExpression, setUserExpression] = useState(['1', '2']);
     const [variables, setVariables] = useState(['A', 'B']);


     return (
          <MethodContext.Provider value={{ method, setMethod, user, setUser, userExpression, setUserExpression, variables, setVariables }}>
               {children}
          </MethodContext.Provider>
     );
};

export const useMethod = () => {
     return useContext(MethodContext);
};
