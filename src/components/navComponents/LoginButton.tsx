"use client";
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button
      onClick={() => signIn()}
      className="bg-gray-400  text-black px-3 py-1 rounded-md"
    >
      Login
    </button>
  );
}

export default LoginButton;
