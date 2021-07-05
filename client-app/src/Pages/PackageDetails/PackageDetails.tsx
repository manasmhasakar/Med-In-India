import React, { ReactElement, useState, useEffect } from "react";
import { db } from "../../utils/firbase";
import { Form } from "react-bootstrap";
import swal from "sweetalert";
import "./style.css";
export default function PackageDetails(): ReactElement {
  const loc = window.location.pathname.split("/");
  const pkgId = loc[loc.length - 1];
  const [hospPackage, setHospPackage] = useState<any>({});

  useEffect(() => {
    (async () => {
      const pkg = await db.collection("packages").doc(pkgId).get();
      console.log("pkg indie", pkg.data());
      (async () => {
        const hospPackage = pkg?.data();
        console.log("pkg", pkg?.data(), hospPackage);
        const hosp = await db.doc(`/hospitals/${hospPackage.hospId}`).get();
        setHospPackage({
          id: pkg.id,
          ...hospPackage,
          hospital: { ...hosp.data() },
        });
      })();
    })();
  }, []);

  var p = [1, 2, 3, 4, 5];
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");
  const [f, setF] = useState("");
  const handleReset = (e) => {
    e.preventDefault();
    setA("");
    setB("");
    setC("");
    setD("");
    setE("");
    setF("");

    swal(
      "Your Appointment has been booked Successully",
      "You will soon be Contacted by our Team",
      "success"
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            margin: "4%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                marginRight: "32px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.history.back();
              }}
            >
              <i className="fa fa-arrow-left"></i>
            </div>
            <div
              style={{
                fontSize: "42px",

                fontWeight: 700,
              }}
            >
              {hospPackage.name}
            </div>
          </div>

          {hospPackage.PackInc && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "4% 3%",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#004763",
                }}
              >
                Program Includes
              </div>
              <div
                style={{
                  marginTop: "16px",
                  fontSize: "16px",
                  width: "80%",
                }}
              >
                <ul>
                  {hospPackage.PackInc &&
                    Array.isArray(hospPackage.PackInc) &&
                    hospPackage.PackInc?.map((el) => <li>{el}</li>)}
                </ul>
              </div>
            </div>
          )}

          <hr />

          <div
            style={{
              display: "flex",
              width: "100%",
              margin: "1% 3%",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            <div
              style={{
                marginRight: "1% ",
              }}
            >
              Expected Duration :{" "}
            </div>
            <div
              style={{
                color: "#004763",
              }}
            >
              4 Days
            </div>
          </div>

          <div
            style={{
              display: "flex",
              margin: "1% 3%",
              borderRadius: "15",
              marginRight: "250px",
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                marginRight: "32px",
              }}
            >
              Price
            </h1>
            <h1
              style={{
                fontWeight: 700,
                marginRight: "8px",
                color: "#004763",
              }}
            >
              <span
                style={{
                  marginRight: "6px",
                  color: "#004763",
                }}
              >
                $
              </span>
              {hospPackage.Cost}
            </h1>
            <h5
              style={{
                marginTop: "8px",
                color: "#004763",
              }}
            >
              approx
            </h5>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            margin: "4% 0%",
            padding: "1%",
            border: "1px solid #D4D4D4",
            borderRadius: "15px",
          }}
        >
          <Form
            style={{
              marginLeft: "7%",
              marginRight: "12%",
            }}
          >
            <Form.Group style={{ display: "flex", flexDirection: "column" }}>
              <Form.Label>Full Name</Form.Label>
              <input
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="Full Name"
                className="sign-up-input"
              />
            </Form.Group>
            <div style={{ display: "flex" }}>
              <input
                style={{
                  width: "60px",
                  marginRight: "5px",
                  paddingLeft: "4px",
                }}
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="sign-up-input"
                placeholder="Age"
                type="number"
              />
              <input
                style={{
                  width: "80px",
                  marginRight: "5px",
                  paddingLeft: "4px",
                }}
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="sign-up-input"
                placeholder="Gender"
              />
            </div>
            <Form.Group style={{ display: "flex", flexDirection: "column" }}>
              <Form.Label>Address</Form.Label>
              <input
                value={d}
                onChange={(e) => setD(e.target.value)}
                placeholder="address"
                className="sign-up-input"
              />
            </Form.Group>
            <Form.Group
              style={{ display: "flex", flexDirection: "column" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <input
                value={e}
                onChange={(e) => setE(e.target.value)}
                placeholder="email"
                className="sign-up-input"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Group style={{ display: "flex", flexDirection: "column" }}>
                <Form.Label>Contact No.</Form.Label>
                <input
                  value={f}
                  onChange={(e) => setF(e.target.value)}
                  placeholder="contact"
                  className="sign-up-input"
                  type="number"
                />
              </Form.Group>
            </Form.Group>
          </Form>
          <div
            style={{
              alignSelf: "center",
              background: "#004763 0% 0% no-repeat padding-box",
              borderRadius: "5px",
              height: "42px",
              width: "80%",
              textAlign: "center",
              paddingTop: "8px",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              margin: "8%",
            }}
            onClick={handleReset}
          >
            Book Appointment
          </div>
        </div>
      </div>
    </>
  );
}
