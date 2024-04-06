import LiveblocksProvider from "@liveblocks/yjs";
import React from "react";
import { Doc } from "yjs";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Collaboration } from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useSelf } from "@/app/liveblocks.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faHeading,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import Underline from "@tiptap/extension-underline";

type EditorProps = {
  doc: Doc;
  provider: LiveblocksProvider<any, any, any, any>;
  cardId: string;
};

function DescriptionEditor({ doc, provider, cardId }: EditorProps) {
  const userInfo = useSelf((me) => me.info);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Task description ...",
      }),
      Collaboration.configure({
        document: doc,
        field: cardId,
      }),

      CollaborationCursor.configure({
        provider,
        user: userInfo || {},
      }),
      Underline.configure(),
    ],
  });

  if (!userInfo) {
    return null;
  }

  return (
    <div>
      <div className="flex gap-4flex gap-2 mb-1 editor-btns">
        <button
          className={editor?.isActive("bold") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>
          <FontAwesomeIcon icon={faUnderline} />
        </button>

        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <FontAwesomeIcon icon={faHeading} />
        </button>
      </div>
      <EditorContent editor={editor} className="" />
    </div>
  );
}

export default DescriptionEditor;
