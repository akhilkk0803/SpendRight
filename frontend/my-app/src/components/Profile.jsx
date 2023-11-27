import React, { useContext, useEffect, useState } from "react";
import "../styles/profile.css";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../userContext";
import { url } from "../url";
import logo from "../img/logo-final.png";
const Profile = ({ show = true }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { user, debts, transaction, setTransaction, setuser } =
    useContext(userContext);
  const [top, settop] = useState([]);
  useEffect(() => {
    const top = [...transaction];
    top.sort((a, b) => b.amount - a.amount);
    settop(top);
  }, [transaction]);
  const navigate = useNavigate();
  const clearSelection = () => {
    setSelectedOption(null);
  };
  function logout() {
    localStorage.removeItem("token");
    setuser(null);
    return navigate("/login");
  }

  function addtransaction(el) {
    fetch(url + "/transaction/create", {
      method: "POST",
      body: JSON.stringify({
        expense: el.expense._id,
        amount: el.amount,
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTransaction([data, ...transaction]);
      });
  }
  return (
    <div className="container-fluid">
      {/* Navbar */}
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

      {/* Main content */}
      <div className="container-main">
        <div className="profile-layout">
          <h3
            style={{
              textAlign: "center",
            }}
          >
            Profile
          </h3>
          <div className="profile-details">
            <p id="username">Name:{user.name}</p>
            <p id="">Email:{user.email}</p>
            {show && (
              <p>
                Edit Details{" "}
                <NavLink to="/edit">
                  Edit <i className="fa-solid fa-pen-to-square"></i>
                </NavLink>
              </p>
            )}
          </div>
        </div>
        {show && (
          <>
            <div className="total-debt">
              <div className="total-menu">
                <p className="heading-menu">Total debt</p>
                <p id="amount-display">
                  ₹{debts.reduce((acc, i) => acc + i.amount, 0)}
                </p>
                {debts.map((el) => (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      marginTop: "8px",
                    }}
                  >
                    <h6>{el.expense.name}</h6>
                    <h6>₹{el.amount}</h6>
                    <button
                      type="button"
                      className="btn btn-success text-menu"
                      onClick={() => addtransaction(el)}
                    >
                      Settle
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="owed-topspent">
              {/* Omitted for brevity */}
              <div class="owed">
                <center>
                  <h4>Total owed</h4>
                </center>
                <p class="display-owed" id="display-owed">
                  {" "}
                  ₹{transaction.reduce((acc, i) => acc + i.amount, 0)}
                </p>
              </div>
              <div class="topspent">
                <div class="topspent-display">
                  <p class="heading-menu">My Top Expenses</p>
                  <div>
                    {top.map((el) => (
                      <div
                        class="transactions-details"
                        style={{
                          padding: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <span class="trans-date">
                          {" "}
                          {new Date(el.createdAt).toLocaleDateString("en-US")}
                        </span>
                        <span class="trans-spent-lent">
                          {" "}
                          {el.expense.admin.name}{" "}
                        </span>
                        <span class="trans-amount">₹{el.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="past-transaction">
              <p className="heading-menu">Transaction history</p>
              {transaction.map((el) => (
                <div
                  class="transactions-details"
                  style={{
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  <span class="trans-date">
                    {" "}
                    {new Date(el.createdAt).toLocaleDateString("en-US")}
                  </span>
                  <span class="trans-spent-lent">
                    {" "}
                    {el.expense.admin.name}{" "}
                  </span>
                  <span class="trans-amount">₹{el.amount}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
