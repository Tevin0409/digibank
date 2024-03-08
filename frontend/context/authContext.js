import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export const AuthContext = createContext();
const TOKEN_KEY = "my-jwt";
export const API_URL = "http://192.168.1.9:8080/api";
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async (user) => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };
    loadToken();
    // }, 3000);
  }, []);

  const login = async (data) => {
    try {
      const result = await axios.post(
        "http://192.168.1.9:8080/api/auth/signin",
        data
      );

      setIsAuthenticated({
        token: result.data.accessToken,
        authenticated: true,
      });

      setUser({
        accountNumber: result.data.accountNumber,
        email: result.data.email,
        fullName: result.data.fullName,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync(
        TOKEN_KEY,
        JSON.stringify(result.data.accessToken)
      );

      return result;
    } catch (error) {
      // console.log(error);
      return { error: true, msg: error.response.data.message };
      // Alert.alert("Login Failed", error.response.data.detail);
    }
  };
  const balance = async () => {
    try {
      const result = await axios.get(
        "http://192.168.1.9:8080/api/account/balance"
      );

      // Update the account balance in the user object
      setUser({
        ...user,
        accountBalance: result.data.balance,
      });

      return result;
    } catch (error) {
      // console.log(error);
      return { error: true, msg: error.response.data.message };
    }
  };

  const deposit = async (amount) => {
    try {
      const result = await axios.post(`${API_URL}/account/deposit`, { amount });
      // Optionally update the user's balance in the state after a successful deposit
      setUser({
        ...user,
        accountBalance: result.data.balance,
      });
      return result;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const myCheques = async () => {
    try {
      const result = await axios.get(`${API_URL}/account/cheques`);
      return result;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const issueCheque = async (data) => {
    try {
      const result = await axios.post(`${API_URL}/account/issue-cheque`, data);
      return result;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const cancelCheque = async (chequeNumber) => {
    try {
      const result = await axios.post(`${API_URL}/account/cancel-cheque`, {
        chequeNumber,
      });
      return result;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const changePin = async (data) => {
    try {
      const result = await axios.post(`${API_URL}/auth/change-pin`, data);
      return result;
    } catch (error) {
      console.error("Error changing pin:", error);
      return { error: true, message: error.response.data.message };
    }
  };

  const register = async (data) => {
    try {
      return axios.post(`${API_URL}/auth/signup`, data);
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setIsAuthenticated({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    balance,
    deposit,
    changePin,
    myCheques,
    issueCheque,
    cancelCheque,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside authContextProvider");
  }
  return value;
};
