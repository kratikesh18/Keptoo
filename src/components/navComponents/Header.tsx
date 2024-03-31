import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { getServerSession } from "next-auth";


async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-gray-300  py-3 px-6 flex justify-between items-center">
      <Link href={"/"}>Keptooo</Link>
      <div className="flex gap-4 items-center">
        {session && (
          <>
            Hello, {session?.user?.name}
            <LogoutButton />
          </>
        )}
        {!session && (
          <>
            Not logged in
            <LoginButton />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
