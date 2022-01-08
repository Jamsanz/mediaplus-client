import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import post from '@redux/slices/post';
import contact from '@redux/slices/contact';

const rootReducer = combineReducers({ counter, post, contact });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
