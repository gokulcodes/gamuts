import type { OptionType, OptionPayloadType } from "../../libs";

export const initialOptionState: OptionType = {
  fill: "#000000",
  borderStyle: [],
  borderWidth: 0,
  borderColor: "#000000",
  borderRadius: 0,
  opacity: 100,
  shadowColor: "#000000",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowOpacity: 100,
  lineJoins: "miter",
  blendMode: "none",
  blur: 0,
  fontSize: 48,
  fontStyle: "normal",
  textDecoration: "normal",
  fontFamily: "Kaushan Script",
  brightness: 0,
  contrast: 0,
  enhance: 0,
  grayscale: false,
  HSL_hue: 0,
  HSL_saturation: 0,
  HSL_luminance: 0,
  RGB_red: 0,
  RGB_blue: 0,
  RGB_green: 0,
  RGB_alpha: 0,
  invert: false,
  KAL_power: 0,
  KAL_angle: 0,
  mask: 0,
  noise: 0,
};

export function reducer(state: OptionType, action: OptionPayloadType) {
  switch (action.type) {
    case "fill":
      return { ...state, fill: action.payload.fill };
    case "borderStyle":
      return { ...state, borderStyle: action.payload.borderStyle };
    case "borderWidth":
      return { ...state, borderWidth: action.payload.borderWidth };
    case "borderRadius":
      return { ...state, borderRadius: action.payload.borderRadius };
    case "borderColor":
      return { ...state, borderColor: action.payload.borderColor };
    case "shadowColor":
      return { ...state, shadowColor: action.payload.shadowColor };
    case "shadowBlur":
      return { ...state, shadowBlur: action.payload.shadowBlur };
    case "shadowOffsetX":
      return { ...state, shadowOffsetX: action.payload.shadowOffsetX };
    case "shadowOffsetY":
      return { ...state, shadowOffsetY: action.payload.shadowOffsetY };
    case "shadowOpacity":
      return { ...state, shadowOpacity: action.payload.shadowOpacity };
    case "opacity":
      return { ...state, opacity: action.payload.opacity };
    case "lineJoins":
      return { ...state, lineJoins: action.payload.lineJoins };
    case "blendMode":
      return { ...state, blendMode: action.payload.blendMode };
    case "blur":
      return { ...state, blur: action.payload.blur };
    case "brightness":
      return { ...state, brightness: action.payload.brightness };
    case "contrast":
      return { ...state, contrast: action.payload.contrast };
    case "enhance":
      return { ...state, enhance: action.payload.enhance };
    case "grayscale":
      return { ...state, grayscale: action.payload.grayscale };
    case "HSL_hue":
      return { ...state, HSL_hue: action.payload.HSL_hue };
    case "HSL_saturation":
      return { ...state, HSL_saturation: action.payload.HSL_saturation };
    case "HSL_luminance":
      return { ...state, HSL_luminance: action.payload.HSL_luminance };
    case "RGB_alpha":
      return { ...state, RGB_alpha: action.payload.RGB_alpha };
    case "RGB_red":
      return { ...state, RGB_red: action.payload.RGB_red };
    case "RGB_blue":
      return { ...state, RGB_blue: action.payload.RGB_blue };
    case "RGB_green":
      return { ...state, RGB_green: action.payload.RGB_green };
    case "invert":
      return { ...state, invert: action.payload.invert };
    case "KAL_power":
      return { ...state, KAL_power: action.payload.KAL_power };
    case "KAL_angle":
      return { ...state, KAL_angle: action.payload.KAL_angle };
    case "mask":
      return { ...state, mask: action.payload.mask };
    case "noise":
      return { ...state, noise: action.payload.noise };
    case "fontFamily":
      return { ...state, fontFamily: action.payload.fontFamily };
    case "fontSize":
      return { ...state, fontSize: action.payload.fontSize };
    case "fontStyle":
      return { ...state, fontStyle: action.payload.fontStyle };
    case "textDecoration":
      return { ...state, textDecoration: action.payload.textDecoration };
    default:
      return state;
  }
}
