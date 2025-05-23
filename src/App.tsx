import gamutsLogo from "/gamuts_logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";

type Shape = {
  id: number;
  name: string;
  coords: [number, number];
  dimension: {
    width: number;
    height: number;
  };
  color: string;
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseDown = useRef<React.MouseEvent | React.TouchEvent>(null);
  const contextRef = useRef<CanvasRenderingContext2D>(null);
  const [shapes, setShapes] = useState<Array<Shape>>([]);
  function setCanvasSize() {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvas.offsetTop;
  }
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    setCanvasSize();
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;
    // contextRef.current?.scale(2, 1);
    window.addEventListener("resize", setCanvasSize);
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [canvasRef]);

  function handleMouseDown(event: React.MouseEvent | React.TouchEvent) {
    if (!canvasRef.current || !contextRef.current) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    let clientX = 0,
      clientY = 0;
    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    mouseDown.current = event;
    contextRef.current.beginPath();

    const startX = clientX - rect.left;
    const startY = clientY - rect.top;
    contextRef.current.moveTo(startX, startY);
  }

  function handleMouseMove(event: React.MouseEvent | React.TouchEvent) {
    if (!canvasRef.current || !contextRef.current || !mouseDown.current) {
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    contextRef.current.strokeStyle = "#ffffff";
    let clientX = 0,
      clientY = 0;
    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    // console.log(`Mouse position: ${x}, ${y}`);
  }

  function handleMouseUp() {
    // if (!canvasRef.current || !mouseDown.current) {
    //   return;
    // }
    mouseDown.current = null;
    contextRef.current?.closePath();
    // const canvas = canvasRef.current;
    // const rect = canvas.getBoundingClientRect();
    // const ctx = canvas.getContext("2d");
    // if (!ctx) return;
    // // ctx.reset();
    // ctx.strokeStyle = "#ffffff";
    // ctx.beginPath();
    // const startX = mouseDown.current?.clientX - rect.left;
    // const startY = mouseDown.current?.clientY - rect.top;
    // ctx.moveTo(startX, startY);
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    // ctx.lineTo(x, y);
    // ctx.stroke();
    // ctx?.closePath();
    // console.log(`Mouse position: ${x}, ${y}`);
  }

  function draw() {
    if (!contextRef.current) {
      return;
    }
    for (const shape of shapes) {
      const ctx = contextRef.current;
      console.log(shape);
      ctx.fillRect(
        shape.coords[0],
        shape.coords[1],
        shape.dimension.width,
        shape.dimension.height
      );
      ctx.fillStyle = "white";
    }
  }

  function handleClick(event: React.MouseEvent) {
    if (!contextRef.current || !canvasRef.current) {
      return;
    }
    const clientX = event.clientX,
      clientY = event.clientY - canvasRef.current.offsetTop;

    const findObject = shapes.filter((shape: Shape, index) => {
      const coords = shape.coords;
      const dimension = shape.dimension;
      // console.log(coords[0], dimension.width);
      if (
        coords[0] <= clientX &&
        coords[0] + dimension.width >= clientX &&
        coords[1] <= clientY &&
        coords[1] + dimension.height >= clientY
      ) {
        shape.coords = [0, index * 2];
        return true;
      }

      return false;
    });

    if (findObject.length) {
      contextRef.current.reset();
      draw();
      return;
    }
    console.log(findObject);
    const newShape: Shape = {
      id: shapes.length + 1,
      name: "fillRect",
      coords: [clientX, clientY],
      dimension: {
        width: 100,
        height: 100,
      },
      color: "white",
    };
    setShapes([...shapes, newShape]);
    draw();
  }

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
      <canvas
        onClick={handleClick}
        // onWheel={handleWheel}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="bg-black/20"
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default App;
