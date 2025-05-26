import { useReducer } from "react";
import AppController, {
  initialState,
  reducer,
} from "./controllers/appController";
import Toolbar from "./components/Toolbar";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppController.Provider value={{ state, dispatch }}>
      <Toolbar />
    </AppController.Provider>
  );
}
