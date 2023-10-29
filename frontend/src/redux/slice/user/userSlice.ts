import { createSlice } from "@reduxjs/toolkit";
type CurrentUserType = {
  data: {
    token?: string;
    user: {
      avatar: string;
      email: string;
      id: string;
      phoneNo:string,
      username: string;
      firstName: string;
      lastName: string;
      emailVerified:boolean,
      phoneNoVerified:boolean
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
        phoneNo:"",
        username: "",
        firstName: "",
        lastName: "",
        emailVerified:false,
        phoneNoVerified:false
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
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state) => {
      state.loading = false;
      // state.currentUser = initialState.currentUser;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.currentUser = initialState.currentUser;
    },
    deleteUserFailure: (state) => {
      state.loading = false;
    }
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;
export default userSlice.reducer;
