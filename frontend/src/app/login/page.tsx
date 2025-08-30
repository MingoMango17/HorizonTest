import React from "react";

const Login = () => {
  const inputStyle =
    "w-full border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-transparent";
  return (
    <div className="flex justify-center mt-30 mx-auto w-full max-w-md">
      <div className="">
        <div className="mb-8">
          <span className="text-3xl font-bold text-white">
            Sign in to your account
          </span>
        </div>
        <form action="">
          <div className="space-y-6">
            <div className="">
              <label htmlFor="username" className="mb-2 block">
                Username:{" "}
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block">
                Password:{" "}
              </label>
              <input
                id="password"
                type="text"
                placeholder="Password"
                className={inputStyle}
              />
            </div>
            <button className="bg-[#6C63FF] w-full px-4 py-3 rounded-lg">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
