import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { BiCircle, BiRectangle } from "react-icons/bi";
import { BsEraser } from "react-icons/bs";
import { CiText } from "react-icons/ci";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { IoImageOutline, IoTriangleOutline } from "react-icons/io5";
import { TbBallpen, TbLine } from "react-icons/tb";
import gamutsLogo from "/gamuts_logo.svg";
import AppController from "../../controllers/AppController";
import { LuMousePointer2 } from "react-icons/lu";
import useImage from "use-image";
import { TOOL } from "../../libs";
import OptionBar from "../OptionBar";
function ToolRenderer(props) {
    const tool = props.tool;
    return (_jsx("button", { title: tool.name, className: `text-2xl p-4 rounded-xl outline-none cursor-pointer ${props.isActive ? "bg-green-700/10 text-green-400" : ""} hover:bg-green-700/10 hover:text-green-400`, onClick: () => tool.action(), children: tool.icon }));
}
function Toolbar() {
    const { state, dispatch } = useContext(AppController);
    const [image] = useImage(gamutsLogo);
    function CreateShapes(shapeName) {
        let shape;
        let structures = state.structures;
        switch (shapeName) {
            case "Rect":
                shape = {
                    x: 400,
                    y: 400,
                    width: 200,
                    height: 200,
                    sides: 0,
                    radius: 0,
                    fill: "white",
                    points: [],
                    stroke: "transparent",
                    draggable: true,
                    shapeName: "rect",
                };
                structures = [...structures, shape];
                updateActiveTool(TOOL.RECT);
                break;
            case "Circle":
                shape = {
                    x: 400,
                    y: 400,
                    width: 200,
                    height: 200,
                    sides: 0,
                    stroke: "transparent",
                    radius: 100,
                    fill: "white",
                    draggable: true,
                    shapeName: "circle",
                };
                structures = [...structures, shape];
                updateActiveTool(TOOL.CIRCLE);
                break;
            case "Triangle":
                shape = {
                    x: 600,
                    y: 600,
                    width: 200,
                    height: 200,
                    sides: 3,
                    radius: 80,
                    stroke: "transparent",
                    fill: "white",
                    draggable: true,
                    shapeName: "polygon",
                };
                structures = [...structures, shape];
                updateActiveTool(TOOL.TRIANGLE);
                break;
            case "Arrow":
                shape = {
                    x: 600,
                    y: 600,
                    width: 200,
                    height: 200,
                    sides: 3,
                    points: [0, 0, 100, 100],
                    radius: 80,
                    image: image,
                    fill: "white",
                    stroke: "white",
                    draggable: true,
                    shapeName: "arrow",
                };
                structures = [...structures, shape];
                updateActiveTool(TOOL.ARROW);
                break;
            case "Image":
                if (!image)
                    break;
                shape = {
                    x: 600,
                    y: 600,
                    width: 200,
                    height: 200,
                    radius: 80,
                    image: image,
                    fill: "transparent",
                    sides: 4,
                    stroke: "transparent",
                    draggable: true,
                    shapeName: "image",
                };
                structures = [...structures, shape];
                updateActiveTool(TOOL.IMAGE);
                break;
        }
        dispatch({
            type: "mutateStructures",
            payload: { ...state, structures: structures },
        });
    }
    function updateActiveTool(tool) {
        dispatch({ type: "changeTool", payload: { ...state, activeTool: tool } });
    }
    const Tools = [
        {
            id: TOOL.SELECT,
            name: "Selector",
            icon: _jsx(LuMousePointer2, {}),
            action: () => {
                updateActiveTool(TOOL.SELECT);
            },
        },
        {
            id: TOOL.RECT,
            name: "Rectangle",
            icon: _jsx(BiRectangle, {}),
            action: () => CreateShapes("Rect"),
        },
        {
            id: TOOL.CIRCLE,
            name: "Circle",
            icon: _jsx(BiCircle, {}),
            action: () => CreateShapes("Circle"),
        },
        {
            id: TOOL.TRIANGLE,
            name: "Triangle",
            icon: _jsx(IoTriangleOutline, {}),
            action: () => CreateShapes("Triangle"),
        },
        {
            id: TOOL.LINE,
            name: "Line",
            icon: _jsx(TbLine, {}),
            action: () => {
                updateActiveTool(TOOL.LINE);
            },
        },
        {
            id: TOOL.ARROW,
            name: "Arrow",
            icon: _jsx(HiOutlineArrowUpRight, {}),
            action: () => CreateShapes("Arrow"),
        },
        {
            id: TOOL.TEXT,
            name: "Text",
            icon: _jsx(CiText, {}),
            action: () => { },
        },
        {
            id: TOOL.DRAW,
            name: "Pen Tool",
            icon: _jsx(TbBallpen, {}),
            action: () => {
                updateActiveTool(TOOL.DRAW);
            },
        },
        {
            id: TOOL.IMAGE,
            name: "Image",
            icon: _jsx(IoImageOutline, {}),
            action: () => CreateShapes("Image"),
        },
        {
            id: TOOL.ERASER,
            name: "Eraser",
            icon: _jsx(BsEraser, {}),
            action: () => {
                updateActiveTool(TOOL.ERASER);
            },
        },
    ];
    return (_jsxs("div", { className: "absolute z-50 right-4 pointer-events-none transition-all h-full ", children: [_jsxs("aside", { className: "gap-4 flex flex-row items-start pointer-events-auto justify-center relative top-1/3", children: [_jsx(OptionBar, {}), _jsx("div", { className: "flex flex-col z-0 backdrop-blur-2xl gap-1 shadow-2xl animate-toolbarOpen items-center justify-center border border-white/10 bg-foreground/60 p-2 rounded-2xl", children: Tools.map((tool) => (_jsx(ToolRenderer, { isActive: state.activeTool === tool.id, tool: tool }, tool.id))) })] }), _jsx("a", { href: "/", className: "absolute pointer-events-auto z-50 right-5 bottom-5", children: _jsx("img", { src: gamutsLogo, className: "logo", alt: "Vite logo" }) })] }));
}
export default Toolbar;
