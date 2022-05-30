import React, { useState } from "react";
import { MdLockClock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../../utils/api";
import { Loader } from "../../components/Loader/Loader";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === "" || password === "") {
      setLoading(false);
      setError(false);
    }
    await axios
      .post(ENDPOINTS.authentication.signin, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("firstname", res.data.firstname);
        localStorage.setItem("lastname", res.data.lastname);
        setLoading(false);
        setError(false);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError(true);
      });
  };
  return (
    <div className=" overflow-auto h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-gray-900">
      <div className="max-w-4xl flex w-full space-y-8 bg-white  rounded-2xl shadow-lg shadow-indigo-300/20 dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
        <div className="hidden sm:block rounded-l-2xl bg-no-repeat object-cover bg-[url('https://res.cloudinary.com/westore/image/upload/v1653873436/onur-binay-auf3GwpVaOM-unsplash_j2qgg6.jpg')] w-full bg-indigo-600"></div>
        <div className="w-full p-14">
          <div className="text-center flex justify-center flex-wrap">
            <h2 className="mt-2 text-2xl font-bold text-slate-800 flex items-center dark:text-white">
              <MdLockClock className="text-indigo-600 text-5xl mr-1" /> Sign In
            </h2>
            <p className="mt-2 text-sm text-indigo-600 font-bold w-full">
              It's nice to see you back!
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-6 "
            action="#"
            method="POST"
          >
            {error ? (
              <p className="text-center text-sm text-red-600">
                Incorrect email/password
              </p>
            ) : (
              ""
            )}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4 ">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="dark:text-white dark:bg-slate-800 dark:border-slate-700 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white appearance-none  relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 dark:text-white"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                disabled={loading ? true : false}
                type="submit"
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? "bg-indigo-200"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                {loading ? <Loader /> : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
