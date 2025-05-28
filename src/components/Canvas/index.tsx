import { useContext, useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Konva from "konva";
import {
  Layer,
  Stage,
  Transformer,
  Rect,
  Circle,
  RegularPolygon,
  Line,
  Arrow,
  Image,
} from "react-konva";
import Zoomer from "../Zoomer";
import AppController from "../../controllers/AppController";
import { TOOL } from "../../libs";
import type { Shape } from "../../libs";

function Canvas() {
  const canvasRef = useRef<Konva.Stage>(null);
  const [zoomLevel, setZoomLevel] = useState(0);
  const trRef = useRef<Konva.Transformer>(null);
  const [pan, setPan] = useState(true);
  const { state } = useContext(AppController);
  const shapeRefs = useRef(new Map());
  const [selectedIds, setSelectedIds] = useState<Array<number>>([]);
  const isDrawing = useRef(false);
  const [lines, setLines] = useState<Array<number[]>>([]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    function handlePan(event: KeyboardEvent) {
      if (event.code == "Space" && canvasRef.current) {
        canvasRef.current.content.style.cursor = "grab";
        setPan(false);
      }
    }
    function handlePanUp() {
      if (canvasRef.current) canvasRef.current.content.style.cursor = "default";
      setPan(true);
    }
    window.addEventListener("keydown", handlePan);
    window.addEventListener("keyup", handlePanUp);
    return () => {
      window.removeEventListener("keydown", handlePan);
      window.removeEventListener("keyup", handlePanUp);
    };
  }, [canvasRef]);

  useEffect(() => {
    // shape selections
    if (selectedIds.length && trRef.current) {
      // Get the nodes from the refs Map
      const nodes = selectedIds
        .map((id) => shapeRefs.current.get(id))
        .filter((node) => node);
      trRef.current.nodes(nodes);
    } else if (trRef.current) {
      // Clear selection
      trRef.current.nodes([]);
    }
  }, [selectedIds]);

  function handleMouseDown(event: Konva.KonvaEventObject<MouseEvent>) {
    if (
      !canvasRef.current ||
      selectedIds.length ||
      (state.activeTool !== TOOL.LINE && state.activeTool !== TOOL.DRAW)
    ) {
      return;
    }
    isDrawing.current = true;
    canvasRef.current.content.style.cursor = "pointer";
    const stage = event.target.getStage();
    if (!stage) {
      return;
    }
    const points = stage.getPointerPosition();
    if (!points) {
      return;
    }

    if (state.activeTool === TOOL.DRAW) {
      // for pen drawing too, just add the coordinates to existing lines.
      setLines([...lines, [points.x, points.y]]);
      return;
    }

    if (state.activeTool === TOOL.LINE) {
      // line too needs only mousedown coordinates on each click, so, we'll add the coordinates to previous path
      if (lines.length == 0) {
        setLines([[points.x, points.y]]);
        return;
      }

      let lastLine = lines[lines.length - 1];
      lastLine = lastLine.concat([points.x, points.y]);

      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  }

  function handleMouseMove(event: Konva.KonvaEventObject<MouseEvent>) {
    if (!isDrawing.current || state.activeTool === TOOL.LINE) {
      // don't do anything for line tool when cursor moves
      return;
    }
    const stage = event.target.getStage();
    if (!stage) {
      return;
    }
    const point = stage.getPointerPosition();
    if (!point) {
      return;
    }

    let lastLine = lines[lines.length - 1];
    lastLine = lastLine.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  function handleMouseUp() {
    if (!canvasRef.current) {
      return;
    }
    isDrawing.current = false;
    canvasRef.current.content.style.cursor = "default";
  }

  function handleStageClick(event: Konva.KonvaEventObject<MouseEvent>) {
    if (event.target === event.target.getStage()) {
      // reset selections when clicked on empty area of the stage
      setSelectedIds([]);
      return;
    }
    if (event.evt.shiftKey) {
      setSelectedIds((prev) => [...prev, event.target.index]);
    } else {
      setSelectedIds([event.target.index]);
    }
  }

  function Renderer(shapes: Array<Shape>) {
    return shapes.map((struct, index) => {
      if (struct.shapeName === "rect") {
        return (
          <Rect
            ref={(node) => {
              if (node) {
                shapeRefs.current.set(index, node);
              }
            }}
            {...struct}
          />
        );
      } else if (struct.shapeName === "circle") {
        return (
          <Circle
            ref={(node) => {
              if (node) {
                shapeRefs.current.set(index, node);
              }
            }}
            {...struct}
          />
        );
      } else if (struct.shapeName === "polygon") {
        return (
          <RegularPolygon
            ref={(node) => {
              if (node) {
                shapeRefs.current.set(index, node);
              }
            }}
            {...struct}
          />
        );
      } else if (struct.shapeName === "arrow" && struct.points) {
        return (
          <Arrow
            ref={(node) => {
              if (node) {
                shapeRefs.current.set(index, node);
              }
            }}
            points={struct.points}
            {...struct}
          />
        );
      } else if (struct.shapeName === "image" && struct.image) {
        return (
          <Image
            ref={(node) => {
              if (node) {
                shapeRefs.current.set(index, node);
              }
            }}
            image={struct.image}
            // cornerRadius={20}
            // crop={{
            //   width: 100,
            //   height: 100,
            // }}
            {...struct}
          />
        );
      }
    });
  }

  return (
    <TransformWrapper
      minScale={1}
      onTransformed={(event) => setZoomLevel(event.state.scale)}
      panning={{ disabled: pan }}
    >
      <Zoomer zoomLevel={zoomLevel} />
      <TransformComponent>
        <Stage
          ref={canvasRef}
          onClick={handleStageClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>
            {Renderer(state.structures)}
            {lines.map((line, i) => (
              <Line
                key={state.structures.length + i}
                points={line}
                index={i}
                ref={(node) => {
                  if (node) {
                    shapeRefs.current.set(state.structures.length + i, node);
                  }
                }}
                stroke="#008140"
                draggable
                strokeWidth={3}
                tension={0.2}
                lineCap="round"
                lineJoin="bevel"
                // globalCompositeOperation={"source-over"}
              />
            ))}
            <Transformer
              ref={trRef}
              // padding={6}
              centeredScaling={false}
              rotationSnapTolerance={100}
              rotateAnchorOffset={20}
              rotateLineVisible={false}
              anchorSize={6}
              borderStroke="#008140"
              anchorCornerRadius={6}
              anchorFill="#05df72"
              anchorStroke="#05df72"
              // boundBoxFunc={(oldBox, newBox) => {
              //   // // Limit resize
              //   // if (newBox.width < 5 || newBox.height < 5) {
              //   //   return oldBox;
              //   // }
              //   return newBox;
              // }}
              // anchorFill=""
              // boundBoxFunc={(oldBox, newBox) => {
              //   // limit resize
              //   if (newBox.width > 200) {
              //     return oldBox;
              //   }
              //   return newBox;
              // }}
            />
          </Layer>
        </Stage>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default Canvas;
