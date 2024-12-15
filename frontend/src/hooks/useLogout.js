import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  const logout = () => {
    //remove use from localstorage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" }); //updating the global state for the user
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
