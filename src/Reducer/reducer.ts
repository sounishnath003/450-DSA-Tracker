export const defaultQuesStat = {
  isSelected: false,
  questionTableData: [],
};

enum Types {
  COMPLETED = "COMPLETED",
  RANDOM = "RANDOM",
}

export function reducer(state: any, action: any) {
  if (Types.COMPLETED === action.type) {
    return {
      ...state,
      isSelected: true,
      questionTableData: [],
      payload: action.payload,
    };
  } else if (action.type === Types.RANDOM) {
    return state;
  }
}
