import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/userActions";

// Giá trị ban đầu không truy cập vào `localStorage`
const initialState = {
  currentUser: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("currentUser")) : null,
  token: typeof window !== 'undefined' ? localStorage.getItem("token") : "",
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      if (typeof window !== "undefined") {
        // Chỉ gọi localStorage khi ở client-side
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
      }
      state.currentUser = null;
      state.token = "";
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.token;
        state.currentUser = action.payload.customer;

        if (typeof window !== "undefined") {
          // Lưu vào localStorage
          localStorage.setItem(
            "currentUser",
            JSON.stringify(action.payload.customer)
          );
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.token = "";
        state.currentUser = null;

        if (typeof window !== "undefined") {
          // Xóa localStorage khi đăng nhập thất bại
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
        }
      });
  },
});

export const { logout, setUser, setLoading, setError } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
