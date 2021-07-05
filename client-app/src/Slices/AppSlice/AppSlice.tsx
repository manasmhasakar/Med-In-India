import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialstate = {
  dummy: 0,
  toast: "",
  searchKey: "",
  currentHospital: "",
};

function switchUnauthorized(state = initialstate, action: any) {
  state.dummy++;
  console.log("action dispatched");
}

function setToast(state = initialstate, action: any) {
  state.toast = action.payload;
}

function clearToast(state = initialstate) {
  state.toast = "";
}

function setSearchKey(state = initialstate, action) {
  state.searchKey = action.payload;
}

function setCurrentHospitalName(state = initialstate, action: any) {
  state.currentHospital = action.payload;
}

export const appSlice = createSlice({
  name: "appSlice",
  initialState: initialstate,
  reducers: {
    switchUnauthorized,
    setToast,
    clearToast,
    setSearchKey,
    setCurrentHospitalName,
  },
  extraReducers: {},
});
