"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function LogoutButton() {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="bg-gray-400 inline-flex gap-2 items-center justify-center  text-black px-3 py-1 rounded-md"
      >
        Logout
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
}

export default LogoutButton;
