import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState(""); //to keep track of the values which is inputed in the form
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup(); //grabbing the custom hook which is made for the updatating of local storage and the auth context

  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent the default behaviour of refreshing the page
    // console.log(email, password);
    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>SignUp</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      {/* setting the value for the field with the value which is entered dynamically - two way data binding*/}

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      {/* setting the value for the field with the value which is entered dynamically - two way data binding*/}

      <button disabled={isLoading}>SingUp</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
