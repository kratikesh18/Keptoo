"use server";
import { liveBlocksClient } from "@/lib/liveBlockClient";
import { getUserEmail } from "@/lib/userClient";

import React from "react";
import { BoardCard } from "./BoardCard";

async function Boards() {
  const email = await getUserEmail();

  const { data: rooms } = await liveBlocksClient.getRooms({ userId: email });

  return (
    <div className="my-4 grid md:grid-cols-4 gap-2">
      {rooms?.length > 0 &&
        rooms.map((room) => <BoardCard key={room.id} BoardInfo={room} />)}
    </div>
  );
}

export default Boards;
