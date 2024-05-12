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
            <div className="w-full   ">
              <div className="">

                <div className="flex w-full justify-between px-3 pt-4 ">

                  <div className="flex">
                    <h1 className="">Board:</h1>
                    {!renameMode && (
                      <h1
                        className="pl-1 font-bold text-gray-800"
                        onClick={() => setRenameMode(true)}
                      >
                        {name}
                      </h1>
                    )}
                    {renameMode && (
                      <form onSubmit={handleBoardRename}>
                        <input
                          type="text"
                          defaultValue={name}
                          className="font-semibold block active:border-none rounded-xl text-xl  "
                        />
                      </form>
                    )}
                  </div>

                  {/* board settings */}
                  <Link
                    href={`/boards/${id}/settings`}
                    className="bg-gray-400/90 px-2 rounded-md flex justify-center items-center  "
                  >
                    <FontAwesomeIcon icon={faCog} />
                    <p className="hidden md:block">Board Settings</p>
                  </Link>
                </div>
              </div>

              {/* div for the columns  and their takss */}
              <div className="py-4 ">
                <Columns />
              </div>
            </div>
          )}
        </ClientSideSuspense>
      </RoomProvider>
    </BoardContextProvider>
  );
}
