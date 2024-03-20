"use server";
import AccessEmailsList from "@/components/AccessEmailsList";
import NewBoardAccessForm from "@/components/formComponents/NewBoardAccessForm";
import { liveBlocksClient } from "@/lib/liveBlockClient";
import { getUserEmail } from "@/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface PageProps {
  params: {
    boardId: string;
  };
}
async function BoardSettings({ params }: PageProps) {
  const { boardId } = params;
  const boardInfo = await liveBlocksClient.getRoom(boardId);
  const userEmail = await getUserEmail();
  
  if (!boardInfo.usersAccesses[userEmail]) {
    return "UnAuthorized Access";
  }
  return (
    <div>
      <Link
        href={`/boards/${boardId}`}
        className="inline-flex items-center gap-2 mb-3 bg-gray-400/40 px-3 py-1 rounded-lg"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Go back to Board</span>
      </Link>
      <h1 className="font-semibold text-xl">
        Access to Board : {boardInfo.metadata.boardName}
      </h1>
      <div className="w-fit ">
        <AccessEmailsList
          boardId={boardId}
          emails={Object.keys(boardInfo.usersAccesses)}
        />
      </div>
      <NewBoardAccessForm boardId={boardId} />
    </div>
  );
}

export default BoardSettings;
