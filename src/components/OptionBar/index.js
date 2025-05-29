import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useContext, useEffect, useReducer, useRef, useState, } from "react";
import AppController from "../../controllers/AppController";
import { reducer, initialOptionState } from "./optionReducer";
import Konva from "konva";
function OptionBar() {
    const { state, dispatch } = useContext(AppController);
    const [activeTab, setActiveTab] = useState(0);
    const { structures, selectedShapes } = state;
    const filterAdd = useRef(new Set());
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
    function updateOption(optionName, event) {
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
                if (event.target.value === "solid")
                    return;
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
                else
                    filterAdd.current.delete(Konva.Filters.Grayscale);
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
                if (!optionState.invert)
                    filterAdd.current.add(Konva.Filters.Invert);
                else
                    filterAdd.current.delete(Konva.Filters.Invert);
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
    return (_jsxs("div", { id: "optionbar", style: {
            height: "fit-content",
            // top: `${optionsAnchor.y - 40}px`,
            // left: `${optionsAnchor.x}px`,
            // width: `${optionsAnchor.width + optionsAnchor.width}px`,
        }, className: "shadow-2xl select-none h-full max-h-3xl transition-all max-w-lg w-lg border z-10 border-white/10 rounded-2xl animate-optionOpen bg-foreground/80 backdrop-blur-2xl", children: [_jsxs("div", { className: "m-4 flex justify-between border border-white/10 rounded-xl", children: [_jsx("button", { onClick: () => setActiveTab(0), className: `w-full uppercase text-xs tracking-widest p-4 m-1 rounded-xl cursor-pointer ${activeTab == 0 ? "bg-green-800/10 text-green-400" : ""} `, children: "Edit styles" }), _jsx("button", { onClick: () => setActiveTab(1), className: `w-full uppercase text-xs tracking-widest p-4 m-1 rounded-xl cursor-pointer ${activeTab == 1 ? "bg-green-800/10 text-green-400" : ""} `, children: "Filters" })] }), activeTab === 0 ? (_jsxs("div", { className: "flex animate-openUp flex-col gap-4", children: [_jsxs("div", { className: "flex px-8 items-center justify-between", children: [_jsx("p", { children: "Fill" }), _jsx("input", { type: "color", onChange: (e) => updateOption("fill", e) })] }), _jsxs("div", { className: "flex border-t px-8 border-b border-white/10 py-4 flex-col items-start gap-4 justify-between", children: [_jsxs("div", { className: "flex w-full justify-between", children: [_jsx("p", { children: "Border" }), _jsx("input", { value: optionState.borderColor, type: "color", onChange: (e) => updateOption("borderColor", e) })] }), _jsxs("div", { className: "flex w-full gap-2", children: [_jsxs("div", { className: "flex gap-2 items-center w-full", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "borderstyle", children: "Style" }), _jsxs("select", { id: "borderstyle", 
                                                // value={optionState.borderStyle}
                                                onChange: (e) => updateOption("borderStyle", e), className: "border w-full border-white/10 rounded-md outline-none px-2", children: [_jsx("option", { value: "solid", children: "Solid" }), _jsx("option", { value: "dotted", children: "Dotted" })] })] }), _jsxs("div", { className: "flex gap-2 items-center w-full", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "width", children: "Width" }), _jsx("input", { id: "width", type: "number", value: optionState.borderWidth, className: "border w-full border-white/10 rounded-md outline-none px-2", onChange: (e) => updateOption("borderWidth", e) })] }), _jsxs("div", { className: "flex gap-2 items-center w-full", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "radius", children: "Radius" }), _jsx("input", { id: "radius", type: "number", value: optionState.borderRadius, className: "border w-full border-white/10 rounded-md outline-none px-2", onChange: (e) => updateOption("borderRadius", e) })] })] })] }), _jsxs("div", { className: "flex px-8 items-center justify-between", children: [_jsx("p", { children: "Opacity " }), _jsx("input", { step: 10, min: 0, max: 100, type: "number", value: optionState.opacity, className: "border w-20 border-white/10 rounded-md outline-none px-2", onChange: (e) => updateOption("opacity", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between", children: [_jsxs("div", { className: "flex w-full justify-between", children: [_jsx("p", { children: "Shadow" }), _jsx("input", { type: "color", value: optionState.shadowColor, onChange: (e) => updateOption("shadowColor", e) })] }), _jsxs("div", { className: "flex flex-wrap w-full gap-4 ", children: [_jsxs("div", { className: "flex w-[47%] flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "blur", children: "Blur" }), _jsx("input", { type: "number", value: optionState.shadowBlur, id: "blur", placeholder: "blur", className: "border w-full border-white/10 rounded-md outline-none px-2", onChange: (e) => updateOption("shadowBlur", e) })] }), _jsxs("div", { className: "flex w-[47%] flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "opacity", children: "Opacity" }), _jsx("input", { id: "opacity", type: "number", value: optionState.shadowOpacity, placeholder: "opacity", className: "border border-white/10 rounded-md outline-none px-2 w-full", onChange: (e) => updateOption("shadowOpacity", e) })] }), _jsxs("div", { className: "flex w-[47%] flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "opacity", children: "OffsetX" }), _jsx("input", { type: "number", placeholder: "x", value: optionState.shadowOffsetX, className: "border border-white/10 rounded-md px-2 outline-none w-full", onChange: (e) => updateOption("shadowOffsetX", e) })] }), _jsxs("div", { className: "flex w-[47%] flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "opacity", children: "OffsetX" }), _jsx("input", { type: "number", placeholder: "y", value: optionState.shadowOffsetY, className: "border border-white/10 rounded-md px-2 outline-none w-full", onChange: (e) => updateOption("shadowOffsetY", e) })] })] })] }), _jsxs("div", { className: "flex px-8 border-b border-white/10 pb-4 flex-row items-start gap-4 justify-between", children: [_jsx("p", { children: "Line Joins" }), _jsxs("select", { onChange: (e) => updateOption("lineJoins", e), className: "border capitalize px-2 rounded-md outline-none border-white/10", children: [_jsx("option", { value: "bevel", children: "Bevel" }), _jsx("option", { value: "miter", children: "miter" }), _jsx("option", { value: "round", children: "round" })] })] }), _jsxs("div", { className: "flex px-8 pb-8 items-center justify-between", children: [_jsx("p", { children: "Blend mode" }), _jsx("div", { className: "flex gap-2", children: _jsxs("select", { onChange: (e) => updateOption("blendMode", e), className: "border capitalize px-2 rounded-md outline-none border-white/10", children: [_jsx("option", { value: "lighter", children: "lighter" }), _jsx("option", { value: "multiply", children: "multiply" }), _jsx("option", { value: "screen", children: "screen" }), _jsx("option", { value: "overlay", children: "overlay" }), _jsx("option", { value: "color-dodge", children: "color-dodge" }), _jsx("option", { value: "color-burn", children: "color-burn" }), _jsx("option", { value: "hard-light", children: "hard-light" }), _jsx("option", { value: "soft-light", children: "soft-light" }), _jsx("option", { value: "difference", children: "difference" }), _jsx("option", { value: "exclusion", children: "exclusion" }), _jsx("option", { value: "hue", children: "hue" }), _jsx("option", { value: "saturation", children: "saturation" }), _jsx("option", { value: "color", children: "color" }), _jsx("option", { value: "luminosity", children: "luminosity" })] }) })] })] })) : (_jsxs("div", { className: "flex animate-openUp flex-col gap-4", children: [_jsxs("div", { className: "flex px-8 flex-row items-start gap-4 justify-between", children: [_jsx("p", { children: "Blur" }), _jsx("input", { type: "number", value: optionState.blur, className: "border px-2 rounded-md w-20 outline-none border-white/10", onChange: (e) => updateOption("blur", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between", children: [_jsx("p", { children: "Brightness" }), _jsx("input", { type: "number", value: optionState.brightness, className: "border px-2 rounded-md w-20 outline-none border-white/10", onChange: (e) => updateOption("brightness", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between", children: [_jsx("p", { children: "Contrast" }), _jsx("input", { type: "number", value: optionState.contrast, className: "border px-2 rounded-md w-20 outline-none border-white/10", onChange: (e) => updateOption("contrast", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between", children: [_jsx("p", { children: "Enhance" }), _jsx("input", { type: "number", value: optionState.enhance, className: "border px-2 rounded-md w-20 outline-none border-white/10", onChange: (e) => updateOption("enhance", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-white/10 pt-4 flex-row items-start gap-4 justify-between", children: [_jsx("p", { children: "Grayscale" }), _jsx("input", { type: "checkbox", 
                                // value={optionState.grayscale}
                                className: "border border-white/10 w-20", onChange: (e) => updateOption("grayscale", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between", children: [_jsx("p", { children: "HSL" }), _jsxs("div", { className: "flex w-full gap-4 ", children: [_jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "hue", children: "Hue" }), _jsx("input", { type: "number", value: 1, id: "hue", placeholder: "Hue", className: "border w-full border-white/10 rounded-md outline-none px-2", onChange: (e) => updateOption("HSL_hue", e) })] }), _jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "saturation", children: "Saturation" }), _jsx("input", { id: "saturation", type: "number", value: 1, placeholder: "opacity", className: "border border-white/10 rounded-md outline-none px-2 w-full", onChange: (e) => updateOption("HSL_saturation", e) })] }), _jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "luminance", children: "Luminance" }), _jsx("input", { type: "number", placeholder: "luminance", value: 1, className: "border border-white/10 rounded-md px-2 outline-none w-full", onChange: (e) => updateOption("HSL_luminance", e) })] })] })] }), _jsxs("div", { className: "flex px-8 border-b border-white/10 pb-4 flex-col items-start gap-4 justify-between", children: [_jsx("p", { children: "RGB" }), _jsxs("div", { className: "flex w-full gap-4 ", children: [_jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "red", children: "Red" }), _jsx("input", { type: "number", value: 1, id: "red", placeholder: "Red", className: "border w-full border-white/10 rounded-md outline-none px-2", onChange: (e) => updateOption("RGB_red", e) })] }), _jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "blue", children: "Blue" }), _jsx("input", { id: "blue", type: "number", value: 1, placeholder: "blue", className: "border border-white/10 rounded-md outline-none px-2 w-full", onChange: (e) => updateOption("RGB_blue", e) })] }), _jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "green", children: "Green" }), _jsx("input", { id: "green", type: "number", placeholder: "green", value: 1, className: "border border-white/10 rounded-md px-2 outline-none w-full", onChange: (e) => updateOption("RGB_green", e) })] })] })] }), _jsxs("div", { className: "flex px-8 gap-2 w-full justify-between", children: [_jsx("p", { children: "Invert" }), _jsx("input", { type: "checkbox", className: "border border-white/10 w-20", onChange: (e) => updateOption("invert", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-b border-white/10 py-4 flex-col items-start gap-4 justify-between", children: [_jsx("p", { children: "Kaleidoscope" }), _jsxs("div", { className: "flex w-full gap-4 ", children: [_jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "power", children: "Power" }), _jsx("input", { type: "number", value: optionState.KAL_power, id: "power", placeholder: "Power", className: "border w-full border-white/10 rounded-md outline-none px-2", onChange: (e) => updateOption("KAL_power", e) })] }), _jsxs("div", { className: "flex  flex-row gap-2 items-center", children: [_jsx("label", { className: "text-sm opacity-80", htmlFor: "angle", children: "Angle" }), _jsx("input", { id: "angle", type: "number", value: optionState.KAL_angle, placeholder: "Angle", className: "border border-white/10 rounded-md outline-none px-2 w-full", onChange: (e) => updateOption("KAL_angle", e) })] })] })] }), _jsxs("div", { className: "flex px-8 gap-2 w-full justify-between", children: [_jsx("p", { children: "Mask" }), _jsx("input", { type: "number", value: optionState.mask, className: "border px-2 rounded-md w-20 outline-none border-white/10", onChange: (e) => updateOption("mask", e) })] }), _jsxs("div", { className: "flex px-8 border-t border-white/10 py-4 flex-row items-start gap-4 justify-between", children: [_jsx("p", { children: "Noise" }), _jsx("input", { type: "number", value: optionState.noise, className: "border px-2 rounded-md w-20 outline-none border-white/10", onChange: (e) => updateOption("noise", e) })] })] }))] }));
}
export default OptionBar;
