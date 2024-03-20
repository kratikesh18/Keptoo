"use client";

import React from "react";
// import { CardType } from "./Board";
import { ReactSortable } from "react-sortablejs";
import { CardType, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./formComponents/NewCardForm";

interface ColumnPropsType {
  id: string;
  name: string;
}

function Column({ id, name }: ColumnPropsType) {
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

  return (
    <div className="w-48 bg-white shadow-md rounded-md p-4 border-4">
      <h3>{name}</h3>
      {columnCards && (
        <div>
          <ReactSortable
            list={columnCards}
            setList={(cards) => setTaskOrderForColumn(cards, id)}
            group={"cards"}
            className="min-h-12 bg-white"
            ghostClass="opcity-20"
          >
            {columnCards?.map((card) => (
              <div
                key={card?.id}
                className="border-4 bg-slate-300/75 shadow-lg rounded-lg my-2 p-3 "
              >
                <span>{card?.name}</span>
              </div>
            ))}
          </ReactSortable>
        </div>
      )}
      <NewCardForm columnId={id} />
    </div>
  );
}

export default Column;
