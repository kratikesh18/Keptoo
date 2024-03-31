"use client";
import React, { FormEvent, useState } from "react";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { updateBoard } from "@/app/actions/BoardAction";
import { useRouter } from "next/navigation";
import { BoardContextProvider } from "@/components/BoardContext";
export interface CardType {
  id: string;
  name: string;
  index: number;
  columnId: string;
}

export default function Board({ id, name }: { id: string; name: string }) {
  const [renameMode, setRenameMode] = useState(false);
  const router = useRouter();

  // board rename function
  async function handleBoardRename(e: FormEvent) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");

    if (input) {
      const newName = input.value;
      await updateBoard(id, { metadata: { boardName: newName } });
      input.value = "";
      setRenameMode(false);
      router.refresh();
    }
  }

  return (
    <BoardContextProvider>
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
            <div>
              <div className="flex justify-between ">
                <div className="flex text-2xl items-center ">
                  <h1 className="">Board:</h1>
                  {!renameMode && (
                    <h1 onClick={() => setRenameMode(true)}>{name}</h1>
                  )}
                  {renameMode && (
                    <form onSubmit={handleBoardRename}>
                      <input
                        type="text"
                        defaultValue={name}
                        className="font-semibold block active:border-none rounded-xl text-xl "
                      />
                    </form>
                  )}
                </div>
                <Link
                  href={`/boards/${id}/settings`}
                  className="flex justify-center items-center gap-1 bg-gray-300/50 px-3 py-1 rounded-md"
                >
                  <FontAwesomeIcon icon={faCog} />
                  Board Settings
                </Link>
              </div>
              <div className="mt-4">
                <Columns />
              </div>
            </div>
          )}
        </ClientSideSuspense>
      </RoomProvider>
    </BoardContextProvider>
  );
}
