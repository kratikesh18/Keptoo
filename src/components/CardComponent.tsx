"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function CardComponent({ id, name }: { id: string; name: string }) {
  const params = useParams();
  useEffect(() => {
    if (params.cardId) {
    }
  }, [params]);
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
