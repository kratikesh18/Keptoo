import React from "react";

function BoardLayout({ children, modal }) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

export default BoardLayout;
