import React, { useContext } from "react";
import { userContext } from "../userContext";
import { url } from "../url";

const SingleExpense = ({ el }) => {
  const { user, transaction, setTransaction } = useContext(userContext);
  const token = localStorage.getItem("token");

  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop: "10px",
        padding: "10px",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h6>{el.name}</h6>
          <p
            style={{
              color: "gray",
            }}
          >
            {el.category}
          </p>
        </div>
        <p>
          Total Amount:<b>{el.totalAmount}</b>
          <p>No of People:{el.user.length}</p>
          <p>Comment:{el.message}</p>
        </p>
      </div>
    </div>
  );
};

export default SingleExpense;
