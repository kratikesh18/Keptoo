"use client";
import { CardType, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/core";
import { FormEvent } from "react";
import uniqid from "uniqid";

function NewCardForm({ columnId }: { columnId: string }) {
  const addCard = useMutation(
    ({ storage }, cardName) => {
      return storage.get("cards").push(
        new LiveObject<CardType>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
        })
      );
    },
    [columnId]
  );

  async function handleNewCardFormSumbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = "";
    }
  }

  return (
    <form onSubmit={handleNewCardFormSumbit}>
      <input type="text" placeholder="new task" className="w-full rounded-md" />
    </form>
  );
}

export default NewCardForm;
