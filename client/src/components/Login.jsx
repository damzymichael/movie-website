import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin }) => {
  const { signup, isLoading, error } = useSignup();
  const [signUp, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const validatePassword = () => {
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setPasswordError(true);
        return;
      }
      setPasswordError(false);
    }
    setPasswordError(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Working...");
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (passwordError) return;
    await signup(username, password);
    if (error) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return
    }
    setShowLogin(false)
    
  };
  return (
    <div className="login">
      <span onClick={() => setShowLogin(false)}>+</span>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={validatePassword}
        />
        {signUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyUp={validatePassword}
          />
        )}
        {passwordError && (
          <center className="error">Passwords do not match</center>
        )}

        {signUp ? (
          <button onClick={handleSignup} disabled={isLoading}>
            Sign up
          </button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}

        {error && alertVisible ? (
          <center className="error">{error}</center>
        ) : null}
      </form>
      <p>
        Don't have an account?
        <span className="signup" onClick={() => setSignup(true)}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
