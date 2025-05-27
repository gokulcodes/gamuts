import { useReducer } from "react";
import AppController, {
  initialState,
  reducer,
} from "./controllers/AppController";
import Toolbar from "./components/Toolbar";
import "./App.css";
import Canvas from "./components/Canvas";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppController.Provider value={{ state, dispatch }}>
      <Toolbar />
      <Canvas />
    </AppController.Provider>
  );
}
