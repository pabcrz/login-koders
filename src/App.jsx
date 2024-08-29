/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { login, connection } from "./api";

// Components
import Input from "./components/Input";

function App() {
  const [logIn, setLogin] = useState(false);

  useEffect(() => {
    connection()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to connect to the server");
      });
  });

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid, isSubmitted },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      // convert response to json
      const result = await response.json();
      console.log(result);
      // get token from response and store it in local storage
      const token = result.data.token;
      localStorage.setItem("token", token);

      // localStorage.setItem("token", result.data.token);
      setLogin(true);
      toast.success("Login successful");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <main className="w-full min-h-screen-sm flex flex-col">
        <section className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-4">
          <h1 className="bg-gradient-to-bl from-blue-500 to-purple-700 text-transparent bg-clip-text font-bold text-3xl text-center">
            Inicio de Sesion
          </h1>
          <form
            className="flex gap-1 justify-center flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="flex justify-between">
              Email:
              {errors.email && (
                <span className=" text-red-400 text-sm font-semibold">
                  {errors.email?.message}
                </span>
              )}
            </label>
            <input
              type="email"
              placeholder="Type your email"
              required
              className="focus:outline-none rounded p-1 px-2 bg-slate-700 mb-2"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                minLength: { value: 6, message: "Email is too short" },
                maxLength: { value: 50, message: "Email is too long" },
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: "Email format is invalid",
                },
              })}
            />

            <label className="flex justify-between">
              Password:
              {errors.password && (
                <span className=" text-red-400 text-sm font-semibold">
                  {errors.password?.message}
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="Type your password"
              required
              className="focus:outline-none rounded p-1 px-2 bg-slate-700 mb-2"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: { value: 8, message: "Password must have 8 chars" },
                maxLength: { value: 50, message: "Password is too long" },
              })}
            />

            <button
              className="border border-green-700 hover:shadow-none p-1 hover:bg-green-700 rounded my-4 disabled:bg-slate-400"
              disabled={isSubmitted ? !isValid : false}
            >
              Login
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
