import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/user/userSlice";

const rootReducer = combineReducers({
    user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
