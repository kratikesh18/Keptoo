"use client";
import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/core";
import { FormEvent } from "react";
import uniqid from "uniqid";

export const NewColumnForm = () => {
  const addColumn = useMutation(({ storage }, columnName) => {
    return storage
      .get("columns")
      .push(
        new LiveObject({ name: columnName, id: uniqid.time(), index: 9999 })
      );
  }, []);

  const handleNewCol = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const iput = (e.target as HTMLFormElement).querySelector("input");

    if (iput) {
      const columnName = iput.value;
      if (columnName.trim().length == 0) {
        return;
      }
      addColumn(columnName);
      iput.value = "";
    }
  };

  return (
    <div>
      <form
        onSubmit={handleNewCol}
        className="flex gap-1 justify-center flex-col max-w-fit  "
      >
        <input
          type="text"
          placeholder="New column name"
          className="rounded-md"
        />
        <button type="submit">Create column</button>
      </form>
    </div>
  );
};
