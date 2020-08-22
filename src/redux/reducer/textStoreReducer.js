const initialState = {
  text: []
};

export default function textStoreReducer(state, action) {
  return state ? state : initialState;
}
