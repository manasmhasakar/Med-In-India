import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firbase";
import "./style.css";
import PackageCard from "../../Components/PackageCard/PackageCard";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function PackageDashoard(): ReactElement {
  // const searchKey = useSelector((state) => state.searchKey);

  var ref = db.collection("packages");

  const [dbPackages] = useCollectionData(ref, { idField: "id" });

  console.log("packages", dbPackages);

  const { searchKey } = useSelector((state: any) => ({
    searchKey: state.appReducer.searchKey,
  }));
  const [searchTerm, setSearchTerm] = useState(searchKey);

  const [hospPackages, setHospPackages] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const arr =
      dbPackages &&
      dbPackages.filter((pkg) =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setHospPackages(arr);
  }, [dbPackages]);

  const getPackages = () => {
    const arr =
      dbPackages &&
      dbPackages.filter((pkg) =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setHospPackages(arr);
  };

  const handleSubmit = () => {
    setHospPackages([]);

    getPackages();
  };

  console.log(hospPackages, searchKey);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingLeft: "3%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "3%",
          }}
        >
          <div style={{ display: "flex", height: "60px", margin: "2%" }}>
            <input
              placeholder="Search by any hospital, diagnosis, disease.."
              style={{
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                boxShadow: "0px 5px 10px #00000029",
                borderRadius: "10px",
                border: "1px solid #D4D4D4",

                color: "black",
                fontSize: "18px",
                width: "66%",
                paddingLeft: "3%",
              }}
              value={searchTerm}
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
                style={{ alignSelf: "center", margin: "0px 8px" }}
                className="fa fa-search"
                aria-hidden="true"
              ></i>
              <div
                style={{
                  alignSelf: "center",
                  width: "70px",
                }}
              >
                Search
              </div>
            </div>
          </div>

          {isLoading ? (
            "Loading...."
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {hospPackages && hospPackages.length > 0 ? (
                [...hospPackages].map((item) => <PackageCard item={item} />)
              ) : (
                <div style={{ margin: "5%" }}>
                  <h2>No packages found</h2>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
