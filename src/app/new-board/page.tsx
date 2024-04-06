"use client";
import { redirect } from "next/navigation";
import { createBoard } from "../actions/BoardAction";

function NewBoardPage() {
  const handleCreateBoard = async (formData: FormData) => {
    const boardName = formData.get("boardName");

    const roomInfo = await createBoard(boardName as string);
    if (roomInfo) {
      redirect(`/boards/${roomInfo?.id}`);
    }
  };
  return (
    <div>
      <form action={handleCreateBoard}>
        <h1 className="text-2xl font-semibold">Create New Board</h1>
        <div className="flex mt-3 flex-col w-[40%] gap-2">
          <input
            type="text"
            name="boardName"
            placeholder="New board name"
            className="rounded-md"
          />
          <button
            type="submit"
            className="bg-purple-700 px-3 py-2 rounded-md text-white "
          >
            Create board
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewBoardPage;
