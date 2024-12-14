import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext(); //grabbing the dispatch function from the context

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null); //setting the error to null before running the because we dont want to show the error if the user want to rectify the error when they are running the second time

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json)); //saving the email and the token in the storage which is the response for the api call
      dispatch({ type: "LOGIN", payload: json }); //for logging in
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
