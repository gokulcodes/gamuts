import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import AppController from "../../controllers/AppController";
import { reducer, initialOptionState } from "./optionReducer";
import Konva from "konva";
import type { Filter } from "konva/lib/Node";

function OptionBar() {
  const { state, dispatch } = useContext(AppController);
  const [activeTab, setActiveTab] = useState(0);
  const { structures, selectedShapes } = state;
  const filterAdd = useRef<Set<Filter>>(new Set());

  const [optionState, dispatcher] = useReducer(reducer, initialOptionState);

  const updateShapeStyle = useCallback(() => {
    const allStruct = structures;
    for (const index of selectedShapes) {
      allStruct[index].fill = optionState.fill;
      allStruct[index].stroke = optionState.borderColor;
      allStruct[index].strokeWidth = optionState.borderWidth;
      allStruct[index].cornerRadius = optionState.borderRadius;
      allStruct[index].dash = optionState.borderStyle;
      allStruct[index].opacity = optionState.opacity / 100;
      allStruct[index].shadowBlur = optionState.shadowBlur;
      allStruct[index].shadowOffset = {
        x: optionState.shadowOffsetX,
        y: optionState.shadowOffsetY,
      };
      allStruct[index].shadowOpacity = optionState.shadowOpacity / 100;
      allStruct[index].shadowColor = optionState.shadowColor;
      allStruct[index].globalCompositeOperation = optionState.blendMode;
      allStruct[index].lineJoin = optionState.lineJoins;
      allStruct[index].filters = [
        ...new Array(...filterAdd.current),
        // Konva.Filters.Blur,
        // Konva.Filters.Brighten,
        // Konva.Filters.Contrast,
        // Konva.Filters.Enhance,
        // Konva.Filters.Grayscale,
        // Konva.Filters.Mask,
        // Konva.Filters.Noise,
        // Konva.Filters.Invert,
        // Konva.Filters.Kaleidoscope,
      ];
      allStruct[index].blurRadius = optionState.blur;
      allStruct[index].brightness = optionState.brightness / 100;
      allStruct[index].enhance = optionState.enhance / 100;
      allStruct[index].grayscale = optionState.grayscale;
      allStruct[index].hue = optionState.HSL_hue;
      allStruct[index].saturation = optionState.HSL_saturation;
      allStruct[index].luminance = optionState.HSL_luminance;
      allStruct[index].red = optionState.RGB_red;
      allStruct[index].blue = optionState.RGB_blue;
      allStruct[index].green = optionState.RGB_red;
      allStruct[index].threshold = optionState.mask;
      allStruct[index].noise = optionState.noise / 100;
      allStruct[index].blurRadius = optionState.blur;
    }
    dispatch({
      type: "mutateStructures",
      payload: { ...state, structures: allStruct },
    });
  }, [optionState, dispatch]);

  useEffect(() => {
    updateShapeStyle();
  }, [optionState]);

  function updateOption(
    optionName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    switch (optionName) {
      case "fill":
        dispatcher({
          type: "fill",
          payload: { ...optionState, fill: event.target.value },
        });
        break;
      case "borderWidth":
        dispatcher({
          type: "borderWidth",
          payload: {
            ...optionState,
            borderWidth: parseInt(event.target.value),
          },
        });
        break;
      case "borderColor":
        dispatcher({
          type: "borderColor",
          payload: {
            ...optionState,
            borderColor: event.target.value,
          },
        });
        break;
      case "borderRadius":
        dispatcher({
          type: "borderRadius",
          payload: {
            ...optionState,
            borderRadius: parseInt(event.target.value),
          },
        });
        break;
      case "borderStyle":
        if (event.target.value === "solid") return;
        dispatcher({
          type: "borderStyle",
          payload: {
            ...optionState,
            borderStyle: [0, 0, 10, 10],
          },
        });
        break;
      case "opacity":
        dispatcher({
          type: "opacity",
          payload: {
            ...optionState,
            opacity: parseInt(event.target.value),
          },
        });
        break;
      case "shadowBlur":
        dispatcher({
          type: "shadowBlur",
          payload: {
            ...optionState,
            shadowBlur: parseInt(event.target.value),
          },
        });
        break;
      case "shadowColor":
        dispatcher({
          type: "shadowColor",
          payload: {
            ...optionState,
            shadowColor: event.target.value,
          },
        });
        break;
      case "shadowOffsetX":
        dispatcher({
          type: "shadowOffsetX",
          payload: {
            ...optionState,
            shadowOffsetX: parseInt(event.target.value),
          },
        });
        break;
      case "shadowOffsetY":
        dispatcher({
          type: "shadowOffsetY",
          payload: {
            ...optionState,
            shadowOffsetY: parseInt(event.target.value),
          },
        });
        break;
      case "shadowOpacity":
        dispatcher({
          type: "shadowOpacity",
          payload: {
            ...optionState,
            shadowOpacity: parseInt(event.target.value),
          },
        });
        break;
      case "blendMode":
        dispatcher({
          type: "blendMode",
          payload: {
            ...optionState,
            blendMode: event.target.value,
          },
        });
        break;
      case "lineJoins":
        dispatcher({
          type: "lineJoins",
          payload: {
            ...optionState,
            lineJoins: event.target.value,
          },
        });
        break;
      case "blur":
        filterAdd.current.add(Konva.Filters.Blur);
        dispatcher({
          type: "blur",
          payload: {
            ...optionState,
            blur: parseInt(event.target.value),
          },
        });
        break;
      case "brightness":
        filterAdd.current.add(Konva.Filters.Brighten);
        dispatcher({
          type: "brightness",
          payload: {
            ...optionState,
            brightness: parseInt(event.target.value),
          },
        });
        break;
      case "contrast":
        filterAdd.current.add(Konva.Filters.Contrast);
        dispatcher({
          type: "contrast",
          payload: {
            ...optionState,
            contrast: parseInt(event.target.value),
          },
        });
        break;
      case "enhance":
        filterAdd.current.add(Konva.Filters.Enhance);
        dispatcher({
          type: "enhance",
          payload: {
            ...optionState,
            enhance: parseInt(event.target.value),
          },
        });
        break;
      case "grayscale":
        console.log(event.target.value);
        if (!optionState.grayscale)
          filterAdd.current.add(Konva.Filters.Grayscale);
        else filterAdd.current.delete(Konva.Filters.Grayscale);
        dispatcher({
          type: "grayscale",
          payload: {
            ...optionState,
            grayscale: !optionState.grayscale,
          },
        });
        break;
      case "HSL_hue":
        dispatcher({
          type: "HSL_hue",
          payload: {
            ...optionState,
            HSL_hue: parseInt(event.target.value),
          },
        });
        break;
      case "HSL_saturation":
        dispatcher({
          type: "HSL_saturation",
          payload: {
            ...optionState,
            HSL_saturation: parseInt(event.target.value),
          },
        });
        break;
      case "HSL_luminance":
        dispatcher({
          type: "HSL_luminance",
          payload: {
            ...optionState,
            HSL_luminance: parseInt(event.target.value),
          },
        });
        break;
      case "RGB_red":
        dispatcher({
          type: "RGB_red",
          payload: {
            ...optionState,
            RGB_red: parseInt(event.target.value),
          },
        });
        break;
      case "RGB_green":
        dispatcher({
          type: "RGB_green",
          payload: {
            ...optionState,
            RGB_green: parseInt(event.target.value),
          },
        });
        break;
      case "RGB_blue":
        dispatcher({
          type: "RGB_blue",
          payload: {
            ...optionState,
            RGB_blue: parseInt(event.target.value),
          },
        });
        break;
      case "invert":
        if (!optionState.invert) filterAdd.current.add(Konva.Filters.Invert);
        else filterAdd.current.delete(Konva.Filters.Invert);
        dispatcher({
          type: "invert",
          payload: {
            ...optionState,
            invert: !optionState.invert,
          },
        });
        break;
      case "KAL_power":
        filterAdd.current.add(Konva.Filters.Kaleidoscope);
        dispatcher({
          type: "KAL_power",
          payload: {
            ...optionState,
            KAL_power: parseInt(event.target.value),
          },
        });
        break;
      case "KAL_angle":
        filterAdd.current.add(Konva.Filters.Kaleidoscope);
        dispatcher({
          type: "KAL_angle",
          payload: {
            ...optionState,
            KAL_angle: parseInt(event.target.value),
          },
        });
        break;
      case "mask":
        filterAdd.current.add(Konva.Filters.Mask);
        dispatcher({
          type: "mask",
          payload: {
            ...optionState,
            mask: parseInt(event.target.value),
          },
        });
        break;
      case "noise":
        filterAdd.current.add(Konva.Filters.Noise);
        dispatcher({
          type: "noise",
          payload: {
            ...optionState,
            noise: parseInt(event.target.value),
          },
        });
        break;
    }
  }
  if (!selectedShapes.length) {
    return;
  }
  return (
    <div
      id="optionbar"
      style={{
        height: "fit-content",
        // top: `${optionsAnchor.y - 40}px`,
        // left: `${optionsAnchor.x}px`,
        // width: `${optionsAnchor.width + optionsAnchor.width}px`,
      }}
      className="shadow-2xl select-none h-full max-h-3xl transition-all max-w-lg w-lg border z-10 border-white/10 rounded-2xl animate-optionOpen bg-foreground/80 backdrop-blur-2xl"
    >
      <div className="m-3 mb-5 flex justify-between border border-white/10 rounded-xl">
        <button
          onClick={() => setActiveTab(0)}
          className={`w-full uppercase text-xs tracking-widest p-3 m-1 rounded-xl cursor-pointer ${
            activeTab == 0 ? "bg-green-800/10 text-green-400" : ""
          } `}
        >
          Edit styles
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`w-full uppercase text-xs tracking-widest p-3 m-1 rounded-xl cursor-pointer ${
            activeTab == 1 ? "bg-green-800/10 text-green-400" : ""
          } `}
        >
          Filters
        </button>
      </div>
      {activeTab === 0 ? (
        <div className="flex animate-openUp flex-col gap-4">
          {/* FIll */}
          <div className="flex px-8 items-center justify-between">
            <p>Fill</p>
            <input type="color" onChange={(e) => updateOption("fill", e)} />
          </div>
          {/* BORDER */}
          <div className="flex border-t px-8 border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <div className="flex w-full justify-between">
              <p>Border</p>
              <input
                value={optionState.borderColor}
                type="color"
                onChange={(e) => updateOption("borderColor", e)}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="flex gap-2 items-center w-full">
                <label className="text-sm opacity-80" htmlFor="borderstyle">
                  Style
                </label>
                <select
                  id="borderstyle"
                  // value={optionState.borderStyle}
                  onChange={(e) => updateOption("borderStyle", e)}
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                >
                  <option value="solid">Solid</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
              <div className="flex gap-2 items-center w-full">
                <label className="text-sm opacity-80" htmlFor="width">
                  Width
                </label>
                <input
                  id="width"
                  type="number"
                  value={optionState.borderWidth}
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("borderWidth", e)}
                />
              </div>
              <div className="flex gap-2 items-center w-full">
                <label className="text-sm opacity-80" htmlFor="radius">
                  Radius
                </label>
                <input
                  id="radius"
                  type="number"
                  value={optionState.borderRadius}
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("borderRadius", e)}
                />
              </div>
            </div>
          </div>
          {/* OPACITY */}
          <div className="flex px-8 items-center justify-between">
            <p>Opacity </p>
            <input
              step={10}
              min={0}
              max={100}
              type="number"
              value={optionState.opacity}
              className="border w-20 border-white/10 rounded-md outline-none px-2"
              onChange={(e) => updateOption("opacity", e)}
            />
          </div>
          {/* SHADOW */}
          <div className="flex px-8 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <div className="flex w-full justify-between">
              <p>Shadow</p>
              <input
                type="color"
                value={optionState.shadowColor}
                onChange={(e) => updateOption("shadowColor", e)}
              />
            </div>
            <div className="flex flex-wrap w-full gap-4 ">
              <div className="flex w-[47%] flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="blur">
                  Blur
                </label>
                <input
                  type="number"
                  value={optionState.shadowBlur}
                  id="blur"
                  placeholder="blur"
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("shadowBlur", e)}
                />
              </div>
              <div className="flex w-[47%] flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="opacity">
                  Opacity
                </label>
                <input
                  id="opacity"
                  type="number"
                  value={optionState.shadowOpacity}
                  placeholder="opacity"
                  className="border border-white/10 rounded-md outline-none px-2 w-full"
                  onChange={(e) => updateOption("shadowOpacity", e)}
                />
              </div>
              <div className="flex w-[47%] flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="opacity">
                  OffsetX
                </label>
                <input
                  type="number"
                  placeholder="x"
                  value={optionState.shadowOffsetX}
                  className="border border-white/10 rounded-md px-2 outline-none w-full"
                  onChange={(e) => updateOption("shadowOffsetX", e)}
                />
              </div>
              <div className="flex w-[47%] flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="opacity">
                  OffsetX
                </label>
                <input
                  type="number"
                  placeholder="y"
                  value={optionState.shadowOffsetY}
                  className="border border-white/10 rounded-md px-2 outline-none w-full"
                  onChange={(e) => updateOption("shadowOffsetY", e)}
                />
              </div>
            </div>
          </div>
          {/* LINE JOINS */}
          <div className="flex px-8 border-b border-white/10 pb-4 flex-row items-start gap-4 justify-between">
            <p>Line Joins</p>
            <select
              onChange={(e) => updateOption("lineJoins", e)}
              className="border capitalize px-2 rounded-md outline-none border-white/10"
            >
              <option value="bevel">Bevel</option>
              <option value="miter">miter</option>
              <option value="round">round</option>
            </select>
          </div>
          {/* BLEND MODE */}
          <div className="flex px-8 pb-8 items-center justify-between">
            <p>Blend mode</p>
            <div className="flex gap-2">
              <select
                onChange={(e) => updateOption("blendMode", e)}
                className="border capitalize px-2 rounded-md outline-none border-white/10"
              >
                <option value="lighter">lighter</option>
                <option value="multiply">multiply</option>
                <option value="screen">screen</option>
                <option value="overlay">overlay</option>
                <option value="color-dodge">color-dodge</option>
                <option value="color-burn">color-burn</option>
                <option value="hard-light">hard-light</option>
                <option value="soft-light">soft-light</option>
                <option value="difference">difference</option>
                <option value="exclusion">exclusion</option>
                <option value="hue">hue</option>
                <option value="saturation">saturation</option>
                <option value="color">color</option>
                <option value="luminosity">luminosity</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex animate-openUp flex-col gap-4">
          <div className="flex flex-wrap w-full">
            <div className="flex px-8 flex-row items-start gap-4 w-1/2 justify-between">
              <p>Blur</p>
              <input
                type="number"
                value={optionState.blur}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("blur", e)}
              />
            </div>
            <div className="flex px-8  pb-4 flex-row items-start w-1/2 gap-4 justify-between">
              <p>Brightness</p>
              <input
                type="number"
                value={optionState.brightness}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("brightness", e)}
              />
            </div>
            <div className="flex px-8 border-t border-white/10 pt-4 w-1/2 flex-row items-start gap-4 justify-between">
              <p>Contrast</p>
              <input
                type="number"
                value={optionState.contrast}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("contrast", e)}
              />
            </div>
            <div className="flex px-8 border-t border-white/10 pt-4 w-1/2 flex-row items-start gap-4 justify-between">
              <p>Enhance</p>
              <input
                type="number"
                value={optionState.enhance}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("enhance", e)}
              />
            </div>
          </div>
          <div className="flex px-8 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between">
            <p>Grayscale</p>
            <input
              type="checkbox"
              // value={optionState.grayscale}
              className="border border-white/10 w-20"
              onChange={(e) => updateOption("grayscale", e)}
            />
          </div>
          <div className="flex px-8 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <p>HSL</p>
            <div className="flex w-full gap-4 ">
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="hue">
                  Hue
                </label>
                <input
                  type="number"
                  value={1}
                  id="hue"
                  placeholder="Hue"
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("HSL_hue", e)}
                />
              </div>
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="saturation">
                  Saturation
                </label>
                <input
                  id="saturation"
                  type="number"
                  value={1}
                  placeholder="opacity"
                  className="border border-white/10 rounded-md outline-none px-2 w-full"
                  onChange={(e) => updateOption("HSL_saturation", e)}
                />
              </div>
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="luminance">
                  Luminance
                </label>
                <input
                  type="number"
                  placeholder="luminance"
                  value={1}
                  className="border border-white/10 rounded-md px-2 outline-none w-full"
                  onChange={(e) => updateOption("HSL_luminance", e)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-8 border-b border-white/10 pb-4 flex-col items-start gap-4 justify-between">
            <p>RGB</p>
            <div className="flex w-full gap-4 ">
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="red">
                  Red
                </label>
                <input
                  type="number"
                  value={1}
                  id="red"
                  placeholder="Red"
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("RGB_red", e)}
                />
              </div>
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="blue">
                  Blue
                </label>
                <input
                  id="blue"
                  type="number"
                  value={1}
                  placeholder="blue"
                  className="border border-white/10 rounded-md outline-none px-2 w-full"
                  onChange={(e) => updateOption("RGB_blue", e)}
                />
              </div>
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="green">
                  Green
                </label>
                <input
                  id="green"
                  type="number"
                  placeholder="green"
                  value={1}
                  className="border border-white/10 rounded-md px-2 outline-none w-full"
                  onChange={(e) => updateOption("RGB_green", e)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-8 gap-2 w-full justify-between">
            <p>Invert</p>
            <input
              type="checkbox"
              className="border border-white/10 w-20"
              onChange={(e) => updateOption("invert", e)}
            />
          </div>
          <div className="flex px-8 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <p>Kaleidoscope</p>
            <div className="flex w-full gap-4 ">
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="power">
                  Power
                </label>
                <input
                  type="number"
                  value={optionState.KAL_power}
                  id="power"
                  placeholder="Power"
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("KAL_power", e)}
                />
              </div>
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80" htmlFor="angle">
                  Angle
                </label>
                <input
                  id="angle"
                  type="number"
                  value={optionState.KAL_angle}
                  placeholder="Angle"
                  className="border border-white/10 rounded-md outline-none px-2 w-full"
                  onChange={(e) => updateOption("KAL_angle", e)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-8 gap-2 w-full justify-between">
            <p>Mask</p>
            <input
              type="number"
              value={optionState.mask}
              className="border px-2 rounded-md w-20 outline-none border-white/10"
              onChange={(e) => updateOption("mask", e)}
            />
          </div>
          <div className="flex px-8 border-t border-white/10 py-4 flex-row items-start gap-4 justify-between">
            <p>Noise</p>
            <input
              type="number"
              value={optionState.noise}
              className="border px-2 rounded-md w-20 outline-none border-white/10"
              onChange={(e) => updateOption("noise", e)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default OptionBar;
