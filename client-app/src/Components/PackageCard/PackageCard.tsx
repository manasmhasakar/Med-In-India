import React, { ReactElement } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";

interface Props {
  item: any;
}

export default function PackageCard({ item }: Props): ReactElement {
  const history = useHistory();
  const handleSubmit = () => {
    history.push("/packages/" + item.id);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "240px",
        border: "1px solid #D4D4D4",
        borderRadius: "15px",
        display: "flex",
        margin: "2%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/34/Jehangir_Hospital_Building.jpg"
          alt=""
          style={{
            width: "300px",
            height: "180px",
            borderRadius: "10px",
            marginLeft: "4%",
          }}
        />
      </div>
      <div className="card-content-pkg">
        {" "}
        <h3
          style={{
            fontWeight: 700,
            marginRight: "8px",
          }}
        >
          {item.name}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "15",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "15",
              color: "#004763",
            }}
          >
            <h2
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
              {item.Cost}
            </h2>
            <h5
              style={{
                marginTop: "8px",
                color: "#004763",
              }}
            >
              approx
            </h5>
          </div>
          <div
            style={{
              color: "white",
              background: "#004763 0% 0% no-repeat padding-box",
              borderRadius: "8px ",
              display: "flex",
              paddingLeft: "10px",
              paddingRight: "10px",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            <div
              style={{
                alignSelf: "center",
              }}
            >
              View Package
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: "15",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#004763",
            }}
          >
            {item.HospName}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "15",
              fontSize: "18px",
              color: "#004763",
              margin: "8px",
            }}
          >
            {" "}
            <i className="fa fa-building-o"></i>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "6px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginRight: "4px",
            }}
          >
            <div>
              {item.Rating || 4}/5 <i className="fa fa-star"></i>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "6px",
          }}
        >
          {item.Address && item.Address}
        </div>
      </div>
    </div>
  );
}
