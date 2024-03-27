// import LiveblocksProvider from "@liveblocks/yjs";
// import React from "react";
// import { Doc } from "yjs";
// import { EditorContent, useEditor } from "@tiptap/react";
// import { StarterKit } from "@tiptap/starter-kit";
// import { Placeholder } from "@tiptap/extension-placeholder";
// import { Collaboration } from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import { useSelf } from "@/app/liveblocks.config";

// type EditorProps = {
//   doc: Doc;
//   provider: LiveblocksProvider<any, any, any, any>;
//   cardId: string;
// };

// function DescriptionEditor({ doc, provider, cardId }: EditorProps) {
//   const userInfo = useSelf((me) => me.info);

//   if (!userInfo) {
//     return null;
//   }

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         history: false,
//       }),
//       Placeholder.configure({
//         emptyEditorClass: "is-editor-empty",
//         placeholder: "Task description ...",
//       }),
//       Collaboration.configure({ document: doc, field: cardId }),
//       CollaborationCursor.configure({ provider, user: userInfo }),
//     ],
//   });
//   return (
//     <div>
//       <EditorContent editor={editor} />
      
//     </div>
//   );
// }

// export default DescriptionEditor;
