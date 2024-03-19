"use client";
import React, { useState } from "react";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";

//creating temporary col data

export interface CardType {
  id: string;
  name: string;
  index: number;
  columnId: string;
}

const defaultCards = [
  { id: "awx", name: "task1", index: 0, columnId: "col1" },
  { id: "aww", name: "task2", index: 1, columnId: "col1" },
  { id: "aw5", name: "task3", index: 2, columnId: "col2" },
  { id: "aw3", name: "task4", index: 3, columnId: "col3" },
];

export default function Board({ id }: { id: string }) {
  const [cards, setCards] = useState(defaultCards);

  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{
        columns: new LiveList(),
        cards: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={"Loading... "}>
        {() => (
          <>
            <Columns />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
