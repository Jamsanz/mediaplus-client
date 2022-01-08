import { IUser } from "../../../interfaces/IUser";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  _id: undefined,
  name: undefined,
  phone: undefined,
  email: undefined,
  message: undefined,
  status: undefined,
  service: undefined
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      return state = action.payload;
    },
    getContact: (state, action) => {
      return state;
    }
  }
});

export const { addContact, getContact } = contactSlice.actions;
export const contactSelector = (state: any) => state.contact;

export default contactSlice.reducer;
