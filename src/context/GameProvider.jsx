import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { state, reducer } from '../reducer/reducer';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [initialState, dispatch] = useReducer(reducer, state);
  return (
    <GameContext.Provider value={{ initialState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);

GameProvider.propTypes = {
  children: PropTypes.node,
};
