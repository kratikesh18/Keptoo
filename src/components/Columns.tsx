"use client";
import { ColumnType, useMutation, useStorage } from "@/app/liveblocks.config";
import Column from "./Column";
import { NewColumnForm } from "./formComponents/NewColumnForm";
import { ReactSortable } from "react-sortablejs";
import { LiveList, LiveObject, shallow } from "@liveblocks/core";

function Columns() {
  const columns = useStorage(
    (root) => root.columns.map((c) => ({ ...c })),
    shallow
  );

  const updateColumns = useMutation(
    ({ storage }, columns: LiveObject<ColumnType>[]) => {
      storage.set("columns", new LiveList(columns));
    },
    []
  );

  const updateColumnsOrder = (sortedColumns: ColumnType[]) => {
    const newColumns: LiveObject<ColumnType>[] = [];

    sortedColumns.forEach((sortedColumn, newIndex) => {
      const newSortedColumn = { ...sortedColumn };
      newSortedColumn.index = newIndex;
      newColumns.push(new LiveObject(newSortedColumn));
    });

    updateColumns(newColumns);
  };

  if (!columns) {
    return "no columns found ";
  }

  return (
    <div className="mx-auto flex flex-col items-center gap-3 ">
      <ReactSortable
        list={columns}
        setList={updateColumnsOrder}
        group={"board-column"}
        className="flex justify-center gap-3 flex-wrap  "
        // className=""
        ghostClass="opacity-30"
      >
        {columns && columns.map((cols) => <Column {...cols} key={cols.id} />)}
      </ReactSortable>
      <NewColumnForm />
    </div>
  );
}

export default Columns;
