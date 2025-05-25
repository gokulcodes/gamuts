import gamutsLogo from "/gamuts_logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Konva from "konva";
import {
  Circle,
  Layer,
  Rect,
  Text,
  Stage,
  Transformer,
  Group,
  Line,
} from "react-konva";

// type Shape = {
//   id: number;
//   name: string;
//   isSelected: boolean;
//   coords: [number, number];
//   dimension: {
//     width: number;
//     height: number;
//   };
//   color: string;
// };
function App() {
  const canvasRef = useRef(null);
  // const mouseDown = useRef<React.MouseEvent | React.TouchEvent>(null);
  // const contextRef = useRef<CanvasRenderingContext2D>(null);
  // const [shapes, setShapes] = useState<Array<Shape>>([]);
  const rectRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!trRef.current || !rectRef.current) {
      return;
    }
    const ref = trRef.current;
    ref.nodes([rectRef.current]);
  }, []);

  function setCanvasSize() {
    if (!canvasRef.current) {
      return;
    }
    console.log(canvasRef.current);
    // const canvas = canvasRef.current;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
  }

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // const canvas = canvasRef.current;
    setCanvasSize();
    // const ctx = canvas.getContext("2d");
    // contextRef.current = ctx;
    // contextRef.current?.scale(2, 1);
    window.addEventListener("resize", setCanvasSize);
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [canvasRef]);

  // function handleMouseDown(event: React.MouseEvent | React.TouchEvent) {
  //   if (!canvasRef.current || !contextRef.current) {
  //     return;
  //   }
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   let clientX = 0,
  //     clientY = 0;
  //   if ("touches" in event) {
  //     clientX = event.touches[0].clientX;
  //     clientY = event.touches[0].clientY;
  //   } else {
  //     clientX = event.clientX;
  //     clientY = event.clientY;
  //   }
  //   mouseDown.current = event;
  //   contextRef.current.beginPath();

  //   const startX = clientX - rect.left;
  //   const startY = clientY - rect.top;
  //   contextRef.current.moveTo(startX, startY);
  // }

  // function handleMouseMove(event: React.MouseEvent | React.TouchEvent) {
  //   if (!canvasRef.current || !contextRef.current || !mouseDown.current) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   const rect = canvas.getBoundingClientRect();
  //   contextRef.current.strokeStyle = "#ffffff";
  //   let clientX = 0,
  //     clientY = 0;
  //   if ("touches" in event) {
  //     clientX = event.touches[0].clientX;
  //     clientY = event.touches[0].clientY;
  //   } else {
  //     clientX = event.clientX;
  //     clientY = event.clientY;
  //   }
  //   const x = clientX - rect.left;
  //   const y = clientY - rect.top;
  //   contextRef.current.lineTo(x, y);
  //   contextRef.current.stroke();
  //   // console.log(`Mouse position: ${x}, ${y}`);
  // }

  // function handleMouseUp() {
  //   // if (!canvasRef.current || !mouseDown.current) {
  //   //   return;
  //   // }
  //   mouseDown.current = null;
  //   contextRef.current?.closePath();
  //   // const canvas = canvasRef.current;
  //   // const rect = canvas.getBoundingClientRect();
  //   // const ctx = canvas.getContext("2d");
  //   // if (!ctx) return;
  //   // // ctx.reset();
  //   // ctx.strokeStyle = "#ffffff";
  //   // ctx.beginPath();
  //   // const startX = mouseDown.current?.clientX - rect.left;
  //   // const startY = mouseDown.current?.clientY - rect.top;
  //   // ctx.moveTo(startX, startY);
  //   // const x = event.clientX - rect.left;
  //   // const y = event.clientY - rect.top;
  //   // ctx.lineTo(x, y);
  //   // ctx.stroke();
  //   // ctx?.closePath();
  //   // console.log(`Mouse position: ${x}, ${y}`);
  // }

  // function draw() {
  //   if (!contextRef.current) {
  //     return;
  //   }
  //   for (const shape of shapes) {
  //     const ctx = contextRef.current;
  //     // console.log(shape);
  //     ctx.fillRect(
  //       shape.coords[0],
  //       shape.coords[1],
  //       shape.dimension.width,
  //       shape.dimension.height
  //     );
  //     if (shape.isSelected) {
  //       // Draw the border around the filled rectangle
  //       ctx.strokeStyle = "blue";
  //       ctx.lineWidth = 5;
  //       // ctx.stroke();
  //       ctx.strokeRect(
  //         shape.coords[0] - 5,
  //         shape.coords[1] - 5,
  //         shape.dimension.width + 10,
  //         shape.dimension.height + 10
  //       );
  //     }
  //     ctx.fillStyle = "white";
  //   }
  // }

  // function handleClick(event: React.MouseEvent) {
  //   if (!contextRef.current || !canvasRef.current) {
  //     return;
  //   }
  //   const clientX = event.clientX,
  //     clientY = event.clientY - canvasRef.current.offsetTop;

  //   const findObject = shapes.filter((shape: Shape) => {
  //     const coords = shape.coords;
  //     const dimension = shape.dimension;
  //     // console.log(coords[0], dimension.width);
  //     if (
  //       coords[0] <= clientX &&
  //       coords[0] + dimension.width >= clientX &&
  //       coords[1] <= clientY &&
  //       coords[1] + dimension.height >= clientY
  //     ) {
  //       shape.dimension.width *= 2;
  //       shape.dimension.height *= 2;
  //       shape.isSelected = true;
  //       // shape.coords = [0, index * 2];
  //       return true;
  //     }

  //     return false;
  //   });

  //   if (findObject.length) {
  //     contextRef.current.reset();
  //     setShapes([...shapes]);
  //     draw();
  //     return;
  //   }
  //   console.log(findObject);
  //   const newShape: Shape = {
  //     id: shapes.length + 1,
  //     name: "fillRect",
  //     isSelected: false,
  //     coords: [clientX, clientY],
  //     dimension: {
  //       width: 100,
  //       height: 100,
  //     },
  //     color: "white",
  //   };
  //   setShapes([...shapes, newShape]);
  // }

  // useEffect(() => {
  //   // draw();
  // }, [shapes]);

  // function handleWheel(event: React.WheelEvent) {
  //   // event.preventDefault();
  //   // console.log(event);
  //   // contextRef.current?.scale(3, 3);
  //   contextRef.current?.save();
  //   const zoomFactor = 1.1;
  //   let currScale = scale;
  //   if (event.deltaY > 0) {
  //     // zoom out
  //     currScale /= zoomFactor;
  //   } else {
  //     currScale *= zoomFactor;
  //   }
  //   contextRef.current?.scale(scale, scale);
  //   console.log(currScale);
  //   setScale(currScale);
  // }
  // console.log(shapes);
  return (
    <div className="flex flex-col gap-4 items-center justify-start w-full h-full">
      <a href="/">
        <img src={gamutsLogo} className="logo" alt="Vite logo" />
      </a>
      <TransformWrapper minScale={0.5} panning={{ disabled: true }}>
        <TransformComponent>
          <Stage
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
          >
            <Layer>
              <Group>
                <Rect
                  ref={rectRef}
                  x={20}
                  y={50}
                  width={100}
                  onDblClick={(event) => console.log(event)}
                  height={100}
                  fill="white"
                  shadowBlur={10}
                  draggable={true}
                ></Rect>
                <Line
                  points={[5, 70, 140, 23, 250, 60, 300, 20]}
                  stroke="red"
                  strokeWidth={15}
                  lineCap="round"
                  lineJoin="round"
                  draggable
                  y={5}
                />
                <Text
                  x={20}
                  y={50}
                  text="Try to drag shapes"
                  draggable
                  width={100}
                  fontSize={15}
                />
              </Group>
              <Transformer
                ref={trRef}
                padding={6}
                centeredScaling={true}
                rotationSnapTolerance={100}
                rotateAnchorOffset={20}
                rotateLineVisible={false}
                anchorSize={6}
                borderStroke="green"
                anchorCornerRadius={6}
                anchorFill="green"
                anchorStroke="green"
                // anchorFill=""
                // boundBoxFunc={(oldBox, newBox) => {
                //   // limit resize
                //   if (newBox.width > 200) {
                //     return oldBox;
                //   }
                //   return newBox;
                // }}
              />
              {/* <Text text="Try to drag shapes" draggable fontSize={15} />
               */}
              {/* <Arc
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            innerRadius={40}
            outerRadius={70}
            angle={60}
            fill="yellow"
            draggable={true}
            stroke="black"
            strokeWidth={4}
          /> */}
              <Circle x={200} y={100} radius={50} fill="white" draggable />
            </Layer>
          </Stage>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default App;
