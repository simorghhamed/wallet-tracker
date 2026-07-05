import React, { createContext, useContext, useMemo } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./SortableItem.css";
import { useAppSelector } from "../../../app/hook";
import { getUserToken } from "../../../features/auth/authSlice";

export const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  isDraggable: false,
  ref() {},
});

export function SortableItem({ children, id, isDraggable, isDisabled }) {
  const userToken = useAppSelector(getUserToken);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    disabled: !isDraggable || isDisabled || !userToken,
  });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      isDraggable,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style = {
    opacity: isDragging ? 0.1 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}
