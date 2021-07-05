import { appSlice } from "./AppSlice";

export const {
  setCurrentHospitalName,
  clearToast,
  switchUnauthorized,
  setToast,
  setSearchKey,
} = appSlice.actions;

const appReducer = appSlice.reducer;

export default appReducer;
