export const state = {
  badAnswers: [],
  speechDone: false,
  tentativeTranscript: '',
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
    case 'RESET_REPORT':
      return {
        ...state,
        badAnswers: [],
      };

    default:
      return state;
  }
}
