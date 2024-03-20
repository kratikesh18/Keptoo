"use client";

import { addUserEmailToBoard } from "@/app/actions/BoardAction";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function NewBoardAccessForm({ boardId }: { boardId: string }) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const addNewUser = async (formdata: FormData) => {
    const email = formdata.get("email")?.toString() || "";

    await addUserEmailToBoard(boardId, email);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    router.refresh();
  };

  return (
    <form action={addNewUser} className="max-w-xs mt-8 flex flex-col gap-2">
      <h2 className="text-lg">Add New User </h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Tyrion@got.com"
        className="w-full rounded-md "
        name="email"
      />

      <button type="submit" className="w-full ">
        Add
      </button>
    </form>
  );
}

export default NewBoardAccessForm;
