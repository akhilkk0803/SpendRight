import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { url } from "../url";
import { userContext } from "../userContext";

const Debts = () => {
  const { debts } = useContext(userContext);
  

  return (
    <div>
      debts
      {debts.map((el) => (
        <div key={el._id}>
          <h1>{el.amount}</h1>
        </div>
      ))}
    </div>
  );
};

export default Debts;
