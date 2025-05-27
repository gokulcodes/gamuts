import { useContext, type ReactElement } from "react";
import { BiCircle, BiRectangle } from "react-icons/bi";
import { BsEraser } from "react-icons/bs";
import { CiText } from "react-icons/ci";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { IoImageOutline, IoTriangleOutline } from "react-icons/io5";
import { TbBallpen, TbLine } from "react-icons/tb";
import gamutsLogo from "/gamuts_logo.svg";
import AppController from "../../controllers/AppController";
import { Circle, Rect, RegularPolygon } from "react-konva";

type ToolTypes = {
  id: number;
  name: string;
  icon: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  action: Function;
};

function ToolRenderer(props: { tool: ToolTypes }) {
  const tool = props.tool;
  return (
    <button
      title={tool.name}
      className="text-3xl p-4 rounded-xl cursor-pointer hover:bg-white/10"
      onClick={() => tool.action()}
    >
      {tool.icon}
    </button>
  );
}

function Toolbar() {
  const { state, dispatch } = useContext(AppController);
  function CreateShapes(shapeName: "Rect" | "Circle" | "Triangle") {
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
          draggable: true,
          render: function () {
            return <Rect {...this} />;
          },
        };
        structures = [...structures, shape];
        break;
      case "Circle":
        shape = {
          x: 400,
          y: 400,
          width: 200,
          height: 200,
          sides: 0,
          radius: 100,
          fill: "white",
          draggable: true,
          render: function () {
            return <Circle {...this} />;
          },
        };
        structures = [...structures, shape];
        break;
      case "Triangle":
        shape = {
          x: 600,
          y: 600,
          width: 200,
          height: 200,
          sides: 3,
          radius: 80,
          fill: "white",
          draggable: true,
          render: function () {
            return <RegularPolygon {...this} />;
          },
        };
        structures = [...structures, shape];
        break;
    }
    dispatch({
      type: "mutateStructures",
      payload: { ...state, structures: structures },
    });
  }

  const Tools: Array<ToolTypes> = [
    {
      id: 1,
      name: "Rectangle",
      icon: <BiRectangle />,
      action: () => CreateShapes("Rect"),
    },
    {
      id: 2,
      name: "Circle",
      icon: <BiCircle />,
      action: () => CreateShapes("Circle"),
    },
    {
      id: 3,
      name: "Triangle",
      icon: <IoTriangleOutline />,
      action: () => CreateShapes("Triangle"),
    },
    {
      id: 4,
      name: "Line",
      icon: <TbLine />,
      action: () => {},
    },
    {
      id: 5,
      name: "Arrow",
      icon: <HiOutlineArrowUpRight />,
      action: () => {},
    },
    {
      id: 6,
      name: "Text",
      icon: <CiText />,
      action: () => {},
    },
    {
      id: 7,
      name: "Pen Tool",
      icon: <TbBallpen />,
      action: () => {},
    },
    {
      id: 8,
      name: "Image",
      icon: <IoImageOutline />,
      action: () => {},
    },
    {
      id: 9,
      name: "Eraser",
      icon: <BsEraser />,
      action: () => {},
    },
  ];
  return (
    <aside className="absolute z-50  right-4 transition-all h-full flex flex-col items-center justify-center">
      <div className="flex flex-col shadow-2xl animate-toolbarOpen items-center justify-center border border-white/10 bg-foreground px-2 py-6 rounded-2xl">
        {Tools.map((tool) => (
          <ToolRenderer tool={tool} />
        ))}
      </div>
      <a href="/" className="absolute bottom-5">
        <img src={gamutsLogo} className="logo" alt="Vite logo" />
      </a>
    </aside>
  );
}

export default Toolbar;
