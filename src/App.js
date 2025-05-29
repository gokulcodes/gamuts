import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useReducer } from "react";
import AppController, { initialState, reducer, } from "./controllers/AppController";
import Toolbar from "./components/Toolbar";
import "./App.css";
import Canvas from "./components/Canvas";
export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (_jsxs(AppController.Provider, { value: { state, dispatch }, children: [_jsx(Toolbar, {}), _jsx(Canvas, {})] }));
}
