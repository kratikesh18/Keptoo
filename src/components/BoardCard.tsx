"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteBoard } from "@/app/actions/BoardAction";

export function BoardCard({ BoardInfo }: any) {
  return (
    <div className="flex justify-between rounded-md bg-gray-300 p-4 ">
      <Link href={`/boards/${BoardInfo?.id}`} key={BoardInfo?.id} className="">
        {BoardInfo.metadata.boardName}
      </Link>
      <button onClick={() => deleteBoard(BoardInfo?.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
