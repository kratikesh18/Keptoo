"use server";
import Board from "@/components/Board";
import { liveBlocksClient } from "@/lib/liveBlockClient";
import { getUserEmail } from "@/lib/userClient";

interface BoardPagePropsType {
  params: {
    boardId: string;
  };
}

async function BoardPage(props: BoardPagePropsType) {
  // getting the board id from the params
  const boardId = props.params.boardId;
  const email = await getUserEmail();

  //   getting the boardinformation
  const boardInfo = await liveBlocksClient.getRoom(boardId);

  const userAccess = boardInfo.usersAccesses?.[email];

  const hasAccess = userAccess && [...userAccess].includes("room:write");

  if (!hasAccess) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <Board id={boardId} name={boardInfo?.metadata?.boardName} />
    </div>
  );
}

export default BoardPage;
