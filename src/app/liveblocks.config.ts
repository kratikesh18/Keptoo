import { createClient } from "@liveblocks/client";
import { LiveList, LiveObject } from "@liveblocks/client";

import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
});

type Presence = {
  // cursor: { x: number, y: number } | null,
  // ...
};

// automatically persisted and synced to all connected clients.
// storage to store our columns
export type ColumnType = {
  name: string;
  id: string;
  index: number;
};

export type CardType = {
  name: string;
  id: string;
  index: number;
  columnId: string;
};

type Storage = {
  columns: LiveList<LiveObject<ColumnType>>;
  cards: LiveList<LiveObject<CardType>>;
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  };
};
type RoomEvent = {};

type ThreadMetadata = {
  cardId: string;
};
export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
  /* ...all the other hooks you’re using... */
} = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent,
  ThreadMetadata
  /* UserMeta, RoomEvent, ThreadMetadata */
>(client, {
  resolveUsers: async ({ userIds }) => {
    const params = new URLSearchParams(userIds.map((id) => ["ids", id]));
    const response = await fetch(`/api/users?${params.toString()}`);

    return await response.json()
  },
});

// publicApiKey: process.env.LIVEBLOCK_PUBLIC_API_KEY!,
