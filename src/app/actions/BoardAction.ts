"use server";
import { authOptions } from "@/lib/authOptions";
import { liveBlocksClient } from "@/lib/liveBlockClient";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { getServerSession } from "next-auth";
import uniqid from "uniqid";

export async function createBoard(name: string): Promise<false | RoomInfo> {
  const liveBlocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCK_SECRET!,
  });

  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toString();

  if (email) {
    const roomId = uniqid.time();
    return await liveBlocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ["room:write"],
      },
      metadata: { boardName: name },
    });
  }
  return false;
}
export async function addUserEmailToBoard(boardId: string, email: string) {
  const room = await liveBlocksClient.getRoom(boardId);
  const usersAccesses = room.usersAccesses;
  usersAccesses[email] = ["room:write"];

  await liveBlocksClient.updateRoom(boardId, { usersAccesses });
  return true;
}

export async function removeUserAccessEmail(boardId: string, email: string) {
  const room = await liveBlocksClient.getRoom(boardId);
  const usersAccesses: any = room.usersAccesses;
  usersAccesses[email] = null;

  await liveBlocksClient.updateRoom(boardId, {
    usersAccesses,
  });
  return true;
}

export async function deleteBoard(boardId: string) {
  await liveBlocksClient.deleteRoom(boardId);
  return true;
}

export async function updateBoard(boardId: string, updatedData: any) {
  const result = await liveBlocksClient.updateRoom(boardId, updatedData);
  return true;
}
