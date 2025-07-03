import type { Filter } from "konva/lib/Node";

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
  x?: number;
  y?: number;
  width?: number;
  sides?: number;
  radius?: number;
  height?: number;
  text?: string;
  fontSize?: number;
  points?: Array<number>;
  stroke: string;
  image?: HTMLImageElement;
  opacity?: number;
  fill?: string;
  shadowBlur?: number;
  shadowOpacity?: number;
  shadowColor?: string;
  shadowOffset?: { x: number; y: number };
  globalCompositeOperation?: string;
  filters?: Array<Filter>;
  lineJoin?: string;
  blurRadius?: number;
  brightness?: number;
  enhance?: number;
  grayscale?: boolean;
  contrast?: number;
  hue?: number;
  saturation?: number;
  luminance?: number;
  red?: number;
  fontStyle?: string;
  fontFamily?: string;
  alpha?: number;
  textDecoration?: string;
  blue?: number;
  green?: number;
  threshold?: number;
  noise?: number;
  cornerRadius?: number;
  strokeWidth?: number;
  draggable?: boolean;
  name: string;
  dash?: Array<number>;
};

export type OptionType = {
  fill: string;
  borderStyle: Array<number>;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  opacity: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowOpacity: number;
  lineJoins: string;
  textDecoration: string;
  blendMode: string;
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
  blur: number;
  brightness: number;
  contrast: number;
  enhance: number;
  grayscale: boolean;
  HSL_hue: number;
  HSL_saturation: number;
  HSL_luminance: number;
  RGB_alpha: number;
  RGB_red: number;
  RGB_blue: number;
  RGB_green: number;
  invert: boolean;
  KAL_power: number;
  KAL_angle: number;
  mask: number;
  noise: number;
};

export type OptionPayloadType = {
  type: string;
  payload: OptionType;
};
