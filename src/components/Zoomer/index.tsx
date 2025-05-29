import { FaMinus, FaPlus } from "react-icons/fa";
import { useControls } from "react-zoom-pan-pinch";
export default function Zoomer(props: { zoomLevel: number }) {
  const { zoomIn, zoomOut } = useControls();
  const zoomPercentage = Math.round(props.zoomLevel * 100);
  const ZOOM_STEP = 0.2;
  return (
    <div className="absolute select-none z-50 flex items-center gap-2 justify-center h-10  left-5 bottom-5">
      <button
        onClick={() => zoomOut(ZOOM_STEP)}
        className="bg-foreground/80 text-xs  backdrop-blur-2xl border-white/10 hover:text-green-400 border cursor-pointer rounded-md h-full px-3"
      >
        <FaMinus />
      </button>
      <p className="bg-foreground/80 text-xs backdrop-blur-2xl rounded-md h-full border-white/10 border text-center flex items-center px-3">
        {zoomPercentage}%
      </p>
      <button
        onClick={() => zoomIn(ZOOM_STEP)}
        className="bg-foreground/80 text-xs  backdrop-blur-2xl border-white/10 hover:text-green-400 border cursor-pointer rounded-md h-full px-3"
      >
        <FaPlus />
      </button>
    </div>
  );
}
