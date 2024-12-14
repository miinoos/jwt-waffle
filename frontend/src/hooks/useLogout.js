import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove use from localstorage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" }); //updating the global state for the user
  };

  return { logout };
};
