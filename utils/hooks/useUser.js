'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Import useRouter
import { getUser, login, logout } from "../../store/actions/userActions";
import { selectCurrentUser, selectToken, setUser } from "../../store/reducers/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Khởi tạo router
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  const loginHandler = async (loginData) => {
    const { payload: userId } = dispatch(login(loginData));
    const { payload: user } = dispatch(getUser(userId));
    if (user) {
      dispatch(setUser(user));
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
