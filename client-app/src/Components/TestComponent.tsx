import React, { ReactElement, useEffect, useState } from "react";
import { db } from "../utils/firbase";

export default function TestComponent(): ReactElement {
  const [hospPackages, setHospPackages] = useState([]);

  useEffect(() => {
    (async () => {
      var a = [];
      const pkg = await db
        .collection("packages")
        .where("PackExc", "==", "dfghslkdfj")
        .get();
      pkg.forEach(async (snapshot) => {
        const hospPackage = snapshot.data();
        const hosp = await db.doc(`/hospitals/${hospPackage.hospId}`).get();
        a.push({ ...hospPackage, hospital: { ...hosp.data() } });
        setHospPackages(a);
      });
    })();
  }, []);

  console.log("package", hospPackages);

  return (
    <>
      <div>Team Mates</div>
      {hospPackages.length > 0 && (
        <>
          {hospPackages.map((item) => (
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "5px" }}>{item.PackExc}</div>
              <div style={{ marginLeft: "5px" }}>{item.Cost}</div>
              <div style={{ marginLeft: "5px" }}>{item.Company}</div>
              <div style={{ marginLeft: "5px" }}>{item.Expertise}</div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
