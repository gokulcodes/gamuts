import { FaMinus, FaPlus } from "react-icons/fa";
import { useControls } from "react-zoom-pan-pinch";
export default function Zoomer(props: { zoomLevel: number }) {
  const { zoomIn, zoomOut } = useControls();
  const zoomPercentage = Math.round(props.zoomLevel * 100);
  return (
    <div className="absolute select-none z-50 flex items-center gap-2 justify-center h-10  left-5 bottom-5">
      <button
        onClick={() => zoomOut()}
        className="bg-foreground border-white/10 border cursor-pointer rounded-md h-full px-4"
      >
        <FaMinus />
      </button>
      <p className="bg-foreground rounded-md h-full border-white/10 border text-center flex items-center px-4">
        {zoomPercentage}%
      </p>
      <button
        onClick={() => zoomIn()}
        className="bg-foreground border-white/10 border cursor-pointer rounded-md h-full px-4"
      >
        <FaPlus />
      </button>
    </div>
  );
}
