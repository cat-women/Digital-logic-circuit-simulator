import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResult } from '../actions/result';
const MethodContext = createContext();

export const MethodProvider = ({ children }) => {
     const [method, setMethod] = useState('sop');
     const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
     const [userExpression, setUserExpression] = useState(['1', '2']);
     const [variables, setVariables] = useState(['A', 'B']);
     const [booleanExpression, setBooleanExpression] = useState(null)
     const [userHistory, setUserHistory] = useState(useSelector(state => state.results))


     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(getResult())
     }, [booleanExpression, userExpression])


     return (
          <MethodContext.Provider value={{ method, setMethod, user, setUser, userExpression, setUserExpression, variables, setVariables, booleanExpression, setBooleanExpression, userHistory, setUserHistory }}>
               {children}
          </MethodContext.Provider>
     );
};

export const useMethod = () => {
     return useContext(MethodContext);
};
