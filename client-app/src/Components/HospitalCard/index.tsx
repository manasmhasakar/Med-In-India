import React, { ReactElement } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./style.css";
import { setCurrentHospitalName } from "../../Slices/AppSlice";

interface Props {
  title: string;
  rating: number;
  imgUrl: string;
  city: string;
}

export default function HospitalCard({
  title,
  rating,
  imgUrl,
  city,
}: Props): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleRouteChange = () => {
    dispatch(setCurrentHospitalName(title));
    const a = "/hospital";
    history.push(a);
  };
  return (
    <div
      className="hospital-card"
      onClick={handleRouteChange}
      style={{
        width: "34%",
        height: "168px",
        border: "1px solid #707070",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        margin: "2%",
        cursor: "pointer",
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div
        className="hospital-sub-card"
        style={{
          alignSelf: "flex-end",
          marginBottom: "4%",
          width: "80%",
          border: "1px solid #707070",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginTop: "10px",
            alignSelf: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            paddingLeft: "4%",
            justifyContent: "space-around",
            marginTop: "9px",
            marginBottom: "6px",
          }}
        >
          <div>
            {" "}
            <i className="fa fa-map-marker" aria-hidden="true"></i> {city},
            India
          </div>
          <div>
            {rating} <i className="fa fa-star"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
