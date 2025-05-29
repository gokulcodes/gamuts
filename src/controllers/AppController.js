import React, { createContext } from "react";
import { TOOL } from "../libs";
export const initialState = {
    toolbarVisible: false,
    structures: [],
    selectedShapes: [],
    activeTool: TOOL.SELECT,
};
export const reducer = (state, action) => {
    switch (action.type) {
        case "toggleToolbar":
            return { ...state, toolbarVisible: action.payload.toolbarVisible };
        case "mutateStructures":
            return { ...state, structures: action.payload.structures };
        case "changeTool":
            return { ...state, activeTool: action.payload.activeTool };
        case "updateSelectedShapes":
            return { ...state, selectedShapes: action.payload.selectedShapes };
        default:
            return state;
    }
};
const AppController = createContext({
    state: initialState,
    dispatch: () => null,
});
export default AppController;
