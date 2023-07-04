import React from "react";
import "./Sidebar.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const Sidebar = ({
  home,
  historyDonor,
  historyReciever,
  rewards,
  donor,
  active,
}) => {
  const navigate = useNavigate();
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  const url = "http://127.0.0.1:8000/accounts/logout/";
  const signOut = async () => {
    try {
      let { data } = await axios.post(
        `${url}`,
        {
          refresh_token: refresh,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      localStorage.clear();
      toast.success("Signed out successfully");

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <h1>Donate</h1>
          <button className="beDonor">Be a Donor!</button>
        </div>
        {donor ? (
          <ul className="list">
            {home ? (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  padding: active.padding,
                  border: active.border,
                  textAlign: active.textAlign,
                  color: active.color,
                  borderRadius: active.borderRadius,
                  backgroundColor: active.backgroundColor,
                  cursor: active.cursor,
                }}
              >
                <HomeIcon className="icon" />
                Home
              </button>
            ) : (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/");
                }}
              >
                <HomeIcon className="icon" />
                Home
              </button>
            )}

            {historyDonor ? (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/historyDonor");
                }}
                style={{
                  padding: active.padding,
                  border: active.border,
                  textAlign: active.textAlign,
                  color: active.color,
                  borderRadius: active.borderRadius,
                  backgroundColor: active.backgroundColor,
                  cursor: active.cursor,
                }}
              >
                <HistoryIcon className="icon" />
                History
              </button>
            ) : (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/historyDonor");
                }}
              >
                <HistoryIcon className="icon" />
                History
              </button>
            )}

            {rewards ? (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/rewards");
                }}
                style={{
                  padding: active.padding,
                  border: active.border,
                  textAlign: active.textAlign,
                  color: active.color,
                  borderRadius: active.borderRadius,
                  backgroundColor: active.backgroundColor,
                  cursor: active.cursor,
                }}
              >
                <WorkspacePremiumIcon className="icon" />
                Rewards
              </button>
            ) : (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/rewards");
                }}
              >
                <WorkspacePremiumIcon className="icon" />
                Rewards
              </button>
            )}

            <button className="signout" onClick={signOut}>
              <ExitToAppIcon className="icon signoutIcon" />
              Sign out
            </button>
          </ul>
        ) : (
          <ul className="list">
            {home ? (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  padding: active.padding,
                  border: active.border,
                  textAlign: active.textAlign,
                  color: active.color,
                  borderRadius: active.borderRadius,
                  backgroundColor: active.backgroundColor,
                  cursor: active.cursor,
                }}
              >
                <HomeIcon className="icon" />
                Home
              </button>
            ) : (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/");
                }}
              >
                <HomeIcon className="icon" />
                Home
              </button>
            )}

            {historyReciever ? (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/historyReciever");
                }}
                style={{
                  padding: active.padding,
                  border: active.border,
                  textAlign: active.textAlign,
                  color: active.color,
                  borderRadius: active.borderRadius,
                  backgroundColor: active.backgroundColor,
                  cursor: active.cursor,
                }}
              >
                <HistoryIcon className="icon" />
                History
              </button>
            ) : (
              <button
                className="listItem"
                onClick={() => {
                  navigate("/historyReciever");
                }}
              >
                <HistoryIcon className="icon" />
                History
              </button>
            )}
            <button className="signout" onClick={signOut}>
              <ExitToAppIcon className="icon signoutIcon" />
              Sign out
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;