import { GripVertical } from "lucide-react";

export const DragIcon = ({ attributes, listeners, isDraggable }) => {
  return (
    <div
      data-no-click
      className={`drag-handle DragHandle ${
        isDraggable && "cursor-grab hover:cursor-grab active:cursor-grabbing"
      }`}
      {...(isDraggable ? attributes : {})}
      {...(isDraggable ? listeners : {})}
    >
      <GripVertical
        size={25}
        className={`text-white ${
          isDraggable && "cursor-grab"
        } transition-all hover:opacity-80`}
      />
    </div>
  );
};
