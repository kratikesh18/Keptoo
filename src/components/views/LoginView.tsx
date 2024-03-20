"use client";

import { signIn } from "next-auth/react";

function LoginView() {
  return (
    <div className="w-full flex justify-center mt-4 ">
      You are not logged in please log in first
      <button onClick={() => signIn("google")} type="button">
        Login
      </button>
    </div>
  );
}

export default LoginView;
