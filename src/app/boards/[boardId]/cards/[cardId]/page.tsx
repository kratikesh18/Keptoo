import React from "react";
import BoardPage from "../../page";

type PageProps = {
  params: {
    boardId: string;
    cardId: string;
  };
};

function page({ params }: PageProps) {
  return (
    <div>
      <BoardPage params={params} />
    </div>
  );
}

export default page;
