import type { State } from "../../controllers/AppController";
import { TOOL } from "../../libs";

async function getImage(
  url: HTMLImageElement | string | null
): Promise<HTMLImageElement | null> {
  if (!url || typeof url !== "string") return null;
  return new Promise((res) => {
    const imageDiv = document.createElement("img");
    imageDiv.src = url;
    imageDiv.onload = function () {
      imageDiv
        .decode()
        .catch(() => {})
        .finally(() => res(imageDiv));
    };
  });
}

export async function CreateShapes(
  shapeName: string,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  dispatch: Function,
  state: State,
  image: HTMLImageElement | null | string = null
) {
  let shape;
  let structures = state.structures;
  function updateActiveTool(tool: string) {
    dispatch({ type: "changeTool", payload: { ...state, activeTool: tool } });
  }
  switch (shapeName) {
    case "Rect":
      //   shape = {
      //     x: 400,
      //     y: 400,
      //     width: 200,
      //     height: 200,
      //     sides: 0,
      //     radius: 0,
      //     fill: "white",
      //     points: [],
      //     stroke: "transparent",
      //     draggable: true,
      //     shapeName: "rect",
      //   };
      //   structures = [...structures, shape];
      updateActiveTool(TOOL.RECT);
      break;
    case "Circle":
      //   shape = {
      //     x: 400,
      //     y: 400,
      //     width: 200,
      //     height: 200,
      //     sides: 0,
      //     stroke: "transparent",
      //     radius: 100,
      //     fill: "white",
      //     draggable: true,
      //     shapeName: "circle",
      //   };
      //   structures = [...structures, shape];
      updateActiveTool(TOOL.CIRCLE);
      break;
    case "Triangle":
      //   shape = {
      //     x: 600,
      //     y: 600,
      //     width: 200,
      //     height: 200,
      //     sides: 3,
      //     radius: 80,
      //     stroke: "transparent",
      //     fill: "white",
      //     draggable: true,
      //     shapeName: "polygon",
      //   };
      //   structures = [...structures, shape];
      updateActiveTool(TOOL.TRIANGLE);
      break;
    case "Arrow":
      //   shape = {
      //     x: 100,
      //     y: 100,
      //     width: 0,
      //     height: 0,
      //     sides: 0,
      //     points: [0, 0, -100, -100],
      //     radius: 0,
      //     fill: "white",
      //     stroke: "white",
      //     draggable: true,
      //     shapeName: "arrow",
      //   };
      //   structures = [...structures, shape];
      updateActiveTool(TOOL.ARROW);
      break;
    case "Image":
      image = await getImage(image);
      if (!image) break;
      shape = {
        x: 600,
        y: 600,
        width: image.width,
        height: image.height,
        radius: 80,
        image: image,
        fill: "transparent",
        sides: 4,
        stroke: "transparent",
        draggable: true,
        shapeName: "image",
      };
      structures = [...structures, shape];
      updateActiveTool(TOOL.IMAGE);
      break;
    case "Text":
      //   shape = {
      //     x: 600,
      //     y: 600,
      //     // width: 200,
      //     // height: 200,
      //     sides: 3,
      //     points: [0, 0, 100, 100],
      //     radius: 80,
      //     text: "Gamuts",
      //     fontSize: 48,
      //     fill: "white",
      //     stroke: "white",
      //     draggable: true,
      //     shapeName: "text",
      //   };
      //   structures = [...structures, shape];
      updateActiveTool(TOOL.TEXT);
      break;
  }
  dispatch({
    type: "mutateStructures",
    payload: { ...state, structures: structures },
  });
}
