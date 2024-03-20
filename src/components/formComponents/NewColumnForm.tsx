"use client";
import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
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
      addColumn(columnName);
      iput.value = "";
    }
  };
  // const columns = useStorage((storage) => storage.columns);
  // return JSON.stringify(columns);

  return (
    <form
      onSubmit={handleNewCol}
      className="flex justify-center flex-col max-w-sm mt-4 ml-4 "
    >
      <input type="text" placeholder="New column name" />
      <button type="submit">Create column</button>
    </form>
  );
};
