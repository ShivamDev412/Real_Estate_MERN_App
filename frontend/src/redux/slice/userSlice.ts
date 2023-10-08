import { createSlice } from "@reduxjs/toolkit";
type CurrentUserType = {
  data: {
    token?: string;
    user: {
      avatar: string;
      email: string;
      id: string;
      username: string;
    };
  };
};
interface InitialStateProps {
  currentUser: CurrentUserType;
  loading: boolean;
}
const initialState: InitialStateProps = {
  currentUser: {
    data: {
      token: "",
      user: {
        avatar: "",
        email: "",
        id: "",
        username: "",
      },
    },
  },
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state) => {
      state.loading = false;
      state.currentUser = initialState.currentUser;
    },
  },
});
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
