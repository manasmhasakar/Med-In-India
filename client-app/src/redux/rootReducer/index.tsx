import { combineReducers } from "redux";
import appReducer from "../../Slices/AppSlice/index";

const rootReducer = combineReducers({
  appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
