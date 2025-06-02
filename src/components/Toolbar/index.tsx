import { useContext, useRef, type ReactElement } from "react";
import { BiCircle, BiRectangle } from "react-icons/bi";
import { BsEraser, BsGithub } from "react-icons/bs";
import { CiText } from "react-icons/ci";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { IoImageOutline, IoTriangleOutline } from "react-icons/io5";
import { TbBallpen, TbLine } from "react-icons/tb";
import gamutsLogo from "/gamuts_logo.svg";
import AppController from "../../controllers/AppController";
import { LuMousePointer2 } from "react-icons/lu";
import { TOOL } from "../../libs";
import { CreateShapes } from "./utils";
import { GoSidebarExpand } from "react-icons/go";
// import { Circle, Rect, RegularPolygon } from "react-konva";

type ToolTypes = {
  id: string;
  name: string;
  // name:
  //   | "SELECT"
  //   | "RECT"
  //   | "CIRCLE"
  //   | "TRIANGLE"
  //   | "LINE"
  //   | "ARROW"
  //   | "TEXT"
  //   | "DRAW"
  //   | "IMAGE"
  //   | "ERASER";
  icon: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  action: Function;
};

function ToolRenderer(props: { tool: ToolTypes; isActive: boolean }) {
  const tool = props.tool;
  const fileRef = useRef<HTMLInputElement>(null);
  // const [image, setImage] = useState(null);
  // console.log(tool);
  if (tool.id === TOOL.IMAGE) {
    function handleImagePicker(e: React.ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        tool.action(event.target?.result);
        // setImage(event.target?.result);
      };
      // setImage(e.target.files[0]);
    }
    return (
      // <button
      //   title={tool.name}
      //   className={`text-xl pointer-events-none p-3 rounded-xl outline-none cursor-pointer ${
      //     props.isActive ? "bg-green-700/10 text-green-400" : ""
      //   } hover:bg-green-700/10 hover:text-green-400`}
      //   // onClick={() => fileRef.current?.onchange()}
      // >
      <>
        <label
          className={`text-base p-3 rounded-xl outline-none cursor-pointer ${
            props.isActive ? "bg-green-700/5 text-green-300" : ""
          } hover:bg-green-700/5 hover:text-green-300`}
          htmlFor="fileInput"
        >
          {tool.icon}
        </label>
        <input
          id="fileInput"
          type="file"
          ref={fileRef}
          onChange={handleImagePicker}
          className="opacity w-0 h-0"
        ></input>
      </>
      // </button>
    );
  }
  return (
    <button
      title={tool.name}
      className={`text-base p-3 rounded-xl outline-none cursor-pointer ${
        props.isActive ? "bg-green-700/5 text-green-300" : ""
      } hover:bg-green-700/5 hover:text-green-300`}
      onClick={() => tool.action()}
    >
      {tool.icon}
    </button>
  );
}

function Toolbar() {
  const { state, dispatch } = useContext(AppController);
  const toolBarRef = useRef<HTMLDivElement>(null);

  function callShapeGenerator(
    shapeType: string,
    image: HTMLImageElement | null | string = null
  ) {
    CreateShapes(shapeType, dispatch, state, image);
  }

  function updateActiveTool(tool: string) {
    dispatch({ type: "changeTool", payload: { ...state, activeTool: tool } });
  }

  const Tools: Array<ToolTypes> = [
    {
      id: TOOL.SELECT,
      name: "Selector",
      icon: <LuMousePointer2 />,
      action: () => {
        updateActiveTool(TOOL.SELECT);
      },
    },
    {
      id: TOOL.RECT,
      name: "Rectangle",
      icon: <BiRectangle />,
      action: () => callShapeGenerator("Rect"),
    },
    {
      id: TOOL.CIRCLE,
      name: "Circle",
      icon: <BiCircle />,
      action: () => callShapeGenerator("Circle"),
    },
    {
      id: TOOL.TRIANGLE,
      name: "Triangle",
      icon: <IoTriangleOutline />,
      action: () => callShapeGenerator("Triangle"),
    },
    {
      id: TOOL.LINE,
      name: "Line",
      icon: <TbLine />,
      action: () => {
        updateActiveTool(TOOL.LINE);
      },
    },
    {
      id: TOOL.ARROW,
      name: "Arrow",
      icon: <HiOutlineArrowUpRight />,
      action: () => callShapeGenerator("Arrow"),
    },
    {
      id: TOOL.TEXT,
      name: "Text",
      icon: <CiText />,
      action: () => callShapeGenerator("Text"),
    },
    {
      id: TOOL.DRAW,
      name: "Pen Tool",
      icon: <TbBallpen />,
      action: () => {
        updateActiveTool(TOOL.DRAW);
      },
    },
    {
      id: TOOL.IMAGE,
      name: "Image",
      icon: <IoImageOutline />,
      action: (image: string) => callShapeGenerator("Image", image),
    },
    {
      id: TOOL.ERASER,
      name: "Eraser",
      icon: <BsEraser />,
      action: () => {
        updateActiveTool(TOOL.ERASER);
      },
    },
  ];

  function handleOptionCollapse() {
    dispatch({
      type: "optionbarVisible",
      payload: { ...state, optionbarVisible: true },
    });
  }

  return (
    <div className="absolute z-[1000] left-0 bottom-5 w-full transition-all ">
      <aside className="gap-4 flex flex-col w-full items-center justify-center relative top-1/4">
        <div
          ref={toolBarRef}
          className="flex flex-row z-0 backdrop-blur-2xl gap-1 shadow-2xl animate-toolbarOpen items-center justify-center border border-white/10 bg-foreground/60 p-2 rounded-2xl"
        >
          {Tools.map((tool) => (
            <ToolRenderer
              key={tool.id}
              isActive={state.activeTool === tool.id}
              tool={tool}
            />
          ))}
        </div>
      </aside>
      <div className="absolute flex items-center gap-2 pointer-events-auto z-50 right-5 bottom-0">
        {!state.optionbarVisible && (
          <button
            onClick={handleOptionCollapse}
            className="text-md cursor-pointer p-2 items-center bg-foreground/40 backdrop-blur-2xl border border-white/15 rounded-lg"
          >
            <GoSidebarExpand />
          </button>
        )}
        <a
          href="https://github.com/gokulcodes/gamuts"
          target="_blank"
          className="text-md p-2 items-center bg-foreground/40 backdrop-blur-2xl border border-white/15 rounded-lg"
        >
          <BsGithub />
        </a>
        <a href="/">
          <img src={gamutsLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
    </div>
  );
}

export default Toolbar;
