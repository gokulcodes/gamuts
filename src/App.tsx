import gamutsLogo from "/gamuts_logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseDown = useRef<React.MouseEvent | React.TouchEvent>(null);
  const contextRef = useRef<CanvasRenderingContext2D>(null);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200;
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;
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

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
      <a href="https://vite.dev" target="_blank">
        <img src={gamutsLogo} className="logo" alt="Vite logo" />
      </a>
      <canvas
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
