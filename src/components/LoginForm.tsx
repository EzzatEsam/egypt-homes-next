"use client";
import { useState } from "react";
import LogoBig from "./LogoBig";
import { loginAction } from "@/app/actions";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await loginAction(email, password);
    if (!result.success) {
      setErrors(result.errors ?? []);
      return;
    } else {
      console.log("Login success");
      router.push("/");
    }
  };
  return (
    <div className="flex items-center justify-center mt-8   ">
      <form className="max-w-md mx-auto space-y-6 " onSubmit={handleSubmit}>
        <LogoBig />
        <div className="text-center text-xl">Sign in to your account</div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            name="email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
          />
        </label>
        {errors.map((error) => (
          <div className="alert alert-error" key={`err-${error}`}>
            {error}
          </div>
        ))}
        <button className="btn btn-primary w-full">Sign in</button>
        <div className="text-center">
          Don't have an account?{" "}
          <a href="/signup" className="link">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}