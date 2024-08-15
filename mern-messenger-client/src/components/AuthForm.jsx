import React, { useEffect, useState } from "react";

const AuthForm = ({ buttonText, getAuthCredentials, errorFromServer }) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!username.trim().length) {
      setUsernameError(true);
      setUsernameErrorMessage("Username can not be empty");
      isValid = false;
    } else if (username.trim().length < 3 || username.trim().length > 10) {
      setUsernameError(true);
      setUsernameErrorMessage("Username should be between 3 to 10 characters");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.length) {
      setPasswordError(true);
      setPasswordErrorMessage("Password can not be empty");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password should be equal or more than 6 characters"
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (isValid) {
      getAuthCredentials({ username, password });
    }
  };

  return (
    <form
      className="bg-white shadow-md px-4 py-5 rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          className={`border rounded-md py-2 px-3 mt-2 outline-none focus:ring ${
            usernameError ? "ring ring-red-300" : "ring-slate-100"
          }  ring-offset-1`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          name="username"
          autoComplete="off"
        />
        {usernameError && (
          <span className="text-red-500 text-sm mt-1">
            {usernameErrorMessage}
          </span>
        )}
      </div>
      <div className="flex flex-col mt-3">
        <label htmlFor="password">Password</label>
        <input
          className={`border rounded-md py-2 px-3 mt-2 outline-none focus:ring ${
            passwordError ? "ring ring-red-300" : "ring-slate-100"
          }  ring-offset-1`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          autoComplete="off"
        />
        {passwordError && (
          <span className="text-red-500 text-sm mt-1">
            {passwordErrorMessage}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="text-blue-950 border border-blue-950 w-full mt-3 p-2 rounded-md font-semibold"
      >
        {buttonText}
      </button>
      {errorFromServer && (
        <span className="text-red-500 text-sm mt-1">{errorFromServer}</span>
      )}
    </form>
  );
};

export default AuthForm;
