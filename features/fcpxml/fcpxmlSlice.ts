import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import trovaESostituisciReducer, { TrovaESostituisciReducerPayload } from "./trovaESostituisciReducer";

export type FcpxmlState = {
  fcpxml: any
};
const initialState: FcpxmlState = {
  fcpxml: {}
};

export const fcpxmlSlice = createSlice({
  name: 'fcpxml',
  initialState,
  reducers: {
    setFcpxml: (state, action: PayloadAction<any>) => {
      state.fcpxml = action.payload
    },
    trovaESostituisci: trovaESostituisciReducer
  }
});

export const {
  setFcpxml,
  trovaESostituisci,
} = fcpxmlSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectFcpxml = (state: RootState) => state.fcpxml.fcpxml;

// exporting the reducer here, as we need to add this to the store
export default fcpxmlSlice.reducer;