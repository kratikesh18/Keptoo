import LiveblocksProvider from "@liveblocks/yjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Doc } from "yjs";
import DescriptionEditor from "./DescriptionEditor";
import { useRoom } from "@/app/liveblocks.config";

function CardDescription() {
  const { cardId } = useParams();
  const [doc, setDoc] = useState<Doc | null>(null);
  const [provider, setProvider] = useState<LiveblocksProvider<
    any,
    any,
    any,
    any
  > | null>(null);

  const room = useRoom();

  useEffect(() => {
    const yDoc = new Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);
    // destroying the docs after unmouting the component or the cleanup
    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }
  
  return (
    <div>
      <DescriptionEditor
        doc={doc}
        provider={provider}
        cardId={cardId.toString()}
      />
    </div>
  );
}

export default CardDescription;
