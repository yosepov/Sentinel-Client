import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapOne: {},
  mapOneRef: {},
  mapTwoRef: {},
  mapTwo: {},
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMapOne: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.mapOne = action.payload;
    },
    setMapOneRef: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.mapOneRef = action.payload;
    },
    setMapTwoRef: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.mapTwoRef = action.payload;
    },
    setMapTwo: (state, action) => {
      state.mapTwo = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`

  },
});

export const { setMapTwo, setMapOne, setMapOneRef, setMapTwoRef } = mapSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.map.value)`
export const selectMapOne = (state) => state.map.mapOne;
export const selectMapOneRef = (state) => state.map.mapOneRef;
export const selectMapTwo = (state) => state.map.mapTwo;
export const selectMapTwoRef = (state) => state.map.mapTwoRef;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default mapSlice.reducer;
