import React, { useMemo, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import "./SortableList.css";

import { SortableItem } from "./SortableItem";
import { SortableOverlay } from "./SortableOverlay";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useAppDispatch } from "../../app/hook";
import { setDraggbleWallets } from "../../features/wallets/walletsSlice";

export function SortableList({ items, onChange, renderItem }) {
  const [active, setActive] = useState(null);
  const dispatch = useAppDispatch();
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // تأخیر 250 میلی‌ثانیه برای شروع drag
        tolerance: 5, // تحمل 5 پیکسل برای حرکت
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        const itemOvered = items.find((item) => item.id === over.id);
        const isDraggable = itemOvered.tracked || itemOvered.isFavorite;
        if (over && active.id !== over?.id && isDraggable) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);
          dispatch(setDraggbleWallets(true));

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        {items.map((item) => (
          <React.Fragment key={item.id + item.networkId}>
            {renderItem(item)}
          </React.Fragment>
        ))}
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
