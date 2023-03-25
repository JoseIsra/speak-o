import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { state, reducer } from '../reducer/reducer';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [initialState, dispatch] = useReducer(reducer, state);
  return (
    <ErrorContext.Provider value={{ initialState, dispatch }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);

ErrorProvider.propTypes = {
  children: PropTypes.node,
};
