import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { auth } from "../../utils/firbase";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { setToast } from "../../Slices/AppSlice";
import firebase from "../../utils/firbase";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import logoImg from "../../assets/logoImg.png";
import { useHistory } from "react-router-dom";

export default function Header(): ReactElement {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  useEffect(() => {
    if (user !== null) {
      setShowLogin(false);
    }
  }, [user]);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((response) => {
        dispatch(setToast("Signed in Successfully with Google"));
      })
      .catch((e) => {
        dispatch(setToast("Unable to Sign in With Google"));
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var isEmailValid = validateEmail(email);
    if (isEmailValid === false) {
      dispatch(setToast("Please Enter a Valid Email id"));
      return;
    }
    var result = password.localeCompare(confirmPassword);
    if (result !== 0) {
      dispatch(setToast("The passwords do not match"));
      return;
    }
    setLoading(true);
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response && response.user) {
          // toast("User created Succesfully");
          dispatch(setToast("Signed Up and Logged In Successfully"));
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          // toast("The password is too weak");
          dispatch(setToast("The password is too weak"));
        } else {
          toast(errorMessage);
        }
        console.log(error);
      });
    setLoading(false);
    setShow(false);
  };
  const handleSignOut = () => {
    auth.signOut();
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    var isEmailValid = validateEmail(loginEmail);
    if (isEmailValid === false) {
      dispatch(setToast("Please Enter a Valid Email id"));
      return;
    }
    setLoading(true);
    await auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then((response) => {
        if (response && response.user) {
          // toast("User created Succesfully");
          dispatch(setToast("Signed In Successfully"));
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        toast(errorCode, errorMessage);
      });
    setLoading(false);
    setShowLogin(false);
  };

  return (
    <div style={{ width: "100%", height: "68px", background: "white" }}>
      <div
        style={{
          display: "flex",
          color: "black",
          paddingLeft: "10%",
          paddingRight: "5%",
        }}
      >
        <div
          onClick={() => {
            if (window.location.pathname !== "/") {
              history.push("/");
            }
          }}
          style={{
            cursor: "pointer",
            alignSelf: "center",
          }}
        >
          <img
            alt="logo"
            src={logoImg}
            style={{ height: "30px", alignSelf: "center" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            marginLeft: "46px",
            marginTop: "10px",
          }}
        >
          <i
            style={{ color: "#004763", fontSize: "22px" }}
            className="fa fa-map-marker"
            aria-hidden="true"
          ></i>
          <div style={{ marginLeft: "10px" }}>Pune,India</div>
        </div>
        <div
          style={{
            width: "50%",
            alignSelf: "flex-end",
            marginLeft: "auto",
            minHeight: "68px",
            display: "flex",
          }}
        >
          {/* <div
            style={{
              alignSelf: "center",
              marginRight: "30px",
              marginTop: "10px",
            }}
          >
            Explore
          </div>
          <div
            style={{
              alignSelf: "center",
              marginTop: "10px",
              marginRight: "20px",
            }}
          >
            About us
          </div> */}
          <div
            style={{
              alignSelf: "flex-end",
              marginLeft: "auto",
              minHeight: "68px",
              display: "flex",
            }}
          >
            {user ? (
              <>
                <div
                  style={{
                    alignSelf: "center",
                    marginTop: "13px",
                    width: "98px",
                    color: "white",
                    height: "26px",
                    background: "#004763 0% 0% no-repeat padding-box",
                    borderRadius: "5px",
                    textAlign: "center",
                    paddingTop: "3px",
                    cursor: "pointer",
                  }}
                  onClick={handleSignOut}
                >
                  Sign out
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={handleShowLogin}
                  style={{
                    alignSelf: "center",
                    marginTop: "10px",
                    marginRight: "25px",
                    cursor: "pointer",
                  }}
                >
                  Login
                </div>
                <div
                  style={{
                    alignSelf: "center",
                    marginTop: "13px",
                    width: "98px",
                    height: "32px",
                    background: "#004763 0% 0% no-repeat padding-box",
                    borderRadius: "5px",
                    textAlign: "center",
                    paddingTop: "3px",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={handleShow}
                >
                  Sign Up
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        dialogClassName="login-sign-up-modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "33%", fontWeight: "bold" }}>
            Sign Up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              style={{ display: "flex", flexDirection: "column" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <input
                className="sign-up-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group
              style={{ display: "flex", flexDirection: "column" }}
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <input
                className="sign-up-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form.Group>

            <Form.Group
              style={{ display: "flex", flexDirection: "column" }}
              controlId="formBasicPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <input
                className="sign-up-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </Form.Group>

            <div
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                width: "312px",
                height: "42px",
                textAlign: "center",
                background: "#004763 0% 0% no-repeat padding-box",
                borderRadius: "5px",
                color: "white",
                marginLeft: "7%",
                paddingTop: "7px",
              }}
              onClick={handleSubmit}
            >
              {loading ? "Loading" : "Sign Up"}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        dialogClassName="login-sign-up-modal login-modal"
        show={showLogin}
        onHide={handleCloseLogin}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "33%", fontWeight: "bold" }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group
            style={{ display: "flex", flexDirection: "column" }}
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <input
              className="sign-up-input"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group
            style={{ display: "flex", flexDirection: "column" }}
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <input
              className="sign-up-input"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <div
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              width: "312px",
              height: "42px",
              textAlign: "center",
              background: "#004763 0% 0% no-repeat padding-box",
              borderRadius: "5px",
              color: "white",
              marginLeft: "7%",
              paddingTop: "7px",
              marginTop: "10px",
            }}
            onClick={handleLoginWithEmail}
          >
            {loading ? "Loading" : "Login"}
          </div>
        </Form>
        <div
          style={{
            marginTop: "10px",
            alignSelf: "center",
            color: "lightslategray",
          }}
        >
          OR
        </div>
        <div
          style={{
            width: "312px",
            height: "42px",
            background: "#EA4335 0% 0% no-repeat padding-box",
            textAlign: "center",
            paddingTop: "8px",
            alignSelf: "center",
            color: "white",
            marginTop: "3%",
            cursor: "pointer",
          }}
          onClick={signInWithGoogle}
        >
          <i style={{ marginRight: "5px" }} className="fa fa-google"></i>
          Sign in With Google
        </div>
      </Modal>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
