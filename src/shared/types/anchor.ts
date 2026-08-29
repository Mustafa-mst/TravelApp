/** Side of the trigger a floating surface prefers before collision flipping. */
export type AnchorPlacement = "top" | "bottom" | "left" | "right";

/** Alignment along the trigger's cross axis. */
export type AnchorAlign = "start" | "center" | "end";

/** Trigger rect in the portal host's coordinate space. */
export type AnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SelectionMode = "none" | "single" | "multiple";
