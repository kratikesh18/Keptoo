"use client";
import { RoomProvider } from "@/app/liveblocks.config";
import { BoardContextProvider } from "@/components/BoardContext";
import { LiveList } from "@liveblocks/core";
import { useParams } from "next/navigation";
import React from "react";

type PageProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function BaordLayout({ children, modal }: PageProps) {
  const params = useParams();
  return (
    <BoardContextProvider>
      <RoomProvider
        initialPresence={{}}
        id={params.boardId.toString()}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}
      >
        {children}
        {modal}
      </RoomProvider>
    </BoardContextProvider>
  );
}
