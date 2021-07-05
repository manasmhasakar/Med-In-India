import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { useCollectionData } from "react-firebase-hooks/firestore";
import HospitalCard from "../../Components/HospitalCard";
import { db } from "../../utils/firbase";
import "./style.css";
import { setSearchKey } from "../../Slices/AppSlice/index";
import { useHistory } from "react-router-dom";

interface HosptialSchema {
  hospitalName: string; // name of hospital
  city: string; // name of city
  country: string; // name of country
  rating: number; // floating point number between 0.1 to 10.0
  email: string; // email address
  contactNumber: number; // phone number
  description: string; // a summary about hospital
  address: string; // complete address along with pincode
  packages: packages[]; //list of packages
}

interface packages {
  packageDescription: string; // description of package
  packageIncludes: string; // points what the package includes
  packageExcludes: string; // points what the package excludes
  patientEligibility: string; // eliglibility points for a patient
  actualCost: number; // cost offered by normal hospitals
  hospiceCost: number; // cost offered by us
}

export default function HomePage(): ReactElement {
  const hospitals = db.collection("hospitals");
  const query = hospitals.orderBy("HospName").limit(25);
  const [hospitalsList] = useCollectionData(query, { idField: "id" });
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(setSearchKey(searchTerm.toLowerCase()));
    history.push("/packages");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "2% 4%",
          alignItems: "center",
          // paddingRight: "5%",
        }}
      >
        <div
          className="hospital-cater"
          style={{
            width: "90%",
            height: "331px",
            marginTop: "4%",
            border: "1px solid black",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            boxShadow: "inset 0 0 0 1000px rgb(0 0 0 / 20%)",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              font: "normal normal bold 38px/66px Poppins",
              paddingLeft: "44px",
            }}
          >
            {/* Find Hospitals to cater your needs */}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "45px",
            width: "80%",
            marginTop: "-23px",
            paddingLeft: "16%",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", height: "48px" }}>
            <input
              placeholder="Search by any hospital, diagnosis, disease.."
              style={{
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                boxShadow: "0px 5px 10px #00000029",
                borderRadius: "10px",
                color: "black",
                fontSize: "18px",
                width: "66%",
                paddingLeft: "3%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value as string);
              }}
            />
            <div
              style={{
                color: "white",
                background: "#004763 0% 0% no-repeat padding-box",
                borderRadius: "0px 10px 10px 0px",
                marginLeft: "-14px",
                display: "flex",
                paddingLeft: "10px",
                paddingRight: "10px",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              <i
                style={{ alignSelf: "center", margin: "0px 12px" }}
                className="fa fa-search"
                aria-hidden="true"
              ></i>
              <div
                style={{
                  alignSelf: "center",
                }}
              >
                Search
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "83%",
              marginTop: "10px",
            }}
          >
            <div style={{ color: "lightslategrey" }}>POPULAR SEARCHES</div>
            <div>COVID</div>
            <div>Lung Cancer</div>
            <div>Prostate Cancer</div>
            <div>Cesarean Surgery</div>
          </div>
        </div>
        <div
          style={{
            marginTop: "10%",

            fontWeight: 700,
            marginRight: "8px",
            color: "#004763",
          }}
        >
          <h2>Hospitals Near You</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "-30px" }}>
          {hospitalsList &&
            hospitalsList.length > 0 &&
            hospitalsList.map((item) => (
              <HospitalCard
                city={item.City}
                imgUrl={item.imgUrl}
                title={item.HospName}
                rating={item.Rating}
              />
            ))}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          margin: "2% 4%",
          padding: "1%",
          fontWeight: 700,
          color: "#004763",
          cursor: "pointer",
          border: "1px solid #004763",
          borderRadius: "10px",
        }}
        onClick={() => {
          history.push("/hospitalSignUp");
        }}
      >
        Are you a hospital ?
      </div>
    </>
  );
}
