import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  //   publicApiKey: process.env.LIVEBLOCK_PUBLIC_API_KEY!,
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

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  useSelf,
  useOthers,
  useRoom,
  /* ...all the other hooks you’re using... */
} = createRoomContext<
  Presence,
  Storage
  /* UserMeta, RoomEvent, ThreadMetadata */
>(client);

// import { createClient } from "@liveblocks/client";
// import { LiveList, LiveObject } from "@liveblocks/client";

// import { createRoomContext } from "@liveblocks/react";

// const client = createClient({
//   //   publicApiKey: process.env.LIVEBLOCK_PUBLIC_API_KEY!,
//   authEndpoint: "/api/liveblocks-auth",
//   throttle: 100,
// });

// type Presence = {
//   // cursor: { x: number, y: number } | null,
//   // ...
// };

// // automatically persisted and synced to all connected clients.
// // storage to store our columns
// export type ColumnType = {
//   name: string;
//   id: string;
//   index: number;
// };

// export type CardType = {
//   name: string;
//   id: string;
//   index: number;
//   columnId: string;
// };

// type Storage = {
//   columns: LiveList<LiveObject<ColumnType>>;
//   cards: LiveList<LiveObject<CardType>>;
// };

// export const {
//   RoomProvider,
//   useMyPresence,
//   useStorage,
//   useMutation,
//   useRoom,
//   useSelf,
//   useOthers,
//   /* ...all the other hooks you’re using... */
// } = createRoomContext<
//   Presence,
//   Storage
//   /* UserMeta, RoomEvent, ThreadMetadata */
// >(client);
