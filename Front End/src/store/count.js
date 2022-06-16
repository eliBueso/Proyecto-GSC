import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  count: 0
};

const countSlice = createSlice({
  name: 'count',
  initialState: initialAuthState,
  reducers: {
    count(state) {
      state.count++;
    }
  },
});

export const countActions = countSlice.actions;

export default countSlice.reducer;