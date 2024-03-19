"use client";
import { ColumnType, useMutation, useStorage } from "@/app/liveblocks.config";
import Column from "./Column";
import { NewColumnForm } from "./formComponents/NewColumnForm";
import { ReactSortable } from "react-sortablejs";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";

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
    return;
  }

  return (
    <div className="">
      <ReactSortable
        list={columns}
        setList={updateColumnsOrder}
        group={"board-column"}
        className="flex gap-4"
        ghostClass="opacity-30"
      >
        {columns?.length > 0 &&
          columns?.map((column) => <Column {...column} key={column.id} />)}
        {/* it is a different component */}
        <NewColumnForm />
      </ReactSortable>
    </div>
  );
}

export default Columns;
