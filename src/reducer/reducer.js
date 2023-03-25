export const state = {
  badAnswers: [],
};

export function reducer(state, action) {
  console.log('receive reducer', {
    state,
    action,
  });
  switch (action.type) {
    case 'ADD_BAD_ANSWER':
      return {
        ...state,
        badAnswers: [...state.badAnswers, { ...action.payload }],
      };
    default:
      return state;
  }
}
