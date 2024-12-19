'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Import useRouter
import { getUser, login, logout } from "../../store/actions/userActions";
import { selectCurrentUser, selectToken, setUser } from "../../store/reducers/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  const loginHandler = async (loginData) => {
  // Lấy kết quả từ login
  const { payload } = await dispatch(login(loginData)); // payload là { token, userId }

  const userId = payload?.userId; // Đảm bảo lấy đúng userId từ payload
  const token = payload?.token;

  if (!userId) {
    console.error("Login failed: userId is undefined.");
    return null;
  }

  // Gọi API để lấy thông tin người dùng
  const { payload: user } = await dispatch(getUser(userId));
  if (user) {
    dispatch(setUser(user)); // Lưu thông tin người dùng vào Redux state
  }

  return user;
};

  
  const isLoggedIn = () => !!token;

  useEffect(() => {
    if (token && !currentUser) {
      dispatch(getUser(token));
    }
  }, [token, currentUser, dispatch, router]);

  return { login: loginHandler, isLoggedIn, token, currentUser, logout: () => dispatch(logout()) };
};
