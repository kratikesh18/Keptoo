"use client";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "../BoardContext";
import { CardType, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import DeleteConcent from "../DeleteConcent";
import CardDescription from "../CardDescription";

function CardModal() {
  const router = useRouter();
  const params = useParams();
  const [editMode, setEditMode] = useState(false);

  const { setOpenCard } = useContext<BoardContextProps>(BoardContext);

  const card = useStorage((root) => {
    return root.cards.find((c) => c.id === params.cardId);
  }, shallow);

  useEffect(() => {
    if (params.cardid && setOpenCard) {
      setOpenCard(params.cardId.toString());
    }
  }, [params, setOpenCard]);

  const handleBackdropClick = () => {
    router.back();
  };

  const renameCard = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get("cards").map((c) => c.toObject());
    const index = cards.findIndex((c) => c.id === cardId);
    const card = storage.get("cards").get(index);

    for (let updateKey in updateData) {
      card?.set(updateKey as keyof CardType, updateData[updateKey]);
    }
  }, []);

  const handleCardRename = (e: FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input.value;
      renameCard(params.cardId.toString(), { name: newName });
      setEditMode(false);
    }
  };

  const deleteCard = useMutation(({ storage }, cardId) => {
    const cards = storage.get("cards");
    const delCardIndex = cards.findIndex((c) => c.toObject().id === cardId);
    cards.delete(delCardIndex);
  }, []);

  const handleDelete = () => {
    deleteCard(params.cardId);
    if (setOpenCard) {
      setOpenCard(null);
    }
    router.back();
  };
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-4 mt-8 max-w-xs mx-auto rounded-md"
      >
        {!editMode && (
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">{card?.name}</h1>
            <button className="text-gray-500" onClick={() => setEditMode(true)}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        )}

        {editMode && (
          <div className="">
            <form
              onSubmit={handleCardRename}
              className="flex flex-col justify-center items-center gap-4"
            >
              <input type="text" defaultValue={card?.name} className="w-full" />
              <button type="submit" className="w-full">
                Save
              </button>
            </form>
            <div className="mt-1">
              <DeleteConcent onDelete={handleDelete} />
            </div>
          </div>
        )}

        {!editMode && (
          <div>
            <h2 className="flex gap-2 items-center my-4">
              <FontAwesomeIcon icon={faFileLines} />
              Description
            </h2>
            <CardDescription />
          </div>
        )}
      </div>
    </div>
  );
}

export default CardModal;
