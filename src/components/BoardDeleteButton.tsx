"use client";
import { deleteBoard } from "@/app/actions/BoardAction";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

function BoardDeleteButton({ boardId }: { boardId: string }) {
  const router = useRouter();

  // function for delete board
  const handleDeleteBoard = async () => {
    await deleteBoard(boardId);
    router.push("/");
  };

  return (
    <button
      className="bg-red-700 flex justify-center items-center gap-2 h-full self-center py-2 text-white rounded-md px-3 text-sm"
      onClick={handleDeleteBoard}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
      Delete Board
    </button>
  );
}

export default BoardDeleteButton;
