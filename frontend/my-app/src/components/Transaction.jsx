import React, { useState, useEffect } from "react";
import { url } from "../url";
import { useContext } from "react";
import { userContext } from "../userContext";

const Transaction = () => {
  const { transaction, setTransaction } = useContext(userContext);
  function addtransaction() {
    
  }
  return (
    <div>
        
      {transaction.map((el) => (
        <h1>{el.amount}</h1>
      ))}
    </div>
  );
};

export default Transaction;
