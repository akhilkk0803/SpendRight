import React, { useContext, useState } from "react";
import "../styles/dashboard.css";
import { url } from "../url";
import { userContext } from "../userContext";
import Expenses from "./Expenses";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [amount, setamount] = useState(0);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState("");
  const [users, setusers] = useState([]);
  const [name, setName] = useState("");
  const [selected, setselected] = useState([]);
  const { getExpenses } = useContext(userContext);
  const navigate = useNavigate();
  function getusers(e) {
    fetch(url + "/user/?search=" + e.target.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setusers(data));
  }
  function addUser(e) {
    if (selected.find((el) => el._id === e._id)) return;
    setselected([e, ...selected]);
  }
  function submit(e) {
    e.preventDefault();
    if (!amount || !message || !options || !name || users.length == 0) {
      alert("FILL ALL DETAILS");
      return;
    }
    const len = users.length;
    const query = len == 1 ? "false" : "true";
    fetch(url + "/expense/create/?group=" + query, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        user: selected.map((el) => el._id),
        totalAmount:amount,
        category: options,
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getExpenses();
        navigate("/dashboard");
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        action="#"
        style={{
          border: "3px solid black ",
          padding: "30px",
        }}
      >
        <h1>Add Expense</h1>
        {/* Expenses form content */}
        <label>
          Title
          <input
            type="text"
            className="expenses_amount"
            placeholder="Eg:Vacation"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Amount
          <input
            type="number"
            id="expenses_amount"
            className="expenses_amount"
            placeholder="Amount"
            onChange={(e) => setamount(e.target.value)}
          />
        </label>
        <label>
          Category
          <select
            id="expenses_type"
            className="expenses_type"
            required
            onChange={(e) => setOptions(e.target.value)}
          >
            <option value="" disabled selected>
              Select your option
            </option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="others">Others</option>
          </select>
        </label>
        <label htmlFor="">
          Message:
          <input
            type="text"
            placeholder="Add a message"
            className="expenses_message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div
          style={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          {selected.length > 0 &&
            selected.map((el) => (
              <p
                style={{
                  backgroundColor: "purple",
                  padding: "3px 7px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                {el.name}
              </p>
            ))}
        </div>
        <label>
          Add Users
          <input type="text" className="expenses_amount" onChange={getusers} />
        </label>
        <div
          style={{
            maxHeight: "150px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {users.length > 0 &&
            users.map((el) => (
              <div
                style={{
                  backgroundColor: "wheat",
                  padding: "12px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={() => addUser(el)}
              >
                <p>Name:{el.name}</p>
                <p>Email:{el.email}</p>
              </div>
            ))}
        </div>
        <button
          type="submit"
          className="expenses_submit"
          id="expenses_submit"
          onClick={submit}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
