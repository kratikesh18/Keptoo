"use client";
import { deleteBoard, removeUserAccessEmail } from "@/app/actions/BoardAction";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

function AccessEmailsList({
  boardId,
  emails,
}: {
  boardId: string;
  emails: string[];
}) {
  const router = useRouter();

  async function handleDelete(email: string) {
    await removeUserAccessEmail(boardId, email);
    await deleteBoard(boardId);
    router.refresh();
  }

  return (
    <ul className="">
      {emails.map((email) => (
        <li className="flex  justify-between my-2 gap-8 px-4 py-1 items-center rounded-lg    ">
          <span>{email}</span>
          <button className="btn p-4" onClick={() => handleDelete(email)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default AccessEmailsList;
