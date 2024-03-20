import Boards from "@/components/Boards";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";

import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginView />;
  }

  return (
    <div className=" ">
      <h1 className="text-2xl font-semibold">Your Boards</h1>
      <div>
        <Boards />
      </div>

      <div>
        <Link
          className="bg-purple-800 text-white py-2 px-3 flex rounded-md  gap-2 items-center "
          href={"/new-board"}
        >
          Create New Board
          <FontAwesomeIcon icon={faArrowRight} className="h-4" />
        </Link>
      </div>

    </div>
  );
}
