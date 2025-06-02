import React, { createContext } from "react";
import { TOOL, type Shape } from "../libs";

export const initialState = {
  toolbarVisible: false,
  optionbarVisible: true,
  structures: [],
  selectedShapes: [],
  activeTool: TOOL.SELECT,
};

export type State = {
  toolbarVisible: boolean;
  structures: Array<Shape>;
  optionbarVisible: boolean;
  selectedShapes: Array<number>;
  activeTool: string;
};

type ActionType = {
  type: string;
  payload: State;
};

interface AppContextType {
  state: State;
  dispatch: React.Dispatch<ActionType>;
}

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "toggleToolbar":
      return { ...state, toolbarVisible: action.payload.toolbarVisible };
    case "mutateStructures":
      return { ...state, structures: action.payload.structures };
    case "changeTool":
      return { ...state, activeTool: action.payload.activeTool };
    case "updateSelectedShapes":
      return { ...state, selectedShapes: action.payload.selectedShapes };
    case "optionbarVisible":
      return { ...state, optionbarVisible: action.payload.optionbarVisible };
    default:
      return state;
  }
};

const AppController = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});
export default AppController;
