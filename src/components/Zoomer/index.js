import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useControls } from "react-zoom-pan-pinch";
export default function Zoomer(props) {
    const { zoomIn, zoomOut } = useControls();
    const zoomPercentage = Math.round(props.zoomLevel * 100);
    const ZOOM_STEP = 0.2;
    return (_jsxs("div", { className: "absolute select-none z-50 flex items-center gap-2 justify-center h-10  left-5 bottom-5", children: [_jsx("button", { onClick: () => zoomOut(ZOOM_STEP), className: "bg-foreground/80 backdrop-blur-2xl border-white/10 hover:text-green-400 border cursor-pointer rounded-md h-full px-4", children: _jsx(FaMinus, {}) }), _jsxs("p", { className: "bg-foreground/80 backdrop-blur-2xl rounded-md h-full border-white/10 border text-center flex items-center px-4", children: [zoomPercentage, "%"] }), _jsx("button", { onClick: () => zoomIn(ZOOM_STEP), className: "bg-foreground/80 backdrop-blur-2xl border-white/10 hover:text-green-400 border cursor-pointer rounded-md h-full px-4", children: _jsx(FaPlus, {}) })] }));
}
