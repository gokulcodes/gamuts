import { createContext } from "react";

export const initialState = {
  toolbarVisible: false,
  structures: [],
};

export type Shape = {
  x: number;
  y: number;
  width: number;
  sides: number;
  radius: number;
  height: number;
  fill: string;
  draggable: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  render: Function;
};

type State = {
  toolbarVisible: boolean;
  structures: Array<Shape>;
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
    default:
      return state;
  }
};

const AppController = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});
export default AppController;
