import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../userContext";
import { Spinner } from "@chakra-ui/react";
import Expenses from "./Expenses";
import Debts from "./Debts";
import Transaction from "./Transaction";
import "../styles/dashboard.css";
import logo from "../img/logo-final.png";
import SideBar from "./SideBar";
import { url } from "../url";
const DashBoard = () => {
  const navigate = useNavigate();
  const {
    user,
    getuser,
    setuser,
    loading,
    debts,
    transaction,
    getDebts,
    getTransaction,
    getExpenses,
    expenses,
  } = useContext(userContext);
  const token = localStorage.getItem("token");
  const [friend, setFriend] = useState([]);
  if (!loading && !user) {
    return navigate("/login");
  }
  useEffect(() => {
    console.log(expenses);
    fetch(url + "/user/friend", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFriend(data.friends);
      });
  }, []);

  function addFriendHandler(id, el, onClose) {
    if (friend.find((el) => el._id === id)) {
      onClose();
      return;
    }
    fetch(url + "/user/add/" + id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setFriend([el, ...friend]);
        onClose();
      })
      .catch((err) => console.log(err));
  }
  function logoutHandler(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setuser(null);
    navigate("/login");
  }
  useEffect(() => {
    if (token) {
      getuser();
    }
  }, []);
  if (loading && !user) {
    return <Spinner />;
  }
  if (!loading && !user) {
    return navigate("/login");
  }
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div
          className="logo"
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo-main" />
          </NavLink>
          <NavLink to="/" style={{ textDecoration: "none" }}>
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
          <NavLink to="/profile">
            <div
              style={{
                backgroundColor: "white",
                padding: "4px 30px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{
                    height: "30px",
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <p>
                {user.name} <span> </span>
              </p>
            </div>
          </NavLink>
          <a href="#">
            <button className="button-1" role="button" onClick={logoutHandler}>
              Logout
            </button>
          </a>
        </div>
      </div>

      {/* Main content */}
      <h1 className="welcome">
        Welcome back, <span className="name">{user.name}</span>!
      </h1>
      <div className="main">
        <div className="friends">
          {<SideBar addFriendHandler={addFriendHandler} />}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: "10px",
              overflow: "auto",
            }}
          >
            {friend.map((el) => (
              <NavLink to={"/profile/" + el._id}>
                <div
                  key={el._id}
                  style={{
                    backgroundColor: "wheat",
                    padding: "7px 20px ",
                    borderRadius: "30px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <p>
                    Name:
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {el.name}
                    </span>
                  </p>
                  <p>
                    Email:
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {el.email}
                    </span>
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="__center">
          <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="flex">
              <div className="Debt">
                <h2>Debt</h2>
                <h5>
                  Amount to be paid is{" "}
                  <span id="Amount">
                    {" "}
                    ₹{debts.reduce((acc, i) => acc + i.amount, 0)}
                  </span>
                </h5>
              </div>
              <div className="Debt">
                <h2>Owed</h2>
                <h5>
                  Amount Owed is
                  <span id="Amount">
                    ₹{transaction.reduce((acc, i) => acc + i.amount, 0)}
                  </span>
                </h5>
              </div>
            </div>
          </div>
          <div className="transactionList">
            <h2>Transaction List</h2>
            {/* Transaction List content */}
            <div className="trans-main-list">
              {transaction.map((el) => (
                <div class="trans-main-list-row">
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
        <div className="__right">
          <div className="expenses">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <h2> Expenses</h2>
              <div
                style={{
                  padding: "10px",
                  boxShadow: "  rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              >
                <NavLink to="/new">
                  <p>Add New</p>
                </NavLink>
              </div>
            </div>
            <Expenses />
          </div>
        </div>
      </div>
      {/* Bootstrap JavaScript */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};

export default DashBoard;
