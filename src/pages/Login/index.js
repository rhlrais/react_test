import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import CustomButton from "../../component/button";

// Prevent unneccessary DOM re-rendering
const errors = {
  username: "invalid username",
  email: "invalid useremail",
  phone: "invalid phone number",
  password: "password must be at least 8 characters long",
  confirmPassword: "confirm password doe's not match",
};

const Login = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isRegistered, setIsRegistered] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateNewUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (isRegistered) {
        if (username?.length < 4) {
          setErrorMessages({ name: "username", message: errors.username });
        } else if (!email) {
          setErrorMessages({ name: "email", message: errors.email });
        } else if (phone?.length < 10) {
          setErrorMessages({ name: "phone", message: errors.phone });
        } else if (password?.length < 8) {
          setErrorMessages({ name: "password", message: errors.password });
        } else if (password !== confirmPassword) {
          setErrorMessages({
            name: "confirmPassword",
            message: errors.confirmPassword,
          });
        } else {
          handleCreateNewUser();

          alert("Registration is successfully completed");
          setIsRegistered(false);
        }
      } else {
        const users = JSON.parse(localStorage.getItem("users")) ?? [];
        const userData = users.find((user) => user.username === username);
        if (userData) {
          console.log({ userData });
          if (userData.password !== password) {
            setErrorMessages({ name: "password", message: errors.password });
          } else {
            localStorage.setItem("isUserLoggedIn", true);
            navigate("./dashboard");
          }
        } else {
          setErrorMessages({ name: "username", message: errors.username });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = useMemo(() => {
    return (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>username </label>
            <input
              type="text"
              name="uname"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {renderErrorMessage("username")}
          </div>

          {isRegistered ? (
            <>
              <div className="input-container">
                <label>email </label>
                <input
                  type="email"
                  name="uemail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {renderErrorMessage("email")}
              </div>
              <div className="input-container">
                <label>phone </label>
                <input
                  type="number"
                  name="uphone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {renderErrorMessage("phone")}
              </div>
            </>
          ) : null}

          <div className="input-container">
            <label>password </label>
            <input
              type="password"
              name="pass"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {renderErrorMessage("password")}
          </div>

          {isRegistered ? (
            <>
              <div className="input-container">
                <label>confirm password </label>
                <input
                  type="password"
                  name="confirmpass"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {renderErrorMessage("confirmPassword")}
              </div>
            </>
          ) : null}

          <div className="button-container">
            <CustomButton onClick={() => {}} title={"submit"}></CustomButton>
          </div>
        </form>

        {isRegistered ? (
          <label>alredy registered?</label>
        ) : (
          <label>registered the user</label>
        )}

        <CustomButton
          onClick={() => {
            setIsRegistered(isRegistered ? false : true);
          }}
          title={isRegistered ? "sign In" : "sign Up"}
        ></CustomButton>
      </div>
    );
  });

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {console.log("errorMessages", errorMessages)}
        {renderForm}
      </div>
    </div>
  );
};
export default Login;
