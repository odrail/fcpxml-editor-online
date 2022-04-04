import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: String = 'output.fcpxml';

export const fileNameSlice = createSlice({
  name: 'fileName',
  initialState,
  reducers: {
    setFileName: (state, action: PayloadAction<String>) => action.payload,
  }
});

export const {
  setFileName,
} = fileNameSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectFileName = (state: RootState) => state.fileName;

// exporting the reducer here, as we need to add this to the store
export default fileNameSlice.reducer;