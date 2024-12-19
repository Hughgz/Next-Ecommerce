import axios from "axios";
import { variables } from "./variables.js";
import jwtDecode from "jwt-decode";

const API_URL = variables.CUSTOMER_API;
const API_URL_AUTHEN = variables.AUTHEN_API;
const API_URL_CART = variables.CART_API;
const API_URL_CART_ITEM = variables.CART_ITEM_API;

const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getUser = async (userId) => {
  console.log("userId", userId);
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

const createUser = async (user) => {
  const response = await axios.post(`${API_URL_AUTHEN}/register`, user);
  return response.data;
};

const updateUser = async (userId, user) => {
  const response = await axios.put(`${API_URL}/${userId}`, user);
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
};

const login = async (loginData) => {
  try {
    // Gửi yêu cầu login
    const response = await axios.post(
      `${API_URL_AUTHEN}/login-customer`,
      loginData
    );

    // Kiểm tra nếu token tồn tại
    const token = response.data?.token;
    const customer = response.data?.customer;

    if (token && customer?.customerID) {
      const userId = customer.customerID;

      // Cập nhật giỏ hàng từ sessionStorage nếu có
      await updateCartItems(userId);

      // Trả về thông tin người dùng và token
      return { token, userId };
    } else {
      console.error("Login response is invalid:", response.data);
      return { token: null, userId: null };
    }
  } catch (error) {
    // Xử lý lỗi
    if (error.response?.status === 401) {
      alert("Invalid email or password");
    } else {
      alert("An error occurred during login");
    }
    console.error("Login error:", error.response || error.message);
    return { token: null, userId: null };
  }
};

// Hàm cập nhật giỏ hàng
const updateCartItems = async (userId) => {
  try {
    // Lấy dữ liệu từ sessionStorage
    const data = sessionStorage.getItem("cartItems");

    if (data) {
      const cartItems = JSON.parse(data).map((item) => ({
        customerId: userId,
        productSizeID: item.productSizeID,
        quantity: item.quantity,
      }));

      if (cartItems.length === 0) {
        console.log("No cart items to update.");
        return;
      }

      // Gửi yêu cầu cập nhật giỏ hàng
      const response = await axios.post(
        `${API_URL_CART_ITEM}/updateSession`,
        cartItems,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Cart update response:", response.data);
    } else {
      console.log("No cart items found in sessionStorage.");
    }
  } catch (error) {
    // Xử lý lỗi
    if (error.response) {
      console.error("Cart update error response:", error.response.data);
    } else {
      console.error("Cart update error message:", error.message);
    }
  }
};


export default {
  login,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
