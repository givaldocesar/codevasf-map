import React from "react";

export { default as BaseControl } from "./BaseControl";
export { default as Attributions } from "./Attributions";
export { default as DragAndDrop } from "./drag-and-drop";
export { default as Legend } from "./legend";
export { default as Scale } from "./Scale";
export { default as Title } from "./Title";
export * from "./toolbar";

export default function Controls({children} : {children: React.ReactNode }){ return <>{ children }</> }
export { Controls };