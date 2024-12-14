import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext); //make a instance of the context api

  if (!context) {
    throw Error("useAuthsContext must be used inside an AuthContextProvider");
  } //checking if the auth context is being used outside the scope

  return context; //return the context which contains the state and dispatch from Auth Context
};
