"use client";
import { faArrowLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  onDelete: () => void;
};

function DeleteConcent({ onDelete }: Props) {
  const [youSure, setYouSure] = useState(false);
  if (youSure) {
    return (
      <div>
        <h2 className="mb-2 font-semibold text-center">Are you sure? </h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <button
              className="btn block grow w-full gap-2"
              onClick={() => setYouSure(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              CANCEL
            </button>
          </div>
          <div>
            <button
              onClick={onDelete}
              className=" block grow w-full bg-red-700 px-2 py-2 rounded-md text-white justify-center items-center"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      onClick={() => setYouSure(true)}
      className="bg-red-700 w-full py-2 text-white rounded-lg flex justify-center items-center gap-2"
    >
      <FontAwesomeIcon icon={faTrashAlt} />
      Delete
    </button>
  );
}

export default DeleteConcent;
