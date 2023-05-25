"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import cookies from "js-cookie";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

function UserProvider({ children }) {
  const [initialState, setInitialState] = useState({
    user: null,
  });

  useEffect(() => {
    setInitialState({ user: "Hello" });
    console.log(JSON.parse(cookies.get("mayak_finance_user")));
  }, []);

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    dispatch(initialState);
  }, [initialState]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
