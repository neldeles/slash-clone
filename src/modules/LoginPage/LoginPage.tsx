import { AuthenticatedApp } from "AuthenticatedApp";
import axios from "axios";
import { authService } from "modules/_common/services/auth-service";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

type TLoginCredentials = {
  username: string;
  password: string;
};

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = useMutation((credentials: TLoginCredentials) =>
    authService.login(credentials)
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };
    loginUser.mutate(credentials, {
      onError: (error) => {
        let message;
        if (axios.isAxiosError(error) && error.response) {
          message = JSON.stringify(error.response.data);
        } else message = String(error);
        setErrorMessage(message);
      },
    });
  };

  if (loginUser.isSuccess) {
    return <AuthenticatedApp />;
  }

  return (
    <>
      <div className="flex flex-col justify-center py-12 px-4 mx-auto max-w-sm h-screen">
        {errorMessage ? (
          <div className="p-4">
            <p role="alert" className="font-bold text-red">
              {errorMessage}
            </p>
          </div>
        ) : null}
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="relative">
            <input
              type="text"
              id="username"
              className="peer w-full h-10 text-lg font-bold placeholder:text-transparent text-black bg-transparent border-b-2 border-gray-400 focus:border-gray-400 focus:outline-none"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required={true}
            />
            <label
              htmlFor="username"
              className="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm text-gray-600 peer-focus:text-gray-600 peer-placeholder-shown:border-gray-400 transition-all cursor-text peer-focus:cursor-default"
            >
              username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              className="peer w-full h-10 text-lg font-bold placeholder:text-transparent text-black bg-transparent border-b-2 border-gray-400 focus:border-gray-400 focus:outline-none"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required={true}
            />
            <label
              htmlFor="password"
              className="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm text-gray-600 peer-focus:text-gray-600 peer-placeholder-shown:border-gray-400 transition-all cursor-text peer-focus:cursor-default"
            >
              password
            </label>
          </div>

          <div className="text-center">
            <Link
              to="/signup"
              className=" text-indigo-100 hover:text-indigo-200 hover:underline"
            >
              Create an account
            </Link>
          </div>

          <button
            type="submit"
            className="items-center py-3 px-6 w-full text-lg font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 shadow-sm"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
