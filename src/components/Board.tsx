"use client";
import React, { useState } from "react";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export interface CardType {
  id: string;
  name: string;
  index: number;
  columnId: string;
}

export default function Board({ id, name }: { id: string; name: string }) {
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
            <div className="flex justify-between">
              <h1 className="text-2xl">Board: {name}</h1>

              <Link
                href={`/boards/${id}/settings`}
                className="flex justify-center items-center gap-1 bg-gray-300/50 px-3 py-1 rounded-md"
              >
                <FontAwesomeIcon icon={faCog} />
                Bard Settings
              </Link>
            </div>
            I am fine here
            <Columns />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
