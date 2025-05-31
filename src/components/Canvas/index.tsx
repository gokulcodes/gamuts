/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  Group,
  // Group,
} from "react-konva";
import Zoomer from "../Zoomer";
import AppController from "../../controllers/AppController";
import { TOOL } from "../../libs";
import type { Shape } from "../../libs";
import gamutsLogo from "/gamuts_logo.svg";
import TextCustom from "./Text";
// import { CreateShapes } from "../Toolbar/utils";
// import CircleGrid from "./Circle";
// import OptionBar from "../OptionBar";

function Canvas() {
  const canvasRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const [drawingShape, setDrawingShape] = useState<Shape | null>();
  const [zoomLevel, setZoomLevel] = useState(0);
  const [radius, setRadius] = useState(0);
  const trRef = useRef<Konva.Transformer>(null);
  // const [optionsAnchor, setOptionsAnchor] = useState(null);
  const [pan, setPan] = useState(true);
  const { state, dispatch } = useContext(AppController);
  const shapeRefs = useRef(new Map());
  // const [selectedIds, setSelectedIds] = useState<Array<number>>([]);
  const isDrawing = useRef(false);
  const [lines, setLines] = useState<Array<number[]>>([]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    console.log(radius);
    function handlePan(event: KeyboardEvent) {
      if (event.code === "Space" && canvasRef.current) {
        canvasRef.current.content.style.cursor = "grab";
        setPan(false);
      }
    }
    function handlePanUp() {
      // if (canvasRef.current) canvasRef.current.content.style.cursor = "default";
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
      canvasRef.current.content.style.cursor = gamutsLogo;
      console.log(state.activeTool, canvasRef.current.content.style.cursor);
    }
    if (
      state.activeTool === TOOL.RECT ||
      state.activeTool === TOOL.CIRCLE ||
      state.activeTool === TOOL.TRIANGLE ||
      state.activeTool === TOOL.ARROW
    ) {
      canvasRef.current.content.style.cursor = "crosshair";
      // console.log(state.activeTool, canvasRef.current.content.style.cursor);
    }
    if (state.activeTool === TOOL.TEXT) {
      canvasRef.current.content.style.cursor = "text";
      // console.log(state.activeTool, canvasRef.current.content.style.cursor);
    }
  }, [state.activeTool]);

  function handleMouseDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    if (!canvasRef.current || state.selectedShapes.length) {
      return;
    }
    isDrawing.current = true;
    // canvasRef.current.content.style.cursor = "pointer";
    const stage = event.target.getStage();
    if (!stage) {
      return;
    }
    const points = stage.getPointerPosition();
    if (!points) {
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
          selectedShapes: [0],
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
    // console.log(shapes);
    return shapes?.map((struct, index) => {
      if (!struct?.shapeName) return;
      if (struct.shapeName === "rect") {
        return (
          <Group onDblClick={(e) => console.log(e)}>
            {/* @ts-expect-error */}
            <Rect
              ref={(node) => {
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
        return (
          <TextCustom
            updateRef={(node: Konva.Node) => {
              if (node) {
                shapeRefs.current.set(index, node);
              }
            }}
            // ref={(node) => {
            //   if (node) {
            //     shapeRefs.current.set(index, node);
            //   }
            // }}
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
      {/* {optionsAnchor && <OptionBar optionsAnchor={optionsAnchor} />} */}
      <Zoomer zoomLevel={zoomLevel} />
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
                // globalCompositeOperation={"source-over"}
              />
            ))}
            {/* <Group draggable>
              <Rect width={100} height={100} fill="black" />
              <Text
                x={10}
                y={50 - 18 / 2}
                fontSize={18}
                align="center"
                text="Rectange"
                fill="white"
              />
            </Group> */}
            {/* <TextCustom /> */}
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
          {/* <CircleGrid layerRef={layerRef} /> */}
        </Stage>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default Canvas;
