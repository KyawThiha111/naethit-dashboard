import { authApi } from "@/api/endpoints/auth.api";
import { createSlice } from "@reduxjs/toolkit";

// Define the shape of the initial state
interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    systemLogout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          state.accessToken = action.payload.loginToken;
          state.isAuthenticated = !!action.payload.loginToken;
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.resetPassword.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          state.accessToken = action.payload.loginToken;
          state.isAuthenticated = !!action.payload.loginToken;
        }
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    });
  },
});

export const { systemLogout } = authSlice.actions;

export default authSlice.reducer;
