"use server";
import { liveBlocksClient } from "@/lib/liveBlockClient";
import { getUserEmail } from "@/lib/userClient";
import Link from "next/link";

import React from "react";

async function Boards() {
  const email = await getUserEmail();

  const { data: rooms } = await liveBlocksClient.getRooms({ userId: email });

  return (
    <div className="my-4 grid md:grid-cols-4 gap-2">
      {rooms?.length > 0 &&
        rooms.map((room) => (
          <Link
            href={`/boards/${room.id}`}
            key={room.id}
            className="block border p-4 rounded-md bg-gray-300"
          >
            {room.metadata.boardName}
          </Link>
        ))}
    </div>
  );
}

export default Boards;
