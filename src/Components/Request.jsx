import React, { useState } from "react";
import "./Request.css"; // Import the CSS file for styling
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "./UI/LoadingButton";

const Request = () => {
  const [loading, setLoading] = useState(false);
  const [requestedBy, setrequestedBy] = useState("");
  const [donationType, setDonationType] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [requiredOn, setRequiredOn] = useState("");
  const [PlaceOfDonation, setPlaceOfDonation] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reason, setReason] = useState("");
  const [emergencyRequirement, setEmergencyRequirement] = useState(false);

  const handlerequestedByChange = (event) => {
    setrequestedBy(event.target.value);
  };

  const handleDonationTypeChange = (event) => {
    setDonationType(event.target.value);
  };

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleRequiredOnChange = (event) => {
    setRequiredOn(event.target.value);
  };
  const handlePlaceOfDonationChange = (event) => {
    setPlaceOfDonation(event.target.value);
  };
  const handleNumberOfUnitsChange = (event) => {
    setNumberOfUnits(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleEmergencyRequirementChange = (event) => {
    setEmergencyRequirement(event.target.checked);
  };

  const handleApi = () => {
    console.log(requestedBy, bloodGroup, requiredOn);

    try {
      if (
        requestedBy === "" ||
        donationType === "" ||
        bloodGroup === "" ||
        requiredOn === "" ||
        PlaceOfDonation === "" ||
        numberOfUnits === "" ||
        phoneNumber === "" ||
        emergencyRequirement === ""
      ) {
        // alert("Kindly fill the Form properly");
        toast.warn("Kindly fill the form properly");
        return;
      }
      setLoading(false);
      let { data } = axios.post(
        "http://127.0.0.1:8000/donation/request/",
        {
          requestedBy: requestedBy,
          donationType: donationType,
          bloodGroup: bloodGroup,
          requiredOn: requiredOn,
          PlaceOfDonation: PlaceOfDonation,
          numberOfUnits: numberOfUnits,
          phoneNumber: phoneNumber,
          reason: reason,
          emergencyRequirement: emergencyRequirement,
        },
        {
          headers: { "Content-type": "application/json" },
        }
      );
      toast.success("Request submitted successfully");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Submitted:", {
      requestedBy,
      donationType,
      bloodGroup,
      requiredOn,
      PlaceOfDonation,
      numberOfUnits,
      phoneNumber,
      reason,
      emergencyRequirement,
    });
  };

  return (
    <div className="request-container">
      <h1 className="request-heading">Request for Donor</h1>
      <form className="request-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="donationType">Type of Donation:</label>
          <select
            id="donationType"
            value={donationType}
            onChange={handleDonationTypeChange}
          >
            <option value="">Select a donation type</option>
            <option value="plasma">Plasma</option>
            <option value="blood">Blood</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={handleBloodGroupChange}
          >
            <option value="">Select a blood group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="requiredOn">Required On:</label>
          <input
            id="requiredOn"
            type="date"
            value={requiredOn}
            onChange={handleRequiredOnChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="requestedBy">Registration ID:</label>
          <input
            id="requestedBy"
            type="number"
            value={requestedBy}
            onChange={handlerequestedByChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="PlaceOfDonation">Place of Donation:</label>
          <input
            id="PlaceOfDonation"
            type="text"
            value={PlaceOfDonation}
            onChange={handlePlaceOfDonationChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfUnits">Number of Units:</label>
          <input
            id="numberOfUnits"
            type="number"
            value={numberOfUnits}
            onChange={handleNumberOfUnitsChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            type="number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea id="reason" value={reason} onChange={handleReasonChange} />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyRequirement">
            <input
              id="emergencyRequirement"
              type="checkbox"
              checked={emergencyRequirement}
              onChange={handleEmergencyRequirementChange}
            />
            Emergency Requirement
          </label>
        </div>
        <LoadingButton
          text={"Submit Request"}
          loading={loading}
          onClick={handleApi}
        />
      </form>
    </div>
  );
};

export default Request;
