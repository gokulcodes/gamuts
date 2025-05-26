import type { ReactElement } from "react";
import {
  BiArrowFromRight,
  BiCircle,
  BiOutline,
  BiPolygon,
  BiRectangle,
} from "react-icons/bi";

type ToolTypes = {
  id: number;
  name: string;
  icon: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  action: Function;
};

const Tools: Array<ToolTypes> = [
  {
    id: 1,
    name: "Rectangle",
    icon: <BiRectangle />,
    action: () => {},
  },
  {
    id: 2,
    name: "Circle",
    icon: <BiCircle />,
    action: () => {},
  },
  {
    id: 3,
    name: "Polygon",
    icon: <BiPolygon />,
    action: () => {},
  },
  {
    id: 4,
    name: "Line",
    icon: <BiOutline />,
    action: () => {},
  },
  {
    id: 5,
    name: "Arrow",
    icon: <BiArrowFromRight />,
    action: () => {},
  },
];

function ToolRenderer(props: { tool: ToolTypes }) {
  return <button>{props.tool.icon}</button>;
}

function Toolbar() {
  return (
    <aside className="absolute right-4">
      <div className="h-full bg-gray-950 p-2">
        {Tools.map((tool) => (
          <ToolRenderer tool={tool} />
        ))}
      </div>
    </aside>
  );
}

export default Toolbar;
