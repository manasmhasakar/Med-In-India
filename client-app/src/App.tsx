import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { clearToast, switchUnauthorized } from "./Slices/AppSlice"; // action
import TestComponent from "./Components/TestComponent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatComponent from "./Components/ChatComponent.tsx";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import HospitalSignUp from "./Components/HospitalSignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PackageDashboard from "./Pages/PackageDashboard";
import HospitalPage from "./Pages/HospitalPage";
import PackageDetails from "./Pages/PackageDetails/PackageDetails";

function App() {
  const p = "srt";
  const dispatch = useDispatch(); // it is a hook
  //@ts-ignore
  if (p === "") {
    console.log("warning");
    console.log("test");
  }
  console.log("hi");
  const { dummy, toasterMessage } = useSelector((state: any) => ({
    dummy: state.appReducer.dummy,
    toasterMessage: state.appReducer.toast,
  }));

  useEffect(() => {
    if (toasterMessage !== "") {
      toast(toasterMessage);
    }
    dispatch(clearToast());
  }, [toasterMessage]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Router>
        <Header />
        {/* <p
          onClick={() => {
            //@ts-ignore
            dispatch(switchUnauthorized());
          }}
        >
          Click to Increment {dummy}
        </p> */}
        {/* <TestComponent /> */}
        <Switch>
          <Route exact path="/chat">
            <ChatComponent />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/hospitalSignUp">
            <HospitalSignUp />
          </Route>
          <Route exact path="/packages">
            <PackageDashboard />
          </Route>
          <Route exact path="/packages/:id">
            <PackageDetails />
          </Route>
          <Route exact path="/hospital">
            <HospitalPage />
          </Route>
        </Switch>
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
