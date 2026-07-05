import React, { useState } from "react";
import { createRange } from "./utilities";
import { SortableList } from "./SortableList/SortableList";
function getMockItems() {
  return createRange(10, (index) => ({ id: index + 1 }));
}
export function TopWallets() {
  const [items, setItems] = useState(getMockItems);
  return (
    <div className="w-full max-w-[1470px] mx-auto h-full">
      <div style={{ maxWidth: 400, margin: "30px auto" }}>
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              {item.id}
              <SortableList.DragHandle />
            </SortableList.Item>
          )}
        />
      </div>
    </div>
  );
}
