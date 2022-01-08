import { IPost } from "../../../interfaces/IPosts";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IPost = {

};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action) => {
            return state = action.payload;
        },
        getPost: (state, action) => {
            return state;
        }
    }

});

export const { addPost, getPost } = postSlice.actions;
export const postSelector = (state: any) => state.post;

export default postSlice.reducer;
