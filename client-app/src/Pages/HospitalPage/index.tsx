import React, { ReactElement, useEffect, useState } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector, useDispatch } from "react-redux";
import { infrastructure, staff } from "../../Components/constants";
import { db } from "../../utils/firbase";
import swal from "sweetalert";
import "./style.css";
import { useHistory } from "react-router-dom";

export default function HospitalPage(): ReactElement {
  const { currentHospital } = useSelector((state: any) => ({
    currentHospital: state.appReducer.currentHospital,
  }));
  const history = useHistory();
  const [key, setKey] = useState("About");
  var hospitalsRef = db.collection("hospitals");
  const query = hospitalsRef.where("HospName", "==", currentHospital);
  const [hospitalFound] = useCollectionData(query, { idField: "id" });
  var packagesRef = db.collection("packages");
  const query1 = packagesRef.limit(10);
  const [packagesFound] = useCollectionData(query1, { idField: "id" });
  console.log(hospitalFound);
  console.log("packagesFound", packagesFound);
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

  const departments = [
    {
      departmentName:
        "Department of Gynecology, Obstetrics, Mammalogy and Treatment of Urinary Incontinence",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },
    {
      departmentName: "Department of Pediatric and Adult Otolaryngology",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },
    {
      departmentName: "Department of Orthopedics",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },
    {
      departmentName: "Department of Ophthalmology and Pediatric Ophthalmology",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },
    {
      departmentName: "Department of General, Abdominal and Vascular Surgery",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },
    {
      departmentName: "Department of Traumatology and Hand Surgery",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },

    {
      departmentName: "Department of Thoracic Surgery",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },

    {
      departmentName: "Department of Pulmonology",
      doctorName: "Dr. P . K . Grant",
      doctorType: "Head Physician",
      doctorPhotoUrl: "https://rubyhall.com/img/mgt1.jpg",
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <div
        className="hospital-name"
        style={{
          width: "65%",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          border: "1px solid #D4D4D4",
          borderRadius: "10px",
          marginTop: "8%",
          minHeight: "700px",
          marginBottom: "100px",
          marginLeft: "5%",
          paddingLeft: "2%",
          paddingTop: "2%",
        }}
      >
        {hospitalFound !== undefined && hospitalFound.length > 0 ? (
          <>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="About" title="About">
                <img
                  alt="hospitalImage"
                  style={{
                    width: "88%",
                    height: "362px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                  src="https://cdn.hipwallpaper.com/i/40/90/N5r2ZP.jpg"
                />
                <div
                  style={{
                    font: "normal normal 600 22px/33px Poppins",
                    color: "#004763",
                    marginTop: "5%",
                    marginLeft: "3%",
                  }}
                >
                  About
                </div>
                <div
                  style={{
                    marginTop: "3%",
                    marginRight: "10%",
                    marginBottom: "4%",
                    font: "normal normal normal 14px/28px Poppins",
                  }}
                >
                  {hospitalFound[0].Description}
                </div>
              </Tab>
              <Tab eventKey="Departments" title="Departments">
                {departments.map((item) => (
                  <div
                    style={{
                      width: "88%",
                      height: "192px",
                      marginBottom: "10%",
                      marginTop: "5%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        border: "1px solid lightslategray",
                        borderRadius: "10px",
                        padding: "6%",
                      }}
                    >
                      <div style={{ marginRight: "10%" }}>
                        <img
                          style={{
                            width: "144px",
                            height: "130px",
                            borderRadius: "10px",
                          }}
                          alt="doctor"
                          src={item.doctorPhotoUrl}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {item.departmentName}
                        </div>
                        <div
                          style={{
                            fontWeight: "bold",
                            marginTop: "10px",
                          }}
                        >
                          {item.doctorName}
                        </div>
                        <div
                          style={{
                            marginTop: "10px",
                            color: "lightslategray",
                          }}
                        >
                          {item.doctorType}
                        </div>
                        <div
                          style={{
                            alignSelf: "flex-end",
                            background: "#004763 0% 0% no-repeat padding-box",
                            borderRadius: "5px",
                            color: "white",
                            width: "40%",
                            paddingLeft: "4%",
                            height: "30px",
                            paddingTop: "2px",
                            cursor: "pointer",
                          }}
                        >
                          Details
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Tab>
              <Tab eventKey="Facilities" title="Facilities">
                <img
                  alt="hospitalImage"
                  style={{
                    width: "88%",
                    height: "362px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                  src="https://images.livemint.com/img/2021/04/09/1600x900/20200426208L_1588245357204_1617974541308.jpg"
                />
                <div
                  style={{
                    marginTop: "5%",
                    marginLeft: "5%",
                    font: "normal normal 600 22px/33px Poppins",
                    color: "#004763",
                  }}
                >
                  Infrastructure
                </div>
                <ul style={{ marginTop: "10px" }}>
                  {infrastructure.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
                <div
                  style={{
                    marginTop: "5%",
                    marginLeft: "5%",
                    font: "normal normal 600 22px/33px Poppins",
                    color: "#004763",
                  }}
                >
                  Staff
                </div>
                <ul style={{ marginTop: "10px" }}>
                  {staff.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </Tab>
              <Tab eventKey="Packages" title="Packages">
                {packagesFound && packagesFound.length > 0 ? (
                  <div style={{ marginBottom: "30px" }}>
                    {packagesFound.map((item) => (
                      <div
                        onClick={() => {
                          history.push(`/packages/${item.id}`);
                        }}
                        style={{
                          marginTop: "8%",
                          border: "1px solid lightslategray",
                          width: "90%",
                          minHeight: "168px",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          backgroundSize: "contain",
                          backgroundImage: `url(${item.photoUrl})`,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "center",
                            background: "white",
                            borderRadius: "10px",
                            minHeight: "89px",
                            marginTop: "60px",
                            width: "69%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              alignSelf: "center",
                              textAlign: "center",
                              marginTop: "6%",
                              paddingLeft: "1%",
                            }}
                          >
                            {item.PackDescript}
                          </div>
                          <div
                            style={{
                              textAlign: "end",
                              marginRight: "4%",
                            }}
                          >
                            {item.Cost} Rs
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </Tab>
              <Tab eventKey="Reviews" title="Reviews">
                Reviews tab
              </Tab>
            </Tabs>
          </>
        ) : (
          <>No such hospital found</>
        )}
      </div>
      <div
        style={{
          marginTop: "9%",
          marginLeft: "3%",
          width: "23%",
          border: "1px solid #D4D4D4",
          borderRadius: "10px",
          height: "fit-content",
          paddingBottom: "20px",
        }}
      >
        {hospitalFound && hospitalFound.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid rgba(119,136,153,0.4)",
                paddingBottom: "17px",
              }}
            >
              <div
                style={{
                  marginTop: "21px",
                  marginLeft: "10%",
                  font: "normal normal 600 22px/33px Poppins",
                }}
              >
                {hospitalFound[0]?.HospName}
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5%" }}>
                <i
                  style={{
                    fontSize: "22px",
                    color: "#004763",
                    marginRight: "5%",
                  }}
                  className="fa fa-map-marker"
                  aria-hidden="true"
                ></i>
                {hospitalFound[0]?.Address}
              </div>
              <div style={{ marginLeft: "10%", marginTop: "8%" }}>
                <i
                  style={{
                    fontSize: "22px",
                    color: "#004763",
                    marginRight: "5%",
                  }}
                  className="fa fa-phone"
                  aria-hidden="true"
                ></i>
                {hospitalFound[0]?.Contact}
              </div>
            </div>
            <div
              style={{
                alignSelf: "center",
                textAlign: "center",
                font: "normal normal 600 22px/33px Poppins",
                color: "#004763",
                marginTop: "5%",
              }}
            >
              Book an Appointment
            </div>
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
                <Form.Group
                  style={{ display: "flex", flexDirection: "column" }}
                >
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
                marginTop: "10px",
              }}
              onClick={handleReset}
            >
              Book Appointment
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
