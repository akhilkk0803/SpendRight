import React, { useContext, useEffect, useState } from "react";
import logo from "../img/logo-final.png";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { url } from "../url";
import { userContext } from "../userContext";
const SingleProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { setuser } = useContext(userContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setuser(null);
    return navigate("/login");
  }
  useEffect(() => {
    fetch(url + "/user/?id=" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);
  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <NavLink to="/dashboard">
            <img src={logo} alt="logo" className="logo-main" />
          </NavLink>
          <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
            <span id="SpendRight"> SpendRight</span>
          </NavLink>
        </div>
        <div
          className="navbar-options"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <NavLink to="/dashboard">
            <button className="button-1" role="button">
              DashBoard
            </button>
          </NavLink>
          <button className="button-1" role="button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "30px",
          }}
        >
          <h4>
            Name: <b>{data.name}</b>
          </h4>
          <h4>
            Email: <b>{data.email}</b>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
