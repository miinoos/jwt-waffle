import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout(); //grabbing the function from custome hook
  const { user } = useAuthContext(); //to get access to the user email
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            //conditionally rendering the navbar because user is null at the start
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
              {/* button to delete the local storage and reset the global storage of the user variable */}
            </div>
          )}
          {!user && (
            <div>
              {/* Adding 2 more links for login and signup in the navbar */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Singup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
