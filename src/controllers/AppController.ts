import React, { createContext } from "react";
import { TOOL, type Shape } from "../libs";

export const initialState = {
  toolbarVisible: false,
  structures: [],
  activeTool: TOOL.SELECT,
};

type State = {
  toolbarVisible: boolean;
  structures: Array<Shape>;
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
    default:
      return state;
  }
};

const AppController = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});
export default AppController;
