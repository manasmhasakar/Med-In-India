import React, { ReactElement } from "react";
import { db } from "../../utils/firbase";
import "./style.css";
import { useFormik } from "formik";
import swal from "sweetalert";

export default function HospitalSignUp(): ReactElement {
  const formik = useFormik({
    initialValues: {
      hospName: "",
      address: "",
      contactNo: "",
      email: "",
    },
    onSubmit: (values) => {
      db.collection("hospitals").add(values);
      swal(
        "Your Appointment has been booked Successully",
        "You will soon be Contacted by our Team",
        "success"
      );
    },
  });
  return (
    <div
      className="container"
      style={{
        display: "center",
        width: "90%",
        paddingRight: "9%",
        paddingLeft: "5%",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <h1>Hospital Onboarding Form</h1>
        <label htmlFor="hospName">Hospital Name</label>
        <input
          className="sign-up-input"
          id="hospName"
          name="hospName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.hospName}
        />
        {formik.errors.hospName ? <div>{formik.errors.hospName}</div> : null}

        <label htmlFor="address">Hospital Address</label>
        <input
          className="sign-up-input"
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.errors.address ? <div>{formik.errors.address}</div> : null}

        <label htmlFor="contactNo">Contact Number</label>
        <input
          className="sign-up-input"
          id="contactNo"
          name="contactNo"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contactNo}
        />
        {formik.errors.contactNo ? <div>{formik.errors.contactNo}</div> : null}

        <label htmlFor="email">Email Address</label>
        <input
          className="sign-up-input"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <p></p>
        <button value="button" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}
