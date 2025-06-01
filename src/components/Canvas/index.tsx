/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Konva from "konva";
import {
  Layer,
  Stage,
  Transformer,
  Circle,
  RegularPolygon,
  Line,
  Arrow,
  Image,
  Group,
  Rect,
} from "react-konva";
import Zoomer from "../Zoomer";
import AppController from "../../controllers/AppController";
import { TOOL } from "../../libs";
import type { Shape } from "../../libs";
import TextCustom from "./Text";
import OptionBar from "../OptionBar";
// import GroupRect from "./GroupRect";

// Helper functions for calculating bounding boxes of rotated rectangles
const degToRad = (angle: number) => (angle / 180) * Math.PI;

const getCorner = (
  pivotX: number,
  pivotY: number,
  diffX: number,
  diffY: number,
  angle: number
) => {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  angle += Math.atan2(diffY, diffX);
  const x = pivotX + distance * Math.cos(angle);
  const y = pivotY + distance * Math.sin(angle);
  return { x, y };
};

const getClientRect = (element: Shape) => {
  if (!element) return;
  if (!element.x || !element.y || !element.width || !element.height) return;
  const { x, y, width, height } = element;
  const rotation = 0;
  const rad = degToRad(rotation);

  const p1 = getCorner(x, y, 0, 0, rad);
  const p2 = getCorner(x, y, width, 0, rad);
  const p3 = getCorner(x, y, width, height, rad);
  const p4 = getCorner(x, y, 0, height, rad);

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

function Canvas() {
  const { state, dispatch } = useContext(AppController);
  const [drawingShape, setDrawingShape] = useState<Shape | null>();
  const [lines, setLines] = useState<Array<number[]>>([]);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [radius, setRadius] = useState(0);
  const [pan, setPan] = useState(true);

  const canvasRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef(new Map());
  const isDrawing = useRef(false);
  const initialSelectionPos = {
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  };
  const [selectionRectangle, setSelectionRectangle] =
    useState(initialSelectionPos);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    console.log(radius);
    async function handlePan(event: KeyboardEvent) {
      console.log(event.code);
      if (event.code === "Space" && canvasRef.current) {
        canvasRef.current.content.style.cursor = "grab";
        setPan(false);
      } else if (event.code === "Backspace") {
        const indices = new Set(state.selectedShapes);
        const newStruct = state.structures.filter((_, id) => {
          return !indices.has(id);
        });
        dispatch({
          type: "mutateStructures",
          payload: {
            ...state,
            structures: newStruct,
          },
        });
        dispatch({
          type: "updateSelectedShapes",
          payload: {
            ...state,
            selectedShapes: [],
          },
        });
      } else if ((event.metaKey || event.ctrlKey) && event.code === "KeyC") {
        // copy selected indices jsons
        const copyContent = [];
        for (const ind of state.selectedShapes) {
          const selectedStruct = state.structures[ind];
          copyContent.push(selectedStruct);
        }
        await navigator.clipboard.writeText(JSON.stringify(copyContent));
      } else if ((event.metaKey || event.ctrlKey) && event.code === "KeyV") {
        const copiedContent = await navigator.clipboard.readText();
        const parsedShapes = JSON.parse(copiedContent);
        const mutatedStruct = [...state.structures, ...parsedShapes];
        dispatch({
          type: "mutateStructures",
          payload: {
            ...state,
            structures: mutatedStruct,
          },
        });
      }
    }
    function handlePanUp() {
      setPan(true);
    }
    window.addEventListener("keydown", handlePan);
    window.addEventListener("keyup", handlePanUp);
    return () => {
      window.removeEventListener("keydown", handlePan);
      window.removeEventListener("keyup", handlePanUp);
    };
  }, [canvasRef, state]);

  useEffect(() => {
    // shape selections
    if (state.selectedShapes.length && trRef.current) {
      // Get the nodes from the refs Map
      const nodes = state.selectedShapes
        .map((id) => shapeRefs.current.get(id))
        .filter((node) => node);
      trRef.current.nodes(nodes);
    } else if (trRef.current) {
      // Clear selection
      trRef.current.nodes([]);
    }
  }, [state.selectedShapes]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    if (state.activeTool === TOOL.ERASER) {
      console.log(state.activeTool, canvasRef.current.content.style.cursor);
    }
    if (
      state.activeTool === TOOL.RECT ||
      state.activeTool === TOOL.CIRCLE ||
      state.activeTool === TOOL.TRIANGLE ||
      state.activeTool === TOOL.ARROW
    ) {
      canvasRef.current.content.style.cursor = "crosshair";
    }
    if (state.activeTool === TOOL.TEXT) {
      canvasRef.current.content.style.cursor = "text";
    }
  }, [state.activeTool]);

  function handleMouseDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    if (!canvasRef.current || state.selectedShapes.length) {
      return;
    }
    isDrawing.current = true;
    const stage = event.target.getStage();
    if (!stage) {
      return;
    }
    const points = stage.getPointerPosition();
    if (!points) {
      return;
    }

    if (state.activeTool === TOOL.SELECT) {
      setSelectionRectangle({
        visible: true,
        x1: points.x,
        y1: points.y,
        x2: points.x,
        y2: points.y,
      });
      return;
    }

    if (state.activeTool === TOOL.RECT) {
      setDrawingShape({
        x: points.x,
        y: points.y,
        width: 0,
        height: 0,
        sides: 0,
        radius: 0,
        fill: "white",
        points: [],
        stroke: "transparent",
        draggable: true,
        shapeName: "rect",
      });
      // let shapeConfig = {
      //   x
      // }
      // CreateShapes("Rect", dispatch, state, shapeConfig);
      return;
    }

    if (state.activeTool === TOOL.CIRCLE) {
      setDrawingShape({
        x: points.x,
        y: points.y,
        width: 0,
        height: 0,
        sides: 0,
        stroke: "transparent",
        radius: 0,
        fill: "white",
        draggable: true,
        shapeName: "circle",
      });
      return;
    }

    if (state.activeTool === TOOL.TRIANGLE) {
      setDrawingShape({
        x: points.x,
        y: points.y,
        width: 0,
        height: 0,
        sides: 3,
        radius: 0,
        stroke: "transparent",
        fill: "white",
        draggable: true,
        shapeName: "polygon",
      });
      return;
    }

    if (state.activeTool === TOOL.TEXT) {
      setDrawingShape({
        x: points.x,
        y: points.y,
        // width: 200,
        // height: 200,
        sides: 3,
        points: [0, 0, 100, 100],
        radius: 80,
        // text: "Gamuts",
        fontSize: 48,
        fill: "white",
        fontFamily: "Kaushan Script",
        stroke: "transparent",
        draggable: true,
        shapeName: "text",
      });
      return;
    }

    if (state.activeTool === TOOL.ARROW) {
      if (!drawingShape) {
        setDrawingShape({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          sides: 0,
          points: [points.x, points.y],
          radius: 0,
          fill: "white",
          stroke: "white",
          draggable: true,
          shapeName: "arrow",
        });
        return;
      }
      const preShape = drawingShape;
      if (preShape.points)
        preShape.points = [...preShape.points, points.x, points.y];
      setDrawingShape(preShape);
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

  function handleMouseMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    // if (state.activeTool === TOOL.ERASER) {
    //   handleEraser(event);
    //   return;
    // }
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

    if (state.activeTool === TOOL.SELECT) {
      const newRect = selectionRectangle;
      newRect.x2 = point.x;
      newRect.y2 = point.y;
      setRadius(point.y);
      setSelectionRectangle(newRect);
      return;
    }

    if (drawingShape) {
      if (state.activeTool === TOOL.RECT) {
        const prevRect = drawingShape;
        if (prevRect.x && prevRect.y) {
          prevRect.width = point.x - prevRect.x;
          prevRect.height = point.y - prevRect.y;
          setRadius(prevRect.height);
        }
        setDrawingShape(prevRect);
        return;
      }

      if (
        state.activeTool === TOOL.CIRCLE ||
        state.activeTool === TOOL.TRIANGLE
      ) {
        const prevRect = drawingShape;
        if (prevRect.y) {
          prevRect.radius = point.y - prevRect.y;
          setRadius(prevRect.radius);
        }
        setDrawingShape(prevRect);
        return;
      }

      if (state.activeTool === TOOL.ARROW) {
        // const prevRect = drawingShape;
        // prevRect.points.push(point.x);
        // prevRect.points.push(point.y);
        // setDrawingShape(prevRect);
        return;
      }
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
    if (state.activeTool === TOOL.SELECT) {
      setSelectionRectangle(initialSelectionPos);
      setRadius(0);
      const selBox = {
        x: Math.min(selectionRectangle.x1, selectionRectangle.x2),
        y: Math.min(selectionRectangle.y1, selectionRectangle.y2),
        width: Math.abs(selectionRectangle.x2 - selectionRectangle.x1),
        height: Math.abs(selectionRectangle.y2 - selectionRectangle.y1),
      };

      const ids: Array<number> = [];
      state.structures.filter((shape, index) => {
        // Check if rectangle intersects with selection box
        const bound = getClientRect(shape);
        if (!shape || !bound) return;
        // console.log(bound);
        const isIntersecting = Konva.Util.haveIntersection(selBox, bound);

        if (isIntersecting) {
          ids.push(index);
        }
      });
      dispatch({
        type: "updateSelectedShapes",
        payload: {
          ...state,
          selectedShapes: ids,
        },
      });

      // setSelectedIds(selected.map((rect) => rect.id));
      return;
    }
    if (drawingShape) {
      dispatch({
        type: "mutateStructures",
        payload: { ...state, structures: [...state.structures, drawingShape] },
      });
      if (state.activeTool === TOOL.ARROW) {
        return;
      }
      setDrawingShape(null);
      dispatch({
        type: "updateSelectedShapes",
        payload: {
          ...state,
          selectedShapes: [state.structures.length - 1],
        },
      });
    }
    // canvasRef.current.content.style.cursor = "default";
  }

  function handleEraser(event: Konva.KonvaEventObject<MouseEvent>) {
    if (event.target === event.target.getStage()) {
      // reset selections when clicked on empty area of the stage
      dispatch({
        type: "updateSelectedShapes",
        payload: { ...state, selectedShapes: [] },
      });
      return;
    }

    let structures = state.structures;
    structures = structures.filter((_, index) => index !== event.target.index);
    dispatch({
      type: "updateSelectedShapes",
      payload: {
        ...state,
        selectedShapes: state.selectedShapes.filter(
          (_, index) => index !== event.target.index
        ),
      },
    });
    // setSelectedIds(
    //   selectedIds.filter((_, index) => index !== event.target.index)
    // );
    dispatch({
      type: "mutateStructures",
      payload: { ...state, structures: structures },
    });
  }

  function handleStageClick(event: Konva.KonvaEventObject<MouseEvent>) {
    if (event.target === event.target.getStage()) {
      // reset selections when clicked on empty area of the stage
      // setOptionsAnchor(null);
      dispatch({
        type: "updateSelectedShapes",
        payload: {
          ...state,
          selectedShapes: [],
        },
      });
      return;
    }
    if (state.activeTool === TOOL.ERASER) {
      handleEraser(event);
      return;
    }
    // setOptionsAnchor(event.target.attrs);
    if (event.evt.shiftKey) {
      let existingShapes = state.selectedShapes;
      existingShapes = [...existingShapes, event.target.index];
      dispatch({
        type: "updateSelectedShapes",
        payload: {
          ...state,
          selectedShapes: existingShapes,
        },
      });
    } else {
      dispatch({
        type: "updateSelectedShapes",
        payload: {
          ...state,
          selectedShapes: [event.target.index],
        },
      });
    }
  }

  function Renderer(shapes: Array<Shape | undefined | null>) {
    return shapes?.map((struct, index) => {
      if (!struct?.shapeName) return;
      if (struct.shapeName === "rect") {
        return (
          // <GroupRect
          //   struct={struct}
          //   updateRef={(node: Konva.Node) => {
          //     if (node) {
          //       shapeRefs.current.set(index, node);
          //     }
          //   }}
          // />
          <Group key={index} onDblClick={(e) => console.log(e)}>
            {/* @ts-expect-error */}
            <Rect
              ref={(node: Konva.Rect) => {
                if (node) {
                  shapeRefs.current.set(index, node);
                }
              }}
              {...struct}
            />
          </Group>
        );
      } else if (struct.shapeName === "circle") {
        return (
          // @ts-expect-error
          <Circle
            key={index}
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
          // @ts-expect-error
          <RegularPolygon
            key={index}
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
          // @ts-expect-error
          <Arrow
            key={index}
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
          // @ts-expect-error
          <Image
            key={index}
            ref={(node) => {
              if (node) {
                node.cache();
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
      } else if (struct.shapeName === "text") {
        console.log(struct);
        return (
          <TextCustom
            key={index}
            updateRef={(node: Konva.Node) => {
              if (node) {
                shapeRefs.current.set(index, node);
              }
            }}
            struct={struct}
          />
        );
      }
    });
  }

  function handleContextMenu() {}

  return (
    <TransformWrapper
      minScale={1}
      doubleClick={{ disabled: true }}
      onTransformed={(event) => setZoomLevel(event.state.scale)}
      panning={{ disabled: pan }}
    >
      <Zoomer zoomLevel={zoomLevel} />
      <OptionBar canvasRef={canvasRef.current} />
      <TransformComponent>
        <Stage
          ref={canvasRef}
          onClick={handleStageClick}
          onTap={handleStageClick}
          onMouseDown={handleMouseDown}
          onContextMenu={handleContextMenu}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer ref={layerRef}>
            {Renderer([...state.structures, drawingShape])}
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
                stroke="white"
                draggable
                strokeWidth={2}
                tension={0.2}
                lineCap="round"
                lineJoin="bevel"
              />
            ))}
            <Transformer
              ref={trRef}
              centeredScaling={true}
              rotationSnapTolerance={100}
              rotateAnchorOffset={20}
              rotateLineVisible={false}
              anchorSize={6}
              borderStroke="#008140"
              anchorCornerRadius={6}
              anchorFill="#05df72"
              anchorStroke="#05df72"
            />
            {selectionRectangle.visible && (
              <Rect
                x={Math.min(selectionRectangle.x1, selectionRectangle.x2)}
                y={Math.min(selectionRectangle.y1, selectionRectangle.y2)}
                width={Math.abs(selectionRectangle.x2 - selectionRectangle.x1)}
                height={Math.abs(selectionRectangle.y2 - selectionRectangle.y1)}
                fill="rgba(255,255,255,0.01)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={0.5}
              />
            )}
          </Layer>
          {/* <CircleGrid layerRef={layerRef} /> */}
        </Stage>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default Canvas;
