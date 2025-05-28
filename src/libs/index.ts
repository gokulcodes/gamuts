export const TOOL = {
  SELECT: "SELECT",
  RECT: "RECT",
  CIRCLE: "CIRCLE",
  TRIANGLE: "TRIANGLE",
  LINE: "LINE",
  ARROW: "ARROW",
  TEXT: "TEXT",
  DRAW: "DRAW",
  IMAGE: "IMAGE",
  ERASER: "ERASER",
};

export type Shape = {
  x: number;
  y: number;
  width: number;
  sides: number;
  radius: number;
  height: number;
  points?: Array<number>;
  stroke: string;
  image?: HTMLImageElement;
  fill: string;
  draggable: boolean;
  shapeName: string;
};
