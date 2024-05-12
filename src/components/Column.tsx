"use client";
import React, { FormEvent, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { CardType, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import NewCardForm from "./formComponents/NewCardForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faClose,
  faEllipsisVertical,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import CardComponent from "./CardComponent";

interface ColumnPropsType {
  id: string;
  name: string;
}

function Column({ id, name }: ColumnPropsType) {
  const [renameMode, setRenameMode] = useState(false);

  const columnCards = useStorage<CardType[]>((root) => {
    return root.cards
      .filter((card) => card?.columnId === id)
      .map((card) => ({ ...card }))
      .sort((a, b) => a.index - b.index);
  }, shallow);

  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage.get("cards").get(index);
    if (card) {
      for (let key in updateData) {
        card.set(key as keyof CardType, updateData[key]);
      }
    }
  }, []);

  const setTaskOrderForColumn = useMutation(
    ({ storage }, sortedCards: CardType[], newColumnId) => {
      const idOfSortedCards = sortedCards.map((card) => card.id.toString());

      const allCards: CardType[] = [
        ...storage.get("cards").map((card) => card.toObject()),
      ];

      idOfSortedCards.forEach((sortedCardId, colIndex) => {
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId
        );
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        });
      });
    },
    []
  );

  const updateColumn = useMutation(({ storage }, id, newName) => {
    const columns = storage.get("columns");
    columns.find((c) => c.toObject().id === id)?.set("name", newName);
  }, []);

  const deleteColumn = useMutation(({ storage }, columnId) => {
    const columns = storage.get("columns");
    const delColIndex = columns.findIndex((c) => c.toObject().id === columnId);
    columns.delete(delColIndex);
  }, []);

  async function handleColRename(e: FormEvent) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newColName = input.value;
      updateColumn(id, newColName);
      setRenameMode(false);
    }
  }

  return (
    <div className="flex w-fit flex-col bg-red-300 shadow-md rounded-md p-2 border-4 border-gray-200">
      {!renameMode && (
        <div className="flex justify-between">
          <h3 className="font-semibold cursor-move">{name}</h3>
          <button className="text-gray-800" onClick={() => setRenameMode(true)}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      )}

      {renameMode && (
        <div>
          <form onSubmit={handleColRename} className="">
            <input type="text" defaultValue={name} className="rounded-md" />
            <button type={"submit"} className="w-full mt-2">
              Save
            </button>
          </form>
          <button
            onClick={() => deleteColumn(id)}
            className="w-full my-1 bg-red-600 text-white p-2 flex gap-2 items-center justify-center rounded-md"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete Coulumn
          </button>

          <button
            className="mt-4 w-full uppercase text-sm font-bold text-gray-500 flex gap-1 justify-center items-center"
            onClick={() => setRenameMode(false)}
          >
            <FontAwesomeIcon icon={faClose} />
            Cancel
          </button>
        </div>
      )}

      {!renameMode && columnCards && (
        <div className="flex flex-col justify-between bg-transparent">
          {/* for the sortable cards in the column */}
          <ReactSortable
            list={columnCards}
            setList={(cards) => setTaskOrderForColumn(cards, id)}
            group={"cards"}
            className="h-full my-4 bg-white rounded-lg"
            ghostClass="opcity-20"
          >
            {columnCards?.map((card) => (
              <CardComponent key={card.id} id={card.id} name={card.name} />
            ))}
          </ReactSortable>
          {/* 
          {!renameMode && (
            <div className="self-end">
              <NewCardForm columnId={id} />
            </div>
          )} */}
        </div>
      )}

      {!renameMode && (
        <div className="self-end">
          <NewCardForm columnId={id} />
        </div>
      )}
    </div>
  );
}

export default Column;
