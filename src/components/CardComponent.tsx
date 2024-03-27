"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { BoardContext } from "./BoardContext";

function CardComponent({ id, name }: { id: string; name: string }) {
  const params = useParams();
  const router = useRouter();
  const { openCard } = useContext(BoardContext);

  useEffect(() => {
    if (params.cardId && !openCard) {
      const { boardId, cardId } = params;
      router.push(`/boards/${boardId}`);
      router.push(`/boards/${boardId}/cards/${cardId}`);
    }
    if (!params.cardId && openCard) {
      router.push(`/boards/${params.boardId}`);
    }
  }, [params.cardId]);

  return (
    <Link
      href={`/boards/${params.boardId}/cards/${id}`}
      key={id}
      className="border-4 block bg-slate-300/75 shadow-lg rounded-lg my-2 p-3 "
    >
      <span>{name}</span>
    </Link>
  );
}

export default CardComponent;
