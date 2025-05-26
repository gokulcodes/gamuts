import { createContext } from "react";

export const initialState = {
  toolbarVisible: false,
};

type State = {
  toolbarVisible: boolean;
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
    default:
      return state;
  }
};

const AppController = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});
export default AppController;
