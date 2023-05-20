import {createSlice} from '@reduxjs/toolkit';

const initialStateObj = {
  first_name: null,
  last_name: null,
  email: null,
  image: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateObj,
  reducers: {
    setUserFirstNameAction: (state, {payload}) => {
      state.first_name = payload;
    },
    setUserLastNameAction: (state, {payload}) => {
      state.last_name = payload;
    },
    setEmailAction: (state, {payload}) => {
      state.email = payload;
    },
    setImageAction: (state, {payload}) => {
      state.image = payload;
    },
  },
});

export const {
  setUserFirstNameAction,
  setUserLastNameAction,
  setEmailAction,
  setImageAction,
} = userSlice.actions;

//it behave like connector (old redux)
export const userSelector = (state: { user: any; }) => state.user;

export default userSlice.reducer;
