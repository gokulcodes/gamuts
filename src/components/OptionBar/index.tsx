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
import { TbJoinBevel, TbJoinRound, TbJoinStraight } from "react-icons/tb";
import { RiEditCircleLine, RiExportLine } from "react-icons/ri";
import { IoColorFilterOutline } from "react-icons/io5";

function OptionBar(props: { canvasRef: Konva.Stage | null }) {
  const { canvasRef } = props;
  const { state, dispatch } = useContext(AppController);
  const [activeTab, setActiveTab] = useState(0);
  // const [canvasColor, setCanvasColor] = useState("");
  const { structures, selectedShapes } = state;
  const filterAdd = useRef<Set<Filter>>(new Set());
  const [optionState, dispatcher] = useReducer(reducer, initialOptionState);
  const topGradientRef = useRef<HTMLDivElement>(null);
  const bottomGradientRef = useRef<HTMLDivElement>(null);
  const previousScrollTop = useRef<number>(0);
  const [exportType, setExportType] = useState("jpeg");
  const optionRef = useRef<HTMLDivElement>(null);

  const updateShapeStyle = useCallback(() => {
    const allStruct = structures;
    for (const index of selectedShapes) {
      if (allStruct.length <= index) return;
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
      allStruct[index].filters = [...new Array(...filterAdd.current)];
      allStruct[index].blurRadius = optionState.blur;
      allStruct[index].brightness = optionState.brightness / 100;
      allStruct[index].contrast = optionState.contrast;
      allStruct[index].enhance = optionState.enhance / 100;
      allStruct[index].grayscale = optionState.grayscale;
      allStruct[index].hue = optionState.HSL_hue;
      allStruct[index].saturation = optionState.HSL_saturation;
      allStruct[index].luminance = optionState.HSL_luminance;
      allStruct[index].red = optionState.RGB_red;
      allStruct[index].blue = optionState.RGB_blue;
      allStruct[index].green = optionState.RGB_green;
      allStruct[index].alpha = 1 - optionState.RGB_alpha / 100;
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
  }, [optionState, updateShapeStyle]);

  function updateOption(optionName: string, value: string) {
    switch (optionName) {
      case "fill":
        dispatcher({
          type: "fill",
          payload: { ...optionState, fill: value },
        });
        break;
      case "borderWidth":
        dispatcher({
          type: "borderWidth",
          payload: {
            ...optionState,
            borderWidth: parseInt(value),
          },
        });
        break;
      case "borderColor":
        dispatcher({
          type: "borderColor",
          payload: {
            ...optionState,
            borderColor: value,
          },
        });
        break;
      case "borderRadius":
        dispatcher({
          type: "borderRadius",
          payload: {
            ...optionState,
            borderRadius: parseInt(value),
          },
        });
        break;
      case "borderStyle":
        if (value === "solid") {
          dispatcher({
            type: "borderStyle",
            payload: {
              ...optionState,
              borderStyle: [],
            },
          });
          return;
        }
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
            opacity: parseInt(value),
          },
        });
        break;
      case "shadowBlur":
        dispatcher({
          type: "shadowBlur",
          payload: {
            ...optionState,
            shadowBlur: parseInt(value),
          },
        });
        break;
      case "shadowColor":
        dispatcher({
          type: "shadowColor",
          payload: {
            ...optionState,
            shadowColor: value,
          },
        });
        break;
      case "shadowOffsetX":
        dispatcher({
          type: "shadowOffsetX",
          payload: {
            ...optionState,
            shadowOffsetX: parseInt(value),
          },
        });
        break;
      case "shadowOffsetY":
        dispatcher({
          type: "shadowOffsetY",
          payload: {
            ...optionState,
            shadowOffsetY: parseInt(value),
          },
        });
        break;
      case "shadowOpacity":
        dispatcher({
          type: "shadowOpacity",
          payload: {
            ...optionState,
            shadowOpacity: parseInt(value),
          },
        });
        break;
      case "blendMode":
        dispatcher({
          type: "blendMode",
          payload: {
            ...optionState,
            blendMode: value,
          },
        });
        break;
      case "lineJoins":
        dispatcher({
          type: "lineJoins",
          payload: {
            ...optionState,
            lineJoins: value,
          },
        });
        break;
      case "blur":
        filterAdd.current.add(Konva.Filters.Blur);
        dispatcher({
          type: "blur",
          payload: {
            ...optionState,
            blur: parseInt(value),
          },
        });
        break;
      case "brightness":
        filterAdd.current.add(Konva.Filters.Brighten);
        dispatcher({
          type: "brightness",
          payload: {
            ...optionState,
            brightness: parseInt(value),
          },
        });
        break;
      case "contrast":
        filterAdd.current.add(Konva.Filters.Contrast);
        console.log(value, filterAdd.current);
        dispatcher({
          type: "contrast",
          payload: {
            ...optionState,
            contrast: parseInt(value),
          },
        });
        break;
      case "enhance":
        filterAdd.current.add(Konva.Filters.Enhance);
        dispatcher({
          type: "enhance",
          payload: {
            ...optionState,
            enhance: parseInt(value),
          },
        });
        break;
      case "grayscale":
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
        filterAdd.current.add(Konva.Filters.HSL);
        dispatcher({
          type: "HSL_hue",
          payload: {
            ...optionState,
            HSL_hue: parseInt(value),
          },
        });
        break;
      case "HSL_saturation":
        filterAdd.current.add(Konva.Filters.HSL);
        dispatcher({
          type: "HSL_saturation",
          payload: {
            ...optionState,
            HSL_saturation: parseInt(value),
          },
        });
        break;
      case "HSL_luminance":
        filterAdd.current.add(Konva.Filters.HSL);
        dispatcher({
          type: "HSL_luminance",
          payload: {
            ...optionState,
            HSL_luminance: parseInt(value),
          },
        });
        break;
      case "RGB_red":
        filterAdd.current.add(Konva.Filters.RGBA);
        dispatcher({
          type: "RGB_red",
          payload: {
            ...optionState,
            RGB_red: parseInt(value),
          },
        });
        break;
      case "RGB_green":
        filterAdd.current.add(Konva.Filters.RGBA);
        dispatcher({
          type: "RGB_green",
          payload: {
            ...optionState,
            RGB_green: parseInt(value),
          },
        });
        break;
      case "RGB_blue":
        filterAdd.current.add(Konva.Filters.RGBA);
        dispatcher({
          type: "RGB_blue",
          payload: {
            ...optionState,
            RGB_blue: parseInt(value),
          },
        });
        break;
      case "RGB_alpha":
        filterAdd.current.add(Konva.Filters.RGBA);
        dispatcher({
          type: "RGB_alpha",
          payload: {
            ...optionState,
            RGB_alpha: parseInt(value),
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
        if (optionState.KAL_angle == 0 && parseInt(value) == 0)
          filterAdd.current.delete(Konva.Filters.Kaleidoscope);
        else filterAdd.current.add(Konva.Filters.Kaleidoscope);
        dispatcher({
          type: "KAL_power",
          payload: {
            ...optionState,
            KAL_power: parseInt(value),
          },
        });
        break;
      case "KAL_angle":
        if (optionState.KAL_power == 0 && parseInt(value) == 0)
          filterAdd.current.delete(Konva.Filters.Kaleidoscope);
        else filterAdd.current.add(Konva.Filters.Kaleidoscope);
        dispatcher({
          type: "KAL_angle",
          payload: {
            ...optionState,
            KAL_angle: parseInt(value),
          },
        });
        break;
      case "mask":
        filterAdd.current.add(Konva.Filters.Mask);
        dispatcher({
          type: "mask",
          payload: {
            ...optionState,
            mask: parseInt(value),
          },
        });
        break;
      case "noise":
        filterAdd.current.add(Konva.Filters.Noise);
        dispatcher({
          type: "noise",
          payload: {
            ...optionState,
            noise: parseInt(value),
          },
        });
        break;
    }
  }

  function handleGradientVisibility(
    event: React.UIEvent<HTMLDivElement, UIEvent>
  ) {
    if (!bottomGradientRef.current || !topGradientRef.current) {
      return;
    }
    const target = event.target as HTMLDivElement;
    if (target.clientHeight >= target.scrollHeight) {
      bottomGradientRef.current.style.opacity = "0";
      topGradientRef.current.style.opacity = "0";
      return;
    }
    const currentScrollTop = target.scrollTop;
    if (currentScrollTop > previousScrollTop.current) {
      bottomGradientRef.current.style.opacity = "0";
      topGradientRef.current.style.opacity = "1";
    } else if (currentScrollTop < previousScrollTop.current) {
      bottomGradientRef.current.style.opacity = "1";
      topGradientRef.current.style.opacity = "0";
    }

    previousScrollTop.current = currentScrollTop;
  }

  function downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div
      id="optionbar"
      ref={optionRef}
      onScroll={handleGradientVisibility}
      className="pointer-events-auto cursor-crosshair overflow-auto absolute select-none right-0 h-full max-w-xs w-xs border z-10 border-white/10 animate-optionOpen bg-foreground/80 backdrop-blur-2xl"
    >
      <div className="w-full sticky bg-foreground/80 backdrop-blur-2xl top-0 left-0 z-50">
        <div className="w-full mb-3 flex justify-between border-b border-white/10">
          <button
            onClick={() => setActiveTab(0)}
            className={`w-full text-xs py-3 m-0.5 flex items-center justify-center gap-1 cursor-pointer ${
              activeTab == 0 ? "bg-green-800/5 text-green-400" : ""
            } `}
          >
            <RiEditCircleLine fontSize={18} />
            Styles
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`w-full text-xs py-3 m-0.5 flex items-center justify-center gap-1 cursor-pointer ${
              activeTab == 1 ? "bg-green-800/5 text-green-400" : ""
            } `}
          >
            <IoColorFilterOutline fontSize={18} />
            Filters
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`w-full text-xs py-3 m-0.5 flex items-center justify-center gap-1 cursor-pointer ${
              activeTab == 2 ? "bg-green-800/5 text-green-400" : ""
            } `}
          >
            <RiExportLine fontSize={18} />
            Export
          </button>
        </div>
      </div>
      <div
        ref={topGradientRef}
        className="h-30 opacity-0 pointer-events-none w-full bg-gradient-to-b z-50 from-foreground to-transparent sticky top-12 animate-opacity"
      />
      {activeTab === 0 ? (
        <div className="flex animate-openUp relative -top-28 flex-col gap-4">
          {/* FIll */}
          <div className="flex px-5 items-center justify-between">
            <p>Fill</p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => updateOption("fill", "transparent")}
                className="w-10 cursor-pointer h-5 border overflow-hidden bg-white border-black relative"
              >
                <div className="border border-red-400 rotate-[22deg] left-0 w-full top-2 absolute" />
              </button>
              {/* <input type="color" defaultValue="#00000000" value="#00000000" /> */}
              <input
                type="color"
                onChange={(e) => updateOption("fill", e.target.value)}
              />
            </div>
          </div>
          {/* BORDER */}
          <div className="flex border-t px-5 border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <div className="flex w-full justify-between">
              <p>Border</p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => updateOption("borderColor", "transparent")}
                  className="w-10 cursor-pointer h-5 border overflow-hidden bg-white border-black relative"
                >
                  <div className="border border-red-400 rotate-[22deg] left-0 w-full top-2 absolute" />
                </button>
                <input
                  value={optionState.borderColor}
                  type="color"
                  onChange={(e) => updateOption("borderColor", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="flex gap-10 items-center w-full">
                <label
                  className="text-sm opacity-80 w-26"
                  htmlFor="borderstyle"
                >
                  Style
                </label>
                <select
                  id="borderstyle"
                  // value={optionState.borderStyle}
                  onChange={(e) => updateOption("borderStyle", e.target.value)}
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                >
                  <option value="solid">Solid</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
              <div className="flex gap-10 items-center w-full">
                <label className="text-sm opacity-80 w-26" htmlFor="width">
                  Width
                </label>
                <input
                  id="width"
                  min={0}
                  max={100}
                  type="number"
                  value={optionState.borderWidth}
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("borderWidth", e.target.value)}
                />
              </div>
              <div className="flex gap-10 items-center w-full">
                <label className="text-sm opacity-80 w-26" htmlFor="radius">
                  Radius
                </label>
                <input
                  id="radius"
                  type="number"
                  min={0}
                  max={100}
                  value={optionState.borderRadius}
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("borderRadius", e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* OPACITY */}
          <div className="flex px-5 items-center justify-between">
            <p>Opacity </p>
            <input
              step={10}
              min={0}
              max={100}
              type="number"
              value={optionState.opacity}
              className="border w-20 border-white/10 rounded-md outline-none px-2"
              onChange={(e) => updateOption("opacity", e.target.value)}
            />
          </div>
          {/* SHADOW */}
          <div className="flex px-5 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <div className="flex w-full justify-between">
              <p>Shadow</p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => updateOption("shadowColor", "transparent")}
                  className="w-10 cursor-pointer h-5 border overflow-hidden bg-white border-black relative"
                >
                  <div className="border border-red-400 rotate-[22deg] left-0 w-full top-2 absolute" />
                </button>
                <input
                  type="color"
                  value={optionState.shadowColor}
                  onChange={(e) => updateOption("shadowColor", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-4 ">
              <div className="flex flex-row gap-10 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="opacity">
                  OffsetX
                </label>
                <input
                  type="number"
                  placeholder="x"
                  value={optionState.shadowOffsetX}
                  className="border border-white/10 rounded-md px-2 outline-none w-full"
                  onChange={(e) =>
                    updateOption("shadowOffsetX", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-row gap-10 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="opacity">
                  OffsetX
                </label>
                <input
                  type="number"
                  placeholder="y"
                  value={optionState.shadowOffsetY}
                  className="border border-white/10 rounded-md px-2 outline-none w-full"
                  onChange={(e) =>
                    updateOption("shadowOffsetY", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-row gap-10 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="blur">
                  Blur
                </label>
                <input
                  type="number"
                  value={optionState.shadowBlur}
                  id="blur"
                  min={0}
                  max={100}
                  placeholder="blur"
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("shadowBlur", e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-10 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="opacity">
                  Opacity
                </label>
                <input
                  id="opacity"
                  type="number"
                  min={0}
                  max={100}
                  value={optionState.shadowOpacity}
                  placeholder="opacity"
                  className="border border-white/10 rounded-md outline-none px-2 w-full"
                  onChange={(e) =>
                    updateOption("shadowOpacity", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* LINE JOINS */}
          <div className="flex px-5 border-b border-white/10 pb-4 flex-row items-center gap-4 justify-between">
            <p>Line Joins</p>
            <div className="flex gap-2">
              <button
                onClick={() => updateOption("lineJoins", "miter")}
                className={`border ${
                  optionState.lineJoins === "miter" ? "bg-white/10" : ""
                } p-2 border-white/10 cursor-pointer rounded-lg hover:bg-white/5`}
              >
                <TbJoinStraight />
              </button>
              <button
                onClick={() => updateOption("lineJoins", "bevel")}
                className={`border ${
                  optionState.lineJoins === "bevel" ? "bg-white/10" : ""
                } p-2 border-white/10 cursor-pointer rounded-lg hover:bg-white/5`}
              >
                <TbJoinBevel />
              </button>
              <button
                onClick={() => updateOption("lineJoins", "round")}
                className={`border ${
                  optionState.lineJoins === "round" ? "bg-white/10" : ""
                } p-2 border-white/10 cursor-pointer rounded-lg hover:bg-white/5`}
              >
                <TbJoinRound />
              </button>
            </div>
            {/* <select
              onChange={(e) => updateOption("lineJoins", e.target.value)}
              className="border capitalize px-2 rounded-md outline-none border-white/10"
            >
              <option value="miter">miter</option>
              <option value="bevel">Bevel</option>
              <option value="round">round</option>
            </select> */}
          </div>
          {/* BLEND MODE */}
          <div className="flex px-5 pb-8 items-center justify-between">
            <p>Blend mode</p>
            <div className="flex gap-2">
              <select
                onChange={(e) => updateOption("blendMode", e.target.value)}
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
      ) : activeTab === 1 ? (
        <div className="flex animate-openUp relative -top-28 flex-col gap-4">
          <div className="flex flex-col w-full gap-4">
            <div className="flex px-5 flex-row items-start gap-4 justify-between">
              <p>Blur</p>
              <input
                type="number"
                value={optionState.blur}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("blur", e.target.value)}
              />
            </div>
            <div className="flex px-5 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between">
              <p>Brightness</p>
              <input
                type="number"
                value={optionState.brightness}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("brightness", e.target.value)}
              />
            </div>
            <div className="flex px-5 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between">
              <p>Contrast</p>
              <input
                type="number"
                value={optionState.contrast}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("contrast", e.target.value)}
              />
            </div>
            <div className="flex px-5 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between">
              <p>Enhance</p>
              <input
                type="number"
                value={optionState.enhance}
                className="border px-2 rounded-md w-20 outline-none border-white/10"
                onChange={(e) => updateOption("enhance", e.target.value)}
              />
            </div>
          </div>
          <div className="flex px-5  border-t border-white/10 pt-4 gap-2 w-full justify-between">
            <p>Grayscale</p>
            <input
              type="checkbox"
              className="border border-white/10 w-20"
              onChange={(e) => updateOption("grayscale", e.target.value)}
            />
          </div>
          <div className="flex px-5 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <p>HSL</p>
            <div className="flex flex-col w-full gap-4 ">
              <div className="flex  flex-row gap-10 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="hue">
                  Hue
                </label>
                <input
                  type="number"
                  value={optionState.HSL_hue}
                  id="hue"
                  placeholder="Hue"
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("HSL_hue", e.target.value)}
                />
              </div>
              <div className="flex  flex-row gap-10 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="saturation">
                  Saturation
                </label>
                <input
                  id="saturation"
                  type="number"
                  value={optionState.HSL_saturation}
                  placeholder="opacity"
                  className="border border-white/10 rounded-md outline-none px-2 w-full"
                  onChange={(e) =>
                    updateOption("HSL_saturation", e.target.value)
                  }
                />
              </div>
              <div className="flex  flex-row gap-10 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="luminance">
                  Luminance
                </label>
                <input
                  id="luminance"
                  type="number"
                  placeholder="luminance"
                  value={optionState.HSL_luminance}
                  className="border border-white/10 rounded-md px-2 outline-none w-full"
                  onChange={(e) =>
                    updateOption("HSL_luminance", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex px-5 border-b border-white/10 pb-4 flex-col items-start gap-4 justify-between">
            <p>RGBA</p>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex  flex-row gap-2 items-center">
                  <label className="text-sm opacity-80 w-26" htmlFor="red">
                    Red
                  </label>
                  <input
                    type="number"
                    value={optionState.RGB_red}
                    id="red"
                    max={255}
                    min={0}
                    placeholder="Red"
                    className="border w-full border-white/10 rounded-md outline-none px-2"
                    onChange={(e) => updateOption("RGB_red", e.target.value)}
                  />
                </div>
                <div className="flex  flex-row gap-2 items-center">
                  <label className="text-sm opacity-80 w-26" htmlFor="blue">
                    Blue
                  </label>
                  <input
                    id="blue"
                    max={255}
                    min={0}
                    type="number"
                    value={optionState.RGB_blue}
                    placeholder="blue"
                    className="border border-white/10 rounded-md outline-none px-2 w-full"
                    onChange={(e) => updateOption("RGB_blue", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex  flex-row gap-2 items-center">
                  <label className="text-sm opacity-80 w-26" htmlFor="green">
                    Green
                  </label>
                  <input
                    id="green"
                    max={255}
                    min={0}
                    type="number"
                    placeholder="green"
                    value={optionState.RGB_green}
                    className="border border-white/10 rounded-md px-2 outline-none w-full"
                    onChange={(e) => updateOption("RGB_green", e.target.value)}
                  />
                </div>
                <div className="flex  flex-row gap-2 items-center">
                  <label className="text-sm opacity-80 w-26" htmlFor="alpha">
                    Alpha
                  </label>
                  <input
                    id="alpha"
                    type="number"
                    min={10}
                    max={100}
                    step={10}
                    placeholder="alpha"
                    value={optionState.RGB_alpha}
                    className="border border-white/10 rounded-md px-2 outline-none w-full"
                    onChange={(e) => updateOption("RGB_alpha", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-5 gap-2 w-full justify-between">
            <p>Invert</p>
            <input
              type="checkbox"
              className="border border-white/10 w-20"
              onChange={(e) => updateOption("invert", e.target.value)}
            />
          </div>
          <div className="flex px-5 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between">
            <p>Kaleidoscope</p>
            <div className="flex w-full gap-4 ">
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="power">
                  Power
                </label>
                <input
                  type="number"
                  value={optionState.KAL_power}
                  id="power"
                  placeholder="Power"
                  className="border w-full border-white/10 rounded-md outline-none px-2"
                  onChange={(e) => updateOption("KAL_power", e.target.value)}
                />
              </div>
              <div className="flex  flex-row gap-2 items-center">
                <label className="text-sm opacity-80 w-26" htmlFor="angle">
                  Angle
                </label>
                <input
                  id="angle"
                  type="number"
                  value={optionState.KAL_angle}
                  placeholder="Angle"
                  className="border border-white/10 rounded-md outline-none px-2 w-full"
                  onChange={(e) => updateOption("KAL_angle", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-5 gap-2 w-full justify-between">
            <p>Mask</p>
            <input
              type="number"
              step={10}
              value={optionState.mask}
              className="border px-2 rounded-md w-20 outline-none border-white/10"
              onChange={(e) => updateOption("mask", e.target.value)}
            />
          </div>
          <div className="flex px-5 border-t border-white/10 py-4 flex-row items-start gap-4 justify-between">
            <p>Noise</p>
            <input
              type="number"
              step={10}
              value={optionState.noise}
              className="border px-2 rounded-md w-20 outline-none border-white/10"
              onChange={(e) => updateOption("noise", e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="flex animate-openUp relative m-3 -top-32 flex-col gap-6">
          <div className="flex flex-col gap-3 items-start">
            <div className="flex items-center justify-between w-full">
              <p className="uppercase tracking-widest opacity-70 text-xs">
                Preview
              </p>
              <input
                type="color"
                onChange={(e) => {
                  if (canvasRef) {
                    canvasRef.container().style.backgroundColor =
                      e.target.value;
                  }
                }}
              />
            </div>
            <img
              src={canvasRef?.toDataURL()}
              className="w-full rounded-md h-40 border border-white/10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="uppercase tracking-widest opacity-70 text-xs"
              htmlFor="export"
            >
              Export as
            </label>
            <select
              id="export"
              value={exportType}
              onChange={(e) => setExportType(e.target.value)}
              className="border w-full border-white/10 rounded-md outline-none p-2"
            >
              {/* <option value="pdf">PDF</option> */}
              <option value="jpeg">JPG</option>
              {/* <option value="svg">SVG</option> */}
              <option value="png">PNG</option>
            </select>
          </div>
          <button
            onClick={() => {
              const imageURI = canvasRef?.toDataURL({
                mimeType: `image/${exportType}`,
              });
              if (imageURI) downloadURI(imageURI, "canvas");
            }}
            className="w-full bg-gradient-to-b cursor-pointer hover:brightness-125 transition-all from-green-700 to-green-900 text-sm p-3 rounded-lg "
          >
            Export
          </button>
        </div>
      )}
      {/* <div
        ref={bottomGradientRef}
        className="h-30 pointer-events-none w-full bg-gradient-to-t from-foreground to-transparent sticky bottom-0 animate-opacity"
      /> */}
    </div>
  );
}

export default OptionBar;
