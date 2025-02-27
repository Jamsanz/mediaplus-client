import { IStakeholder } from "../../../interfaces/IStakeholder";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/reducers";

const initialState: IStakeholder = {
  name: undefined,
  description: undefined,
  image: undefined
};

const stakeholderSlice = createSlice({
  name: "stakeholder",
  initialState,
  reducers: {
    addStakeholder: (state, action) => {
      return (state = action.payload);
    },
    getStakeholder: (state) => {
      return state;
    },
  },
});

export const { addStakeholder, getStakeholder } = stakeholderSlice.actions;
export const stakeholderSelector = (state: RootState) => state.stakeholder;

export default stakeholderSlice.reducer;
