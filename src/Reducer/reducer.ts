export const defaultQuesStat = {
  isSelected: false,
  questionTableData: [],
};

export function reducer(state: any, action: any) {
  if (action.type === "COMPLETED") {
    return {
      ...state,
      isSelected: true,
      questionTableData: [] ,
      payload: console.log(state)
    };
  }
  return state;
}
