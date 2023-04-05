import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
  let navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isRegisterd, setRegisterd] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const errors = {
    uname: "invalid username",
    uemail: "invalid useremail",
    uphone: "invalid uphone",
    pass: "password must be at least 8 characters long",
    confirmpass: "confirm password doe's not match",
  };

  
  const handleCreateNewUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var { uname, uemail, uphone, pass, confirmpass } = document.forms[0];

    if (isRegisterd) {
      if (!uname.value) {
        setErrorMessages({ name: "uname", message: errors.uname });
      } else if (!uemail.value) {
        setErrorMessages({ name: "uemail", message: errors.uemail });
      } else if (!uphone.value) {
        setErrorMessages({ name: "uphone", message: errors.uphone });
      } else if (pass.value.length < 8) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else if (pass.value != confirmpass.value) {
        setErrorMessages({ name: "confirmpass", message: errors.confirmpass });
      } else {
        handleCreateNewUser();

        alert("Registation is successfully completed");
        setRegisterd(false);
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users")) ?? [];
      const userData = users.find((user) => user.username === uname.value);
      if (userData) {
        if (userData.password !== pass.value) {
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          navigate("./dashboard");
        }
      } else {
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>username </label>
          <input
            type="text"
            name="uname"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          {renderErrorMessage("uname")}
        </div>

        {isRegisterd ? (
          <>
            <div className="input-container">
              <label>email </label>
              <input type="email" name="uemail" required />
              {renderErrorMessage("uemail")}
            </div>
            <div className="input-container">
              <label>phone </label>
              <input type="number" name="uphone" required />
              {renderErrorMessage("uphone")}
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
          {renderErrorMessage("pass")}
        </div>

        {isRegisterd ? (
          <>
            <div className="input-container">
              <label>confirm password </label>
              <input type="password" name="confirmpass" required />
              {renderErrorMessage("confirmpass")}
            </div>
          </>
        ) : null}

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>

      {isRegisterd ? (
        <label>alredy registered?</label>
      ) : (
        <label>registered the user</label>
      )}
      <div>
        <button
          onClick={() => {
            setRegisterd(isRegisterd ? false : true);
          }}
        >
          {isRegisterd ? "sign In" : "sign Up"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
};
export default Login;
